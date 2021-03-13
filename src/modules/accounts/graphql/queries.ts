import {account as minaNodeAccount} from "@modules/graphqlProxy";
import {sendGraphqlError} from "../../../graphql/util";

export const queries = {
  accountByKey: async (publicKey) => {
    try {
      return await minaNodeAccount(publicKey);
    } catch(e) {
      sendGraphqlError(e)
    }
  },
};
