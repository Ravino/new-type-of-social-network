import ChatMessage from '../ChatMessage.js';

class ChatMessageRepository {

    constructor(model) {
        this.model = model;
    }

    create(object) {
        return this.model.create(object);
    }
}

export default new ChatMessageRepository(ChatMessage);
