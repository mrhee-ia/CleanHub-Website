import { NavLink, Link } from 'react-router-dom'
import styles from './Footer.module.css'
import { 
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaEnvelope,
    FaPhone,
    FaLocationArrow
} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className={styles["footer-container"]}>
        {/* <!-- About CleanHub Section --> */}
        <div className={styles['about']}>
                <h4>About CleanHub</h4>
                <p>CleanHub bridges the gap between recruiters and job hunters looking for cleaning services. We aim to create a trusted community where both parties can benefit from seamless hiring and task completion.</p>
        </div>
        <div className={styles["footer-content"]}>

            {/* <!-- Quick Links Section --> */}
            <div className={`${styles['footer-section']} ${styles['links']}`}>
                <h4>Quick Links</h4>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to=''>Browse Jobs</NavLink></li>
                    <li><NavLink to='/about-us'>About Us</NavLink></li>
                    <li><NavLink to='/help'>Get Help</NavLink></li>
                </ul>
            </div>

            {/* <!-- Contact Information Section --> */}
            <div className={`${styles['footer-section']} ${styles['contacts']}`}>
                <h4>Contact Us</h4>
                <p><FaEnvelope style={{marginTop: '3px', marginRight: '6px'}}></FaEnvelope>support@cleanhub.com</p>
                <p><FaPhone style={{marginTop: '3px', marginRight: '6px'}}></FaPhone>+1 234 567 890</p>
                <p><FaLocationArrow style={{marginTop: '3px', marginRight: '6px'}}></FaLocationArrow>123 CleanHub St, Dumaguete, PH</p>
            </div>

            {/* <!-- Social Media Section --> */}
            <div className={`${styles['footer-section']} ${styles['socialMedia']}`}>
                <h4>Follow Us</h4>
                <div className={styles["social-icons"]}>
                    <a target="_blank" rel="noopener noreferrer" href='https://www.facebook.com/ma.cristina.pasague/'><FaFacebook/></a>
                    <a target="_blank" rel="noopener noreferrer" href='https://x.com/mria_louella?t=Lf7YgXm7R8LsnqJdtTbg4w&s=09'><FaTwitter/></a>
                    <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/mriasteena/'><FaInstagram/></a>
                    <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/login'><FaLinkedin/></a>
                </div>
            </div>
        </div>

        {/* <!-- Footer Bottom --> */}
        <div className={styles["footer-bottom"]}>
            <p>&copy; 2024 CleanHub. All Rights Reserved. | <Link to="#">Privacy Policy</Link> | <Link to="#">Terms of Service</Link></p>
        </div>
    </div>

  )
}

export default Footer