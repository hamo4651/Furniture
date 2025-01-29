<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductOfferRequest;
use App\Http\Requests\UpdateProductOfferRequest;
use App\Models\Product;
use App\Models\ProductOffer;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductOfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $products = Product::whereHas('offers')->with(['offers' => function ($query) {
            $query->withPivot('id');
        }])->get();
        foreach ($products as $product) {

            if ($product->offers->isNotEmpty()) {
                foreach ($product->offers as $offer) {
                $pivotId = $offer->pivot->id;
                $offer = $product->offers->first(); // افتراض أن المنتج يحتوي على عرض واحد
                $product->discounted_price = $product->price - ($product->price * $offer->discount_percentage / 100);
            } }else {
                $product->discounted_price = $product->price; // إذا لم يكن هناك عرض
            }
        }
        $unreadCount = Auth::user()->unreadNotifications->count();

        return inertia('admin/ProductOffer/Index', [
            'products' => $products,
            'unreadCount' => $unreadCount
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductOfferRequest $request)
    {
        //
        $data = $request->validated();
        ProductOffer::create($data);
        return redirect()->route('admin.product.index')->with('status', 'Product Offer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {

    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductOffer $productOffer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductOfferRequest $request, ProductOffer $productOffer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            // dd($productOffer);
            $productOffer = ProductOffer::findOrFail($id);
            $productOffer->delete();
            return redirect()->route('admin.productOffer.index')->with('status', 'Offer removed successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    // public function getProductsWithOffers(){

    //     $productsInOffers = DB::table('products')
    //     ->join('product_offers', 'products.id', '=', 'product_offers.product_id')
    //     ->join('offers', 'product_offers.offer_id', '=', 'offers.id')
    //     ->leftJoin('product_images', 'products.id', '=', 'product_images.product_id')
    //     ->select(
    //         'products.id as product_id',
    //         'products.name as product_name',
    //         'products.description as product_description',
    //         'products.price as product_price',
    //         'products.quantity as product_quantity',
    //         'products.status as product_status',
    //         DB::raw('MAX(product_images.image) as product_image'), // Use an aggregation function
    //         'offers.title as offer_title',
    //         'offers.description as offer_description',
    //         'offers.discount_percentage as offer_discount',
    //         'offers.start_date as offer_start_date',
    //         'offers.end_date as offer_end_date'
    //     )
    //     ->groupBy('products.id', 'products.name', 'products.description', 'products.price', 'products.quantity', 'products.status', 'offers.title', 'offers.description', 'offers.discount_percentage', 'offers.start_date', 'offers.end_date') // Include all other columns
    //     ->get();


    //             return inertia('front/ProductOffers/Offer', [
    //         'products' => $productsInOffers]);
    // }


    public function getProductsWithOffers()
    {
        
        $products = Product::whereHas('offers')->with(['offers', 'images'])->where('status', 'instock')->paginate(9);
        foreach ($products as $product) {

            if ($product->offers->isNotEmpty()) {
                foreach ($product->offers as $offer) {
                $pivotId = $offer->pivot->id;
                $offer = $product->offers->first(); // افتراض أن المنتج يحتوي على عرض واحد
                $product->discounted_price = $product->price - ($product->price * $offer->discount_percentage / 100);
            } }else {
                $product->discounted_price = $product->price; // إذا لم يكن هناك عرض
            }
        }

        return inertia('front/ProductOffers/Offer', [
                    'products' => $products]);

    }

    public function getProductsoffers(Request $request)
    {
        $query = Product::query()->with(['images', 'offers'])->where('status', 'instock')->whereHas('offers');

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
        return inertia('front/ProductOffers/Offer', [
            'products' => $products,
            'filters' => $request->only('sort_by', 'min_price', 'max_price'), // Pass filters back for reference
        ]);
    }


}
