import styles from './Cards.module.css'
import ListCard from './ListCard'

const ListsContainer = ({jobs}) => {
  return (
    <div className={styles['list-container']}>
      {jobs.map( (job, index)=> (
        <ListCard
          key={job.id} 
          job={job} 
        />
      ))}
    </div>
  )
}

export default ListsContainer