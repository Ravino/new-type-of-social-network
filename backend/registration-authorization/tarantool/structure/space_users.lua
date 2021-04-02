\set language sql
CREATE TABLE users (user_id UNSIGNED UNIQUE NOT NULL primary key autoincrement, email varchar(100) UNIQUE, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, firstname VARCHAR(100) NOT NULL, lastname VARCHAR(100) NOT NULL, display_name VARCHAR(200) NOT NULL, password TEXT NOT NULL, uuid text NOT NULL, confirmed BOOLEAN, vkontakte_profile_id UNSIGNED UNIQUE)
