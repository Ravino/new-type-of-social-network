\set language sql
CREATE TABLE chats (chat_id UNSIGNED UNIQUE NOT NULL primary key autoincrement, display_name TEXT NOT NULL, owner_id UNSIGNED NOT NULL, last_message_id UNSIGNED NOT NULL, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, avatar TEXT NOT NULL, uuid TEXT NOT NULL)
