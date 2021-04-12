import path from "path";
import {readFileSync} from "fs";
import {ApolloServer, gql} from "apollo-server-express";
import {Container} from "typescript-ioc";
import { Application } from 'express';
import {PostQuery} from '../graphql/postQuery';
import {PostMutation} from '../graphql/postMutation';
import {PostRequestQuery} from '../graphql/postRequestQuery';
import {PostRequestMutation} from '../graphql/postRequestMutation';
import {ResolverComment} from '../resolver/resolverComment';
import {PostRequestView} from '../view/postRequestView';


const pathSchema: string = path.join(__dirname, "../graphql/post.graphql");
const schemaContent: string = readFileSync(pathSchema, "utf8");
const typeDefs = gql`${ schemaContent }`;


const resolvers = {

  Query: {
    requestQuery: () => Container.get(PostQuery).requestQuery
  },


  Mutation: {
    requestMutation: () => Container.get(PostMutation).requestMutation
  },


  RequestQuery: {
    get: (parent: PostRequestQuery, args: {postId: string}) => parent.get(args.postId),
    requests: (parent: PostRequestQuery, args: {size: number, textSearch: string}) => parent.requests(args.size, args.textSearch),
    select: (parent: PostRequestQuery, args: {offset: number, cursor: string}) => parent.select(args.offset, args.cursor)
  },


  RequestMutation: {
    create: (parent: PostRequestMutation, args: { body: string}) => parent.create(args.body),
    update: (parent: PostRequestMutation, args: {postId: number, body: string}) => parent.update(args.postId, args.body),
    delete: (parent: PostRequestMutation, args: {postId: number}) => parent.delete(args.postId)
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
