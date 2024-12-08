import { useEffect, useState } from 'react'
import axiosClient from "../../axios-client.js";
import styles from './HomePages.module.css'
import PageTitle from '../../components/HomeComponents/PageTitle'
import CardsContainer from '../../components/HomeComponents/CardsContainer'

const SavedJobsPage = () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get('/user/saved-jobs')
      .then(({data}) => setJobs(data.saved_jobs || []))
      .catch((err) => console.error("Error fetching saved jobs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className={styles["header-section"]}>
        {/* <!-- Welcome Section --> */}
        <PageTitle title="Saved Jobs" subtitle="Look back at all the jobs you have saved." />
      </div>
      {loading ? (<h1 style={{margin:'20px', color:'white', fontSize:'1.5rem', fontWeight:'600'}}>Loading...</h1>)
      : (<CardsContainer jobs={jobs} />)}
    </>
  )
}

export default SavedJobsPage