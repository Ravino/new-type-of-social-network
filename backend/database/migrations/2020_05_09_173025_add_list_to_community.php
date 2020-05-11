<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddListToCommunity extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('communities', static function (Blueprint $table) {
            $table->smallInteger('type');
            $table->integer('theme_id');
            $table->smallInteger('privacy');

            $table->foreign('theme_id')
                ->references('id')
                ->on('community_themes')
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
        Schema::table('communities', static function (Blueprint $table) {
            $table->dropColumn(['type', 'theme_id', 'privacy']);
        });
    }
}
