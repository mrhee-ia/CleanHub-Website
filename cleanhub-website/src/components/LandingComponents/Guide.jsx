import { Carousel } from 'flowbite-react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../index.css'
import styles from './Guides.module.css'
import SignupImg from '../../assets/images/User-Account-Sign-up.svg'
import ProfileImg from '../../assets/images/Profile-details.svg'
import UIicon from '../../assets/images/UI-icon.avif'
import UIicon2 from '../../assets/images/UI-icon2.jpg'

const Guide = () => {
  return (
    <section className={styles['guide-container']}>
        <header className={styles['guide-header']}>
            <span>HOW TO</span><span>Navigate through CleanHub</span>
        </header>
        <div className={styles['carousel-container']}>
            <Carousel className={styles['Carousel']} slideInterval={5000}>
                <div className={`${styles['carousel-slide']} ${styles['slide1']}`}>
                    <div className={styles['text-container1']}>
                        <p>Step 1:</p>
                        <span>If you're a first-time user, sign up first and complete the registration form to have an account.</span>
                    </div>
                    <img src={SignupImg} />
                </div>
                <div className={`${styles['carousel-slide']} ${styles['slide2']}`}>
                    <img src={ProfileImg} />
                    <div className={styles['text-container2']}>
                        <p>Step 2:</p>
                        <span>Complete your profile by adding relevant details. Provide information that might help you with what you are looking for.</span>
                    </div>
                </div>
                <div className={`${styles['carousel-slide']} ${styles['slide3']}`}>
                    <div className={styles['grid']}>
                        <div className={styles['grid-title']}  style={{paddingLeft:'20px'}}>
                            <p>Step 3:</p>
                            <span style={{fontWeight:'600'}}>HUNTING? BROWSE JOBS!</span>
                        </div>
                        <img src={UIicon} className={styles['UI-icon-title']} />
                    </div>
                    <div className={styles['grid']}>
                        <img src={UIicon} className={styles['UI-icon']} />
                        <span>Use filters to refine your search by: Location, Job type, Pay rate, or Schedule.</span>
                    </div>
                    <div className={styles['grid']}>
                        <img src={UIicon} className={styles['UI-icon']} />
                        <span>Click on a job listing to view more details and see the job description.</span>
                    </div>
                    <div className={styles['grid']}>
                        <img src={UIicon} className={styles['UI-icon']} />
                        <span>Once found a suitable job, click 'Apply Now' and receive an alert when the recruiter responds.</span>
                    </div>
                </div> 
                <div className={`${styles['carousel-slide']} ${styles['slide4']}`}>
                    <div className={styles['grid']}>
                        <div className={styles['grid-title']}  style={{paddingLeft:'20px'}}>
                            <p>Step 3:</p>
                            <span style={{fontWeight:'600'}}>RECRUITING? CREATE A POST!</span>
                        </div>
                        <img src={UIicon2} className={styles['UI-icon-title']} />
                    </div>
                    <div className={styles['grid']}>
                        <img src={UIicon2} className={styles['UI-icon']} />
                        <span>Click the 'Post a Job' and fill in job details including location, description, pay rate, and schedule.</span>
                    </div>
                    <div className={styles['grid']}>
                        <img src={UIicon2} className={styles['UI-icon']} />
                        <span>Specify qualifications or preferences to find the right cleaner.</span>
                    </div>
                    <div className={styles['grid']}>
                        <img src={UIicon2} className={styles['UI-icon']} />
                        <span>Select the most qualified applicants and rate them after according to their job performance.</span>
                    </div>
                </div>
            </Carousel>

        </div>
    </section>
  )
}

export default Guide