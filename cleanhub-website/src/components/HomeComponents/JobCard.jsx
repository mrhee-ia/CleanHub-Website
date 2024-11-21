import { Link } from 'react-router-dom'
import styles from './Cards.module.css'
import { FaBookmark, FaGlobeAmericas, FaRegMoneyBillAlt } from 'react-icons/fa'

const JobCard = () => {
  return (
    <div className={styles["jobcard"]}>
        <div>
            <div>
                <small className={styles['card-category']}>Community Cleanup</small>
            </div>
            {/* <div>
                <img src="https://mangotiger.com/wp-content/uploads/2020/05/IMG_8423-1024x768.jpg" alt="" />
            </div> */}
            <h3 className={styles["card-title"]}>Operation: Cleaning Program Towards Community Progress</h3>
            <h3 className={styles["card-payment"]}><FaRegMoneyBillAlt />$2000</h3>
            <div className={styles["line-separator"]}></div>
            <div>
                <small className={styles["card-location"]}><FaGlobeAmericas />Metro Manila, PH</small>
                <div>
                    <button className={styles["card-view-btn"]}><Link to='/hub/jobs/1'>View</Link></button>
                    <button className={styles["card-save-icon"]}><FaBookmark /></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default JobCard