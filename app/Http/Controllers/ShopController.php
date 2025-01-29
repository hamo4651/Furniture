<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    //
    public function index()
    {
        $products = Product::with(['images', 'offers'])->where('status', 'instock')->paginate(9);
        foreach ($products as $product) {
            $discounted_price = $product->price; // السعر الافتراضي هو السعر الأصلي للمنتج

            // التحقق إذا كان هناك عروض على المنتج
            if ($product->offers->isNotEmpty()) {
                // افترض أننا نأخذ العرض الأول (يمكنك إضافة منطق إضافي لاختيار العرض المناسب بناءً على التاريخ أو معايير أخرى)
                $offer = $product->offers->first();
    
                // حساب السعر بعد الخصم باستخدام نسبة الخصم
                $discounted_price = $product->price - ($product->price * $offer->discount_percentage / 100);
            }
    
            // إضافة السعر المخفض إلى المنتج
            $product->discounted_price = $discounted_price;
        }
        $categories = Category::all();
        return inertia('front/Shop/Shop' , [
            'products' => $products,
            'categories' => $categories

        ]); 
    }   
  
    public function getProducts(Request $request)
    {
        $query = Product::query()->with(['images', 'offers'])->where('status', 'instock');
        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
         $categories = Category::all();

        // Filter by category
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        // Sorting logic
        if ($request->sort_by === 'popularity') {
            $query->orderBy('popularity', 'desc');
        } elseif ($request->sort_by === 'price_low_to_high') {
            $query->orderBy('price', 'asc');
        } elseif ($request->sort_by === 'price_high_to_low') {
            $query->orderBy('price', 'desc');
        }

        // Paginate the products
        // $products = $query->paginate(10);

        // // Return the Inertia view
        // return inertia('front/Shop/Shop', [
        //     'products' => $products,
        //     'filters' => $request->only('sort_by'), // Pass filters back for reference
        // ]);

        if ($request->filled('min_price') && $request->filled('max_price')) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }
    
        // Paginate the products
        $products = $query->paginate(10);
        foreach ($products as $product) {
            $discounted_price = $product->price; // السعر الافتراضي هو السعر الأصلي للمنتج
    
            // التحقق إذا كان هناك عروض على المنتج
            if ($product->offers->isNotEmpty()) {
                // افترض أننا نأخذ العرض الأول (يمكنك إضافة منطق إضافي لاختيار العرض المناسب بناءً على التاريخ أو معايير أخرى)
                $offer = $product->offers->first();
    
                // حساب السعر بعد الخصم باستخدام نسبة الخصم
                $discounted_price = $product->price - ($product->price * $offer->discount_percentage / 100);
            }
    
            // إضافة السعر المخفض إلى المنتج
            $product->discounted_price = $discounted_price;
        }
    
        // Return the Inertia view
        return inertia('front/Shop/Shop', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only('sort_by', 'min_price', 'max_price', 'name', 'category_id'), // Include search filters
                    ]);
    }


    public function show(Product $product)
    {
        $product = Product::with(['images','offers','feedBacks'])->find($product->id);

        $discounted_price = $product->price; // السعر الافتراضي هو السعر الأصلي للمنتج
    
        // التحقق إذا كان هناك عروض على المنتج
        if ($product->offers->isNotEmpty()) {
            // افترض أننا نأخذ العرض الأول (يمكنك إضافة منطق إضافي لاختيار العرض المناسب بناءً على التاريخ أو معايير أخرى)
            $offer = $product->offers->first();

            // حساب السعر بعد الخصم باستخدام نسبة الخصم
            $discounted_price = $product->price - ($product->price * $offer->discount_percentage / 100);
            $product->discounted_price = $discounted_price;
        }

        return inertia('front/ProductDetails/ProductDetails' , [
            'product' => $product
        ]);
   

    }

    public function shopMetro(){
        $products = Product::with('images')->paginate(10);

        return inertia('front/ShopMetro/ShopMetro' , [
            'products' => $products
        ]); ;
    }
}
