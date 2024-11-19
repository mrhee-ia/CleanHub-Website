<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SigninRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request) {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'full_name' => $data['full_name'],
            'user_name' => $data['user_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function signin(SigninRequest $request) {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Credentials are Incorrect.'
            ], 422);
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request $request) {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->tokens()->delete();
        return response('', 204);
    }
}
