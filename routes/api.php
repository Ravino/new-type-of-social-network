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

//Route::post('/auth/verify', 'Auth\RegisterController@verify')->name('verify_registration');
Auth::routes();


//Route::group(['middleware' => ['auth.jwt']], function () {
//    //
//
//    Route::resource('user', 'Api\ProfileController', ['only' => ['index', 'update']]);
//
//});
