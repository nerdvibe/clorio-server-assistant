import { buildSchema } from "graphql";

export const schema = buildSchema(`
  input SignatureInput {
    # Raw encoded signature
    rawSignature: String
    # Scalar component of signature
    scalar: String
    # Field component of signature
    field: String
  }
  
  input SendPaymentInput {
    # Should only be set when cancelling transactions, otherwise a nonce is determined
    # automatically
    nonce: String
    # Short arbitrary message provided by the sender
    memo: String
    # The global slot number after which this transaction cannot be applied
    validUntil: String
    # Fee amount in order to send payment
    fee: String!
    # Amount of coda to send to to receiver
    amount: String!
    # Token to send
    token: String
    # Public key of recipient of payment
    to: String!
    # Public key of sender of payment
    from: String!
  }
  
  input SendDelegationInput {
    # Should only be set when cancelling transactions, otherwise a nonce is determined
    # automatically
    nonce: String
    # Short arbitrary message provided by the sender
    memo: String
    # The global slot number after which this transaction cannot be applied
    validUntil: String
    # Fee amount in order to send a stake delegation
    fee: String!
    # Public key of the account being delegated to
    to: String!
    # Public key of sender of a stake delegation
    from: String!
  }
  
  type SourceReceiver {
    publicKey: String
  }
  
  type BroadcastTransaction {
    id: String
    nonce: Int
    amount: String
    source: SourceReceiver
    receiver: SourceReceiver
    fee: String
  }
  
  type BroadcastDelegation {
    id: String
  }
  
  type MempoolElement {
    id: String
    fee: String
    feeToken: String
    kind: String
    amount: String
    nonce: String
    source: SourceReceiver
    receiver: SourceReceiver
  }
  
  type Query {
    # this query is a workaround for schema stitching with only mutations
    mempool(publicKey: String!): [MempoolElement]
  }

  type Mutation {
    broadcastTransaction(signature: SignatureInput, input: SendPaymentInput!): BroadcastTransaction!
    broadcastDelegation(signature: SignatureInput, input: SendDelegationInput!): BroadcastDelegation!
  }
`);
