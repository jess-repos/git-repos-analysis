import React, { createContext, useContext, useEffect, useState } from 'react'
import reposDataset from '../datasets/repos.json'
import prsDataset from '../datasets/prs.json'
import issuesDataset from '../datasets/issues.json'
import getYears from '../utils/getYears'

const dataContext = createContext({
  repos: [],
  languages: [],
  prs: [],
  issues: [],
  getData: () => {},
  playHandler: () => {},
  year: 0,
  setYear: () => {},
  isPlaying: false,
})

export function useData() {
  return useContext(dataContext)
}

function getUniqueObjects(arr) {
  const map = new Map()
  for (const obj of arr) {
    if (map.has(obj.name)) {
      const seenObj = map.get(obj.name)
      seenObj.count = +seenObj.count + +obj.count
    } else {
      map.set(obj.name, obj)
    }
  }
  return [...map.values()]
}

function compare(a, b) {
  if (+a.count > +b.count) {
    return -1
  }
  if (+a.count < +b.count) {
    return 1
  }
  return 0
}

const yearNow = new Date().getFullYear()

const DataProvider = ({ children }) => {
  const [repos, setRepos] = useState([])
  const [prs, setPrs] = useState([])
  const [issues, setIssues] = useState([])
  const [languages, setLanguages] = useState([])
  const [year, setYear] = useState(yearNow)
  const [totalIssues, setTotalIssues] = useState([])
  const [totalPrs, setTotalPrs] = useState([])
  const [allIssues, setAllIssues] = useState(0)
  const [allPrs, setAllPrs] = useState(0)
  const [allRepos, setAllRepos] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    getData(yearNow)
    getTotals()
    getTotalsAll()
  }, [])

  const getTotalsAll = () => {
    const totalRepos = reposDataset
      .map((item) => +item.num_repos)
      .reduce((a, b) => a + b, 0)
    const totalPrs = prsDataset
      .map((item) => +item.count)
      .reduce((a, b) => a + b, 0)
    const totalIssues = issuesDataset
      .map((item) => +item.count)
      .reduce((a, b) => a + b, 0)
    setAllRepos(totalRepos)
    setAllPrs(totalPrs)
    setAllIssues(totalIssues)
  }

  const getTotals = () => {
    const years = getYears()
    const tempTotalIssues = years.map((year) => {
      const issuesByYear = issuesDataset.filter((item) => +year === +item.year)
      const issuesArray = issuesByYear.map((item) => +item.count)
      return issuesArray.reduce((a, b) => a + b, 0)
    })
    const tempTotalPrs = years.map((year) => {
      const prsByYear = prsDataset.filter((item) => +year === +item.year)
      const prsArray = prsByYear.map((item) => +item.count)
      return prsArray.reduce((a, b) => a + b, 0)
    })
    setTotalIssues(tempTotalIssues)
    setTotalPrs(tempTotalPrs)
  }

  const playHandler = async () => {
    setIsPlaying(true)
    for (let i = 2011; i <= yearNow; i++) {
      getData(i)
      setYear(i)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    setIsPlaying(false)
  }

  const getData = (year) => {
    const reposValues = reposDataset.sort(compare).slice(0, 10)
    const labels = reposValues.map((item) => item.language)
    const prsByYear = getUniqueObjects(
      prsDataset.filter((item) => +item.year === +year)
    )
    const issuesByYear = getUniqueObjects(
      issuesDataset.filter((item) => +item.year === +year)
    )
    const prsValues = labels.map((label) =>
      prsByYear.find((item) => item.name === label)
    )
    const issuesValues = labels.map((label) =>
      issuesByYear.find((item) => item.name === label)
    )
    setRepos(reposValues)
    setPrs(prsValues)
    setIssues(issuesValues)
    setLanguages(labels)
  }

  return (
    <dataContext.Provider
      value={{
        repos,
        languages,
        prs,
        issues,
        getData,
        playHandler,
        year,
        setYear,
        isPlaying,
        totalIssues,
        totalPrs,
        allIssues,
        allRepos,
        allPrs,
      }}
    >
      {children}
    </dataContext.Provider>
  )
}

export default DataProvider
