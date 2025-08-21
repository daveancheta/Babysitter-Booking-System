<?php

use App\Http\Controllers\BabysitterController;
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
    Route::get('/babysitter', [BabysitterController::class, 'index'])->name('babysitter.index');
    Route::post('/babysitter', [BabysitterController::class, 'store'])->name('babysitter.store');
    Route::post('/reaction', [ReactController::class, 'store'])->name('react.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
