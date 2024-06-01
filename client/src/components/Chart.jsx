import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/userContext'
import { getUserResearch } from '../controllers/researchController'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Tooltip, Legend, ArcElement)

const Chart = () => {
  const { user, setUser } = useContext(UserContext)
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Private Researches',
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  })

  useEffect(() => {
    const fetchUserResearch = async () => {
      try {
        const { research } = await getUserResearch()
        setUser({ research })
        console.log('privateChart', research)
        // Update chartData with the fetched research data
        setChartData({
          labels: research.map((data) => data.title),
          datasets: [
            {
              label: 'Private Researches',
              data: research.map((data) => data.total),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
            },
          ],
        })
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchUserResearch()
  }, [setUser])

  return (
    <div style={{ width: '200px' }}>
      <Pie data={chartData} />
    </div>
  )
}

export default Chart
