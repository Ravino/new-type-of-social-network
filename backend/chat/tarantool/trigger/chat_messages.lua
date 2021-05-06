\set language sql

CREATE TRIGGER update_chats_from_chat_messages_by_insert AFTER INSERT ON chat_messages FOR EACH ROW BEGIN UPDATE chats SET last_message_id=(SELECT chat_message_id FROM chat_messages WHERE uuid=NEW.uuid ORDER BY chat_message_id DESC LIMIT 1) WHERE chat_id=NEW.chat_id; END;
