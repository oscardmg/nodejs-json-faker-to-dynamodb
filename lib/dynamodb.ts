import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocument,
  GetCommand,
  PutCommand,
  DeleteCommand,
  GetCommandOutput,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({ region: 'us-east-1' });

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: false,
  convertClassInstanceToMap: true,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };

const ddbDocClient = DynamoDBDocument.from(client, translateConfig);

export {
  ddbDocClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
  GetCommandOutput,
  QueryCommand,
};
