import { useEffect } from 'react'
import logoAnimation from '../assets/axl-anime.mp4'

const LandingPage = () => {
  useEffect(() => {
    // setup Timeout
    const landingTimeout = setTimeout(() => {
      window.location.href = '/login'
    }, 4900)

    // Cleanup function
    return () => {
      clearTimeout(landingTimeout)
    }
  }, [])

  return (
    <div>
      <video src={logoAnimation} autoPlay muted />
    </div>
  )
}

export default LandingPage
