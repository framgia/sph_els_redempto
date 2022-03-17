<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\AttemptController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WordController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\UserController;

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

Route::get('/attempts', [AttemptController::class, 'index']);
Route::get('/attempts/{attempt}', [AttemptController::class, 'show']);
Route::get('/attempts/{attempt}/answers', [AnswerController::class, 'getAnswersByAttempt']);
Route::get('/attempts/{attempt}/answers/{wordId}', [AnswerController::class, 'getAnswerByAttemptAndWord']);

Route::get('/answers', [AnswerController::class, 'index']);
Route::get('/answers/{answer}/category', [AnswerController::class, 'getCategory']);

Route::get('/users/{userId}', [UserController::class, 'show']);
Route::get('/users/{userId}/attempts', [AttemptController::class, 'getAttemptsByUser']);
Route::get('/users/{userId}/attempts/{category:slug}', [AttemptController::class, 'getAttemptBySlugAndId']);

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

    Route::post('/attempts', [AttemptController::class, 'store']);
    Route::put('/attempts/{attempt}', [AttemptController::class, 'store']);
    Route::delete('/attempts/{attempt}', [AttemptController::class, 'destroy']);

    Route::post('/answers', [AnswerController::class, 'store']);
    Route::delete('/answers/{answer}', [AnswerController::class, 'destroy']);
    
    Route::post('followers', [FollowerController::class, 'store']);
    Route::delete('followers/{userId}/{followingId}', [FollowerController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
