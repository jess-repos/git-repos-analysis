import React from 'react'
import { useData } from '../../context/DataProvider'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'

import classes from './Chart.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import getYears from '../../utils/getYears'
const LineChart = () => {
  const { totalIssues, totalPrs } = useData()
  const [aspectRatio, setAspectRatio] = useState(2)
  const width = window.innerWidth
  const years = getYears()

  useEffect(() => {
    if (width <= 900) {
      setAspectRatio(1)
    } else {
      setAspectRatio(2)
    }
  }, [width])

  let delayed

  const borderWidth = 2

  return (
    <div className={`${classes.chart} ${classes.bar}`}>
      <Line
        data={{
          labels: years,
          datasets: [
            {
              label: 'Total Pull Requests',
              data: totalPrs,
              borderColor: 'rgba(38, 227, 252, 0.5)',
              borderWidth: borderWidth,
            },
            {
              label: 'Total Issues',
              data: totalIssues,
              borderColor: 'rgba(255, 158, 66, 0.5)',
              borderWidth: borderWidth,
            },
          ],
        }}
        options={{
          aspectRatio: aspectRatio,
          radius: 5, // point size
          hitRadius: 30, // point distance of hover
          hoverRadius: 12, // point size on hover
          // indexAxis: 'y',
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Total Pull Requests and Issues by Year',
              font: {
                size: 24,
              },
            },
          },
          animation: {
            onComplete: () => {
              delayed = true
            },
            delay: (context) => {
              let delay = 0
              if (
                context.type === 'data' &&
                context.mode === 'default' &&
                !delayed
              ) {
                delay = context.dataIndex * 50 // + context.dataIndex * 300
              }
              return delay
            },
          },
          scales: {
            y: {
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

              //   beginAtZero: true, // y axis labels begins at zero
            },
            x: {
              grid: {
                color: 'rgba(255,255,255,0)',
              },
            },
          },
        }}
      />
    </div>
  )
}

export default LineChart
