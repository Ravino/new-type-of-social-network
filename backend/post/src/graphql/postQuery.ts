import {Inject, Singleton} from "typescript-ioc";
import {PostRequestQuery} from "./postRequestQuery";


@Singleton
export class PostQuery {

  public constructor(
    @Inject public readonly requestQuery: PostRequestQuery
  ) {}
}
