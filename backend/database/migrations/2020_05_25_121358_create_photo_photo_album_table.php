<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotoPhotoAlbumTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photo_photo_album', function (Blueprint $table) {
            $table->unsignedBigInteger('photo_album_id');
            $table->unsignedBigInteger('photo_id');
            $table->integer('updated_at')->default(time());
            $table->integer('created_at')->default(time());

            $table->foreign('photo_album_id')
                ->references('id')
                ->on('photo_albums')
                ->onDelete('cascade');
            $table->foreign('photo_id')
                ->references('id')
                ->on('photos')
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
        Schema::dropIfExists('photo_photo_album');
    }
}
