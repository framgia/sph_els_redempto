<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function show($userId) {
        $user = User::with(['followers', 'following'])->where('id', $userId)->get()->first();
        
        return response()->json([
            'user' => $user,
        ]);
    }
}
