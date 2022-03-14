<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category:slug}', [CategoryController::class, 'showCategoryBySlug']);
Route::get('/categories/{category:slug}/words', [WordController::class, 'getWordsBySlug']);

Route::get('/words', [WordController::class, 'index']);
Route::get('/words/{word}', [WordController::class, 'show']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category:slug}', [CategoryController::class, 'updateCategoryBySlug']);
    Route::delete('categories/{category:slug}', [CategoryController::class, 'destroyCategoryBySlug']);

    Route::post('/words', [WordController::class, 'store']);
    Route::put('/words/{word}', [WordController::class, 'update']);
    Route::delete('/words/{word}', [WordController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
