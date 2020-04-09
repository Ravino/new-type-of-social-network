<?php

Route::post('login', 'App\Http\Controllers\Admin\LoginController@authenticate');

Route::get('login', ['as' => 'admin.login', function () {
    $content = view('admin/login')->toHtml();
    return AdminSection::view($content, 'Login');
}]);

Route::get('', ['as' => 'admin.dashboard', function () {
	$content = 'Define your dashboard here.';
	return AdminSection::view($content, 'Dashboard');
}]);

Route::get('information', ['as' => 'admin.information', function () {
	$content = 'Define your information here.';
	return AdminSection::view($content, 'Information');
}]);
