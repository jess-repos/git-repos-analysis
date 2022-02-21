import React from 'react'
import { useData } from '../context/DataProvider'
import classes from './Summary.module.css'

const Summary = () => {
  const { allRepos, allPrs, allIssues } = useData()
  return (
    <div className={classes.summary}>
      <h2>Summary</h2>
      <div>
        <p>
          <b>Total Number of Repositories</b> {allRepos}
        </p>
        <p>
          <b>Total Number of Pull Requests</b> {allPrs}
        </p>
        <p>
          <b>Total Number of Issues</b> {allIssues}
        </p>
      </div>
    </div>
  )
}

export default Summary
