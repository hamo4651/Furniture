<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    //
    public function index(){
        return inertia('front/Index'); ;
    }

    public function about(){
        return inertia('front/About_us/AboutSection'); ;
    }

    public function faqpage(){
        return inertia('front/FAQPage/FAQPage '); ;
    }

    public function location(){
        return inertia('front/Location/Location'); ;
    }

    public function contact(){
        return inertia('front/Contact/Contact'); ;
    }

    public function cart(){
        return inertia('front/Cart/Cart'); ;
    }

    public function shop(){
        return inertia('front/Shop/Shop'); ;
    }
    public function shopMetro(){
        return inertia('front/ShopMetro/ShopMetro'); ;
    }

    public function productDetails(){
        return inertia('front/ProductDetails/ProductDetails'); ;
    }
    public function register(){
        return inertia('front/Auth/Register/Register'); ;
    }
    public function login(){
        return inertia('front/Auth/Login/Login'); ;
    }
    public function forgot(){
        return inertia('front/Auth/Forgot-password/Forgot-password'); ;
    }
}
