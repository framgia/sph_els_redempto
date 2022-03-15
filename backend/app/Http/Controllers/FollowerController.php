<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Follower;

class FollowerController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'user_id' => ['required', 'integer'],
            'following_id' => ['required', 'integer'],
        ]);
        
        $follower = Follower::create($request->except('_token'));

        return response()->json([
            'follower' => $follower,
        ]);
    }
    public function destroy($userId, $followingId) {
        
        $follower = Follower::where('user_id', $userId)->where('following_id', $followingId)->first();
        $follower->delete();

        return response()->json([
            'message' => 'Unfollowed User',
        ]);
    }
}
