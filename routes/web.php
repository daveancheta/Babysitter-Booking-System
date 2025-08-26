<?php

use App\Http\Controllers\BabysitterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\ReactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Babysitter/Index.tsx
    Route::get('/babysitter', [BabysitterController::class, 'index'])->name('babysitter.index');
    Route::post('/babysitter', [BabysitterController::class, 'store'])->name('babysitter.store');
    Route::post('/reaction', [ReactController::class, 'store'])->name('react.store');
    Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');

    // Parents/Index.tsx
    Route::get('/parent', [ParentController::class, 'index'])->name('parent.index');
    Route::post('/parent', [ParentController::class, 'store'])->name('booking.store');


    // Main
    Route::get('notification', [NotificationController::class, 'index'])->name('notification.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
