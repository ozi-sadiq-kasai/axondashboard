import { useContext } from "react"
import { Link,Outlet,useNavigate } from "react-router-dom"
import {UserContext} from '../contexts/userContext'
import Logo from '../assets/Logo.png'

const Layout = () => {
 const navigate = useNavigate()
 const {user,setUser} = useContext(UserContext)

 
 //handel logout
 const handleLogout = ()=>{
  if(confirm("Do you want to Logout?")){
   setUser({firstName: null,research:[],email:null})
   localStorage.removeItem('firstName')
   localStorage.removeItem('role')
   localStorage.removeItem('token')
   localStorage.removeItem('user')
   localStorage.removeItem('role')
   navigate('/login')
  }
 }
return (
  <>
    <header className="container mx-auto py-4">
      {/* <nav style={{ display: 'flex', justifyContent: 'space-between' }}> */}
      <nav className='flex flex-1 justify-between items-center'>
        <Link to="/axon/home">
          <img src={Logo} alt="logo" className="w-28" />
        </Link>
        <div className="w-60 flex justify-between items-center">
          <Link to="/axon/privatedashboard">go to Private</Link>
          <button onClick={handleLogout} className='bg-slate-200 px-4 py-1 rounded-md'>Logout</button>
        </div>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </>
)
}
export default Layout