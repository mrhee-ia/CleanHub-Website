import styles from './Cards.module.css'
import JobCard from './JobCard'

const CardsContainer = () => {
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