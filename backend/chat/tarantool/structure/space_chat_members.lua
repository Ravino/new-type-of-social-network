\set language sql
CREATE TABLE chat_members (chat_member_id UNSIGNED UNIQUE NOT NULL primary key autoincrement, chat_id UNSIGNED NOT NULL, participant_id UNSIGNED NOT NULL, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, role TEXT NOT NULL, uuid TEXT NOT NULL)
