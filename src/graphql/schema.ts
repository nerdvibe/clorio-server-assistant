import { stitchSchemas } from "@graphql-tools/stitch";
import { mergeResolvers } from "@graphql-tools/merge";

// Schemas
import { schema as accountsSchema } from "@modules/accounts/graphql/schema";
import { schema as feesSchema } from "@modules/fees/graphql/schema";
import { schema as tickerSchema } from "@modules/ticker/graphql/schema";
import { schema as nodeStatsSchema } from "@modules/nodeStat/graphql/schema";

// Queries
import { queries as accountQueries } from "@modules/accounts/graphql/queries";
import { queries as feesDealsQueries } from "@modules/fees/graphql/queries";
import { queries as tickerQueries } from "@modules/ticker/graphql/queries";
import { queries as nodeStatsQueries } from "@modules/nodeStat/graphql/queries";

// Mutations
// import {mutations as accountMutations} from "@modules/graphql/mutations";

// setup subschema configurations
export const accountsSubschema = { schema: accountsSchema };
export const feesSubschema = { schema: feesSchema };
export const tickerSubschema = { schema: tickerSchema };
export const nodeStatsSubschema = { schema: nodeStatsSchema };

// setup resolvers
const resolvers = [
  accountQueries,
  // accountMutations,
  feesDealsQueries,
  tickerQueries,
  nodeStatsQueries,
];

// Merged resolvers
export const root = mergeResolvers(resolvers);

// Merged schemas
export const graphqlSchema = stitchSchemas({
  subschemas: [accountsSubschema, feesSubschema, tickerSubschema, nodeStatsSubschema],
});
