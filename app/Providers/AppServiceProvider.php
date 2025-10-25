<?php

namespace App\Providers;

use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Gate::define('admin-dashboard', function ($user) {
            return $user->is_admin
            ? Response::allow()
            : Response::denyAsNotFound();
        });

        Gate::define('booking-page-babysitter', function ($user) {
            return $user->is_babysitter
            ? Response::denyAsNotFound()
            : Response::allow();
        });

        Gate::define('booking-page-admin', function ($user) {
            return $user->is_admin
            ? Response::denyAsNotFound()
            : Response::allow();
        });

    }
}
