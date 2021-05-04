\set language sql
CREATE TABLE messages (message_id UNSIGNED UNIQUE NOT NULL primary key autoincrement, chat_id UNSIGNED NOT NULL, sender_id UNSIGNED not null, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, body TEXT NOT NULL, uuid text NOT NULL, confirmed BOOLEAN, vkontakte_profile_id UNSIGNED UNIQUE)
