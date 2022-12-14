import { JSONSchemaFaker } from 'json-schema-faker';
import { faker } from '@faker-js/faker';
import { BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import accountSchema from './schemas/schema';
import { ddbDocClient } from './lib/dynamodb';
import * as fs from 'fs';

const TABLE_NAME = 'common-storage';

const params = {
  RequestItems: {
    [TABLE_NAME]: [],
  },
};

JSONSchemaFaker.extend('faker', () => faker);

const { accounts } = JSONSchemaFaker.generate(accountSchema);
// console.log(profiles.profiles[0].movements);

const logger = fs.createWriteStream('log.txt', {
  flags: 'a', // 'a' means appending (old data will be preserved)
});

async function main() {
  for (const account of accounts) {
    console.log(account.globalId);

    if (account.movements.length) {
      params.RequestItems[TABLE_NAME].push({
        PutRequest: {
          Item: getProfile(account),
        },
      });

      params.RequestItems[TABLE_NAME].push({
        PutRequest: {
          Item: getAccount(account),
        },
      });

      for (const movement of account.movements) {
        params.RequestItems[TABLE_NAME].push({
          PutRequest: {
            Item: getMovement(account, movement),
          },
        });
      }

      try {
        const data = await ddbDocClient.send(new BatchWriteCommand(params));
        logger.write(account.globalId + '\n');
        params.RequestItems[TABLE_NAME] = [];
      } catch (error) {
        console.error(error);
      }
      await sleep(1000);
    } else {
      console.error(account.globalId, 'no tiene movimientos');
    }
  }
  logger.end();
  console.log('successfull');
}

main();

function getProfile(row: any): any {
  return {
    PK: `customer#${row.globalId}`,
    SK: `profile#${row.globalId}`,
    name: row.name,
    lastName: row.lastName,
    globalId: row.globalId,
    email: row.email,
    isMerchant: row.isMerchant,
    hasCard: row.hasCard,
  };
}

function getAccount(row: any): any {
  return {
    PK: `customer#${row.globalId}`,
    SK: `account#${row.cbu}`,
    cbu: row.cbu,
    alias: row.alias.substring(0, 20),
    balanceCurrency: row.balanceCurrency,
    balanceAmount: row.balanceAmount,
    createAt: Date.now(),
  };
}

function getMovement(account: any, movement: any): any {
  return {
    PK: `customer#${account.globalId}`,
    SK: `movement#${movement.epoc}`,
    date: movement.epoc,
    category: movement.category,
    title: movement.title,
    detail: movement.detail,
    amount: movement.amount,
  };
}

const sleep = (delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
