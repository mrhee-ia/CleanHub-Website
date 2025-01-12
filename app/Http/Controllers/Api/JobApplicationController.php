<?php

namespace App\Http\Controllers\api;

use App\Models\Job;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\ListingController;

class JobApplicationController extends Controller
{
    protected $listingController;

    public function __construct(ListingController $listingController)
    {
        $this->listingController = $listingController;
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function apply_job($id) {
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

    public function applications() {
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

    public function applicants($jobID) {

        $response = $this->listingController->show($jobID);
        $job = json_decode($response->getContent());

        $jobApplication = DB::table('job_applications')->where('job_id', $jobID)->first();
        $applicantIDs = json_decode($jobApplication->applicants, true) ?? [];
        $applicants = User::whereIn('id', $applicantIDs)->get();

        return response()->json([
            'jobStatus' => $job->application_status,
            'rated' => $job->rate_status,
            'applicants' => $applicants
        ], 200);
    }

    public function choose_applicants(Request $request, $jobID) {

        $chosen_applicants = $request->input('chosen_applicants', []);
        $chosen_applicants = array_map('intval', $chosen_applicants);
        DB::table('job_applications')->where('job_id', $jobID)->update(['chosen_applicants' => json_encode($chosen_applicants)]);

        $job = DB::table('jobs')->where('id', $jobID)->first();
        $notifications = [];
        foreach($chosen_applicants as $applicant_id) {
            $notifications[] = [
                'user_id' => $applicant_id,
                'job_id' => $jobID,
                'message' => "Congratulations!",
                'notification_type' => 3,
                'created_at' => now(),
            ];
        }
        DB::table('notifications')->insert($notifications);

        $applicants = DB::table('users')->whereIn('id', $chosen_applicants)->get();

        return response()->json([
            'message' => 'Chosen applicants saved successfully.',
            'chosen_applicants' => $applicants,
        ]);
    }

    public function chosen_applicants($jobID) {
        $jobApplication = DB::table('job_applications')->where('job_id', $jobID)->first();
        $chosen_applicantIDs = json_decode($jobApplication->chosen_applicants, true) ?? [];
        $chosen_applicants = User::whereIn('id', $chosen_applicantIDs)->get();
        return response()->json([
            'chosen_applicants' => $chosen_applicants
        ]);
    }

    public function rate_applicants(Request $request, $jobID) {
        $ratings = $request->input('ratings');
        DB::table('job_applications')->where('job_id', $jobID)->update(['ratings' => json_encode($ratings)]);
        return response()->json(['ratings' => $ratings]);
    }

    public function rated_applicants($jobID)
    {
        $jobApplication = DB::table('job_applications')->where('job_id', $jobID)->first();
        $ratings = json_decode($jobApplication->ratings, true);
        return response()->json(['ratings' => $ratings], 200);
    }

    public function notifications() {
        $user = auth()->user();
        $notifications = DB::table('notifications')
            ->join('jobs', 'notifications.job_id', '=', 'jobs.id')
            ->where('notifications.user_id', $user->id)
            ->select('notifications.*', 'jobs.title as job_title', 'notifications.notification_type')
            ->orderBy('notifications.created_at', 'desc')
            ->get();
    
        return response()->json($notifications);
    }
    

    public function history() {
        $user = auth()->user();
        $userID = $user->id;
    
        $jobHistory = DB::table('job_applications')
            ->join('jobs', 'job_applications.job_id', '=', 'jobs.id')
            ->join('users as employers', 'jobs.user_id', '=', 'employers.id')
            ->select(
                'jobs.id as job_id',
                'jobs.title as job_title',
                'employers.id as employer_id',
                'employers.full_name as employer_name',
                'job_applications.ratings'
            )
            ->whereRaw("JSON_CONTAINS(job_applications.chosen_applicants, ?)", [json_encode($userID)])
            ->get();
    
        $jobHistory = $jobHistory->map(function ($job) use ($userID) {
            $ratings = json_decode($job->ratings, true);
            $job->user_rating = isset($ratings[$userID]) ? $ratings[$userID] : null;
            return $job;
        });
    
        return response()->json($jobHistory);
    }    

}
