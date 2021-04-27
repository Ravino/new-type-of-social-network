import {Inject, Singleton} from 'typescript-ioc';
import {ChatView} from '../view/chatView';
import {ChatListView} from '../view/chatListView';
import {MessageView} from '../view/messageView';


@Singleton
export class RequestChatResolver {

  public async getList(): Promise<ChatListView> {
    return await this.createChatList();
  }


  private async createChatList(): Promise<ChatListView> {

    const cursor: string = 'cursor';
    const count = async () => 1;
    const items = async () => [
      <ChatView>{
        chatId: 1,
        ownerId: 1,
        displayName: 'Chat groups',
        lastMessage: <MessageView>{
          messageId: 1,
          displayName: 'Vasya Ivanov',
          body: 'Klenin faggot',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];


    const chatListView: ChatListView = new ChatListView(
      cursor,
      count,
      items
    );


    return chatListView;
  }
}
