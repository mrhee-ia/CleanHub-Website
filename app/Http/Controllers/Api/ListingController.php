<?php

namespace App\Http\Controllers\Api;

use App\Models\Job;
use App\Models\User;
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
        $search = $request->query('search', null);

        $query = Job::where('approved_status', 1)->where('application_status', 1);

        if ($category != 'All') {
            $query->where('category', $category);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%$search%")
                ->orWhere('description', 'LIKE', "%$search%")
                ->orWhere('qualifications', 'LIKE', "%$search%")
                ->orWhere('city_id', 'LIKE', "%$search%")
                ->orWhere('full_address', 'LIKE', "%$search%");
            });
        }

        $jobs = $query->orderBy('created_at', 'desc')->get();

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
        $job->media_paths = array_map(function ($path) {
            return asset("storage/$path");
        }, json_decode($job->media_paths, true) ?? []);
        return response()->json($job);
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
            'media_paths.*' => 'required|file|mimes:jpg,jpeg,png|max:512000',
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

    public function update_status(Request $request, $id) {
        $job = Job::findOrFail($id);
        if ($request->has('jobStatus')) {
            $job->application_status = $request->input('jobStatus');
        }
        if ($request->has('rated')) {
            $job->rate_status = $request->input('rated');
        }
        $job->save();
        return response()->json(['message' => 'Status updated successfully'], 200);
    }

    public function manage_posts() {
        $user = auth()->user();
        $jobs = Job::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();
        return response()->json($jobs);
    }

    public function saved_jobs() {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Please log in.'], 403);
        }

        $savedJobs = is_array($user->saved) ? $user->saved : json_decode($user->saved, true) ?? [];
        $savedJobs = array_map('intval', $savedJobs);
        
        if (empty($savedJobs)) {
            return response()->json(['saved_jobs' => []]);
        }    

        $jobs = Job::whereIn('id', $savedJobs)->get();

        return response()->json([
            'saved_jobs' => $jobs,
        ]);
    }

    public function save_job(Request $request) {
        $user = User::find(auth()->id());
        if (!$user) {
            return response()->json(['message' => 'Please log in.'], 403);
        }

        $validated = $request->validate(['saved' => 'array']);
        $newSavedJobs = array_map('intval', $validated['saved'] ?? []);
        $user->saved = $newSavedJobs;
        $user->save();

        return response()->json([
            'message' => 'Job saved successfully', 
            'user' => $user->fresh(),
            'saved' => $newSavedJobs]);
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
