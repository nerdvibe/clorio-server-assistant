import { buildSchema } from "graphql";

export const schema = buildSchema(`

  type Fees {
    fast: Float
    average: Float
  }

  type Query {
    estimatedFee: Fees
  }
`);
