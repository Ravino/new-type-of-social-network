import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
    chat_id: {
        type: String
    },
    body: {
        type: String
    },
    user_id: {
        type: String
    },
    parent_id: {
        type: String
    },
    parent_chat_id: {
        type: String
    },
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const ChatMessage = mongoose.model('chat_messages', schema);
export default ChatMessage;
