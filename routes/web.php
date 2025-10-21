<?php

use App\Http\Controllers\AddBalanceController;
use App\Http\Controllers\BabysitterController;
use App\Http\Controllers\BanningController;
use App\Http\Controllers\bookingsDoneController;
use App\Http\Controllers\CancelledBookingsController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DoneBookingsController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\RatingsController;
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
    Route::get('/babysitters', [BabysitterController::class, 'postJson'])->name('babysitter.indexJson');
    Route::post('/babysitter', [BabysitterController::class, 'store'])->name('babysitter.store');
    Route::delete('/delete/{id}', [BabysitterController::class, 'destroy'])->name('babysitter.delete');
    Route::post('/reaction', [ReactController::class, 'store'])->name('react.store');
    Route::delete('/reaction/{id}{postId}', [ReactController::class, 'destroy'])->name('react.delete');
    Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');
    Route::get('/notification', [NotificationController::class, 'index'])->name('notification.index');
    Route::post('/action', [NotificationController::class, 'store'])->name('action.store');
    Route::post('/follow', [FollowController::class, 'store'])->name('follow.store');
    Route::post('/followProfileStore', [FollowController::class, 'followProfileStore'])->name('follow_profile.store');
    Route::post('/followProfileStoreSearch', [FollowController::class, 'followProfileStoreSearch'])->name('follow_profile_search.store');
    Route::delete('/follow/{followId}', [FollowController::class, 'destroy'])->name('follow.destroy');
    Route::delete('/followAuth/{followingId}{AuthId}', [FollowController::class, 'destroyByAuth'])->name('follow.destroyByAuth');
    Route::get('/search', SearchController::class)->name('result.search');
    Route::post('/ratings', [RatingsController::class, 'store'])->name('rating.store');
    Route::put('/post/{id}', [BabysitterController::class, 'update'])->name('edit.post');

    // Parents/Index.tsx
    Route::get('/parent', [ParentController::class, 'index'])->name('parent.index');
    Route::post('/parent', [ParentController::class, 'store'])->name('booking.store');
    Route::post('/booking', [ParentController::class, 'update'])->name('booking.update');
    Route::post('/bookingStatus', [ParentController::class, 'updateStatus'])->name('bookings_status.update');


    //Admin
    Route::get('/addBalance', [AddBalanceController::class, 'index'])->name('balance.index');
    Route::post('/balance', [AddBalanceController::class, 'update'])->name('balance.update');
});

 Route::get('/ban', BanningController::class)->name('ban.index');
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
