<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCouponsRequest;
use App\Http\Requests\UpdateCouponsRequest;
use App\Models\Coupons;
use Illuminate\Support\Facades\Auth;

class CouponsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $unreadCount = Auth::user()->unreadNotifications->count();
        // Coupons::where('end_date', '<=', now())->delete();
        // Coupons::where('max_uses', '=', 0)->delete();

        $coupons = Coupons::paginate(10);
        return inertia('admin/Coupons/Index', [
            'coupons' => $coupons,
            'unreadCount' => $unreadCount
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia('admin/Coupons/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCouponsRequest $request)
    {
        //
        $data = $request->validated();
        Coupons::create($data);
        return redirect()->route('admin.coupons.index')->with('status', 'Coupon created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Coupons $coupons)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $coupon = Coupons::findOrFail($id);
        return inertia('admin/Coupons/Edit', [
            'coupon' => $coupon
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCouponsRequest $request, $id)
    {
        //
        $coupon = Coupons::findOrFail($id);

        $data = $request->validated();

        $coupon->update($data);

        return redirect()->route('admin.coupons.index')->with('status', 'Coupon updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $coupon = Coupons::findOrFail($id);
        $coupon->delete();
        return redirect()->route('admin.coupons.index')->with('status', 'Coupon deleted successfully.');
    }
}
