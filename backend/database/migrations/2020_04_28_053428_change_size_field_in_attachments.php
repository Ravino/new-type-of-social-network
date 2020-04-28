<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeSizeFieldInAttachments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('post_attachments', function (Blueprint $table) {
            $table->integer('size')->default(0)->change();
        });
        Schema::table('chat_message_attachments', function (Blueprint $table) {
            $table->integer('size')->default(0)->change();
        });
        Schema::table('image_uploads', function (Blueprint $table) {
            $table->integer('size')->default(0)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('post_attachments', function (Blueprint $table) {
            $table->double('size', 8, 2)->default(0);
        });
        Schema::table('chat_message_attachments', function (Blueprint $table) {
            $table->double('size', 8, 2)->default(0);
        });
        Schema::table('image_uploads', function (Blueprint $table) {
            $table->double('size', 8, 2)->default(0);
        });
    }
}
