import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../../axios-client'
import CardsContainer from '../../components/HomeComponents/CardsContainer'
import PageTitle from '../../components/HomeComponents/PageTitle'
import styles from '../HomePages/HomePages.module.css'

const JobsPage = () => {

    const [jobs, setJobs] = useState([])

    useEffect(() => {
        axiosClient.get(`/jobs`)
            .then( response => {
                setJobs(response.data)
            }).catch(error => {
                console.error("Error fetching jobs:", error);
            })
    }, [])
            
  return (
    <div className='bg-gradient-green job-landing-container'>
        <div className={styles["header-section"]}>
            {/* <!-- Welcome Section --> */}
            <Link to='/join-now'><PageTitle title="Browse Cleaning Jobs!" subtitle="You may sign up or sign in to view each jobs. Just click here." /></Link>
        </div>
        <CardsContainer jobs={jobs}/>
    </div>
  )
}

export default JobsPage