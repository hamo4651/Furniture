<?php

use App\Http\Controllers\CartItemController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CouponsController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\FeedBackController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductOfferController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $products = Product::with('images')->latest()->take(8)->get();
    return Inertia::render('front/Index' , ['products' => $products]);
})->name('test');


// my work

Route::get('/home', function () {
   return Inertia::render('Welcome');
});

Route::get('/admin', function () {
    $unreadCount = Auth::user()->unreadNotifications->count();

    // dd($unreadCount);
   return Inertia::render('admin/Index', [
       'unreadCount' => $unreadCount
   ]);
})->name('index')->middleware('admin');

Route::name('admin.')->middleware(['auth' , 'admin'])->group(function () {
Route::resource('/category', CategoryController::class);
Route::resource('/product', ProductController::class);
Route::resource('/feedback', FeedBackController::class)->except('store','destroy');

Route::resource('coupons' , CouponsController::class); 
Route::resource('/offer' , OfferController::class);
Route::resource('/users', UserController::class);

Route::post('/admin/product/{product}/images', [ProductController::class, 'uploadImages'])->name('product.uploadImages');

Route::resource('/productoffer' , ProductOfferController::class)->parameters([
    'productoffer' => 'productoffer',
]);

Route::delete('/admin/product/image/{image}', [ProductController::class, 'destroyImage'])->name('product.image.destroy');
Route::get('/allOrders', [OrderController::class, 'getOrders'])->name('allOrders');
// Route::get('/ViewOrder/{id}', [OrderController::class, 'ViewOrder']);

Route::put('/updateOrders/{orderId}', [OrderController::class, 'updateOrderStatus'])->name('updateStatus');
Route::delete('/deleteorder/{id}', [OrderController::class, 'deleteorder'])->name('deleteorder');

});

Route::post('/admin/feedback/store', [FeedBackController::class, 'store'])->name('admin.feedback.store')->middleware('auth');
Route::delete('/admin/feedback/destroy/{id}', [FeedBackController::class, 'destroy'])->name('admin.feedback.destroy')->middleware('auth');
// end

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


Route::controller(ShopController::class)->name('shop.')->group(function () {
Route::get('/shop' , 'index')->name('index');
Route::get('/getproducts' , 'getProducts')->name('getProducts');
Route::get('/productdetails/{product}','show')->name('show');
Route::get('/shopmetro' , 'shopMetro')->name('shopMetro');
});
Route::get('/getProductsoffers' , [ProductOfferController::class ,'getProductsoffers'])->name('getProductsoffers');



// product offers route
Route::get('/getofferproducts' , [ProductOfferController::class , 'getProductsWithOffers'])->name('getofferproducts');
// Route::delete('/productOffer/{id}' , [ProductOfferController::class , 'destroy'])->name("admin.productOffer.destroy");


// for test
// Route::get('/test' , [TestController::class , 'index'])->name('test');
Route::controller(TestController::class)->group(function () {
Route::get('/about' , 'about')->name('about');
Route::get('/faqpage' , 'faqpage');
Route::get('/location' , 'location');
Route::get('/contact' , 'contact');
// Route::get('/cart' , 'cart')
// Route::get('/shop' , 'shop');
// Route::get('/shopmetro' , 'ShopMetro');
// Route::get('/shopmetro' , 'ShopMetro');
Route::get('/productdetails' , 'productDetails');
// Route::get('/register' , 'register');
// Route::get('/login' , 'login');
Route::get('/forgot' , 'forgot');




});
// Route::get('/about' , [TestController::class , 'about']);
Route::middleware('auth')->group(function () {
   Route::resource('/favorite' , FavoriteController::class);
   Route::resource('/cart' , CartItemController::class);
   Route::post('/placeorders', [OrderController::class, 'placeOrder'])->name('placeorders');
   Route::get('/myorders', [OrderController::class, 'myorders'])->name('myorders');
   Route::delete('/cancelorder/{id}', [OrderController::class, 'cancelorder'])->name('cancelorder');

});

Route::get('/access-denied', function () {
    return Inertia::render('Error/AccessDenied'); // Your Access Denied page component
})->name('access-denied');

Route::patch('/cartd/{cartItem}/update', [CartItemController::class, 'update'])
    ->name('cartd.update')
    ->middleware('auth');

    Route::post('/notifications/mark-as-read', function () {
        Auth::user()->unreadNotifications->markAsRead();
        
        return Inertia::location(route('admin.allOrders'));
    
    })->name('notifications.markAsRead');

