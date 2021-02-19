import gql from "graphql-tag";
import { minaNodeClient } from "../minaNodeClient";
import { logger } from "@modules/log";

const log = logger("GQL_PROXY_ACCOUNT");

// TODO PARAMS
export const account = async ({ publicKey }) => {
  try {
    const { data } = await minaNodeClient.query({
      query: gql`
        query account($publicKey: String) {
          account(publicKey: $publicKey) {
            balance {
              total
              liquid
              locked
            }
            epochDelegateAccount {
              publicKey
            }
          }
        }
      `,
      variables: {
        publicKey,
      },
    });

    return {
      balance: data.account.balance,
      delegate: data.account.epochDelegateAccount,
    };
  } catch (e) {
    log.error(e);
  }
};
