import { useEffect, useState } from 'react'
import {useStateContext} from "../../context/ContextProvider.jsx"
import axiosClient from "../../axios-client.js";
import styles from './HomePages.module.css'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaBookmark, FaRegBookmark } from 'react-icons/fa'

const SingleJobPage = () => {

    const { jobId } = useParams(); // retrieve jobId that was passed from URL
    const [job, setJob] = useState(null);
    const {currentUser, setUser} = useStateContext();
    const [loading, setLoading] = useState(true); // to prevent accessing null value when the job is not yet loaded
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.get(`/jobs/${jobId}`);
                setJob(response.data);
            } catch (error) {
                console.error('Error fetching the job data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [jobId]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axiosClient.get('/user');
                setUser(data);
    
                // Check if the job is saved
                const savedJobs = Array.isArray(data.saved)
                    ? data.saved
                    : JSON.parse(data.saved || '[]');
                setIsSaved(savedJobs.includes(parseInt(jobId, 10)));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [jobId, setUser]);

    const isJobOwner = currentUser && job && currentUser.id === job.user.id;

    const handleCloseApplication = () => {
        axiosClient.put(`/jobs/${jobId}/update`, { application_status: false })
            .then((response) => {
                setJob({ ...job, application_status: false });
                console.log(response)
            })
            .catch((error) => {
                console.error("Error updating application status:", error);
            });
    }

    const handleApplyNow = () => {
        axiosClient.post(`/jobs/${jobId}/apply`)
            .then((response) => {
                alert(response.data.message)
            }).catch((error) => {
                console.error("Error applying for the job:", error);
                alert(error.response?.data?.message || "An error occurred while applying for the job.");
            });
    }

    const handleSaveJob = () => {
        const savedJobs = Array.isArray(currentUser.saved)
            ? currentUser.saved.map((id) => parseInt(id, 10))
            : JSON.parse(currentUser.saved || '[]').map((id) => parseInt(id, 10))

        const updatedSavedJobs = isSaved 
            ? savedJobs.filter((id) => id != jobId) // removing from saved jobs
            : [...savedJobs, parseInt(jobId, 10)] // adding to saved jobs

            console.log("updated jobs: " + updatedSavedJobs)

        axiosClient.put('/user/save-job', { saved: updatedSavedJobs })
            .then( ({data}) => {
                setIsSaved(!isSaved)
                setUser(data.user)
                console.log('saved jobs: ' + data.saved)
            }).catch((error) => {
                console.error("Error saving job:", error);
                alert("An error occurred while saving the job.");
            });
    }

    if (loading || !job) {
        return <h1 style={{margin:'20px', color:'white', fontSize:'1.5rem', fontWeight:'600'}}>Loading...</h1>;
    }

  return (
    <div className={`${styles["single-job-container"]} ${styles["container"]}`}>
        <h1 className={styles["job-title"]}>{job.title}</h1>
        <h3 className={styles["job-category"]}>{job.category}</h3>
        <label>Description</label>
        <p className={styles["job-description"]} style={{ whiteSpace: 'pre-line' }}>{job.description}</p>
        <label>Employer</label>
        <p className={styles["job-employer"]}>{job.user.full_name}</p>
        <label>Employer's Contact</label>
        <p className={styles["job-employer-contact"]}>{job.user.email}</p>
        <label>Qualifications</label>
        <p className={styles["job-qualifications"]} style={{ whiteSpace: 'pre-line' }}>{job.qualifications}</p>
        <div className={styles["job-details"]}>
            <div>
                <label>Location</label>
                <p className={styles["job-location"]}>{job.full_address}</p>
            </div>
            <div>
                <label>Schedule</label>
                <p className={styles["job-schedule"]}>{job.schedule}</p>
            </div>
            <div>
                <label>Payment</label>
                <p className={styles["job-payment"]}>{job.payment}</p>
            </div>
        </div>
        <div className={styles["job-media"]}>
            <h3>Gallery</h3>
            <div className={styles["media"]}>
                {
                    job.media_paths.map( (path, index) => (
                        <img 
                            key={index}
                            src={`${import.meta.env.VITE_API_BASE_URL}/storage/${path}`}
                            alt={`Job Media ${index + 1}`}
                            className={styles["job-image"]}
                        />
                    ))
                }
            </div>
        </div>

        {/* <!-- Action Buttons --> */}
        <h3>Actions</h3>
        <div className={styles["btn-group"]}>
            <Link to="/hub/feed" className={styles["back-btn"]}><FaArrowLeft/></Link>
            {isJobOwner ? 
                (
                job.application_status && job.approved_status ? 
                    <button className={styles["applyNow-btn"]} onClick={handleCloseApplication}>Click Here to Close Application</button> : null
                ) : 
                (
                <button className={styles["applyNow-btn"]} 
                    style={job.application_status ? {display:'unset'} : {display:'none'} }
                    onClick={handleApplyNow}
                    >Click Here to Apply Now
                </button>
                ) 
            }
            <button className={styles["save-btn"]} onClick={handleSaveJob}>
                {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
        </div>
    </div>
  )
}

export default SingleJobPage