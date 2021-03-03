import gql from "graphql-tag";
import { minaNodeClient } from "../minaNodeClient";
import { logger } from "@modules/log";
import Big from "big.js";

const log = logger("GQL_PROXY_ACCOUNT");

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
            nonce
          }
          pooledUserCommands(publicKey: $publicKey) {
            id
            nonce
            amount
            source {publicKey}
            receiver {publicKey}
            fee
            feeToken
          }
        }
      `,
      variables: {
        publicKey,
      },
      fetchPolicy: "no-cache"
    });

    const nonce = data.account.nonce;
    const mempool = [...data.pooledUserCommands];
    const unconfirmedNonce = mempool.length ? Math.max(...mempool.map(tx => tx.nonce)) : 0;
    const usableNonce = Math.max(nonce, typeof unconfirmedNonce === 'number' ? unconfirmedNonce + 1 : 0);
    const unconfBalance: number = mempool.reduce((acc, curr) => {
      // if sender === source, subtract the fee (self tx or delegation)
      if(curr.feeToken === '1' && curr.source.publicKey === publicKey && curr.receiver.publicKey === publicKey) {
        return +Big(acc).minus(curr.fee).round(8)
      } else if (curr.feeToken === '1' && curr.source.publicKey === publicKey) {
        return +Big(acc).minus(Big(curr.fee).plus(curr.amount)).round(8)
      }
      return acc
    }, data.account.balance.total as number)
    const liquidUnconfirmed = Big(data.account.balance.liquid).add(unconfBalance).round(8).toString()

    return {
      balance: {unconfirmedTotal: unconfBalance, liquidUnconfirmed, ...data.account.balance},
      delegate: data.account.epochDelegateAccount,
      nonce,
      unconfirmedNonce,
      usableNonce,
      mempool: data.pooledUserCommands,
    };
  } catch (e) {
    log.error(e);
  }
};
