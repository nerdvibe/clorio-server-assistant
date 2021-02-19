import { stitchSchemas } from "@graphql-tools/stitch";
import { mergeResolvers } from "@graphql-tools/merge";

// Schemas
import { schema as accountsSchema } from "@modules/accounts/graphql/schema";
import { schema as feesSchema } from "@modules/fees/graphql/schema";
import { schema as tickerFeedSchema } from "@modules/ticker/graphql/schema";

// Queries
import { queries as accountQueries } from "@modules/accounts/graphql/queries";
import { queries as feesDealsQueries } from "@modules/fees/graphql/queries";
import { queries as tickerQueries } from "@modules/ticker/graphql/queries";

// Mutations
// import {mutations as accountMutations} from "@modules/graphql/mutations";

// setup subschema configurations
export const accountsSubschema = { schema: accountsSchema };
export const feesSubschema = { schema: feesSchema };
export const tickerSubschema = { schema: tickerFeedSchema };

// setup resolvers
const resolvers = [
  accountQueries,
  // accountMutations,
  feesDealsQueries,
  tickerQueries,
];

// Merged resolvers
export const root = mergeResolvers(resolvers);

// Merged schemas
export const graphqlSchema = stitchSchemas({
  subschemas: [accountsSubschema, feesSubschema, tickerSubschema],
});
