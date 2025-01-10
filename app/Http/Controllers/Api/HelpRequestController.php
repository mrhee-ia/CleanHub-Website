<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HelpRequest;
use Illuminate\Http\Request;

class HelpRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'category' => 'required|in:recruiter,hunter,general',
            'hashtags' => 'required|string|max:255',
            'message' => 'required|string|max:1000',
        ]);

        $helpRequest = HelpRequest::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'category' => $validated['category'],
            'hashtags' => $validated['hashtags'],
            'message' => $validated['message'],
        ]);

        return response()->json(['message' => 'Help request submitted successfully!', 'data' => $helpRequest], 201);
    }
}
