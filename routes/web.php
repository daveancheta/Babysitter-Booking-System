<?php

use App\Http\Controllers\BabysitterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/babysitter', [BabysitterController::class, 'index'])->name('babysitter.index');
    Route::post('/babysitter', [BabysitterController::class, 'store'])->name('babysitter.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
