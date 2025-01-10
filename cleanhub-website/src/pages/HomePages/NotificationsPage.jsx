import React, { useState, useEffect } from "react"
import axiosClient from "../../axios-client.js"
import { Link } from 'react-router-dom'
import styles from './HomePages.module.css'
import style from '../../components/HomeComponents/Cards.module.css';
import PageTitle from '../../components/HomeComponents/PageTitle'
import { FaCircle } from "react-icons/fa";

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

const NotificationsPage = () => {

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    axiosClient.get('/notifications')
    .then(
      ({data}) => {setNotifications(data || [])}
    ).catch((error) => {console.error("Error fetching notifications:", error)})
  }, [])

  return (
    <>
      <div className={styles["header-section"]}>
        {/* <!-- Welcome Section --> */}
        <PageTitle title="Notifications" subtitle="View notifications to stay updated." />
      </div>
      <div className={style['list-container']}>
        {
          notifications.map((notification) => (
            <div className={`${style['jobcard']} ${style['listcard']} ${styles['notif-card']}`} key={notification.id}>
              <i>
                <p className={styles['notif-subtitle']}><FaCircle/><strong>{notification.message}</strong> 
                  {notification.notification_type == 3 && 'You have been selected to work for the job :'}
                  {notification.notification_type == 1 && 'Your job recruit was posted :'}
                </p>
              </i>
              <p className={styles['notif-title']}>{notification.job_title}</p>
              <div>
                <small><Link to={`/hub/jobs/${notification.job_id}`}>Click here to view full job details.</Link></small>
                <small><i>{formatDateTime(notification.created_at)}</i></small>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default NotificationsPage