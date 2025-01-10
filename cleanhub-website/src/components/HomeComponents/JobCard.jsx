import React, { useEffect, useState } from 'react'
import {useStateContext} from "../../context/ContextProvider.jsx"
import axiosClient from "../../axios-client.js";
import { Link, useNavigate } from 'react-router-dom'
import styles from './Cards.module.css'
import { FaBookmark, FaRegBookmark, FaGlobeAmericas, FaRegMoneyBillAlt } from 'react-icons/fa'

const JobCard = React.forwardRef(({ job, maxHeight }, ref) => {

    const {currentUser, setUser, token} = useStateContext();
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
                const savedJobs = data.saved
                setIsSaved(savedJobs.includes(job.id))
            })
    }, [job.id, setUser] )

    const handleSaveJob = () => {

        if (!token) {
            navigate('/join-now')
        }

        const savedJobs = Array.isArray(currentUser.saved)
            ? currentUser.saved
            : JSON.parse(currentUser.saved || '[]');
        
        const updatedSavedJobs = isSaved 
            ? savedJobs.filter((id) => id != job.id) // removing from saved jobs
            : [...savedJobs, job.id] // adding to saved jobs

        axiosClient.put('/user/save-job', { saved: updatedSavedJobs })
        .then( ({data}) => {
            setIsSaved(!isSaved)
            setUser(data.user)
        }).catch((error) => {
            console.error("Error saving job:", error);
        });
        
    }

    const truncatedTitle = job.title.length > 60 ? job.title.substring(0, 60) + '...' : job.title;

  return (
    <div className={styles["jobcard"]}>
        <div>
            <div className={styles['card-details']} ref={ref} style={maxHeight > 0 ? {height:`${maxHeight}px`} : {}}>
                <div>
                    <small className={styles['card-category']}>{job.category}</small>
                </div>
                <h3 className={styles["card-title"]}>{truncatedTitle}</h3>
                <h3 className={styles["card-payment"]}><FaRegMoneyBillAlt />{job.payment}</h3>
            </div>
            <div className={styles["line-separator"]}></div>
            <div>
                <small className={styles["card-location"]}><FaGlobeAmericas />{job.city_id}</small>
                <div>
                    <button className={styles["card-view-btn"]}><Link to={`/hub/jobs/${job.id}`}>View</Link></button>
                    <button className={styles["card-save-icon"]} onClick={handleSaveJob}>
                        { isSaved==true ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
})

export default JobCard