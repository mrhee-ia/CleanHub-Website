import { useEffect, useState } from 'react'
import axiosClient from "../../axios-client.js";
import PageTitle from '../../components/HomeComponents/PageTitle'
import CardsContainer from '../../components/HomeComponents/CardsContainer'
import styles from './HomePages.module.css'
import { FaSearch } from 'react-icons/fa'

const FeedPage = () => {

  const categories = [
    'All', 'Home Cleanup', 'Vacation Home Cleanup', 'Office Cleanup', 'Community Cleanup', 'Other Cleanup'
  ]
  
  const [jobs, setJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, [category, searchTerm]);

  const fetchJobs = () => {
    axiosClient
      .get(`/jobs`, {
        params: {
          category: category == "All" ? null : category,
          search: searchTerm,
        },
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  };

  const handleChangeCategory = (newCategory) => {
    setCategory(newCategory)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <>
      <div className={styles["header-section"]}>
        {/* <!-- Welcome Section --> */}
        <PageTitle title="Hello, Welcome!" subtitle="Browse cleaning jobs to your heart's content!" />
        {/* <!-- Search Bar with Filters --> */}
        <section className={styles["search-bar-section"]}>
          <div className={styles["search-bar"]}>
            <input type="text" placeholder="Type anything to search..." value={searchTerm} onChange={handleSearch} /><button className={styles["filter-button"]}><FaSearch className={styles["filter-icon"]}/></button>
          </div>
        </section>
      </div>
      {/* <!-- Job Categories --> */}
      <section className={styles["job-categories-section"]}>
        <h3>Categories</h3>
        <ul>
          {categories.map( (cat) => (
            <li key={cat}><button onClick={()=>handleChangeCategory(cat)}>{cat}</button></li>
          ) )}
        </ul>
      </section>
      {/* <!-- Job Cards --> */}
      <CardsContainer jobs={jobs}/>
    </>
  )
}

export default FeedPage