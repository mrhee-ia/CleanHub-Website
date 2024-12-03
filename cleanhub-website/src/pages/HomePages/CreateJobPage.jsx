import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axiosClient from "../../axios-client.js";
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

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    qualifications: '',
    city_id: 'Manila, PH',
    full_address: '',
    schedule: '',
    payment: '',
  })

  const mediaRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData, [name]: value,
    }))
  }

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert File list to Array
    setSelectedFiles(files);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('category', formData.category);
    payload.append('description', formData.description);
    payload.append('qualifications', formData.qualifications);
    payload.append('city_id', formData.city_id);
    payload.append('full_address', formData.full_address);
    payload.append('schedule', formData.schedule);
    payload.append('payment', formData.payment);

    selectedFiles.forEach((file) => {
      payload.append('media_paths[]', file);
    });

    // post to the server
    axiosClient.post('/jobs/store', payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      toast.success(response.message);
      console.log(response.message);
      navigate('/hub/job-posts');
    }).catch((error) => {
      console.error('Error posting job:', error.response?.data || error.message);
    });
  }

  return (
    <div className={styles['container']}>
      <h1 className={styles['page-title']} style={{textAlign: 'center'}}>Post a New Job</h1>
      <form onSubmit={handleFormSubmit} className={styles['post-form']}>
        <label htmlFor="jobTitle"><FaQuoteLeft />Job Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter job title" maxLength="101"/>
        <label htmlFor="jobCategory"><FaTable />Job Category</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="" disabled>Select a category</option>
          <option value="Home Cleanup">Home Cleanup</option>
          <option value="Vacation Home Cleanup">Vacation Home Cleanup</option>
          <option value="Office Cleanup">Office Cleanup</option>
          <option value="Community Cleanup">Community Cleanup</option>
          <option value="Other Cleanup">Other Cleanup</option>
        </select>
        <label htmlFor="jobDescription"><FaBookOpen />Job Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          placeholder="Describe the job in detail..."></textarea>
        <label htmlFor="jobQualifications"><FaRegListAlt />Job Qualifications</label>
        <textarea
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          rows="6"
          placeholder="List qualifications required for this job..."></textarea>        
        <label><FaGlobeAmericas />Location (City, Country)</label>
        <select name='city_id' value={formData.city_id} onChange={handleChange}>
          {cities.map((city) => (
            <option key={city.id} value={`${city.name}, ${city.country}`}>
              {`${city.name}, ${city.country}`}
            </option>
          ))}
        </select>
        <label htmlFor="jobFullLocation"><FaMapMarkerAlt />Full Address</label>
        <input type="text" name="full_address" value={formData.full_address} onChange={handleChange} placeholder="Enter the full address" />
        <label htmlFor="jobSchedule"><FaCalendarAlt />Job Schedule</label>
        <input type="text" name="schedule" value={formData.schedule} onChange={handleChange} placeholder="e.g., January 1, 2025 9:00 AM - 5:00 PM" />
        <label htmlFor="jobPayment"><FaRegMoneyBillAlt />Job Payment</label>
        <input type="text" name="payment"  value={formData.payment} onChange={handleChange} placeholder="Enter payment amount" />
        <label htmlFor="jobPayment"><FaCamera />Upload Media</label>
        <label className={styles["file-input-label"]}>
          Click here to choose files
          <input type="file" name="media" ref={mediaRef} accept="image/*" multiple className={styles["file-input"]} onChange={handleFileChange}/>
        </label>
        {selectedFiles.length > 0 && (
          <ul>
            {selectedFiles.map((file, index) => (
              <li className={styles['file-name']} key={index}>{file.name}</li>
            ))}
          </ul>
        )}
        <div>
          <Link to='/hub/job-posts' className={styles["cancel-btn"]}><FaTimes />Cancel</Link>
          <button type="submit" name='post-job-btn'>Post Job</button>
        </div>
      </form>
    </div>
  )
}

export default CreateJobPage