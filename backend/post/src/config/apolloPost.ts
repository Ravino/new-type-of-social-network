import path from "path";
import {readFileSync} from "fs";
import {ApolloServer, gql} from "apollo-server-express";
import {Container} from "typescript-ioc";
import { Application } from 'express';
import {PostQuery} from '../graphql/postQuery';
import {PostRequestQuery} from '../graphql/postRequestQuery';
import {ResolverComment} from '../resolver/resolverComment';
import {PostRequestView} from '../view/postRequestView';


const pathSchema: string = path.join(__dirname, "../graphql/post.graphql");
const schemaContent: string = readFileSync(pathSchema, "utf8");
const typeDefs = gql`${ schemaContent }`;


const resolvers = {

  Query: {
    requestQuery: () => Container.get(PostQuery).requestQuery
  },


  RequestQuery: {
    get: (parent: PostRequestQuery, args: {postId: string}) => parent.get(args.postId),
    requests: (parent: PostRequestQuery, args: {size: number, textSearch: string}) => parent.requests(args.size, args.textSearch),
    select: (parent: PostRequestQuery, args: {offset: number, cursor: string}) => parent.select(args.offset, args.cursor)
  },


  Request: {
    comments: (parent: PostRequestView, args: {offset: number, cursor: string}) => Container.get(ResolverComment).common(parent?.postId, args.offset, args.cursor)
  }
};



const apolloServer: ApolloServer = new ApolloServer({ typeDefs, resolvers });

export function apolloPostInitialization(app: Application) {
  apolloServer.applyMiddleware({
    app,
    path: "/post"
  });
}
