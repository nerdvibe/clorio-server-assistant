import gql from "graphql-tag";
import { minaNodeClient } from "../minaNodeClient";
import { logger } from "@modules/log";
import Big from 'big.js';
import {fromNanoToMina} from "@modules/minaUtils";
import {Fees} from "@modules/cache";

const log = logger("GQL_PROXY_FEES");

export const fees = async ():Promise<Fees> => {
  try {
    const { data } = await minaNodeClient.query({
      query: gql`
          query pooledUserCommands {
              pooledUserCommands {
                  fee
                  feeToken
                  kind
              }
          }
      `});

    const txInMemPool: number = data.pooledUserCommands.length;
    const fees: number[] = data.pooledUserCommands.reduce((acc, curr) => {
        // TODO: Improve consts
        if(curr.feeToken === '1' && curr.kind === 'PAYMENT') {
            acc.push(+(curr.fee));
            return acc
        }
    }, [] as number[])
    const averageFeeNano = Big(fees.reduce((acc, curr) => {return acc + curr}, 0)).div(txInMemPool)

      return {
          fast: fromNanoToMina(Math.max(...fees)),
          average: fromNanoToMina(averageFeeNano),
      };
  } catch (e) {
      log.error(e);
  }
};
