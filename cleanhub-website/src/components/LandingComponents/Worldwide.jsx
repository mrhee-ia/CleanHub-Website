import { useRef, useEffect } from 'react';
import EarthCanvas from './EarthCanvas';
import styles from './Worldwide.module.css';
import { Link } from 'react-router-dom';

const Worldwide = () => {

  const overlayRef = useRef(null);

  useEffect(() => {

    const handleScroll = () => {
      if (overlayRef.current) {
        const { top } = overlayRef.current.getBoundingClientRect();
        if (top < 0.5 * window.innerHeight) {
          overlayRef.current.classList.add(styles['overlay-slide-in']);
        } else {
          overlayRef.current.classList.remove(styles['overlay-slide-in']);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section>
      <div className={styles['main-container']}>
        <div ref={overlayRef} className={styles['overlay']}></div>
        <div className={styles['earth-container']}>
          <EarthCanvas />
        </div>
        <div className={styles['text-container']}>
          <p>
            <span className={styles['worldwide']}>Worldwide</span>— At CleanHub, we are proud to serve a global community of <span className={styles['users-over']}>over <span className={styles['users-number']}>12k</span> users</span> who trust our platform to find and provide reliable cleaning services. Our rapidly expanding network includes individuals, government agencies, businesses, and homeowners from various corners of the world, all coming together to connect and collaborate!
          </p>
        </div>
      </div>
      <div className={styles['homepage-last']}>
        <p>Become a part of the CleanHub community today with trusted thousands of people across the globe—together, let&#39;s build a cleaner, more connected world!</p>
      </div>
      <div className={styles['letsBegin-container']}>
          <Link to='/join-now' className='whiteShadow'>Let's Begin</Link>
        </div>
    </section>
  );
}

export default Worldwide;
