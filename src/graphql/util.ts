import {ApolloError} from "apollo-server";

export const sendGraphqlError = (error: Error, code: string = '500') => {
    const errorMessage = error.message.split(/error: /i)[1] || 'Unknown error'
    if(errorMessage === 'Unknown error') {
        console.log(error.message);
    }
    throw new ApolloError(errorMessage, code)
}
