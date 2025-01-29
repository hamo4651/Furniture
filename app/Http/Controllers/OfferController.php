<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOfferRequest;
use App\Http\Requests\UpdateOfferRequest;
use App\Models\Offer;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $unreadCount = Auth::user()->unreadNotifications->count();
        // Offer::where('end_date', '<=', now())->delete();
        $offers = Offer::paginate(10);
        return inertia('admin/Offer/Index', [
            'offers' => $offers,
            'unreadCount' => $unreadCount
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia('admin/Offer/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfferRequest $request)
    {
        //
        $data = $request->validated();
        Offer::create($data);
        return redirect()->route('admin.offer.index')->with('status', 'Offer created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Offer $offer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $offer = Offer::findOrFail($id);
        return inertia('admin/Offer/Edit', [
            'offer' => $offer
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOfferRequest $request, $id)
    {
        //
        $offer = Offer::findOrFail($id);
        $data = $request->validated();
        $offer->update($data);
        return redirect()->route('admin.offer.index')->with('status', 'Offer updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $offer = Offer::findOrFail($id);
        $offer->delete();
        return redirect()->route('admin.offer.index')->with('status', 'Offer deleted successfully.');
    }
}
