<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ListingController;
use App\Http\Controllers\Api\HelpRequestController;
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

Route::middleware('auth:sanctum', 'isAdmin')->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index']);
    Route::get('/admin/manage-posts', [AdminController::class, 'managePosts']);
    Route::put('/admin/approve-post/{id}', [AdminController::class, 'approvePost']);
    Route::post('/admin/deny-post/{id}', [AdminController::class, 'denyPost']);
    Route::delete('/admin/delete-post/{id}', [AdminController::class, 'deletePost']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::put('/user/update', [AuthController::class, 'update']);
    Route::put('/user/profile-picture', [AuthController::class, 'updateProfilePicture']);

    Route::get('/user/saved-jobs', [ListingController::class, 'saved_jobs']);
    Route::put('/user/save-job', [ListingController::class, 'save_job']);

    Route::post('/jobs/store', [ListingController::class, 'store']);
    Route::get('/jobs/user-posts', [ListingController::class, 'manage_posts']);
    Route::put('/jobs/{id}/update', [ListingController::class, 'update']);
    Route::patch('/jobs/{id}/update-status', [ListingController::class, 'update_status']);
    Route::post('/jobs/{id}/apply', [JobApplicationController::class, 'apply_job']);
    Route::get('jobs/applications', [JobApplicationController::class, 'applications']);
    Route::get('jobs/{jobID}/applicants', [JobApplicationController::class, 'applicants']);
    Route::post('/jobs/{jobID}/choose-applicants', [JobApplicationController::class, 'choose_applicants']);
    Route::get('/jobs/{jobID}/chosen-applicants', [JobApplicationController::class, 'chosen_applicants']);
    Route::post('/jobs/{jobID}/rate-applicants', [JobApplicationController::class, 'rate_applicants']);
    Route::get('/jobs/{jobID}/rated-applicants', [JobApplicationController::class, 'rated_applicants']);
    Route::get('/notifications', [JobApplicationController::class, 'notifications']);
    Route::get('/history', [JobApplicationController::class, 'history']);

    Route::post('/help-requests', [HelpRequestController::class, 'store']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);


Route::get('/jobs', [ListingController::class, 'index']);
Route::get('/jobs/{id}', [ListingController::class, 'show']);

