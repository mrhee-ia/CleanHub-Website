import { Link } from 'react-router-dom'
import styles from './Cards.module.css'
import { FaHourglassHalf } from "react-icons/fa"

const formatDateTime = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return new Date(dateString).toLocaleString(undefined, options);
};

const ListCard = ({job, postPage}) => {

  const truncatedTitle = job.title.length > 60 ? job.title.substring(0, 60) + '...' : job.title;

  return (
    <div className={`${styles['jobcard']} ${styles['listcard']}`}>
      <div className={styles["list-job-status"]}>
        <div>
          <small className={job.application_status ? styles["status-open"] : styles["status-closed"]}>
            {job.application_status ? "Application Open" : "Application Closed"}
          </small>
          {postPage ? 
            (job.approved_status ? null : <small className={styles["status-pending"]}><FaHourglassHalf/>Pending...</small>) : null}
        </div>
        <small>{formatDateTime(job.created_at)}</small>
      </div>
      <div className={styles["list-job-info"]}>
        <span className={styles["list-job-title"]}>{truncatedTitle}</span>
      </div>
      <div className={styles["list-card-actions"]}>
        <Link to={`/hub/jobs/${job.id}`} className={styles["view-job-btn"]}>View Job</Link>
        {postPage && 
        <Link to={`/hub/jobs/${job.id}/applicants`} className={styles["view-applicants-btn"]}>List of Applicants</Link>}
      </div>
    </div>
  )
}

export default ListCard