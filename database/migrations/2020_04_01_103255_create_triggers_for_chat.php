<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTriggersForChat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chat', function (Blueprint $table) {
            $table->dropColumn(['created_at', 'updated_at']);
            $table->foreignId('last_user_id')->nullable();
            $table->string('last_message_body')->nullable();
            $table->integer('last_message_time')->nullable();
            $table->boolean('last_is_read')->default(false);
        });
        Schema::table('chat', function (Blueprint $table){
            $table->integer('created_at');
            $table->integer('updated_at');
        });

        Schema::table('chat_messages', function (Blueprint $table){
            $table->dropColumn(['created_at', 'updated_at']);
        });
        Schema::table('chat_messages', function (Blueprint $table){
            $table->integer('created_at');
            $table->integer('updated_at');
        });
        Schema::table('chat_party', function (Blueprint $table){
            $table->dropColumn(['created_at', 'updated_at']);
        });
        Schema::table('chat_party', function (Blueprint $table){
            $table->integer('created_at');
        });

        DB::unprepared('
            create trigger new_message_in_messages_insert after insert on chat_messages
            for each row
            BEGIN
                update chat set last_user_id = new.user_id, last_message_body = new.body, last_message_time = new.created_at WHERE id = new.chat_id;
            END
        ');

        DB::unprepared('
            create trigger new_message_in_messages_update after update on chat_messages
            for each row
            BEGIN
                update chat set last_user_id = new.user_id, last_message_body = new.body, last_message_time = new.updated_at WHERE id = new.chat_id;
            END
        ');

        DB::unprepared('
            create trigger new_status_in_messages_insert after insert on chat_message_status
            for each row
            BEGIN
                update chat set last_is_read = new.is_read WHERE id = (SELECT chat_id FROM chat_messages WHERE id = new.message_id);
            END
        ');

        DB::unprepared('
            create trigger new_status_in_messages_update after update on chat_message_status
            for each row
            BEGIN
                update chat set last_is_read = new.is_read WHERE id = (SELECT chat_id FROM chat_messages WHERE id = new.message_id);
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
        DB::unprepared('DROP TRIGGER `new_message_in_messages_insert`');
        DB::unprepared('DROP TRIGGER `new_message_in_messages_update`');
        DB::unprepared('DROP TRIGGER `new_status_in_messages_insert`');
        DB::unprepared('DROP TRIGGER `new_status_in_messages_update`');
    }
}
