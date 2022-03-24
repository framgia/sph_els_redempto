<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\AttemptController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\WordController;
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


Route::prefix('categories')->group(function() {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{category:slug}', [CategoryController::class, 'showCategoryBySlug']);
    Route::get('/{category:slug}/words', [WordController::class, 'getWordsBySlug']);
});

Route::prefix('words')->group(function() {
    Route::get('/', [WordController::class, 'index']);
    Route::get('/{word}', [WordController::class, 'show']);
});

Route::prefix('attempts')->group(function() {
    Route::get('/', [AttemptController::class, 'index']);
    Route::get('/{attempt}', [AttemptController::class, 'show']);
    Route::get('/{attempt}/answers', [AnswerController::class, 'getAnswersByAttempt']);
    Route::get('/{attempt}/answers/{wordId}', [AnswerController::class, 'getAnswerByAttemptAndWord']);
});

Route::prefix('answers')->group(function() {
    Route::get('/', [AnswerController::class, 'index']);
    Route::get('/{answer}/category', [AnswerController::class, 'getCategory']);
});

Route::prefix('users')->group(function() {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{userId}', [UserController::class, 'show']);
    Route::get('/{userId}/attempts', [AttemptController::class, 'getAttemptsByUser']);
    Route::get('/{userId}/answers', [AnswerController::class, 'getAnswersByUser']);
    Route::get('/{userId}/attempts/{category:slug}', [AttemptController::class, 'getAttemptBySlugAndId']);
    Route::get('/{userId}/followings/attempts', [AttemptController::class, 'getAttemptsByFollowings']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::prefix('categories')->group(function() {
        Route::post('/', [CategoryController::class, 'store']);
        Route::put('/{category:slug}', [CategoryController::class, 'updateCategoryBySlug']);
        Route::delete('/{category:slug}', [CategoryController::class, 'destroyCategoryBySlug']);
    });
    
    Route::prefix('words')->group(function() {
        Route::post('/', [WordController::class, 'store']);
        Route::put('/{word}', [WordController::class, 'update']);
        Route::delete('/{word}', [WordController::class, 'destroy']);
    });

    Route::prefix('attempts')->group(function() {
        Route::post('/', [AttemptController::class, 'store']);
        Route::put('/{attempt}', [AttemptController::class, 'store']);
        Route::delete('/{attempt}', [AttemptController::class, 'destroy']);
    });

    Route::prefix('answers')->group(function() {
        Route::post('/', [AnswerController::class, 'store']);
        Route::delete('/{answer}', [AnswerController::class, 'destroy']);
    });
    
    Route::prefix('followers')->group(function() {
        Route::post('/', [FollowerController::class, 'store']);
        Route::delete('/{userId}/{followingId}', [FollowerController::class, 'destroy']);
    });

    Route::prefix('users')->group(function() {
        Route::post('/{user}', [UserController::class, 'update']);
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});
