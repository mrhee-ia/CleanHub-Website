<?php

namespace App\Http\Controllers\Api;

use App\Models\Job;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ListingController extends Controller
{
    /**
     * Display all jobs.
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $category = $request->query('category', 'All');
        
        if ($category == 'All') {
            $jobs = Job::where('status', 1)
            ->orderBy('created_at', 'desc')
            ->get();
        } else {
            $jobs = Job::where('category', $category)
            ->where('status', 1)
            ->orderBy('created_at', 'desc')
            ->get();
        }
        return response()->json($jobs);
    }

    /**
     * Display the specified job.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $job = Job::with('user')->findOrFail($id);
        $job->media_paths = json_decode($job->media_paths);
        return response()->json($job);
    }

    /**
     * Show the form for creating a new job.
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created job in database.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:225',
            'category' => 'required',
            'description' => 'required',
            'qualifications' => 'required',
            'city_id' => 'required',
            'full_address' => 'required',
            'schedule' => 'required',
            'payment' => 'required',
            'media_paths.*' => 'required|file|mimes:jpg,jpeg,png|max:25600',
        ]);

        $mediaPaths = [];
        if ($request->hasFile('media_paths')) {
            foreach ($request->file('media_paths') as $file) {
                $mediaPaths[] = $file->store('uploads/jobs', 'public');
            }
        }

        $data = $request->all();
        $data['media_paths'] = json_encode($mediaPaths);
        $data['user_id'] = auth()->id();

        $job = Job::create($data);

        return response()->json([
            'job' => $job
        ], 201);
    }

    /**
     * Show the form for editing the specified job.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified job in database.
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
