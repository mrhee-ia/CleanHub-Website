import {useStateContext} from "../context/ContextProvider.jsx"
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axiosClient from "../axios-client.js";
import styles from './HomePages.module.css'
import cities from '../../cities.json';
import {
  FaQuoteLeft,
  FaTable,
  FaBookOpen,
  FaRegListAlt,
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaCalendarAlt, 
  FaRegMoneyBillAlt,
  FaCamera,
  FaTimes} 
  from 'react-icons/fa'

const CreateJobPage = () => {

  const {currentUser, setUser} = useStateContext()
  const [selectedCity, setSelectedCity] = useState('1701668');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  }, [])

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className={styles['container']}>
      <h1 className={styles['page-title']} style={{textAlign: 'center'}}>Post a New Job</h1>
      <form action="" className={styles['post-form']}>
        <label htmlFor="jobTitle"><FaQuoteLeft />Job Title</label>
        <input type="text" name="job-title" placeholder="Enter job title" maxLength="101"/>
        <label htmlFor="jobCategory"><FaTable />Job Category</label>
        <select value={selectedCategory} onChange={handleCategoryChange} name="job-category">
          <option value="" disabled>Select a category</option>
          <option value="home-cleanup">Home Cleanup</option>
          <option value="vacation-home-cleanup">Vacation Home Cleanup</option>
          <option value="office-cleanup">Office Cleanup</option>
          <option value="garden-cleanup">Garden Cleanup</option>
          <option value="community-cleanup">Community Cleanup</option>
        </select>
        <label htmlFor="jobDescription"><FaBookOpen />Job Description</label>
        <textarea
          name="job-description"
          rows="5"
          placeholder="Describe the job in detail..."></textarea>
        <input type="hidden" name='job-employer' value={currentUser.full_name} />
        <input type="hidden" name='job-employercontact' value={currentUser.email} />
        <label htmlFor="jobQualifications"><FaRegListAlt />Job Qualifications</label>
        <textarea
          name="job-qualifications"
          rows="6"
          placeholder="List qualifications required for this job..."></textarea>        
        <label><FaGlobeAmericas />Location (City, Country)</label>
        <select value={selectedCity} onChange={handleCityChange} name='job-location'>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {`${city.name}, ${city.country}`}
            </option>
          ))}
        </select>
        <label htmlFor="jobFullLocation"><FaMapMarkerAlt />Complete Address</label>
        <input type="text" name="job-fulladdress" placeholder="Enter the complete and full address" />
        <label htmlFor="jobSchedule"><FaCalendarAlt />Job Schedule</label>
        <input type="text" name="job-schedule" placeholder="e.g., January 1, 2025 9:00 AM - 5:00 PM" />
        <label htmlFor="jobPayment"><FaRegMoneyBillAlt />Job Payment</label>
        <input type="number" name="job-payment" placeholder="Enter payment amount" />
        <label htmlFor="jobPayment"><FaCamera />Upload Media</label>
        <label className={styles["file-input-label"]}>
          Click here to choose files
          <input type="file" name="job-media" accept="image/*" multiple className={styles["file-input"]} />
        </label>
        <div>
          <Link to='/hub/job-posts' className={styles["cancel-btn"]}><FaTimes />Cancel</Link>
          <button type="submit" name='post-job-btn'>Post Job</button>
        </div>
      </form>
    </div>
  )
}

export default CreateJobPage