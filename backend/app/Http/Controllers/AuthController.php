<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $field = $request->validate([
            'full_name' => ['required', 'string'],
            'user_name' => ['required', 'string', 'unique:users,user_name'],
            'email' => ['required', 'string', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed'],
        ]);

        $user = User::create([
            'full_name' => $field['full_name'],
            'user_name' => $field['user_name'],
            'email' => $field['email'],
            'password' => bcrypt($field['password']),
            'profile_pic_path' => null,
        ]);

        $token = $user->createToken('admin_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response()->json($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'user_name' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($fields)) {
            $user = User::where('user_name', $fields['user_name'])->first();
        }
        else {
            return response()->json([
                'message' => 'Invalid Credentials'
            ], 400);
        }

        $token = $user->createToken('admin_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response()->json($response, 201);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out'
        ], 201);
    }
}
