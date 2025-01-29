<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Offer;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductOffer;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $unreadCount = Auth::user()->unreadNotifications->count();

        $offers = Offer::where('end_date', '>', now())->get();
        $products = Product::with('images')->paginate(10);
        return inertia('admin/Products/Index', [
            'products' => $products,
            'offers' => $offers,
            'unreadCount' => $unreadCount
        ]);
    }

    /**
     * Show the form for creating a wonew resource.
     */
    public function create()
    {
        //
        $categories = Category::all();
        return inertia('admin/Products/Create', [
            'categories' => $categories
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        //
        $validated = $request->validated();
      $product =  Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'price' => $validated['price'],
            'quantity' => $validated['quantity'],
            'status' => $validated['status'],
        ]);
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $filename = time() . '_' . $image->getClientOriginalName();
                $path = $image->storeAs('', $filename, 'product_image'); // استخدام disk المخصص
                $product->images()->create([
                    'image' => $path,
                ]);
            }
        }

        return redirect()->route('admin.product.index')->with('status', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $offers = Offer::where('end_date', '>', now())
            ->get()
            ->map(function ($offer) use ($product) {
                $productOffer = ProductOffer::where('product_id', $product->id)
                    ->where('offer_id', $offer->id)
                    ->first();

                $offer->is_applied = $productOffer ? true : false;
                $offer->product_offer_id = $productOffer ? $productOffer->id : null;

                return $offer;
            });

        $product = Product::with(['images', 'offers'])->find($product->id);

        return inertia('admin/Products/Show', [
            'product' => $product,
            'offers' => $offers,
        ]);
    }




    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $product = Product::with('images')->find($product->id);
        $categories = Category::all();
        return inertia('admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
{
    // التحقق من صحة البيانات
    $data = $request->validated();

    // تحديث بيانات المنتج
    $product->update($data);

    // التحقق من وجود صور مرفوعة
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            // تخصيص اسم الملف
            $filename = time() . '_' . $image->getClientOriginalName();
            // تخزين الصورة في disk المخصص
            $path = $image->storeAs('', $filename, 'product_image');
            // إضافة الصورة إلى قاعدة البيانات
            $product->images()->create([
                'image' => $path,
            ]);
        }
    }


    // إعادة التوجيه مع رسالة نجاح
    return redirect()->route('admin.product.index')->with('status', 'Product updated successfully.');
}


public function uploadImages(Request $request, Product $product)
{
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $filename = time() . '_' . $image->getClientOriginalName();
            $path = $image->storeAs('', $filename, 'product_image');
            $product->images()->create(['image' => $path]);
        }
    }

    return response()->json(['message' => 'Images uploaded successfully.']);
}





    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
        $product->delete();
        return redirect()->route('admin.product.index')->with('status', 'Product deleted successfully.');
    }

    public function destroyImage($imageId)
    {
        $image = ProductImage::findOrFail($imageId);

        $path = public_path('images/product_image/' . basename($image->image));
        if (file_exists($path)) {
            unlink($path);
        }

        $image->delete();

        return response()->json(['message' => 'Image deleted successfully'], 200);
    }


}
