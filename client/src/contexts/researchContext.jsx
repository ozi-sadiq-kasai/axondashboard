import { createContext, useState } from 'react'
import axios from 'axios'

export const ResearchContext = createContext()

const ResearchProvider = ({ children }) => {
  const [research, setResearch] = useState([])

  const deleteResearch = async (_id) => {
    try {
      await axios.delete(`/axon/research/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setResearch((prevResearch) =>
        prevResearch.filter((item) => item._id !== _id)
      )
    } catch (error) {
      console.error('Error deleting research:', error.message)
    }
  }

  return (
    <ResearchContext.Provider
      value={{ research, setResearch, deleteResearch }}
    >
      {children}
    </ResearchContext.Provider>
  )
}

export default ResearchProvider
