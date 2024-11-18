import { useState, useEffect } from 'react'
import {NavLink, Link} from 'react-router-dom'
import styles from './Banner.module.css'
import logoImg from '../../assets/images/logo.jpg'
import bannerImg from '../../assets/images/bannerImg.png'
import { FaBars } from 'react-icons/fa'

const Banner = () => {

  const [isMenuClicked, setMenuClicked] = useState(false);
  const [isMobileSized, setIsMobileSized] = useState(false);

  const checkScreenSize = () => {
    const isMobile = window.innerWidth <= 700;
    setIsMobileSized(isMobile);
  };

  useEffect(() => {
    // Initial check
    checkScreenSize();
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleClick = (event) => {
    setMenuClicked(!isMenuClicked);
  };

  return (
    <section className={styles['banner-section']}>
        <nav className={styles['banner-nav']}>
          {/* LOGO */}
          <div className={styles['logo-container']}>
            <img src={logoImg} />
            <span>CleanHub</span>
          </div>
          {/* BUTTONS */}
          <div className={styles['buttons-container']}>
            <NavLink to="/jobs-landing" className={styles['button']}>Jobs</NavLink>
            <NavLink to="/help" className={styles['button']}>Help</NavLink>
            <NavLink to="/about-us" className={styles['button']}>About</NavLink>
            <NavLink to="/join-now" className={`${styles['button']} ${styles['main-button']}`}>Join Now!</NavLink>
          </div> 
          {/* For mobile buttons */}
          {isMobileSized && (
          <div className={styles['buttons-container']} style={{display: isMenuClicked ? 'flex':'none'}}>
            <NavLink to="/jobs-landing" className={styles['button']}>Jobs</NavLink>
            <NavLink to="/help" className={styles['button']}>Help</NavLink>
            <NavLink to="/about-us" className={styles['button']}>About</NavLink>
            <button className={styles['button']} onClick={(event) => handleClick(event)}>Close</button>
          </div>)}
          {isMobileSized && (
            <div className={styles['ForBar-container']}>
              <NavLink to="/join-now" className={`${styles['button']} ${styles['main-button']}`}>Join Now!</NavLink>
              <button onClick={(event) => handleClick(event)}><FaBars className={styles['FaBars']}></FaBars></button>
            </div>
          )}
        </nav>
        <div className={styles['article-container']}>
            <article className={styles['banner-article']}>
              <h1 className={styles['banner-h1']}>"Spark Up Spaces to Power Up Careers — Jobs and Cleaners, <span>Perfectly Matched!</span>"</h1>
              <p className={styles['banner-p']}>Welcome to <span className={styles['banner-span']}>CleanHub</span>, an online community that easily connects job hunters with flexible cleaning gigs. Are you a government agency looking to maintain public spaces? Private homeowner in need of a tidy vacation house? Someone seeking short-term work with fast pay? CleanHub got you covered! Post or find cleaning jobs effortlessly, and get tasks done on your schedule.</p>
              <div className={styles['letsBegin-container']}>
                <button className='whiteShadow'><Link to='/join-now'>Let's Begin</Link></button>
              </div>
            </article>
            <div className={styles['bannerImg-container']}>
              <img src={bannerImg} />
            </div>
        </div>

    </section>
  )
}

export default Banner