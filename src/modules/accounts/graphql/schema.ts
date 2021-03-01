import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Balance {
    total: String
    liquid: String
    locked: String
  }

  type Delegate {
    publicKey: String
  }

  type Account {
    balance: Balance
    delegate: Delegate
    nonce: Int
  }

  type Query {
    accountByKey(publicKey: String!): Account
  }
`);
