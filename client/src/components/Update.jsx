import { useState,useContext } from "react"
import {updateResearch} from '../controllers/researchController'
import {ResearchContext} from '../contexts/researchContext'
import {useLocation} from 'react-router-dom'
// import mongoose from 'mongoose'

const Update = () => {
  const { state } = useLocation()
  console.log(state)

  const { research, setResearch } = useContext(ResearchContext)
  const [title, setTitle] = useState(state.title)
  const [status, setStatus] = useState(state.status)
  const [total, setTotal] = useState(state.total)
  const [date, setDate] = useState(state.date)
  const [error, setError] = useState(null)

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const data = await updateResearch(state._id, title, status, total, date)
      setResearch(
        research.map((r) => (r._id === data.research._id ? data.research : r))
      )
    } catch (error) {
      setError(error.message)
    }
  }

  console.log(research)
  return (
    <div>
      <h1>Update your research</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Research Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Research status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          type="number"
          placeholder="Research Total"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}
export default Update


