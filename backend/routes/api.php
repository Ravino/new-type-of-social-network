<?php

use App\Http\Controllers\Api\CommunityController;
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
        Route::post('dialogs/append', 'Api\ChatController@appendUserToChat');
        Route::post('open', 'Api\ChatController@open');
        Route::post('send', 'Api\ChatController@send');
        Route::post('message/user', 'Api\ChatController@sendToUser');
        Route::post('message/attachments', 'Api\ChatController@uploadAttachments');
        Route::delete('message/{id}', 'Api\ChatController@destroyMessage');
        Route::delete('{id}', 'Api\ChatController@destroyChat');
    });

    Route::get('posts', 'Api\PostController@index');
    Route::get('user/posts', 'Api\PostController@myPosts');
    Route::get('user/{id}/posts', [
        'middleware' => ['privacy.role:view_wall_permissions'],
        'uses' => 'Api\PostController@userPosts'
    ]);
    Route::post('posts/share/wall', 'Api\PostController@addToMyPosts');

    Route::get('posts/{id}', 'Api\PostController@get');
    Route::post('posts', 'Api\PostController@storeByUser');
    Route::post('communities/{community_id}/posts', 'Api\PostController@storeByCommunity');
    Route::post('posts/attachments', 'Api\PostController@uploadAttachments');
    Route::post('posts/rate', 'Api\PostController@rate');

    Route::get('user/friendship', 'Api\UserController@getMyFriendsList');
    Route::get('user/friendship/pending', 'Api\UserController@getMyPendingFriendsList');
    Route::get('user/{id}/friendship', ['middleware' => ['privacy.role:view_friends_permissions'], 'uses' => 'Api\UserController@getUserFriendsList']);
    Route::post('user/friendship', 'Api\UserController@sendFriendshipRequest');
    Route::post('user/friendship/accept', 'Api\UserController@acceptFriendshipRequest');
    Route::post('user/friendship/decline', 'Api\UserController@declineFriendshipRequest');
    Route::post('user/friendship/block', 'Api\UserController@blockFriendshipRequest');
    Route::delete('user/friendship/{id}', 'Api\UserController@removeFromFriends');
    Route::get('user/friendship/possible', 'Api\UserController@getPossibleFriends');
    Route::get('user/friendship/recommended', 'Api\UserController@getRecommendedFriends');
    Route::post('user/friendship/group', 'Api\UserController@addFriendToGroup');
    Route::delete('user/friendship/group/{group}/{userId}', 'Api\UserController@deleteFriendFromGroup');
    Route::get('user/friendship/group/{group}', 'Api\UserController@getFriendsFromGroup');

    /**
     * User Resource
     */
    Route::get('user/notifications', 'Api\UserController@notifications');
    Route::get('user/communities', 'Api\ProfileController@myCommunities');
    Route::get('owner/communities', 'Api\ProfileController@ownerCommunities');
    Route::get('user/{id}/communities', 'Api\ProfileController@userCommunities');
    Route::patch('user', 'Api\ProfileController@patch');
    Route::get('user/videos', 'Api\VideoController@getUserVideo');
    Route::resource('user', 'Api\ProfileController', ['only' => ['index', 'show']]);
    Route::post('user/profile/image', 'Api\ImageUploadController@upload');
    Route::patch('user/privacy', 'Api\UserPrivacySettingController@patch');
    Route::get('user/privacy/roles', 'Api\UserPrivacySettingController@roles');
    Route::get('user/search/{search}', 'Api\UserController@search');
    Route::post('user/blacklist', 'Api\UserBlacklistController@post');
    Route::delete('user/blacklist', 'Api\UserBlacklistController@delete');
    Route::post('/user/password/change', 'Auth\ChangePasswordController@changePassword');
    Route::patch('user/notifications/mark/read', 'Api\UserController@markNotificationsAsRead');

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
        Route::get('{id}/members', 'Api\CommunityController@members');
        Route::post('avatar', [CommunityController::class, 'uploadAvatar']);
        Route::post('header-image', [CommunityController::class, 'uploadHeaderImage']);
        Route::get('themes/list', 'Api\CommunityController@themeList');
    });
    Route::get('communities/{community_id}/posts', 'Api\PostController@communityPosts');

    Route::prefix('posts')->group(function () {
        Route::delete('{post}', 'Api\PostController@delete');
        Route::get('{post}/restore', 'Api\PostController@restore');
        Route::post('{post}/update', 'Api\PostController@update');
        Route::delete('{post}/attachment/{postAttachment}', 'Api\PostController@deleteImage');
    });

    Route::prefix('videos')->group(function () {
        Route::resource('/', 'Api\VideoController');
    });

    /**
     * Geo data Resource
     */
    Route::get('city/search', 'Api\GeoController@search');

    Route::post('/neo/user', 'Api\NeoController@create');
});

Route::get('login/{provider}', 'Auth\LoginController@redirectToProvider');
Route::get('login/{provider}/callback', 'Auth\LoginController@handleProviderCallback');

Route::post('sociallogin/{provider}', 'Auth\LoginController@socialLogin');

