<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCartItemRequest;
use App\Http\Requests\UpdateCartItemRequest;
use App\Models\CartItem;
use App\Models\Coupons;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartItemController extends Controller
{
   
    public function index()
    {
        $products = CartItem::with('product.images')
            ->where('user_id', Auth::id())
            ->get()
            ->map(function ($cartItem) {
                return [
                    'id' => $cartItem->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->price, // عرض السعر من cart_items
                    'added_at' => $cartItem->added_at,
                    'product' => $cartItem->product,
                ];
            });
            $coupons = Coupons::all();
        return inertia('front/Cart/Cart', [
            'products' => $products,
            'coupons' => $coupons
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
    // public function store(StoreCartItemRequest $request)
    // {
    //     //
    //     $data = $request->validated();
    //     $cartItem = CartItem::updateOrCreate(
    //         [
    //             'user_id' => Auth::id(),
    //             'product_id' => $data['product_id'],
    //         ],
    //         [
    //             'quantity' => $data['quantity'] ?? 1,
    //             'price' => $data['price'], // تحديث السعر

    //             'added_at' => now(),
    //         ]
    //     );

    //     return redirect()->route('cart.index')->with('status', 'Product added to cart successfully.');
    // }
    public function store(StoreCartItemRequest $request)
{   
    
    // dd($request->all() );
    $data = $request->validated();
 

    $cartItem = CartItem::updateOrCreate(
        [
            'user_id' => Auth::id(),
            'product_id' => $data['product_id'],
        ],
        [
            'quantity' => $data['quantity'] ?? 1,
            'price' => $data['price'], // تخزين السعر الجديد
            'added_at' => now(),
        ]
    );

    return redirect()->route('cart.index')->with('status', 'Product added to cart successfully.');
}

    
    /**
     * Display the specified resource.
     */
    public function show(CartItem $cartItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CartItem $cartItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdateCartItemRequest $request, CartItem $cartItem)
    // {
    //     //
    //     $request->validate([
    //         'quantity' => 'required|integer|min:1',
    //     ]);

    //     $cartItem->update([
    //         'quantity' => $request->quantity,
    //     ]);

    //     return redirect()->route('front.cart.index')->with('status', 'Product quantity updated successfully.');
    // }

    public function update(UpdateCartItemRequest $request, CartItem $cartItem)
{
    // dd($request->all());
    // Update the cart item with the new quantity
    if ($cartItem->user_id !== Auth::id()) {
        abort(403, 'This action is unauthorized.');
    }

    $cartItem->update([
        'quantity' => $request->quantity,
    ]);
    // Fetch the updated cart items to reflect changes
    $cartItems = CartItem::with('product')->where('user_id', Auth::id())->get();

    // Return an Inertia response to rehydrate the cart page
    return Inertia::render('front/Cart/Cart', [
        'products' => $cartItems,
        'message' => 'Product quantity updated successfully.',
    ]);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find and delete the cart item by ID
        $cartItem = CartItem::findOrFail($id);
        $cartItem->delete();
    
       
        return redirect()->route('cart.index')->with('status', 'Product deleted successfully.');

    }
    
    
    
    }

