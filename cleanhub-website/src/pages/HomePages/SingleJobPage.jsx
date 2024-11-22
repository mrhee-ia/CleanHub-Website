import styles from './HomePages.module.css'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaBookmark } from 'react-icons/fa'
import { useState } from 'react'

const SingleJobPage = () => {


  return (
    <div className={`${styles["single-job-container"]} ${styles["container"]}`}>
        <h1 className={styles["job-title"]}>Operation: Cleaning Program Towards Community Progress</h1>
        <h3 className={styles["job-category"]}>Community Cleanup</h3>
        <label>Description</label>
        <p className={styles["job-description"]}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <label>Employer</label>
        <p className={styles["job-employer"]}>Ma. Cristina Pasague</p>
        <label>Employer's Contact</label>
        <p className={styles["job-employer-contact"]}>deisaki@test.com</p>
        <label>Qualifications</label>
        <p className={styles["job-qualifications"]}>
            Minimum of 1 year in professional cleaning services.<br/>
            Familiarity with handling cleaning equipment and products.<br/>
            High school diploma or equivalent.<br/>
            Strong attention to detail and commitment to cleanliness.<br/>
            Ability to lift and carry up to 30 lbs.<br/>
            Capability to stand, bend, and kneel for extended periods.<br/>
            Reliable and punctual with a professional demeanor.<br/>
            Able to work as part of a team.
        </p>
        <div className={styles["job-details"]}>
            <div>
                <label>Location</label>
                <p className={styles["job-location"]}>Block 123 Main Street, Brgy. Sample, Cityville</p>
            </div>
            {/* <div className={styles["bar"]}></div> */}
            <div>
                <label>Schedule</label>
                <p className={styles["job-schedule"]}>November 27, 2024 2:00 PM - 5:00 PM</p>
            </div>
            {/* <div className={styles["bar"]}></div> */}
            <div>
                <label>Payment</label>
                <p className={styles["job-payment"]}>$200/hour</p>
            </div>
        </div>

        <div className={styles["job-media"]}>
            <h3>Gallery</h3>
            <div className={styles["media"]}>
                <img src="https://mangotiger.com/wp-content/uploads/2020/05/IMG_8423-1024x768.jpg"/>
                <img src="https://i.natgeofe.com/k/3519980b-ba58-456d-b691-2ed516c223e0/clean-it-up-textimage_3x2.jpg"/>
                <img src="https://isfcambodia.org/wp-content/uploads/2021/11/LSP-Cleanup-Crop.png"/>
                <img src="https://ruh.ac.lk/images/beachclean/DSC07819.JPG"/>
                <img src="https://pearlprotectors.org/wp-content/uploads/2022/06/35050495_200986497392815_8720043887428632576_n.jpg"/>
                <img src="https://www.manipal.edu/content/dam/manipal/mu/mcon/Images/news_images/IMG-20191005-WA0015.jpg"/>
                <img src="https://isfcambodia.org/wp-content/uploads/2021/11/LSP-Cleanup-Crop.png"/>
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