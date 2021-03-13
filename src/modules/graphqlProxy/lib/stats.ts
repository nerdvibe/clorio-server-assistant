import gql from "graphql-tag";
import { minaNodeClient } from "../minaNodeClient";

export const stats = async () => {
    const { data } = await minaNodeClient.query({
      query: gql`
          query daemonStatus {
              daemonStatus {
                  blockchainLength 
              }
          }
      `
    });

      return data?.daemonStatus?.blockchainLength || -1;
};
