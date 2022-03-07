<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request) {
        $field = $request->validate([
            'full_name' => 'required|string',
            'user_name' => 'required|string|unique:users,user_name',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'full_name' => $field['full_name'],
            'user_name' => $field['user_name'],
            'email' => $field['email'],
            'password' => bcrypt($field['password']),
        ]);

        $token = $user->createToken('admin_token')->plainTextToken;

        $response = [
            'user' => $user,
        ];

        return response($response, 201);
    }
    
    public function login(Request $request) {
        $fields = $request->validate([
            'user_name' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('user_name', $fields['user_name'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
               'message' => 'Invalid Credentials'
            ], 401);
        }

        $token = "";

        if($user->is_admin) {
            $token = $user->createToken('admin_token')->plainTextToken;
        }

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function logout (Request $request) {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }
}
