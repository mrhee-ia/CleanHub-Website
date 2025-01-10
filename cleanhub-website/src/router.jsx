import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import LandingPage from "./pages/LandingPages/LandingPage"
import AboutPage from "./pages/LandingPages/AboutPage"
import HelpPage from "./pages/LandingPages/HelpPage"
import JobsPage from "./pages/LandingPages/JobsPage";
import RegisterLoginPage from "./pages/LandingPages/RegisterLoginPage"
import FeedPage from "./pages/HomePages/FeedPage"
import ProfilePage from "./pages/HomePages/ProfilePage"
import SavedJobsPage from "./pages/HomePages/SavedJobsPage";
import JobApplicationsPage from "./pages/HomePages/JobApplicationsPage"
import JobPostsPage from "./pages/HomePages/JobPostsPage"
import NotificationsPage from "./pages/HomePages/NotificationsPage"
import SingleJobPage from "./pages/HomePages/SingleJobPage";
import CreateJobPage from "./pages/HomePages/CreateJobPage"
import ApplicantsPage from "./pages/HomePages/ApplicantsPage"
import ProcessedApplicants from "./pages/HomePages/ProcessedApplicants";
import AdminPanel from "./pages/AdminPanel/AdminPanel";


const router = createBrowserRouter([
    {
        path: '/hub',
        element: <DefaultLayout />,
        children: [
            {
                path: '/hub',
                element: <Navigate to="/hub/feed"/>
            },
            {
                path: '/hub/feed',
                element: <FeedPage />
            },
            {
                path: '/hub/profile',
                element: <ProfilePage />
            },
            {
                path: '/hub/saved-jobs',
                element: <SavedJobsPage />
            },
            {
                path: '/hub/job-applications',
                element: <JobApplicationsPage />
            },
            {
                path: '/hub/job-posts',
                element: <JobPostsPage />
            },
            {
                path: '/hub/notifications',
                element: <NotificationsPage />
            },
            {
                path: '/hub/jobs/:jobId',
                element: <SingleJobPage />
            },
            {
                path: '/hub/create-job',
                element: <CreateJobPage />
            },
            {
                path: '/hub/jobs/:jobId/applicants',
                element: <ApplicantsPage />
            },
            {
                path: '/hub/jobs/:jobId/processed-applicants',
                element: <ProcessedApplicants />
            }
        ]
    },
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/join-now',
        element: <RegisterLoginPage />
    },
    {
        path: '/about-us',
        element: <AboutPage />
    },
    {
        path: '/help',
        element: <HelpPage />
    },
    {
        path: '/jobs-landing',
        element: <JobsPage/>
    },
    {
        path: '/admin-panel',
        element: <AdminPanel/>
    },
])

export default router;
