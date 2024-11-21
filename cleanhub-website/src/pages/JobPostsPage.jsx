import styles from './HomePages.module.css'
import PageTitle from '../components/HomeComponents/PageTitle'
import { FaPlus } from 'react-icons/fa'

const JobPostsPage = () => {
  return (
    <div className={styles["header-section"]}>
      {/* <!-- Welcome Section --> */}
      <PageTitle title="Job Posts" subtitle="See all the jobs you have posted." />
      <section className={styles["search-bar-section"]}>
        <div className={styles["post-bar-section"]}>
          <button><FaPlus />Post A Job</button>
        </div>
      </section>
    </div>
  )
}

export default JobPostsPage