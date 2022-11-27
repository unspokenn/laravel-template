<?php

Route::prefix('roles')->group(function () {
    Route::get('/', 'RolesController@index');
});
