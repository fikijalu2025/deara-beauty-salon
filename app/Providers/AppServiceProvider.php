<?php

namespace App\Providers;

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
        // In Vercel serverless, redirect storage path to /tmp if APP_CONFIG_CACHE is present
        if (env('APP_CONFIG_CACHE')) {
            $this->app->useStoragePath('/tmp/storage');
        }
    }
}
