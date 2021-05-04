export function preWorkMessage(data: any): any {

  const currentAt: number = Date.now();


  const message: any = {
    chatId: data.chatId,
    body: data.body,
    createdAt: currentAt,
    updatedAt: currentAt
  };


  return message;
}


export function postWorkMessage(data: any): any {

  const eventType: string = 'newMessage';;


  const message: any = {
    data,
    eventType
  };


  return message;
}
