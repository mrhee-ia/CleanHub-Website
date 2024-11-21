import styles from './HomePages.module.css'
import PageTitle from '../components/HomeComponents/PageTitle'

const NotificationsPage = () => {
  return (
    <div className={styles["header-section"]}>
      {/* <!-- Welcome Section --> */}
      <PageTitle title="Notifications" subtitle="View notifications to stay updated." />
    </div>
  )
}

export default NotificationsPage