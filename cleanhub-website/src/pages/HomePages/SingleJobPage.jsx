import { useEffect, useState } from 'react'
import axiosClient from "../../axios-client.js";
import styles from './HomePages.module.css'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaBookmark } from 'react-icons/fa'

const SingleJobPage = () => {

    const { jobId } = useParams(); // retrieve jobId that was passed from URL
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true); // to prevent accessing null value when the job is not yet loaded

    useEffect( () => {
        setLoading(true);
        axiosClient.get(`/jobs/${jobId}`)
        .then( (response) => {
            setJob(response.data);
        }).catch((error) => {
            console.error('There was an error fetching the job data:', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [jobId])

    if (loading) {
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
            <button className={styles["applyNow-btn"]}>Click Here to Apply Now!</button>
            <button className={styles["save-btn"]}><FaBookmark/></button>
        </div>
    </div>
  )
}

export default SingleJobPage