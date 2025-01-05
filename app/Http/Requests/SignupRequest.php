<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'full_name' => 'required|string|max:225',
            'user_name' =>  [
                'required',
                'string',
                'max:255',
                'unique:users,user_name',
                'regex:/^[a-zA-Z0-9_-.]+$/'
            ],
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required', Password::min(8)->letters()->symbols()]
        ];
    }
}
