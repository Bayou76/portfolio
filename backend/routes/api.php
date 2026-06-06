<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\FormationController;
use App\Http\Controllers\Api\MessageController;

// Auth
Route::post('/login', [AuthController::class, 'login']);

// Lecture publique
Route::get('/projects',           [ProjectController::class,    'index']);
Route::get('/projects/{project}', [ProjectController::class,    'show']);
Route::get('/experiences',        [ExperienceController::class, 'index']);
Route::get('/skills',             [SkillController::class,      'index']);
Route::get('/formations',         [FormationController::class,  'index']);
Route::post('/messages',          [MessageController::class,    'store']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    Route::apiResource('projects',    ProjectController::class)->except(['index', 'show']);
    Route::apiResource('experiences', ExperienceController::class)->except(['index']);
    Route::apiResource('skills',      SkillController::class)->except(['index']);
    Route::apiResource('formations',  FormationController::class)->except(['index']);

    Route::get('/messages',              [MessageController::class, 'index']);
    Route::get('/messages/{message}',    [MessageController::class, 'show']);
    Route::delete('/messages/{message}', [MessageController::class, 'destroy']);
});