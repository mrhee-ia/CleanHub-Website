import styles from './Pages.module.css'
import PageTitle from '../components/HomeComponents/PageTitle'

const SavedJobsPage = () => {
  return (
    <div className={styles["header-section"]}>
      {/* <!-- Welcome Section --> */}
      <PageTitle title="Saved Jobs" subtitle="Look back at all the jobs you have saved." />
    </div>
  )
}

export default SavedJobsPage