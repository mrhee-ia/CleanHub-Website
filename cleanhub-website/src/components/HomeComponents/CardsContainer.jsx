import { useEffect, useState } from 'react'
import axiosClient from "../../axios-client.js";
import styles from './Cards.module.css'
import JobCard from './JobCard'

const CardsContainer = () => {

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect( () => {
    getJobs();
  }, [])

  const getJobs = () => {
    setLoading(true)
    axiosClient.get('/jobs')
      .then(({data}) => {
        setLoading(false)
        console.log(data)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  
  return (
    <section className={styles["job-cards-section"]}>
        {/* <!-- cards --> */}
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
    </section>
  )
}

export default CardsContainer