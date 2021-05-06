\set language sql
CREATE TABLE chats (chat_id UNSIGNED UNIQUE NOT NULL primary key autoincrement, display_name TEXT NOT NULL, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, avatar TEXT NOT NULL, uuid TEXT NOT NULL, last_message_id UNSIGNED, riveted_message_id UNSIGNED)
