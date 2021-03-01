import express from "express";
import { root, graphqlSchema } from "./graphql/schema";
import { graphqlHTTP } from "express-graphql";
import { logger } from "@modules/log";
import { tickerCron, feesCron, heightCron } from "@modules/cron";
import {minaAstronaut} from "./lib/minaAstronaut";

tickerCron.start();
feesCron.start();
heightCron.start();

const log = logger("SERVER");
const port = process.env.SERVER_PORT;
const app = express();

app.get("/", (req, res) => {
  res.write(minaAstronaut);
  res.end();
});

const setMiddleware = () => {
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphqlSchema,
      rootValue: root,
      graphiql: true,
    })
  );
};

setMiddleware();

app.listen(port, async () => {
  log.info(`Running a GraphQL API server at http://localhost:${port}`);
});
