import NodeCache from "node-cache";
import {logger} from "@modules/log";

const log = logger("CACHE_TICKER");

export interface Ticker {
    BTCMINA: number
}

const tickerCache = new NodeCache();
tickerCache.set("ticker", { BTCMINA: 1 });

export const tickerCacheSet = (tick: Ticker) => {
    if(!tick.BTCMINA && tick.BTCMINA !== null ) {
        log.error('cannot save the tick')
    }
    tickerCache.set("ticker", tick)
}

export const tickerCacheGet = ():Ticker => {
    return tickerCache.get("ticker")
}
