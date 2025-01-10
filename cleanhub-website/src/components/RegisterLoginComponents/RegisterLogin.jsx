import { createRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import styles from './RegisterLogin.module.css'
import logoImg from '../../assets/images/logo.jpg'



const RegisterLogin = () => {

    // Refs to get value
  const fullNameRef = createRef();
  const userNameRef = createRef();
  const emailRegRef = createRef();
  const passwordRegRef = createRef();
  const emailLoginRef = createRef();
  const passwordLoginRef = createRef();

    // Refs to access elements for CSS modifications
  const container = createRef(null);
  const toSigninButton = createRef(null);
  const toSignupButton = createRef(null);

  useEffect(() => {

    const containerCurrent = container.current;
    const toSigninButtonCurrent = toSigninButton.current;
    const toSignupButtonCurrent = toSignupButton.current;

    const handleSignupClick = () => {
        containerCurrent.classList.add(styles.active);
    };
  
      const handleSigninClick = () => {
        containerCurrent.classList.remove(styles.active);
    };

    toSignupButtonCurrent.addEventListener('click', handleSignupClick);
    toSigninButtonCurrent.addEventListener('click', handleSigninClick);

    // Cleanup event listeners when the component unmounts
    return () => {
        toSignupButtonCurrent.removeEventListener('click', handleSignupClick);
        toSigninButtonCurrent.removeEventListener('click', handleSigninClick);
    }

  }, [])

  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const onSignup = (event) => {
    event.preventDefault()
    const payload = {
        full_name: fullNameRef.current.value,
        user_name: userNameRef.current.value,
        email: emailRegRef.current.value,
        password: passwordRegRef.current.value
    }
    // post to the server
    axiosClient.post('/signup', payload)
        .then(({data}) => {
            // successful response
            setUser(data.user)
            setToken(data.token)
        }).catch(err => {
            const response = err.response
            if (response && response.status === 422) setErrors(response.data.errors)
        })
  }

  const onSignin = (event) => {
    event.preventDefault()
    const payload = {
        email: emailLoginRef.current.value,
        password: passwordLoginRef.current.value
    }
    // post to the server
    axiosClient.post('/signin', payload)
        .then(({data}) => {
            // successful response
            setUser(data.user)
            setToken(data.token)
            if (data.user.role == "admin") {
                navigate('/admin-panel');
            }
        }).catch((err) => {
            const response = err.response;
            if (response && response.status === 422) setMessage(response.data.message)
        })
  }

  return (
    <div className={styles["container-body"]}>
        <div className={styles["container"]}  ref={container}>
            <div className={`${styles['form-container']} ${styles['sign-up']}`}>
                <form action="POST" onSubmit={onSignup}>
                    <Link to='/'><img className={styles['logo']} src={logoImg} /></Link>
                    <h1>Create Your Account</h1>
                    <span>Start with registration to continue.</span>
                        <input type="text" name="full-name" ref={fullNameRef} placeholder='Enter Name' required />
                        {errors?.["full_name"] && (<div className={styles["error-message"]}>{errors["full_name"]}</div>)}
                        <input type="text" name="user-name" ref={userNameRef} placeholder='Enter Username' required/>
                        {errors?.["user_name"] && (<div className={styles["error-message"]}>{errors["user_name"]}</div>)}
                        <input type="email" name="email" ref={emailRegRef} placeholder='Enter Email Address' required/>
                        {errors?.["email"] && (<div className={styles["error-message"]}>{errors["email"]}</div>)}
                        <input type="password" name="password" ref={passwordRegRef} placeholder='Enter Password' required/>
                        {errors?.["password"] && (<div className={styles["error-message"]}>{errors["password"].join(" ")}</div>)}
                    <button>SIGN UP</button>
                </form>
            </div>
            <div className={`${styles['form-container']} ${styles['sign-in']}`}>
                <form action="POST" onSubmit={onSignin}>
                    <Link to='/'><img className={styles['logo']} src={logoImg} /></Link>
                    <h1>Sign in to CleanHub</h1>
                    <span>Log in your account to continue.</span>
                    <input type="email" name="email" ref={emailLoginRef} placeholder='Use Email' required/>
                    <input type="password" name="password" ref={passwordLoginRef} placeholder='Enter Password' required/>
                    {message && (<div className={styles["error-message"]}>{message}</div>)}
                    <a href="#">Forgot Your Password?</a>
                    <button>SIGN IN</button>
                </form>
            </div>
            <div className={styles["toggle-container"]}>
                <div className={styles["toggle"]}>
                    <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
                        <h1>Welcome Friend!</h1>
                        <p>Already have an account? Sign in instead to use all of site features.</p>
                        <button className={`${styles['hidden']} ${styles['hidden-signin']}`} ref={toSigninButton} id='to-signin'>Sign in Here</button>
                    </div>
                    <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
                        <h1>Hello Friend!</h1>
                        <p>Doesn't have an account yet? Register instead to use all of site features.</p>
                        <button className={`${styles['hidden']} ${styles['hidden-signup']}`}  ref={toSignupButton} id='to-signup'>Sign up Here</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
  )
}

export default RegisterLogin