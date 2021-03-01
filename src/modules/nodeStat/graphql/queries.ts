import {getHeight} from "@modules/nodeStat";

export const queries = {
  nodeInfo: async (publicKey) => {
    const height = getHeight();
    const name = process.env.SERVER_NAME
    const version = process.env.SERVER_VERSION
    const network = process.env.NETWORK
    return {
      height,
      name,
      version,
      network
    };
  },
};
