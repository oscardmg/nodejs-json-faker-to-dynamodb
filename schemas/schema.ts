const accountSchema = {
  type: 'object',
  properties: {
    accounts: {
      type: 'array',
      minItems: 50,
      maxItems: 50,
      uniqueItems: true,
      items: {
        type: 'object',
        properties: {
          globalId: {
            type: 'string',
            faker: {
              'finance.account': [10],
            },
          },
          name: {
            type: 'string',
            faker: 'name.firstName',
          },
          lastName: {
            type: 'string',
            faker: 'name.lastName',
          },
          email: {
            type: 'string',
            faker: 'internet.email',
          },
          isMerchant: {
            type: 'boolean',
            faker: 'random.boolean',
          },
          hasCard: {
            type: 'boolean',
            faker: 'random.boolean',
          },
          cbu: {
            type: 'string',
            faker: {
              'finance.account': [22],
            },
          },
          alias: {
            type: 'string',
            // min 6 y max 20
            faker: {
              'lorem.slug': [5],
            },
          },
          balanceCurrency: {
            type: 'string',
            pattern: 'ARG',
          },
          balanceAmount: {
            type: 'integer',
            faker: {
              'finance.account': [6, 10, 0],
            },
          },
          movements: {
            type: 'array',
            minItems: 1,
            maxItems: 20,
            uniqueItems: true,
            items: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  faker: 'lorem.word',
                },
                title: {
                  type: 'string',
                  faker: 'lorem.word',
                },
                detail: {
                  type: 'string',
                  faker: 'lorem.word',
                },
                amount: {
                  type: 'integer',
                  faker: {
                    'finance.amount': [1000, 500000, 0],
                  },
                },
                date: {
                  type: 'string',
                  faker: 'date.past',
                },
                epoc: {
                  type: 'integer',
                  faker: {
                    'finance.amount': [1579031480, 1670874680, 0],
                  },
                },
              },
              required: [
                'category',
                'title',
                'detail',
                'amount',
                'date',
                'epoc',
              ],
            },
          },
        },
        required: [
          'globalId',
          'name',
          'lastName',
          'email',
          'isMerchant',
          'hasCard',
          'cbu',
          'alias',
          'movements',
          'balanceCurrency',
          'balanceAmount',
        ],
      },
    },
  },
  required: ['accounts'],
};

export default accountSchema;
