import styles from './Features.module.css'
import { FaCheck } from "react-icons/fa"

const Features = () => {
  return (
    <section className={styles['features-section']}>
        {/* HEADING */}
        <header className={styles['features-header']}>
            <span>DISCOVER</span><span>Platform Features</span>
        </header>
        <div className={styles['main-grid']}>
            {/* RECRUITERS */}
            <div className={styles['col1']}>
                <h2>RECRUITERS</h2>
                <ul>
                    {[
                    "Create job listings easily for specific cleaning tasks to recruit the right cleaner",
                    "View and manage all posted jobs, applications, and hired cleaners in one place",
                    "Screen applicants based on qualifications, location, and ratings to find the best match",
                    "Receive notifications when someone applies for your job or when a cleaner is available nearby"
                    ].map((text, index) => (
                    <li key={index} className={styles['features-items']}>
                        <FaCheck className={styles['FaCheck']}/>
                        <span>{text}</span>
                    </li>
                    ))}
                </ul>
            </div>
            {/* GENERAL */}
            <div className={styles['col2']}>
                <h2>GENERAL</h2>
                <ul>
                    {[
                    "Ensure safety and trust with user verification for both recruiters and job hunters",
                    "Use location-based filtering to connect recruiter and hunters nearby",
                    "Access all features on the go including job posting, browsing, managing, and tracking",
                    "Keep track of all past jobs or applications for both recruiters and job hunters",
                    "Get assistance with job disputes or platform-related questions through customer support",
                    "Both recruiters and job hunters can rate and review each other, fostering a trusted community"
                    ].map((text, index) => (
                    <li key={index} className={styles['features-items']}>
                        <FaCheck className={styles['FaCheck']}/>
                        <span>{text}</span>
                    </li>
                    ))}
                </ul>
            </div>
            {/* JOB HUNTERS */}
            <div className={styles['col3']}>
                <h2>JOB HUNTERS</h2>
                <ul>
                    {[
                    "Search for available cleaning tasks by location, type, pay rate, schedule, and urgency with ease",
                    "Quick application process for jobs that suit your skills and availability",
                    "Build a profile showcasing your cleaning experience, ratings, and past work for credibility",
                    "Get notifications when new jobs that match your preferences are posted in your area"
                    ].map((text, index) => (
                    <li key={index} className={styles['features-items']}>
                        <FaCheck className={styles['FaCheck']}/>
                        <span>{text}</span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
  )
}

export default Features