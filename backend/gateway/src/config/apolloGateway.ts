import path from "path";
import {readFileSync} from "fs";
import {ApolloServer, gql} from "apollo-server-express";
import {Container} from "typescript-ioc";
import { Application, Request } from 'express';
import {context} from './context';


import {QueryResolver} from '../resolver/queryResolver';
import {RequestProfileResolver} from '../resolver/requestProfileResolver';
import {RequestPostResolver} from '../resolver/requestPostResolver';
import {RequestCommentResolver} from '../resolver/requestCommentResolver';
import {RequestLikeResolver} from '../resolver/requestLikeResolver';
import {RequestShareResolver} from '../resolver/requestShareResolver';
import {RequestFrendResolver} from '../resolver/requestFrendResolver';


import {ProfileView} from '../view/profileView';
import {PostView} from '../view/postView';
import {CommentView} from '../view/commentView';
import {FrendView} from '../view/frendView';
import {MessageView} from '../view/messageView';

import {PostListView} from '../view/postListView';
import {CommentListView} from '../view/commentListView';
import {LikeListView} from '../view/likeListView';
import {ShareListView} from '../view/shareListView';
import {FrendListView} from '../view/frendListView';
import {ChatListView} from '../view/chatListView';
import {ChatMemberListView} from '../view/chatMemberListView';
import {MessageListView} from '../view/messageListView';


const pathSchema: string = path.join(__dirname, "../graphql/main.graphql");
const schemaContent: string = readFileSync(pathSchema, {encoding: 'utf8'});
const typeDefs = gql`${ schemaContent }`;


const resolvers = {
  Query: {
    requestProfile: () => Container.get(QueryResolver).requestProfileResolver
  },


  RequestProfile: {
    get: (parent: RequestProfileResolver) => parent.get()
  },


  Profile: {
    posts: (parent: ProfileView) => parent,
    frends: (parent: ProfileView) => parent,
    communities: (parent: ProfileView) => parent
  },


  Post: {
    likes: (parent: PostView) => parent,
    shares: (parent: PostView) => parent,
    comments: (parent: PostView) => parent
  },


  Comment: {
    likes: (parent: CommentView) => parent,
    shares: (parent: CommentView) => parent
  },


  RequestPost: {
    getList: () => Container.get(RequestPostResolver).getList()
  },


  RequestComment: {
    getList: () => Container.get(RequestCommentResolver).getList()
  },


  RequestLike: {
    getList: () => Container.get(RequestLikeResolver).getList()
  },


  RequestShare: {
    getList: () => Container.get(RequestShareResolver).getList()
  },


  RequestFrend: {
    getList: () => Container.get(RequestFrendResolver).getList()
  },


  PostList: {
    count: (parent: PostListView) => parent.count(),
    items: (parent: PostListView) => parent.items()
  },


  CommentList: {
    count: (parent: CommentListView) => parent.count(),
    items: (parent: CommentListView) => parent.items()
  },


  LikeList: {
    count: (parent: LikeListView) => parent.count(),
    items: (parent: LikeListView) => parent.items()
  },


  ShareList: {
    count: (parent: ShareListView) => parent.count(),
    items: (parent: ShareListView) => parent.items()
  },


  FrendList: {
    count: (parent: FrendListView) => parent.count(),
    items: (parent: FrendListView) => parent.items()
  },


  ChatList: {
    count: (parent: ChatListView) => parent.count(),
    items: (parent: ChatListView) => parent.items()
  },


  ChatMemberList: {
    count: (parent: ChatMemberListView) => parent.count(),
    items: (parent: ChatMemberListView) => parent.items()
  },


  MessageList: {
    count: (parent: MessageListView) => parent.count(),
    items: (parent: MessageListView) => parent.items()
  }
};


const apolloServer: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  tracing: true
});

export function apolloGatewayInitialization(app: Application) {
  apolloServer.applyMiddleware({
    app,
    path: "/graphql/gateway"
  });
}
