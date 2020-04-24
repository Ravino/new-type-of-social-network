<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TriggerForUpdateLastDialogMessage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared('
            drop trigger if exists new_message_in_messages_update;
            create trigger new_message_in_messages_update after update on chat_messages
                for each row
            BEGIN
                SELECT user_id, body, updated_at, chat_id INTO @user_id, @body, @updated_at, @chat_id FROM chat_messages WHERE chat_id = new.chat_id and deleted_at is null order by id desc limit 1;
                update chat set last_user_id = @user_id, last_message_body = @body, last_message_time = @updated_at where id = @chat_id;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER `new_message_in_messages_update`');
        DB::unprepared('
            create trigger new_message_in_messages_update after update on chat_messages
            for each row
            BEGIN
                update chat set last_user_id = new.user_id, last_message_body = new.body, last_message_time = new.updated_at WHERE id = new.chat_id;
            END
        ');
    }
}
