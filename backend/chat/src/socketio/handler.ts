export function preWorkMessage(data: any): any {

  const currentAt: number = Date.now();


  const result: any = {
    chatId: data.chatId,
    senderId: data.senderId,
    body: data.body,
    createdAt: currentAt,
    updatedAt: currentAt
  };


  return result;
}


export function postWorkMessage(data: any): any {

  const eventType: string = 'newMessage';


  const result: any = {
    data,
    eventType
  }


  return result;
}
