import path from "path";
import {readFileSync} from "fs";
import {ApolloServer, gql} from "apollo-server-express";
import {Container} from "typescript-ioc";
import { Application } from 'express';


const pathSchema: string = path.join(__dirname, "../graphql/post.graphql");
const schemaContent: string = readFileSync(pathSchema, "utf8");
const typeDefs = gql`${ schemaContent }`;


const resolvers = {};


const apolloServer: ApolloServer = new ApolloServer({ typeDefs, resolvers });

export function apolloPostInitialization(app: Application) {
  apolloServer.applyMiddleware({
    app,
    path: "/post"
  });
}
