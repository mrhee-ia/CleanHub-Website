import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axiosClient from "../../axios-client";
import {useStateContext} from "../../context/ContextProvider.jsx"
import Modal from "../../components/HomeComponents/Modal"
import styles from './HomePages.module.css'
import { FaUserFriends, FaMedal, FaStar } from "react-icons/fa";
import profilePic3 from '../../assets/images/profilePic3.avif'


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

  const handleFileUpload = async (event) => {
    event.preventDefault()
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    const payload = new FormData();
    payload.append("profile_picture", selectedFile);
  
    try {
      const response = await axiosClient.put('/user/profile-picture', payload, {
        headers: {
          'Content-Type': 'multipart/form-data', // Explicitly set this
        },
      });
  
      setUser(response.data); // Update the user state with the new data
      handleCloseModal();     // Close the modal
    } catch (error) {
      console.error("Error uploading profile picture:", error.response?.data || error.message);
    }

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
        <div>
          <h2>{currentUser.full_name}</h2>
          <p><i>Username: {currentUser.user_name}</i></p>
        </div>
        <img 
          className="h-profile-picture" 
          src={profilePic3} 
          alt="Upload Profile Picture" 
          onClick={() => handleEdit("profile_picture")} />
      </div>
      <div className={styles['profile-about']}>
        <div>
          <label htmlFor="" className={styles['profile-label']}>Email</label>
          <div></div>
          <p onClick={() => handleEdit("email")}>{currentUser.email}</p>
          <label htmlFor="" className={styles['profile-label']}>Location</label>
          <div></div>
          <p onClick={() => handleEdit("location")}>{currentUser.location || "Add your location"}</p>
        </div>
        <div>
          <label htmlFor="" className={styles['profile-label']}>Bio</label>
          <div></div>
          <p onClick={() => handleEdit("bio")}>{currentUser.bio || "Add your bio"}</p>
        </div>
      </div>
      <div className={styles['profile-history']}>
        <h3>Job History</h3>
        {jobHistory.length > 0 && (
          <div className={styles['history-list-container']}>
            {jobHistory.map((job) => (
              <div key={job.job_id} className={styles['history-list']}>
                <Link to={`/hub/jobs/${job.job_id}`}>{job.job_title}</Link>
                <div>
                  <span><FaUserFriends/> Employer: {job.employer_name}</span>
                  <span><FaMedal/> Rating:
                    {[...Array(Number(job.user_rating))].map((_, index) => (
                      <FaStar className={styles['history-stars']} key={index} />
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* MODAL */}
      {
        isModalOpen && (
          <Modal>
            <button className={styles["close-button"]} onClick={handleCloseModal}>&times;</button>
            {modalContent == 'profile_picture' && (
              <form className={styles["modal-input-div"]} onSubmit={handleFileUpload}>
                <h3>Upload Profile Picture</h3>
                <input type="file" name="profile_picture" onChange={handleFileChange}/>
                <button type="submit">Upload</button>
              </form>
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