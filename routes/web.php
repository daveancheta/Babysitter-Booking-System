<?php

use App\Http\Controllers\AddBalanceController;
use App\Http\Controllers\BabysitterController;
use App\Http\Controllers\BanningController;
use App\Http\Controllers\BookingHistoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ParentController;
use App\Http\Controllers\PayMongoController;
use App\Http\Controllers\RatingsController;
use App\Http\Controllers\ReactController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Main/welcome');
})->name('home');

Route::get('login', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::delete('dashboard/{id}', [DashboardController::class, 'destroy'])->name('delete.user');
    Route::put('dashboard/update/{id}', [DashboardController::class, 'update'])->name('update.user');
    Route::get('users/download', [DashboardController::class, 'downloadUsersTable'])->name('download.users');
    Route::post('users/ban/{ip_address}', [DashboardController::class, 'ban'])->name('ban.user');
    Route::post('users/unbanned/{ip_address}', [DashboardController::class, 'unbanned'])->name('unbanned.user');

    // Babysitter/Index.tsx
    Route::get('/babysitter', [BabysitterController::class, 'index'])->name('babysitter.index');
    Route::get('/babysitters', [BabysitterController::class, 'postJson'])->name('babysitter.indexJson');
    Route::post('/babysitter', [BabysitterController::class, 'store'])->name('babysitter.store');
    Route::delete('/delete/{id}', [BabysitterController::class, 'destroy'])->name('babysitter.delete');
    Route::put('/post/{id}', [BabysitterController::class, 'update'])->name('edit.post');

    // React
    Route::post('/reaction', [ReactController::class, 'store'])->name('react.store');
    Route::delete('/reaction/{id}', [ReactController::class, 'destroy'])->name('react.delete');

    // Comment
    Route::post('/comment', [CommentController::class, 'store'])->name('comment.store');

    // Search
    Route::get('/search', SearchController::class)->name('result.search');

    // Rating
    Route::post('/ratings', [RatingsController::class, 'store'])->name('rating.store');


    // Parents/Index.tsx
    Route::get('/parent', [ParentController::class, 'index'])->name('parent.index');
    Route::post('/parentStore', [ParentController::class, 'store'])->name('booking.store');
    Route::post('/booking', [ParentController::class, 'update'])->name('booking.update');
    Route::post('/bookingStatus', [ParentController::class, 'updateStatus'])->name('bookings_status.update');


    // Admin
    Route::get('/addBalance', [AddBalanceController::class, 'index'])->name('balance.index');
    Route::post('/balance', [AddBalanceController::class, 'update'])->name('balance.update');

    // Bookings History
    Route::get('/notification', [BookingHistoryController::class, 'index'])->name('notification.index');
    Route::get('/books', [BookingHistoryController::class, 'bookJson'])->name('notification.bookJson');
    Route::get('/bookings', [BookingHistoryController::class, 'bookingJson'])->name('notification.bookingJson');
    Route::post('/action', [BookingHistoryController::class, 'store'])->name('action.store');

    // Follow
    Route::post('/follow', [FollowController::class, 'store'])->name('follow.store');
    Route::post('/followProfileStore', [FollowController::class, 'followProfileStore'])->name('follow_profile.store');
    Route::post('/followProfileStoreSearch', [FollowController::class, 'followProfileStoreSearch'])->name('follow_profile_search.store');
    Route::delete('/follow/{followId}', [FollowController::class, 'destroy'])->name('follow.destroy');
    Route::delete('/followAuth/{followingId}{AuthId}', [FollowController::class, 'destroyByAuth'])->name('follow.destroyByAuth');

    // Notification
    Route::get('/countJson', [NotificationController::class, 'notificationCount'])->name('notification.count');
    Route::get('/notificationJson', [NotificationController::class, 'notification'])->name('notification');
    Route::post('/emptyCount', [NotificationController::class, 'update'])->name('notification.emptyCount');

    Route::get('/paymongo-test/{payment}', [PayMongoController::class, 'PayMongoPayment'])->name("payment");
    Route::get('/paymongo/callback', [PayMongoController::class, 'callback'])->name('paymongo.callback');
});


Route::get('/ban', BanningController::class)->name('ban.index');
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
