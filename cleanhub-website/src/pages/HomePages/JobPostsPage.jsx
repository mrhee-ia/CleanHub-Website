import styles from './HomePages.module.css'
import PageTitle from '../../components/HomeComponents/PageTitle'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

const JobPostsPage = () => {
  return (
    <div className={styles["header-section"]}>
      {/* <!-- Welcome Section --> */}
      <PageTitle title="Job Posts" subtitle="See all the jobs you have posted." />
      <section className={styles["search-bar-section"]}>
        <div className={styles["post-bar-section"]}>
          <Link to='/hub/create-job' className={styles["post-bar-button"]} ><FaPlus />Post A Job</Link>
        </div>
      </section>
    </div>
  )
}

export default JobPostsPage