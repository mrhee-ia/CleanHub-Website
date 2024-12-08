import { useEffect, useState } from 'react';
import axiosClient from "../../axios-client.js";
import styles from './HomePages.module.css'
import PageTitle from '../../components/HomeComponents/PageTitle'
import ListsContainer from '../../components/HomeComponents/ListsContainer'

const JobApplicationsPage = () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axiosClient.get('/jobs/applications')
      .then((response) => {
        setJobs(response.data)
      }).catch((error) => {
        console.error("Error fetching applied jobs:", error);
      }).finally(() => {
        setLoading(false);
      });
  }, [])


  if (loading) return <h1 style={{margin:'20px', color:'white', fontSize:'1.5rem', fontWeight:'600'}}>Loading...</h1>

  return (
    <>
      <div className={styles["header-section"]}>
        {/* <!-- Welcome Section --> */}
        <PageTitle title="Job Applications" subtitle="Track updates of all your job applications." />
      </div>
      <ListsContainer jobs={jobs} postPage={false}/>
    </>
  )
}

export default JobApplicationsPage