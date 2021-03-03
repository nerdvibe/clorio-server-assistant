import NodeCache from "node-cache";
import {logger} from "@modules/log";

const log = logger("CACHE_FEES");

export interface Fees {
    fast: number;
    average: number;
}

const feesCache = new NodeCache();
feesCache.set("fees", { fast: 0, average: 0 });

export const feesCacheSet = (fees: Fees) => {
    if(!fees.fast || !fees.average) {
        log.error('cannot save the fee cache')
    }
    feesCache.set("fees", fees)
}

export const feesCacheGet = ():Fees => {
    return feesCache.get("fees")
}
