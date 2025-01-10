import Footer from "../../components/LandingComponents/Footer"
import { useState } from 'react'
import GoBackButton from '../../components/LandingComponents/GoBackButton'
import styles from './About_Help.module.css'
import { FaSearch } from 'react-icons/fa'
import axiosClient from "../../axios-client";

const HelpPage = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponseMessage('');
    
    try {
      const response = await axiosClient.post('/help-requests', {
        name,
        email,
        category,
        hashtags,
        message,
      });
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage('Failed to submit your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <GoBackButton/>
        <header className={styles['header']}>GET HELP & FAQS</header>
        <div className={styles['forms-container']}>
          <form action="#" method='POST' className={styles['search-form']}>
            <FaSearch className={styles['search-icon']}/><input type="text" id="search" name="search" placeholder="Search FAQs..."/>
          </form>
          <h2>Ask Help For Your Problem</h2>
          <p>By correctly filling in this form:</p>
          <form onSubmit={handleSubmit} className={styles['help-form']}>
            <label htmlFor="name">Name:</label>
            <input type="text" placeholder='Type your full name' required
              value={name}
              onChange={(event) => setName(event.target.value)}/>
            <label htmlFor="email">Email:</label>
            <input type="email" placeholder='Provide an active email' required
              value={email}
              onChange={(event) => setEmail(event.target.value)}/>
            <label htmlFor="category">Category:</label>
            <select id="category" name="category" required
              value={category}
              onChange={(event) => setCategory(event.target.value)}>
              <option value="" disabled>Select which category is the message about</option>
              <option value="recruiter">Job Recruiter</option>
              <option value="hunter">Job Hunter</option>
              <option value="general">For General</option>
            </select>
            <label htmlFor="hashtags">Hashtags:</label>
            <input type="hashtags" placeholder='#payment #apply #ratings' required
              value={hashtags}
              onChange={(event) => setHashtags(event.target.value)}/>
            <label htmlFor="question">Message: </label>
            <textarea name="question" placeholder='State your concerns...' rows='5' required
              value={message}
              onChange={(event) => setMessage(event.target.value)}></textarea>
              <button type="submit" className={`${styles['submit-button']} ${'whiteShadow'}`}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
        <h1 className={styles['last-greetings']}>GLAD TO ASSIST YOU!</h1>
      </section>
      <Footer />
    </>
  )
}

export default HelpPage