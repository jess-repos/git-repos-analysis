import 'chart.js/auto'
import { PolarArea } from 'react-chartjs-2'
import { useData } from '../../context/DataProvider'
import classes from './Chart.module.css'
const DoughnutChart = () => {
  const { repos, languages } = useData()

  const data = repos.map((item) => item.num_repos)
  const colors = [
    'rgba(75, 43, 221, 0.5)',
    'rgba(100, 133, 125, 0.5)',
    'rgba(110, 179, 29, 0.5)',
    'rgba(132, 127, 125, 0.5)',
    'rgba(41, 205, 145, 0.5)',
    'rgba(115, 221, 182, 0.5)',
    'rgba(167, 186, 29, 0.5)',
    'rgba(236, 23, 232, 0.5)',
    'rgba(24, 251, 101, 0.5)',
    'rgba(229, 53, 32, 0.5)',
  ]
  const borderColor = 'rgba(128,128,128)'
  const borderWidth = 0

  return (
    <div className={`${classes.chart} ${classes.doughnut}`}>
      <PolarArea
        data={{
          labels: languages,
          datasets: [
            {
              data: data,
              backgroundColor: colors,
              borderColor: borderColor,
              borderWidth: borderWidth,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Number of Repositories by Language',
              font: {
                size: 24,
              },
            },
          },
          scales: {
            r: {
              ticks: {
                callback: (value) => {
                  if (value < 50000) {
                    return value
                  }
                  if (value >= 1000000) {
                    return value / 1000000 + 'M'
                  }
                  if (value >= 1000) {
                    return value / 1000 + 'K'
                  }
                  return value
                },
              },
            },
          },
        }}
      />
    </div>
  )
}

export default DoughnutChart
