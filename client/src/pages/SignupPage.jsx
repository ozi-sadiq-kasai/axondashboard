import { useState, useContext } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {UserContext} from '../contexts/userContext.jsx'
import { signupUser } from '../controllers/userController'
import Logo from '../assets/Logo.png'
// import Lottie from 'lottie-react'
// import Lines from '../assets/Lines.json'
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi'
import toast from 'react-hot-toast'



const SignupPage = () => {
 const {setUser} = useContext(UserContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(null)


  const resetInput = () => {
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setRole('')
  }
  const navigate = useNavigate()


  const handleFirstNameChange = (e) => {setFirstName(e.target.value)}
  const handleLastChange = (e) => {setLastName(e.target.value)}
  const handleRoleChange = (e) => {setRole(e.target.value)}
  const handleEmailChange = (e) => {setEmail(e.target.value)}
  const handlePasswordChange = (e) => {setPassword(e.target.value)}


 const handleSignupUser = async (e) => {
   e.preventDefault()
   setLoading(true)
   setError(null)

   try {
     const response = await signupUser(
       firstName,
       lastName,
       email,
       password,
       role
     )
     if (response && !response.error) {
       toast.success('signup successfull!')
      setUser({firstName,email,role, research: [] })
      resetInput()
      setLoading(false)
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
      {/* <div className="overflow-hidden w-96">
        <Lottie
          animationData={Lines}
          style={{ width: '100%', height: '70%' }}
        />
      </div> */}
      <form
        className="flex flex-col 
             gap-4 w-2/5 px-10 mt-8 text-lg shadow-xl"
        onSubmit={handleSignupUser}
      >
        <h1 className="text-2xl font-semibold mb-1 text-slate-400 m-auto">
          Sign Up
        </h1>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
          className="border-2 py-2 outline-none pl-2 rounded-md "
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastChange}
          className="border-2 py-2 outline-none pl-2 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="border-2 py-2 outline-none pl-2 rounded-md"
        />
        <div className="flex justify-between border-2 bg-white rounded-md">
          <input
            name="password"
            type={visible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="py-2 outline-none pl-2 rounded-md"
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
        <label htmlFor="role" className="text-sm text-gray-400">
          Choose a role
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleRoleChange}
            className="border-2 py-3 text-gray-600 outline-none ml-5"
          >
            <option value="">-- Select a role --</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Admin">Admin</option>
          </select>
        </label>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-48 bg-slate-400 text-white font-medium
                      rounded-md mb-3 py-2"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'SignUp'}
          </button>
        </div>
      </form>
      <p className="my-2 text-sm text-slate-500 mb-10">
        Already have an account{' '}
        <Link to="/" className="text-primary">
          Login
        </Link>
      </p>
    </div>
  )
}
export default SignupPage