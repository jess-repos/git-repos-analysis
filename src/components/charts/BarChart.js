import React from 'react'
import { useData } from '../../context/DataProvider'
import 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

import classes from './Chart.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
const BarChart = () => {
  const { year, languages, prs, issues } = useData()
  const [aspectRatio, setAspectRatio] = useState(2)
  const width = window.innerWidth

  useEffect(() => {
    if (width <= 900) {
      setAspectRatio(1)
    } else {
      setAspectRatio(2)
    }
  }, [width])

  let delayed

  const prsData = prs.map((item) => {
    if (!item) return 0
    return +item.count
  })
  const issuesData = issues.map((item) => {
    if (!item) return 0
    return +item.count
  })

  const borderColor = 'rgba(128,128,128)'
  const borderWidth = 0
  const pcolor = 'rgba(38, 227, 252, 0.5)'
  const icolor = 'rgba(255, 158, 66, 0.5)'

  return (
    <div className={`${classes.chart} ${classes.bar}`}>
      <Bar
        data={{
          labels: languages,
          datasets: [
            {
              label: 'Pull Requests',
              data: prsData,
              backgroundColor: pcolor,
              borderColor: borderColor,
              borderWidth: borderWidth,
            },
            {
              label: 'Issues',
              data: issuesData,
              backgroundColor: icolor,
              borderColor: borderColor,
              borderWidth: borderWidth,
            },
          ],
        }}
        options={{
          aspectRatio: aspectRatio,

          // indexAxis: 'y',
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Pull Requests and Issues of ' + year,
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

export default BarChart
