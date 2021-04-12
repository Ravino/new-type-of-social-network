import {Inject, Singleton} from "typescript-ioc";
import {PostRequestMutation} from "./postRequestMutation";


@Singleton
export class PostMutation {

  public constructor(
    @Inject public readonly requestMutation: PostRequestMutation
  ) {}
}
