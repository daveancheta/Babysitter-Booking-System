<?php

use App\Http\Controllers\AddBalanceController;
use App\Http\Controllers\BabysitterController;
use App\Http\Controllers\bookingsDoneController;
use App\Http\Controllers\CancelledBookingsController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DoneBookingsController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\ReactController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Main/welcome');
})->name('home');

Route::get('login', function () {
    return Inertia::render('auth/login');
})->name('login');

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
    Route::post('/doneBookings', [DoneBookingsController::class, 'create'])->name('done.store');
    Route::post('/cancelledBookings', [CancelledBookingsController::class, 'create'])->name('cancelled.store');
    Route::post('/follow', [FollowController::class, 'store'])->name('follow.store');
    Route::post('/followProfileStore', [FollowController::class, 'followProfileStore'])->name('follow_profile.store');
    Route::post('/followProfileStoreSearch', [FollowController::class, 'followProfileStoreSearch'])->name('follow_profile_search.store');
    Route::delete('/follow/{id}{sessionID}', [FollowController::class, 'destroy'])->name('follow.destroy');
    Route::get('/search', SearchController::class)->name('result.search');

    // Parents/Index.tsx
    Route::get('/parent', [ParentController::class, 'index'])->name('parent.index');
    Route::post('/parent', [ParentController::class, 'store'])->name('booking.store');

    //Admin
    Route::get('/addBalance', [AddBalanceController::class, 'index'])->name('balance.index');
    Route::post('/balance', [AddBalanceController::class, 'update'])->name('balance.update');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
