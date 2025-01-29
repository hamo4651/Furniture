<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        try {
            $user_id = Auth::user()->id;
            $users = User::whereNot('id', $user_id)->get();
            $unreadCount = Auth::user()->unreadNotifications->count();

            return inertia('admin/Users/Index', [
                'users' => $users,
                'unreadCount' => $unreadCount
            ]);
            
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to retrieve users.');
        }
    }

    public function show($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return back()->with('error', 'User not found.');
            }

            return Inertia::render('admin/Users/Show', [
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to retrieve user details.');
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return back()->with('error', 'User not found.');
            }

            // Optional: Remove user image if stored
            // if (file_exists(public_path($user->image))) {
            //     unlink(public_path($user->image));
            // }

            $user->delete();

            return redirect()->route('users.index')->with('success', 'User deleted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete user.');
        }
    }
}
