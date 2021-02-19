import { tickerCache } from "@modules/cache";

export const queries = {
  ticker: () => {
    return tickerCache.get("ticker");
  },
};
