import {feesCacheGet} from "@modules/cache";

export const queries = {
  estimatedFee: () => {
    return feesCacheGet();
  },
};
