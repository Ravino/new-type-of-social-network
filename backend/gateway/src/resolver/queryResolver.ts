import {Inject, Singleton} from 'typescript-ioc';
import {RequestProfileResolver} from './requestProfileResolver';
import {RequestChatResolver} from './requestChatResolver';
import {RequestMessageResolver} from '../resolver/requestMessageResolver';


@Singleton
export class QueryResolver {
  public constructor(
    @Inject public readonly requestProfileResolver: RequestProfileResolver,
    @Inject public readonly requestChatResolver: RequestChatResolver,
    @Inject public readonly requestMessageResolver: RequestMessageResolver
  ) {}
}
