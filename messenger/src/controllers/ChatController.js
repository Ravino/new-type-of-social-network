import ChatMessageRepository from '../models/repositories/ChatMessageRepository.js';
import ChatMessageAttachmentRepository from "../models/repositories/ChatMessageAttachmentRepository.js";

async function sendMessage(req, res) {
    let payload = {
        chat_id: req.body.chat_id,
        body: req.body.body,
        user_id: req.user.sub,
        parent_id: req.body.parent_id,
        parent_chat_id: req.body.parent_chat_id,
    }
    let message = await ChatMessageRepository.create(payload);
    if(req.body.attachments && req.body.attachments.length) {
        ChatMessageAttachmentRepository.attachToMessage(req.body.attachments, message.id)
    }
    res.send({
        data: {
            success: message.id
        }
    })
}

export default { sendMessage }
