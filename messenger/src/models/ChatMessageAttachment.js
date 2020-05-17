import mongoose from 'mongoose'

const { Schema } = mongoose

const schema = new Schema({
    size: { type: Number },
    original_name: { type: String },
    path: { type: String },
    image_normal_path: { type: String },
    image_medium_path: { type: String },
    image_thumb_path: { type: String },
    mime_type: { type: String },
    image_normal_width: { type: Number },
    image_normal_height: { type: Number },
    image_thumb_width: { type: Number },
    image_thumb_height: { type: Number },
    image_medium_width: { type: Number },
    image_medium_height: { type: Number },
    image_original_width: { type: Number },
    image_original_height: { type: Number },
    chat_message_id: { type: String }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

const ChatMessageAttachment = mongoose.model('chat_message_attachments', schema)
export default ChatMessageAttachment
