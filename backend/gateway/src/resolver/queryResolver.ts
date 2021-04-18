import {Inject, Singleton} from 'typescript-ioc';
import {RequestProfileResolver} from './requestProfileResolver';


@Singleton
export class QueryResolver {
  public constructor(
    @Inject public readonly requestProfileResolver: RequestProfileResolver
  ) {}
}
