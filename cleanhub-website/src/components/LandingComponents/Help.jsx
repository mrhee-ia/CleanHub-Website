import { useState } from 'react'
import GoBackButton from './GoBackButton'
import styles from './Help.module.css'
import style from './About.module.css'
import { FaSearch } from 'react-icons/fa'

const Help = () => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [category, setCategory] = useState('')
    const [hashtags, setHashtags] = useState('')
    const [message, setMessage] = useState('')


  return (
    <section>
        <GoBackButton/>
        <header className={style['header']}>GET HELP & FAQS</header>
        <div className={styles['forms-container']}>
            <form action="#" method='POST' className={styles['search-form']}>
                <FaSearch className={styles['search-icon']}/><input type="text" id="search" name="search" placeholder="Search FAQs..."/>
            </form>
            <h2>Ask Help For Your Problem</h2>
            <p>By correctly filling in this form:</p>
            <form action="#" method='POST' className={styles['help-form']}>
                <label for="name">Name:</label>
                <input type="text" placeholder='Type your full name' required
                    value={name}
                    onChange={(event) => setName(event.target.value)}/>
                <label for="email">Email:</label>
                <input type="email" placeholder='Provide an active email' required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
                <label for="category">Category:</label>
                <select id="category" name="category" required
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}>
                    <option value="" disabled selected>Select which category is the message about</option>
                    <option value="recruiter">Job Recruiter</option>
                    <option value="hunter">Job Hunter</option>
                    <option value="general">For General</option>
                </select>
                <label for="hashtags">Hashtags:</label>
                <input type="hashtags" placeholder='#payment #apply #ratings' required
                    value={hashtags}
                    onChange={(event) => setHashtags(event.target.value)}/>
                <label for="question">Message: </label>
                <textarea name="question" placeholder='State your concerns...' rows='5' required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}></textarea>
                <button type="submit" className={`${styles['submit-button']} ${'whiteShadow'}`}>Submit</button>
            </form>
        </div>
        <h1 className={style['last-greetings']}>GLAD TO ASSIST YOU!</h1>
    </section>
  )
}

export default Help