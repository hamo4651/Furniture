<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFavoriteRequest;
use App\Http\Requests\UpdateFavoriteRequest;
use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $favorites = Favorite::with(['product.images', 'product.offers'])
        ->where('user_id', Auth::id())
        ->distinct('product_id') // تأكد من عدم وجود تكرار للمنتج نفسه
        ->paginate(10);
                return inertia('front/Favorite/Favorite' ,[
            'favorites' => $favorites
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
    public function store(StoreFavoriteRequest $request)
    {
        $data = $request->validated();
    
        // تحقق مما إذا كان المنتج موجودًا بالفعل في المفضلة
        $exists = Favorite::where('product_id', $data['product_id'])
                          ->where('user_id', Auth::id())
                          ->exists();
    
        if ($exists) {
            return redirect()->route('favorite.index')->with('status', 'Product is already in your favorites.');
        }
    
        // إضافة المنتج للمفضلة
        Favorite::create([
            'product_id' => $data['product_id'],
            'user_id' => Auth::id(),
        ]);
    
        return redirect()->route('favorite.index')->with('status', 'Product added to favorite successfully.');
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Favorite $favorite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Favorite $favorite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFavoriteRequest $request, Favorite $favorite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $favorite = Favorite::findOrFail($id);
        $favorite->delete();
        return redirect()->route('favorite.index')->with('status', 'Product removed from favorite successfully.');
    }
}
