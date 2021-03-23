import gql from "graphql-tag";
import { minaNodeClient } from "../minaNodeClient";
import Big from 'big.js';
import {fromNanoToMina} from "@modules/minaUtils";
import {FeesAndSnarkFees} from "@modules/cache";

export const fees = async ():Promise<FeesAndSnarkFees> => {
    const { data } = await minaNodeClient.query({
      query: gql`
          query pooledUserCommands {
              pooledUserCommands {
                  fee
                  feeToken
                  kind
              }
              snarkPool {
                  prover
                  fee
              }
          }
      `,
     fetchPolicy: "no-cache"
    });

    const snarksInPool = data.snarkPool.length;
    const snarks: number[] = data.snarkPool.reduce((acc, curr) => {
        // TODO: Improve consts
            acc.push(+(curr.fee));
            return acc
    }, [0]);
    const averageSnarkNano = !snarksInPool ? 0 : Big(snarks.reduce((acc, curr) => {return acc + curr}, 0)).div(snarksInPool);

    const txInMemPool = data.pooledUserCommands.length;
    const txFees: number[] = data.pooledUserCommands.reduce((acc, curr) => {
        // TODO: Improve consts
        if(curr.feeToken === '1' && curr.kind === 'PAYMENT') {
            acc.push(+(curr.fee));
            return acc
        }
        return acc
    }, [0])
    const averageFeeNano = !txInMemPool ? 0 : Big(txFees.reduce((acc, curr) => {return acc + curr}, 0)).div(txInMemPool);

    return {
        txFees: {
            fast: fromNanoToMina(Math.max(...txFees)),
            average: fromNanoToMina(averageFeeNano),
        },
        snarkFees: {
            average: fromNanoToMina(averageSnarkNano),
            maxFee: fromNanoToMina(Math.max(...snarks)),
            minFee: fromNanoToMina(Math.min(...snarks))
        }
    };
};
