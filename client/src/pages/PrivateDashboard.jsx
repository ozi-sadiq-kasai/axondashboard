// components/PrivateDashboard.js
import { useContext, useState } from 'react'
import PrivateCards from '../components/PrivateCards'
import { createResearch } from '../controllers/researchController'
import { ResearchContext } from '../contexts/researchContext'
import GridBackground from '../components/GridBackground'
import Chart from '../components/Chart'

const PrivateDashboard = () => {
  const { research, setResearch } = useContext(ResearchContext)

  const [title, setTitle] = useState('')
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('ongoing')
  const [date, setDate] = useState('')

  const handleCreateResearch = async (e) => {
    e.preventDefault()
    try {
      const data = await createResearch(title, status, total, date)
      setResearch([...research, data.research])
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <GridBackground>
      <div className="container mx-auto">
        <h1 className="text-center text-xl pt-1 font-medium text-slate-300">
          Create Research
        </h1>
        <div className="flex justify-around">
          <form onSubmit={handleCreateResearch}>
            <div className="flex items-center mb-4">
              <label htmlFor="researchTitle" className="mr-2">
                Research Title:{' '}
              </label>
              <input
                type="text"
                name="researchTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="focus:outline-none border-2 border-[#E2E4E8] p-1"
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="researchTotal" className="mr-2">
                Research Total:{' '}
              </label>
              <input
                type="number"
                name="researchTotal"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="focus:outline-none border-2 border-[#E2E4E8] p-1"
              />
            </div>

            <div className="w-72 flex justify-between mb-4">
              <div>
                <label htmlFor="completed" className="mr-2">
                  Completed
                </label>
                <input
                  type="radio"
                  name="status"
                  value="completed"
                  checked={status === 'completed'}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="ongoing" className="mr-2">
                  Ongoing
                </label>
                <input
                  type="radio"
                  name="status"
                  value="ongoing"
                  checked={status === 'ongoing'}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="date" className="mr-2">
                Date:{' '}
              </label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="focus:outline-none border-2 border-[#E2E4E8] p-1"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-300 text-white py-2 px-4 rounded-md hover:bg-gray-300"
            >
              Create Research
            </button>
          </form>
          <Chart />
        </div>
        <PrivateCards />
      </div>
    </GridBackground>
  )
}

export default PrivateDashboard
