import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Cards.module.css'
import { FaBookmark, FaGlobeAmericas, FaRegMoneyBillAlt } from 'react-icons/fa'

const JobCard = React.forwardRef(({ job, maxHeight }, ref) => {

    const truncatedTitle = job.title.length > 60 ? job.title.substring(0, 60) + '...' : job.title;

  return (
    <div className={styles["jobcard"]}>
        <div>
            <div className={styles['card-details']} ref={ref} style={{ height: maxHeight }} >
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
                    <button className={styles["card-save-icon"]}><FaBookmark /></button>
                </div>
            </div>
        </div>
    </div>
  )
})

export default JobCard