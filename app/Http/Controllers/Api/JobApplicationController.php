<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;
use Illuminate\Support\Facades\DB;

class JobApplicationController extends Controller
{

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function apply_job(Request $request, $id) {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Please log in.'], 403);
        }

        $job = Job::findOrFail($id);

        $jobApplication = DB::table('job_applications')->where('job_id', $id)->first();
        
        if ($jobApplication) {
            // IF A RECORD FOR THIS JOB ALREADY EXISTS
            $applicants = json_decode($jobApplication->applicants ?? '[]', true);
            if (in_array($user->id, $applicants)) {
                return response()->json(['message' => 'You have already applied for this job'], 400);
            }
            $applicants[] = $user->id;
            DB::table('job_applications')
                    ->where('job_id', $id)
                    ->update([
                        'applicants' => json_encode($applicants),
                        'updated_at' => now(),
                    ]);
        } else {
            // IF NO RECORD EXISTS FOR THIS JOB, CREATE A NEW ONE
            DB::table('job_applications')->insert([
                'employer_id' => $job->user_id,
                'job_id' => $id,
                'applicants' => json_encode([$user->id]),
                'chosen_applicants' => json_encode([]),
                'ratings' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Update user's applications column
        $applications = json_decode($user->applications ?? '[]', true);
        if (!in_array($id, $applications)) {
            $applications[] = $job->id;
            DB::table('users')
                ->where('id', $user->id)
                ->update(['applications' => json_encode($applications)]);
        }

        return response()->json(['message' => 'Job application successful'], 200);
    }

    public function applications(Request $request) {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Please log in.'], 403);
        }

        $applications = json_decode($user->applications ?? '[]', true);
        if (empty($applications)) {
            return response()->json([]);
        }

        $jobs = Job::whereIn('id', $applications)->with('user')->get();
        return response()->json($jobs);
    }
}
