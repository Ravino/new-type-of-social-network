<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API router for your application. These
| router are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::post('/auth/verify', 'Auth\RegisterController@verify')->firstName('verify_registration');
Auth::routes();

Route::group(['middleware' => ['auth.jwt']], function () {

    Route::patch('user', 'Api\ProfileController@patch');
    Route::resource('user', 'Api\ProfileController', ['only' => ['index']]);

});
Route::prefix('chat')->group(function(){
    Route::get('dialogs', 'Api\ChatController@dialogs');
    Route::get('messages/{chat_id}', 'Api\ChatController@messages');
    Route::post('send', 'Api\ChatController@send');
});

Route::get('login/{provider}', 'Auth\LoginController@redirectToProvider');
Route::get('login/{provider}/callback', 'Auth\LoginController@handleProviderCallback');

Route::post('sociallogin/{provider}', 'Auth\LoginController@socialLogin');
