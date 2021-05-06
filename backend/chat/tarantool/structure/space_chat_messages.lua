\set language sql
CREATE TABLE chat_messages (chat_message_id UNSIGNED UNIQUE NOT NULL primary key autoincrement, chat_id UNSIGNED NOT NULL, sender_id UNSIGNED not null, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, body TEXT NOT NULL, uuid text NOT NULL, sended BOOLEAN NOT NULL, delivered BOOLEAN NOT NULL, readed BOOLEAN NOT NULL, readed_notification BOOLEAN NOT NULL)
