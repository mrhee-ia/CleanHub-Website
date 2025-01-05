import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axiosClient from "../../axios-client";
import {useStateContext} from "../../context/ContextProvider.jsx"
import Modal from "../../components/HomeComponents/Modal"
import styles from './HomePages.module.css'
import { FaRegTimesCircle } from "react-icons/fa";


const ProfilePage = () => {

  const {currentUser, setUser} = useStateContext();
  const [jobHistory, setJobHistory] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
    axiosClient.get('/history')
      .then(({data}) => {
        setJobHistory(data)
      })
  }, [])

  const handleChange = (event) => {
    setUpdatedData(event.target.value);
  }

  const handleSubmit = () => {
    axiosClient.put(`/user/update`, { field: modalContent, value: updatedData })
      .then(({ data }) => {
        setUser(data);
        handleCloseModal();
        setUpdatedData("");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleFileUpload = (event) => {
    event.preventDefault()
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append('profile_picture', selectedFile);
  
    axiosClient.put(`/user/profile-picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(({ data }) => {
        setUser(data);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error uploading profile picture:", error);
      });
  };  

  const handleEdit = (field) => {
    setIsModalOpen(true)
    setModalContent(field)
  }

  const handleCloseModal = () => {
    setModalContent(null)
    setIsModalOpen(false)
  }

  return (
    <div className={styles['profile-page']}>
      <div className={styles['profile-info']}>
        <img 
          className="h-profile-picture" 
          src={currentUser.profile_picture} 
          alt="Upload Profile Picture" 
          onClick={() => handleEdit("profile_picture")} />
        <div>
          <h2>{currentUser.full_name}</h2>
          <p><i>{currentUser.user_name}</i></p>
        </div>
      </div>
      <div className={styles['profile-about']}>
        <p onClick={() => handleEdit("email")}>{currentUser.email}</p>
        <p onClick={() => handleEdit("bio")}>{currentUser.bio || "Add your bio"}</p>
        <p onClick={() => handleEdit("location")}>{currentUser.location || "Add your location"}</p>
      </div>
      {
        jobHistory.length > 0 ? (
          <div className={styles['profile-history']}>
            <h3>Job History</h3>
            <ul>
              {jobHistory.map((job) => (
                <li key={job.job_id}>
                  <Link to={`/hub/jobs/${job.job_id}`}>{job.job_title}</Link>
                  <div></div>
                  <div>
                    <span>Employer: {job.employer_name}</span>
                    <span>Rating: {job.user_rating}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null
      }
      {/* MODAL */}
      {
        isModalOpen && (
          <Modal>
            <button className={styles["close-button"]} onClick={handleCloseModal}>&times;</button>
            {modalContent == 'profile_picture' && (
              <div className={styles["modal-input-div"]}>
                <h3>Upload Profile Picture</h3>
                <input type="file" onChange={handleFileChange}/>
                <button onClick={handleFileUpload}>Upload</button>
              </div>
            )}
            {modalContent == 'email' && (
              <div className={styles["modal-input-div"]}>
                <h3>Change Email Address</h3>
                <input type="email" placeholder="Enter new email" value={updatedData} onChange={handleChange}/>
                <button onClick={handleSubmit}>Save</button>
              </div>
            )}
            {modalContent == 'bio' && (
              <div className={styles["modal-input-div"]}>
                <h3>Enter your Bio</h3>
                <textarea 
                  placeholder="Write anything about yourself that you want employers to know.." 
                  rows="4" 
                  value={updatedData} 
                  onChange={handleChange}/>
                <button onClick={handleSubmit}>Save</button>
              </div>
            )}
            {modalContent == 'location' && (
              <div className={styles["modal-input-div"]}>
                <h3>Edit your Location</h3>
                <input type="text" placeholder="Where do you live?" value={updatedData} onChange={handleChange}/>
                <button onClick={handleSubmit}>Save</button>
              </div>
            )}
          </Modal>
        )
      }
    </div>
  )
}

export default ProfilePage