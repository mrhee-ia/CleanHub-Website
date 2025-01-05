import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from "../../axios-client.js";
import PageTitle from '../../components/HomeComponents/PageTitle';
import styles from './HomePages.module.css';
import style from '../../components/HomeComponents/Cards.module.css';
import {FaAward, FaStar, FaRegStar} from 'react-icons/fa'

const ProcessedApplicants = () => {

  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axiosClient.get(`/jobs/${jobId}/applicants`);
        setApplicants(response.data.applicants || []);
        const ratingsResponse = await axiosClient.get(`/jobs/${jobId}/rated-applicants`);
        setRatings(ratingsResponse.data.ratings || {});
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    fetchApplicants();
  }, [jobId]);

  return (
    <div>
      <div className={styles["header-section"]}>
        <PageTitle title="Applicants" subtitle="Summary on Processed Applicants" />
      </div>
      <div className={style['list-container']}>
        {
          applicants.map( (applicant) => {
            const isChosen = ratings.hasOwnProperty(applicant.id)
            return (
              <div key={applicant.id} 
                className={`${style['jobcard']} ${style['listcard']} ${isChosen ? styles['chosen'] : styles['not-chosen']}`}>
                  <p>{applicant.full_name} <i><small>(@{applicant.user_name})</small></i></p>
                  {isChosen && (
                    <div className={styles['ratings']}>
                      <FaAward />
                      {[...Array(5)].map((_, index) => index < ratings[applicant.id] 
                        ? (<FaStar key={index} className={styles['star']} />) 
                        : (<FaRegStar key={index} className={styles['star']} />)
                      )}
                    </div>
                  )}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ProcessedApplicants