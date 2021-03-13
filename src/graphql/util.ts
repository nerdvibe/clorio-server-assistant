import {ApolloError} from "apollo-server";

export const sendGraphqlError = (error: Error, code: string = '500') => {
    const errorMessage = error.message.split('Error: ')[1] || 'Unknown error'
    throw new ApolloError(errorMessage, code)
}
