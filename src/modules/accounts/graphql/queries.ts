import { account as minaNodeAccount } from "@modules/graphqlProxy";

export const queries = {
  accountByKey: async (publicKey) => {
    return minaNodeAccount(publicKey);
  },
};
