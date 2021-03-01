import { heightCacheSet } from "../cache";
import { logger } from "@modules/log";
import { stats as statsQuery } from "@modules/graphqlProxy/";

const log = logger("HEIGHT_SET_HEIGHT");

export const setHeight = async () => {
  try {
    const height = await statsQuery();

    heightCacheSet(height);
  } catch (e) {
    log.error("cache height update failed", e);
  }
};
