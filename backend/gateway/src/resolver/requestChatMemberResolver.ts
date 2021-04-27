import {Inject, Singleton} from 'typescript-ioc';
import {ChatMemberView} from '../view/chatMemberView';
import {ChatMemberListView} from '../view/chatMemberListView';


@Singleton
export class RequestChatMemberResolver {

  public async getList(): Promise<ChatMemberListView> {
    return await this.createChatMemberList();
  }


  private async createChatMemberList(): Promise<ChatMemberListView> {

    const cursor: string = 'cursor';
    const count = async () => 1;
    const items = async () => [
      <ChatMemberView>{
        memberId: 1,
        displayName: 'Ivan Pupkin',
        avatar: '',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];


    const chatMemberListView: ChatMemberListView = new ChatMemberListView(
      cursor,
      count,
      items
    );


    return chatMemberListView;
  }
}
