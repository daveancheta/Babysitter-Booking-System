<?php

use App\Http\Controllers\BabysitterController;
use App\Http\Controllers\bookingsDoneController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\ReactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Babysitter/Index.tsx
    Route::get('/babysitter', [BabysitterController::class, 'index'])->name('babysitter.index');
    Route::post('/babysitter', [BabysitterController::class, 'store'])->name('babysitter.store');
    Route::delete('/delete/{id}', [BabysitterController::class, 'destroy'])->name('babysitter.delete');
    Route::delete('/deleteBooking/{id}', [BabysitterController::class, 'destroyBook'])->name('babysitter.deleteBooking');
    Route::post('/reaction', [ReactController::class, 'store'])->name('react.store');
    Route::delete('/reaction/{id}{postId}', [ReactController::class, 'destroy'])->name('react.delete');
    Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
    Route::get('/notification', [NotificationController::class, 'index'])->name('notification.index');
    Route::post('/action', [NotificationController::class, 'store'])->name('action.store');
    Route::post('/doneBookings', [bookingsDoneController::class, 'create'])->name('done.store');

    // Parents/Index.tsx
    Route::get('/parent', [ParentController::class, 'index'])->name('parent.index');
    Route::post('/parent', [ParentController::class, 'store'])->name('booking.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
