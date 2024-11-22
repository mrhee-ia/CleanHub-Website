import {motion} from 'framer-motion'
import StarsCanvas from '../../components/LandingComponents/StarsCanvas.jsx';
import RegisterLogin from "../../components/RegisterLoginComponents/RegisterLogin.jsx"

import {Navigate} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx"

const slideIn = (direction, type, delay, duration) => {
  return {
    hidden: {
      y: direction === 'top' ? '-100%' : '100%',
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut"
      }
    }
  };
};

const RegisterLoginPage = () => {

  const {token} = useStateContext()

  if (token) {
    return <Navigate to='/hub/feed' />
  }

  const styles = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 0,
    color: '#ffffff'
  } 

  return (
    <>
      <div className="bg-gradient-green" style={styles}>
        <motion.div
          variants={slideIn('top', "tween", 0.2, 1)}
          initial="hidden"
          animate="show">
            <RegisterLogin/>
        </motion.div>
        <StarsCanvas/>
      </div>
    </>
  )
}

export default RegisterLoginPage