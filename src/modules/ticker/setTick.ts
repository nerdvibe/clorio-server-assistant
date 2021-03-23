// import axios from "axios";
import { tickerCacheSet } from "../cache";
import { logger } from "@modules/log";

const log = logger("TICKER_SET_TICKER");

export const setTick = async () => {
  try {
    // const currency = "bitcoin"; // TODO change
    // const exchange = "binance"; // TODO change
    // const baseCurrency = "BTC"; // TODO change
    // const targetCurrency = "MINA"; // TODO change
    //
    // const { data } = await axios.get(
    //   `https://api.coingecko.com/api/v3/coins/${currency}/tickers?exchange_ids=${exchange}`
    // );

    // const tick = data.tickers.find(
    //   (t) => t.base === baseCurrency && t.target === targetCurrency
    // );
    // const price = tick.last;
    //
    // tickerCacheSet({ BTCMINA: price });
    tickerCacheSet({ BTCMINA: null });
  } catch (e) {
    log.error("cache tick update failed", e);
  }
};
