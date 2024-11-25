import { useEffect, useState } from 'react'
import axiosClient from "../../axios-client.js";
import styles from './HomePages.module.css'
import PageTitle from '../../components/HomeComponents/PageTitle'
import CardsContainer from '../../components/HomeComponents/CardsContainer'
import { FaSearch } from 'react-icons/fa'

const FeedPage = () => {

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
    <>
      <div className={styles["header-section"]}>
        {/* <!-- Welcome Section --> */}
        <PageTitle title="Hello, Welcome!" subtitle="Browse cleaning jobs to your heart's content!" />
        {/* <!-- Search Bar with Filters --> */}
        <section className={styles["search-bar-section"]}>
          <div className={styles["search-bar"]}>
            <input type="text" placeholder="Type anything to search..." />
            <button className={styles["filter-button"]}><FaSearch className={styles["filter-icon"]}/></button>
          </div>
        </section>
      </div>
      {/* <!-- Job Categories --> */}
      <section className={styles["job-categories-section"]}>
        <h3>Categories</h3>
        <ul>
          <li><a href="/category/all">All</a></li>
          <li><a href="/category/home">Home Cleanup</a></li>
          <li><a href="/category/vacation-home">Vacation Home Cleanup</a></li>
          <li><a href="/category/office">Office Cleanup</a></li>
          <li><a href="/category/garden">Garden Cleanup</a></li>
          <li><a href="/category/community">Community Cleanup</a></li>
        </ul>
      </section>
      {/* <!-- Job Cards --> */}
      <CardsContainer jobs={jobs}/>
    </>
  )
}

export default FeedPage