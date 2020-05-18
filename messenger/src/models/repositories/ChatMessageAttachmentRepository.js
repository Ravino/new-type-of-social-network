import ChatMessageAttachment from '../ChatMessageAttachment.js';

class ChatMessageAttachmentRepository {

    constructor(model) {
        this.model = model;
    }

    attachToMessage(attachment_ids, message_id) {
        return this.model.find().where('_id').in(attachment_ids).update({chat_message_id: message_id});
    }
}

export default new ChatMessageAttachmentRepository(ChatMessageAttachment);
