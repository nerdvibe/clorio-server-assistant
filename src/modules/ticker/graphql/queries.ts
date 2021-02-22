import { tickerCacheGet } from "@modules/cache";

export const queries = {
  ticker: () => {
    return tickerCacheGet();
  },
};
