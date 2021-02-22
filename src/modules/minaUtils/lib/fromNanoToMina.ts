import { Big, BigSource } from 'big.js';
import { NANOMINA } from "../";

export const fromNanoToMina = (amount: BigSource) => +Big(amount).div(NANOMINA)
