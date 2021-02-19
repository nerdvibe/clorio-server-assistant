import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Tickers {
    BTCMINA: String
  }

  type Query {
    ticker: Tickers
  }
`);
