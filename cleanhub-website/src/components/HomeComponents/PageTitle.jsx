import styles from './Cards.module.css'

const PageTitle = ({title, subtitle}) => {
  return (
    <section className={styles["welcome-section"]}>
        <h2>{title}</h2>
        <p>{subtitle}</p>
    </section>
  )
}

export default PageTitle