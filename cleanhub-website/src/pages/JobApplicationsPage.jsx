import styles from './HomePages.module.css'
import PageTitle from '../components/HomeComponents/PageTitle'

const JobApplicationsPage = () => {
  return (
    <div className={styles["header-section"]}>
      {/* <!-- Welcome Section --> */}
      <PageTitle title="Job Applications" subtitle="Track updates of all your job applications." />
    </div>
  )
}

export default JobApplicationsPage