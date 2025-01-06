import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axiosClient from "../../axios-client.js";
import PageTitle from '../../components/HomeComponents/PageTitle';
import styles from './HomePages.module.css';
import style from '../../components/HomeComponents/Cards.module.css';

const ApplicantsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobStatus, setJobStatus] = useState(1);
  const [rated, setRated] = useState(0);
  const [applicants, setApplicants] = useState([]);
  const [checkedApplicants, setCheckedApplicants] = useState({});
  const [chosenApplicants, setChosenApplicants] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axiosClient.get(`/jobs/${jobId}/applicants`);
        const { jobStatus, rated, applicants } = response.data;
        setJobStatus(jobStatus);
        setRated(rated);
        setApplicants(applicants || []);

        if (jobStatus === 0 && rated === 0) {
          const chosenResponse = await axiosClient.get(`/jobs/${jobId}/chosen-applicants`);
          setChosenApplicants(chosenResponse.data.chosen_applicants || []);
        }

      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };
    fetchApplicants();
  }, [jobId]);

  const handleApplicantsSubmit = async (event) => {
    event.preventDefault();
    const chosen = Object.keys(checkedApplicants).filter((id) => checkedApplicants[id]);

    if (chosen.length === 0) {
      alert('Please select at least one applicant.');
      return;
    }

    try {
      const response = await axiosClient.post(`/jobs/${jobId}/choose-applicants`, { chosen_applicants: chosen });
      setChosenApplicants(response.data.chosen_applicants);
      await axiosClient.patch(`/jobs/${jobId}/update-status`, { jobStatus: 0 });
      setJobStatus(0);
    } catch (error) {
      console.error('Error submitting chosen applicants:', error);
    }
  };

  const handleRatingChange = (applicantID, value) => {
    setRatings({ ...ratings, [applicantID]: value });
  };

  const handleRatingsSubmit = async () => {
    try {
      await axiosClient.post(`/jobs/${jobId}/rate-applicants`, { ratings: ratings });
      await axiosClient.patch(`/jobs/${jobId}/update-status`, { rated: 1 });
      setRated(1);
      navigate(`/hub/jobs/${jobId}/processed-applicants`)
    } catch (error) {
      console.error('Error submitting ratings:', error);
    }
  };

  return (
    <>
      <div className={styles["header-section"]}>
      {
        jobStatus === 1 && rated === 0 && <PageTitle title="Applicants" subtitle="Employer, please select qualified applicants for this job:" />
      }
      {
        jobStatus == 0 && rated == 0 && <PageTitle title="Applicants" subtitle="Employer, please rate the applicants based on their work performance:" />
      }
      </div>
      <div className={style['list-container']}>
        {jobStatus === 1 && rated === 0 ? (
          <form onSubmit={handleApplicantsSubmit} className={styles['selection-form']}>
            {applicants.map((applicant) => (
              <div key={applicant.id} className={`${style['jobcard']} ${style['listcard']} ${styles['applicants-selection']}`}>
                <label>
                  <input
                    type="checkbox"
                    value={applicant.id}
                    onChange={(e) =>
                      setCheckedApplicants({ ...checkedApplicants, [applicant.id]: e.target.checked })
                    }
                  />
                  {applicant.full_name} <i><small>(@{applicant.user_name})</small></i>
                </label>
              </div>
            ))}
            <button type="submit" className={styles['selection-form-btn']}>SUBMIT SELECTION</button>
          </form>
        ) :
          (jobStatus == 0 && rated == 0 ? (
          <div className={style['list-container']}>
            {chosenApplicants.map((applicant) => (
              <div key={applicant.id} className={`${style['jobcard']} ${style['listcard']} ${styles['applicants-ratings']}`}>
                <label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={ratings[applicant.id] || ""}
                    onChange={(e) => handleRatingChange(applicant.id, e.target.value)}
                  />
                  {applicant.full_name} <i><small>(@{applicant.user_name})</small></i>
                </label>
              </div>
            ))}
            <button type="button" className={styles['selection-form-btn']} onClick={handleRatingsSubmit}>
              SUBMIT RATINGS
            </button>
          </div>) : <Navigate to={`/hub/jobs/${jobId}/processed-applicants`} />)
        }
      </div>
    </>
  );
};

export default ApplicantsPage;
