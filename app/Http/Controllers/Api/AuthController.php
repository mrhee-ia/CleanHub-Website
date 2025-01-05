<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SigninRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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

    public function update(Request $request) {
        $user = $request->user();

        $field = $request->input('field');
        $value = $request->input('value');

        $request->validate([
            'field' => 'required|string|in:email,bio,location',
            'value' => 'required|string|max:225',
        ]);

        $user->{$field} = $value;
        $user->save();

        return response()->json($user);
    }

    public function updateProfilePicture(Request $request)
    {
        /** @var \App\Models\User $user */

        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg|max:25600',
        ]);

        $user = $request->user();

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filePath = $file->store('uploads/profile_pictures', 'public');

            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }

            $user->profile_picture = $filePath;
            $user->save();

            return response()->json($user);
        }

        return response()->json(['message' => 'No file uploaded'], 400);
    }


    public function logout(Request $request) {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->tokens()->delete();
        return response('', 204);
    }
}
