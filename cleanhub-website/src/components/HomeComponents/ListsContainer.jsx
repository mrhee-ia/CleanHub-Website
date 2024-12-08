import styles from './Cards.module.css'
import ListCard from './ListCard'

const ListsContainer = ({jobs, postPage}) => {
  return (
    <div className={styles['list-container']}>
      {jobs.map( (job, index)=> (
        <ListCard
          key={job.id} 
          job={job}
          postPage={postPage} 
        />
      ))}
    </div>
  )
}

export default ListsContainer