<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChatTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('firstName')->nullable();
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });



        Schema::create('chat_party', function (Blueprint $table) {
            $table->foreignId('chat_id');
            $table->foreignId('user_id');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('chat_id')
                ->references('id')
                ->on('chat')
                ->onDelete('cascade');
        });


        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id');
            $table->foreignId('user_id');
            $table->text('body');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('chat_id')
                ->references('id')
                ->on('chat')
                ->onDelete('cascade');
        });

        /**
         * Что бы статус был для каждого юзера
         */
        Schema::create('chat_message_status', function (Blueprint $table) {
            $table->foreignId('message_id');
            $table->foreignId('user_id');
            $table->boolean('is_read')->default(false);

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('message_id')
                ->references('id')
                ->on('chat_messages')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chat_party');
        Schema::dropIfExists('chat_message_status');
        Schema::dropIfExists('chat_messages');
        Schema::dropIfExists('chat');
    }
}
