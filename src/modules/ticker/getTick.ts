import { tickerCache } from "../cache";

export const getTick = () => {
  return tickerCache.get("ticker");
};
