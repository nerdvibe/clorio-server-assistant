import {getHeight} from "@modules/nodeStat";
import {sendGraphqlError} from "../../../graphql/util";

export const queries = {
  nodeInfo: async () => {
    try {
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
    } catch(e) {
      sendGraphqlError(e)
    }
  },
};
