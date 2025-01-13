<?php

namespace App\Http\Controllers\Api;

use App\Models\Job;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function managePosts(Request $request)
    {
        $status = $request->query('status');

        if ($status == 'pending') {
            $jobs = Job::where('approved_status', 0)->get();
        } elseif ($status == 'approved') {
            $jobs = Job::where('approved_status', 1)->get();
        } else {
            return response()->json(['message' => 'Invalid status'], 400);
        }

        return response()->json($jobs, 200);
    }

    public function approvePost($id)
    {
        $job = Job::find($id);
        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        $job->update(['approved_status' => true]);

        $notification = [
            'user_id' => $job->user_id,
            'job_id' => $job->id,
            'message' => 'Success!',
            'notification_type' => 1,
            'created_at' => now(),
        ];
        DB::table('notifications')->insert($notification);
        return response()->json([
            'job' => $job,
            'message' => 'Job approved and notification sent'], 200);
    }

    public function denyPost($id)
    {
        $job = Job::find($id);
        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        $notification = [
            'user_id' => $job->user_id,
            'job_id' => $job->id,
            'message' => 'Sorry!',
            'notification_type' => 2,
            'created_at' => now(),
        ];
        DB::table('notifications')->insert($notification);

        $job->delete();

        return response()->json(['message' => 'Job denied and notification sent'], 200);
    }

    public function deletePost($id)
    {
        $job = Job::find($id);
        if (!$job || $job->approved_status !== 1) {
            return response()->json(['message' => 'Job not found or not approved'], 404);
        }

        $notification = [
            'user_id' => $job->user_id,
            'job_id' => $job->id,
            'message' => 'Deleted!',
            'notification_type' => 3,
        ];
        DB::table('notifications')->insert($notification);

        $job->delete();

        return response()->json(['message' => 'Job deleted and notification sent'], 200);
    }

}
