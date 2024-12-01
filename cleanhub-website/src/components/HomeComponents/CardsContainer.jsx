import { useEffect, useRef, useState } from 'react';
import styles from './Cards.module.css'
import JobCard from './JobCard'

const CardsContainer = ({jobs}) => {

  const cardDetailsRefs = useRef([])
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect( () => {
    console.log('bmax: ', maxHeight)
    const heights = cardDetailsRefs.current.map((ref) => ref?.offsetHeight || 0);
    const max = Math.max(...heights);
    setMaxHeight(max);
    console.log('amax: ', maxHeight)
  }, [jobs])
  
  return (
    <section className={styles["job-cards-section"]}>
        {jobs.map( (job, index)=> (
          <JobCard 
            key={job.id} 
            job={job} 
            ref={(element) => (cardDetailsRefs.current[index] = element)}
            maxHeight={maxHeight}
          />
        ))}
    </section>
  )
}

export default CardsContainer