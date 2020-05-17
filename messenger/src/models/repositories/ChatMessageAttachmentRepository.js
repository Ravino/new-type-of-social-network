import ChatMessageAttachment from '../ChatMessageAttachment';

class ChatMessageAttachmentRepository {

    constructor(model) {
        this.model = model;
    }

    async attachToMessage(attachment_ids, message_id) {
        return this.model.find().where('_id').in(attachment_ids).update({chat_message_id: message_id});
    }
}

export default new ChatMessageAttachmentRepository(ChatMessageAttachment);
