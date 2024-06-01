import {useContext,useEffect} from 'react'
// import { ResearchContext } from '../contexts/researchContext'
import { Link } from 'react-router-dom'
import {UserContext} from '../contexts/userContext'
import { deleteResearch,getUserResearch } from '../controllers/researchController'


const PrivateCards = () => {
 // const { research, setResearch, deleteResearch } = useContext(ResearchContext)
 const { user, setUser } = useContext(UserContext)


useEffect(() => {
  const fetchUserResearch = async () => {
    try {
      const { research, firstName } = await getUserResearch()
      setUser({ firstName, research })
      // console.log('privateCard',research)
    } catch (error) {
      console.error(error.message)
    }
  }

  fetchUserResearch()
}, [])



const handleDelete = async (_id) => {
  await deleteResearch(_id)
  setUser((prevUser) => ({
   ...prevUser,
       research: prevUser.research.filter((item) => item._id !== _id),
     }))
   }



return (
  <div>
    <p>{user.firstName}</p>
    <h1 style={{ color: 'red' }}>PrivateDashboard</h1>
    {user.research &&
      user.research.map((item) => (
        <div key={item._id}>
          <p>{item.title}</p>
          <p>{item.status}</p>
          <p>{item.total}</p>
          <p>{item.date}</p>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
          <Link state={item} to='/axon/update' title="Update">
            Edit
          </Link>
        </div>
      ))}
  </div>
)


}
export default PrivateCards