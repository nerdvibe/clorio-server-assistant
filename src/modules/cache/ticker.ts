import NodeCache from "node-cache";

export const tickerCache = new NodeCache();
tickerCache.set("ticker", { BTCMINA: 1 });
