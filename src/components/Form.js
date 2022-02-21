import React from 'react'
import { createPortal } from 'react-dom'
import { useData } from '../context/DataProvider'
import getYears from '../utils/getYears'

import classes from './Form.module.css'

const Form = () => {
  const { getData, playHandler, year, setYear, isPlaying } = useData()

  const options = getYears().map((year, index) => (
    <option key={index} value={year}>
      {year}
    </option>
  ))

  const changeHandler = (e) => {
    const { value } = e.target
    setYear(value)
    getData(value)
  }

  return createPortal(
    <>
      <div className={classes.form}>
        <h2>Git Repos Analysis</h2>
        <div className={classes.actions}>
          <select
            value={year}
            onChange={changeHandler}
            className={`${isPlaying && classes.playing}`}
          >
            {options}
          </select>
          <button
            className={`${isPlaying && classes.playing}`}
            onClick={playHandler}
          >
            {isPlaying ? (
              <i className='fas fa-spinner'></i>
            ) : (
              <i className='fas fa-play'></i>
            )}
          </button>
        </div>
      </div>
      <div className={classes.footer}>
        © Mark Christian Albinto 2022 (ReactJS, ChartJS)
      </div>
    </>,
    document.getElementById('form')
  )
}

export default Form
