import { stitchSchemas } from "@graphql-tools/stitch";
import { mergeResolvers } from "@graphql-tools/merge";

// Schemas
import { schema as accountsSchema } from "@modules/accounts/graphql/schema";
import { schema as feesSchema } from "@modules/fees/graphql/schema";
import { schema as tickerSchema } from "@modules/ticker/graphql/schema";
import { schema as nodeStatsSchema } from "@modules/nodeStat/graphql/schema";
import { schema as transactionsSchema } from "@modules/transactions/graphql/schema";

// Queries
import { queries as accountQueries } from "@modules/accounts/graphql/queries";
import { queries as feesDealsQueries } from "@modules/fees/graphql/queries";
import { queries as tickerQueries } from "@modules/ticker/graphql/queries";
import { queries as nodeStatsQueries } from "@modules/nodeStat/graphql/queries";
import { queries as transactionsQueries } from "@modules/transactions/graphql/queries";

// Mutations
import {mutations as transactionsMutations} from "@modules/transactions/graphql/mutations";

// setup subschema configurations
export const accountsSubschema = { schema: accountsSchema };
export const feesSubschema = { schema: feesSchema };
export const tickerSubschema = { schema: tickerSchema };
export const nodeStatsSubschema = { schema: nodeStatsSchema };
export const transactionsSubschema = { schema: transactionsSchema };

// setup resolvers
const resolvers = [
  accountQueries,
  feesDealsQueries,
  tickerQueries,
  nodeStatsQueries,
  transactionsQueries,
  transactionsMutations,
];

// Merged resolvers
export const root = mergeResolvers(resolvers);

// Merged schemas
export const graphqlSchema = stitchSchemas({
  subschemas: [accountsSubschema, feesSubschema, tickerSubschema, nodeStatsSubschema, transactionsSubschema],
});
