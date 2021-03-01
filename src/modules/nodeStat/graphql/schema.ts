import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type NodeInfo {
      height: Int
      name: String
      version: Int
      network: String
    }

  type Query {
    nodeInfo: NodeInfo
  }
`);
