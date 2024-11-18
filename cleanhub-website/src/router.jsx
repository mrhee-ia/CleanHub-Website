import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/defaultLayout";
import LandingPage from "./pages/LandingPage"
import AboutPage from "./pages/AboutPage"
import HelpPage from "./pages/HelpPage"
import RegisterLoginPage from "./pages/RegisterLoginPage"
import FeedPage from "./pages/FeedPage"
import ProfilePage from "./pages/ProfilePage"
import SavedJobsPage from "./pages/SavedJobsPage";
import JobApplicationsPage from "./pages/JobApplicationsPage"
import JobPostsPage from "./pages/JobPostsPage"
import NotificationsPage from "./pages/NotificationsPage"
import SingleJobPage from "./pages/SingleJobPage";


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
                path: '/hub/jobs/1',
                element: <SingleJobPage />
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
    // {
    //     path: '*',
    //     element: <NotFound />
    // }
])

export default router;
