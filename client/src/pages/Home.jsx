import { useState, useEffect, useContext } from 'react'
import {getResearch} from '../controllers/researchController.js'
import {ResearchContext} from '../contexts/researchContext'
import axios from 'axios'
import GridBackground from '../components/GridBackground.jsx'

const Home = () => {
  const { research, setResearch } = useContext(ResearchContext)

   const [loading, setLoading] = useState(true)

 useEffect(() => {
   const allResearch = async () => {
     try {
       const response = await getResearch()
       const researchData = response.data.research
       if (researchData.length < 1) {
        setLoading(false)
         return setMessages('There is no Research')
       } else {
         setResearch(researchData)
         setLoading(false)
       }
     } catch (error) {
      setLoading(false)
       console.log(error.message)
     }
   }
   allResearch()
 }, [])


   console.log('Home', research)

return (
  <GridBackground>
    <div className="container mx-auto">
      <h1 className='text-center text-xl pt-1 font-medium text-slate-300'>All Researches</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
       <>
          <p>
            You have {research.length} research{' '}
            {research.length === 1 ? 'item' : 'items'}
          </p>
            <div className="flex gap-4 flex-wrap justify-center py-4">
          {research.map((item) => (
           <div key={item._id} className='bg-[#FCFCFC] p-8'>
              <h2>{item.title}</h2>
              <p>{item.status}</p>
              <p>{item.total}</p>
              <p>{item.date}</p>
            </div>
          ))}
        </div>
       </>
      )}
    </div>
  </GridBackground>
)
}
export default Home
