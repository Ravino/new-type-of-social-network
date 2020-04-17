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

Route::group(['middleware' => ['auth.jwt', 'track.activity']], function () {

    Route::prefix('chat')->group(function(){
        Route::get('dialogs', 'Api\ChatController@dialogs');
        Route::get('messages/{chat_id}', 'Api\ChatController@messages');
        Route::post('send', 'Api\ChatController@send');
        Route::post('message/user', 'Api\ChatController@sendToUser');
    });

    Route::get('posts', 'Api\PostController@index');
    Route::get('user/posts', 'Api\PostController@myPosts');
    Route::get('user/{id}/posts', [
        'middleware' => ['privacy.role:view_wall_permissions'],
        'uses' => 'Api\PostController@userPosts'
    ]);
    Route::get('communities/{community_id}/posts', 'Api\PostController@communityPosts');
    Route::get('posts/{id}', 'Api\PostController@get');
    Route::post('posts', 'Api\PostController@storeByUser');
    Route::post('communities/{community_id}/posts', 'Api\PostController@storeByCommunity');

    Route::get('user/notifications', 'Api\UserController@notifications');
    Route::get('user/friendship', 'Api\UserController@getMyFriendsList');
    Route::get('user/friendship/pending', 'Api\UserController@getMyPendingFriendsList');
    Route::get('user/{id}/friendship', [
        'middleware' => ['privacy.role:view_friends_permissions'],
        'uses' => 'Api\UserController@getUserFriendsList'
    ]);
    Route::post('user/friendship', 'Api\UserController@sendFriendshipRequest');
    Route::post('user/friendship/accept', 'Api\UserController@acceptFriendshipRequest');
    Route::post('user/friendship/decline', 'Api\UserController@declineFriendshipRequest');
    Route::post('user/friendship/block', 'Api\UserController@blockFriendshipRequest');

    /**
     * User Resource
     */
    Route::get('user/communities', 'Api\ProfileController@communities');
    Route::patch('user', 'Api\ProfileController@patch');
    Route::resource('user', 'Api\ProfileController', ['only' => ['index', 'show']]);
    Route::post('user/profile/image', 'Api\ImageUploadController@upload');
    Route::patch('user/privacy', 'Api\UserPrivacySettingController@patch');
    Route::get('user/search/{search}', 'Api\UserController@search');
    Route::post('user/blacklist', 'Api\UserBlacklistController@post');
    Route::delete('user/blacklist', 'Api\UserBlacklistController@delete');

    /**
     * Communities Resource
     */
    Route::prefix('communities')->group(function(){
        Route::patch('{id}', 'Api\CommunityController@update');
        Route::post('', 'Api\CommunityController@store');
        Route::get('', 'Api\CommunityController@index');
        Route::get('{id}', 'Api\CommunityController@get');
        Route::get('{id}/subscribe', 'Api\CommunityController@subscribe');
        Route::get('{id}/unsubscribe', 'Api\CommunityController@unsubscribe');
    });

    /**
     * Geo data Resource
     */
    Route::get('city/search', 'Api\GeoController@search');
});

Route::get('login/{provider}', 'Auth\LoginController@redirectToProvider');
Route::get('login/{provider}/callback', 'Auth\LoginController@handleProviderCallback');

Route::post('sociallogin/{provider}', 'Auth\LoginController@socialLogin');

