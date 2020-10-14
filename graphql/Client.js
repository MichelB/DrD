import { ApolloClient,ApolloLink} from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { RestLink } from 'apollo-link-rest'
import schema from '../schema.json'
import { createHttpLink } from "apollo-link-http";

export const client = new ApolloClient({
    link: createHttpLink({ uri: "https://ddapi.production.dietdoctor.com/v1" }),
    cache: new InMemoryCache(),
     serialize: false,
     typeDefs:schema
})



  