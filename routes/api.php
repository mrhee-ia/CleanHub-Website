<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\JobApplicationController;

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

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/jobs/store', [ListingController::class, 'store']);
    Route::get('/jobs/user-posts', [ListingController::class, 'manage_posts']);
    Route::put('/jobs/{id}/update', [ListingController::class, 'update']);
    Route::post('/jobs/{id}/apply', [JobApplicationController::class, 'apply_job']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);


Route::get('/jobs', [ListingController::class, 'index']);
Route::get('/jobs/{id}', [ListingController::class, 'show']);

