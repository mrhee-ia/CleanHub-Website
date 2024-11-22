import Banner from "../../components/LandingComponents/Banner"
import Features from "../../components/LandingComponents/Features"
import StarsCanvas from '../../components/LandingComponents/StarsCanvas';
import Guide from '../../components/LandingComponents/Guide';
import Footer from '../../components/LandingComponents/Footer';
import Worldwide from '../../components/LandingComponents/Worldwide';

const LandingPage = () => {

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
      <main className="bg-gradient-green" style={styles}>
        <Banner/>
        <Features/>
        <Guide/>
        <Worldwide/>
        <StarsCanvas/>
        <Footer/>
      </main>
    </>
  )
}

export default LandingPage