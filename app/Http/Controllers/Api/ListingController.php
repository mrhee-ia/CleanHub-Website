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
            $jobs = Job::where('application_status', 1)
            ->where('approved_status', 1)
            ->orderBy('created_at', 'desc')
            ->get();
        } else {
            $jobs = Job::where('category', $category)
            ->where('approved_status', 1)
            ->where('application_status', 1)
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
            'message' => 'Job posted successfully',
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
        $validated = $request->validate([
            'application_status' => 'required|boolean',
        ]);

        $job = Job::find($id);

        // Check if the authenticated user is the job owner
        if (auth()->id() !== $job->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $job->application_status = $validated['application_status'];
        $job->save();

        return response()->json([
            'message' => 'Application status updated successfully',
            'job' => $job,
        ], 200);
    }

    public function manage_posts() {
        $user = auth()->user();
        $jobs = Job::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();
        return response()->json($jobs);
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
