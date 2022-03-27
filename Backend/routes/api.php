<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\singleUpdateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::resource('/client', ClientController::class);
Route::post('/client/reg', [AuthController::class, 'login']);
Route::post('/client/sig/{id}', [singleUpdateController::class,"index"]);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});