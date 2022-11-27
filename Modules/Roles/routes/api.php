<?php

use Illuminate\Http\Request;

Route::middleware('auth:sanctum')->get('/roles', function (Request $request) {
    return $request->user();
});
