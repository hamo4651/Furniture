<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedBackRequest;
use App\Http\Requests\UpdateFeedBackRequest;
use App\Models\FeedBack;
use Illuminate\Support\Facades\Auth;

class FeedBackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $unreadCount = Auth::user()->unreadNotifications->count();

        $feedBacks = FeedBack::paginate(10);
        return inertia('admin/FeedBack/Index', [
            'feedBacks' => $feedBacks,
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
    public function store(StoreFeedBackRequest $request)
    {
        // 
        // dd($request->validated());
        $data = $request->validated();
        FeedBack::create($data);
        return back()->with('status', 'FeedBack sent successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $feedBack = FeedBack::findorFail($id);
        // dd($feedBack);
        return inertia('admin/FeedBack/Show', [
            'feedBack' => $feedBack
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FeedBack $feedBack)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedBackRequest $request, FeedBack $feedBack)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $feedBack = FeedBack::findorFail($id);
        $feedBack->delete();
        return redirect()->back();
    }
}
