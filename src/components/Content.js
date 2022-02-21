import React from 'react'
import BarChart from './charts/BarChart'
import DoughnutChart from './charts/DoughnutChart'
import LineChart from './charts/LineChart'

import classes from './Content.module.css'
import Description from './Description'
import Summary from './Summary'

const Content = () => {
  return (
    <div className={classes.content}>
      <Description />
      <div className={classes.main}>
        <DoughnutChart />
        <BarChart />
      </div>
      <div className={classes.summary}>
        <LineChart />
        <Summary />
      </div>
    </div>
  )
}

export default Content
