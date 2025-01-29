<?php

namespace App\Providers;

use App\Jobs\CleanExpiredCoupons;
use App\Models\CartItem;
use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

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
        CleanExpiredCoupons::dispatchSync();
        Vite::prefetch(concurrency: 3);
        Inertia::share([
            'flash' => function () {
                return [
                    'status' => session('status'),
                ];
            },
        ]);

        Inertia::share([
            'cartCount' => function () {
                if (Auth::check()) {
                    return CartItem::where('user_id', Auth::id())->count();
                }
                return 0;
            },
        ]);
        Inertia::share([
            'favoriteCount' => function () {
                if (Auth::check()) {
                    return Favorite::where('user_id', Auth::id())->count();
                }
                return 0;
            },
        ]);
    }
}
