import express from "express";
import { root, graphqlSchema } from "./graphql/schema";
import { graphqlHTTP } from "express-graphql";
import { logger } from "@modules/log";
import { tickerCron, feesCron, heightCron, validatorsCron } from "@modules/cron";
import {minaAstronaut} from "./lib/minaAstronaut";
import {fetchValidators} from "@modules/validators/fetchValidators";

tickerCron.start();
feesCron.start();
heightCron.start();
validatorsCron.start();

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

(async() => {
    await fetchValidators()
})()

app.listen(port, async () => {
  log.info(`Running a GraphQL API server at http://localhost:${port}`);
});
