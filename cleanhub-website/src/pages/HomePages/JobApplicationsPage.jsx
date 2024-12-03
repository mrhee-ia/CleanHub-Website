import { useEffect, useState } from 'react';
import axiosClient from "../../axios-client.js";
import styles from './HomePages.module.css'
import PageTitle from '../../components/HomeComponents/PageTitle'
import ListsContainer from '../../components/HomeComponents/ListsContainer'



const JobApplicationsPage = () => {
  return (
    <>
      <div className={styles["header-section"]}>
        {/* <!-- Welcome Section --> */}
        <PageTitle title="Job Applications" subtitle="Track updates of all your job applications." />
      </div>
    </>
  )
}

export default JobApplicationsPage