import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import toast from 'react-hot-toast'
import { PiEyeSlashThin,PiEyeThin  } from 'react-icons/pi'
import { loginUser } from '../controllers/userController.js'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible,setVisible] = useState(false)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

  const resetInput = () => {
    setEmail('')
    setPassword('')
  }
 const navigate = useNavigate()

const handleEmailChange = (e)=>{setEmail(e.target.value)}
const handlePasswordChange = (e)=>{setPassword(e.target.value)}


const handleLoginUser = async(e)=>{
  e.preventDefault()
  setLoading(true)
  setError(null)

  try {
    const response = await loginUser(email, password)

    if (response && !response.error) {
      toast.success('Login successful!')
      localStorage.setItem('user', JSON.stringify(response))
      resetInput()
      navigate('/axon/home')
    } else {
      throw new Error(response.error || 'Login failed')
    }
  } catch (error) {
    setError(error.message)
    toast.error(error.message)
  } finally {
    setLoading(false)
  }
}


  return (
    <div
      className="h-screen w-dvw 
  flex flex-col items-center justify-center"
    >
      <img src={Logo} alt="logo" className="w-60" />

      <form
        className="h-96 flex flex-col justify-center items-center
         w-2/5 text-lg px-10 shadow-xl gap-7"
        onSubmit={handleLoginUser}
      >
        <h1 className="text-2xl font-semibold mb-3 text-slate-400">Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="border-2 py-3 w-full outline-none px-2 rounded-md "
        />

        <div className="flex justify-between rounded-md items-center border-2 w-full bg-white">
          <input
            name="password"
            type={visible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="py-3 outline-none px-2"
          />
          <div
            onClick={() => {
              setVisible(!visible)
            }}
            className="cursor-pointer mt-3 mr-4"
          >
            {visible ? <PiEyeThin /> : <PiEyeSlashThin />}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-48 bg-slate-400 py-2 text-white font-medium rounded-md"
            disabled={loading}
          >
            {loading ? ' Loading...' : 'Login'}
          </button>
        </div>
      </form>
      <p className="my-2 text-sm text-slate-500 mb-10">
        Do not have an account{' '}
        <Link to="/signup" className="text-primary">
          Signup
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
