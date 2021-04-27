import {Inject, Singleton} from 'typescript-ioc';
import {RequestProfileResolver} from './requestProfileResolver';
import {RequestChatResolver} from './requestChatResolver';


@Singleton
export class QueryResolver {
  public constructor(
    @Inject public readonly requestProfileResolver: RequestProfileResolver,
    @Inject public readonly requestChatResolver: RequestChatResolver
  ) {}
}
