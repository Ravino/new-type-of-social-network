\set language sql
CREATE TABLE posts (post_id UNSIGNED UNIQUE NOT NULL primary key autoincrement, author_id UNSIGNED NOT NULL, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, body TEXT NOT NULL, scope TEXT NOT NULL, uuid text NOT NULL)
