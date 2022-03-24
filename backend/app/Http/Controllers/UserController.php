<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index() {
        return response()->json([
            'users' => User::all(),
        ], 201);
    }

    public function show($userId) {
        $user = User::with(['followers', 'following'])->where('id', $userId)->get()->first();
        
        return response()->json([
            'user' => $user,
        ], 201);
    }

    public function update(Request $request, User $user) {
        $request->validate([
            'full_name' => ['string'],
            'email' => ['string'],
        ]);

        if ($request->hasFile('profile_pic')) {
            $path = $request->file('profile_pic')->store('profile_pictures', 'public');
            
            $user->update([
                'profile_pic_path' => Storage::url($path),
            ]);
        }

        $user->update([
            'full_name' => $request->full_name,
            'email' => $request->email,
        ]);

        return response()->json([
            'user' => $user,
            'message' => 'User Info Updated'
        ], 201);
    }
}
