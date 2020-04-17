<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterChatMessageAttachmentsTableMakeMessageIdNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('chat_message_attachments', function (Blueprint $table) {
            $table->foreignId('message_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('chat_message_attachments', function (Blueprint $table) {
            $table->foreignId('message_id')->change();
        });
    }
}
