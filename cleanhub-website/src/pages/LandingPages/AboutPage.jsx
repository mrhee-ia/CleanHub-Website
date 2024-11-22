import Footer from "../../components/LandingComponents/Footer"
import styles from './About_Help.module.css'
import GoBackButton from '../../components/LandingComponents/GoBackButton'
import profilePic3 from '../../assets/images/profilePic3.avif'
import { FaEye, FaFlag, FaMedal  } from 'react-icons/fa'

const AboutPage = () => {
  return (
    <>
      <section>
        <GoBackButton/>
        <header className={styles['header']}>ABOUT US</header>
        {/* WHY SECTION */}
        <div className={styles['section-container']}>
          <h1>WHY?</h1>
          <p style={{textAlign:'center', color:'var(--green-950)'}}>Why did we make CleanHub?</p>
          <div>
            <p className={styles['why-text']}>At CleanHub, we believe that finding quality cleaning services and connecting with job opportunities should be simple and accessible. Many people, whether government entities, businesses, or homeowners, face difficulties in finding trustworthy and reliable cleaners for their specific needs. Traditional hiring methods can be time-consuming, lack transparency, and often fail to provide a quick solution. On the other hand, there are many individuals who seek flexible, short-term work but struggle to find reliable platforms that connect them with such opportunities.</p>
          </div>
        </div>
        {/* WHAT SECTION */}
        <div className={styles['section-container']}>
          <h1>WHAT?</h1>
          <p style={{textAlign:'center', color:'var(--green-950)'}}>What do we propose as solution?</p>
          <div className={styles['what-container']}>
            <div className={styles['box']}>
              <FaEye className={styles['icon']}></FaEye>
              <h3>VISION</h3>
              <div></div>
              <p>To be the leading platform for connecting communities, organization, and individuals with reliable cleaning services, creating cleaner and healthier environments while empowering job seekers with opportunities and also promoting economic growth while supporting local communities.</p>
            </div>
            <div className={styles['box']}>
              <FaFlag className={styles['icon']}></FaFlag>
              <h3>MISSION</h3>
              <div></div>
              <p>To bridge the gap between those in need of cleaning services and individuals seeking flexible work by providing an intuitive, secure, and efficient platform. We aim to build trust, reliability, and convenience, ensuring a positive and rewarding experience for both service seekers and providers.</p>
            </div>
            <div className={styles['box']}>
              <FaMedal className={styles['icon']}></FaMedal>
              <h3>GOALS</h3>
              <div></div>
              <p>To create a trusted platform that connects job seekers with recruiters through secure systems, offering flexible opportunities and high-quality services. We aim to expand our reach by partnering with communities, businesses, and goverments increasing job availability across regions.</p>
            </div>
          </div>
        </div>
        {/* WHO SECTION */}
        <div className={styles['section-container']}>
          <h1>WHO?</h1>
          <p style={{textAlign:'center', color:'var(--green-950)'}}>Meet the Person behind CleanHub</p>
          <div className={styles['who-container']}>
            <div className={styles['team-member']}>
              <div className={styles['profile']}>
                <div className={styles['profile-pic']}><img src={profilePic3} /></div>
                <h3>Ma. Cristina M. Pasague</h3>
                <h4><i>Software Engineer</i></h4>
                <p className={styles['description']}>Cristina is a skilled software engineer and a technology expert specializing in backend development. She has contributed to several big open-source projects.</p>
                <div className={styles['br']}></div>
              </div>
              <div className={styles['profile-details']}>
                <span>Education: </span><p>Master's in Software Engineering, NORSU</p>
                <span>Email: </span><p>mcristina@gmail.com</p>
                <span>Address: </span><p>123 Clean Street, Dumaguete City, PH</p>
                <span>Company: </span><p>Example Corporation</p>
              </div>
            </div>
          </div>
        </div>
        <h1 className={styles['last-greetings']}>THANK YOU!</h1>
      </section>
      <Footer/>
    </>
  )
}

export default AboutPage