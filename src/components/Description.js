import React from 'react'

import classes from './Description.module.css'

const Description = () => {
  return (
    <div className={classes.description}>
      <div>
        <h2>Context</h2>
        <p>
          A common question for those new and familiar to computer science and
          software engineering is what is the most best and/or most popular
          programming language. It is very difficult to give a definitive
          answer, as there are a seemingly indefinite number of metrics that can
          define the 'best' or 'most popular' programming language.
          <br />
          <br />
          One such metric that can be used to define a 'popular' programming
          language is the number of projects and files that are made using that
          programming language. As GitHub is the most popular public
          collaboration and file-sharing platform, analyzing the languages that
          are used for repositories, pull requests, and issues on GitHub and be
          a good indicator for the popularity of a language.
        </p>
      </div>
      <div>
        <h2>Content</h2>
        <p>
          This report is data visualization about the amount of repositories
          of the top 10 languages and pull requests and issues from years 2011
          to 2021
        </p>
      </div>
      <div>
        <h2>Limitations</h2>
        <p>
          Only data for public GitHub repositories, and their corresponding
          PRs/issues, have their data available publicly. Thus, this dataset is
          only based on public repositories, which may not be fully
          representative of all repositories on GitHub.
        </p>
      </div>
      <div>
        <h2>Sources</h2>
        <ul className={classes.source}>
          <li>
            <a href='https://bigquery.cloud.google.com/table/bigquery-public-data:github_repos.sample_contents'>
              Github Repos
            </a>
          </li>
          <li>
            <a href='https://console.cloud.google.com/bigquery?project=githubarchive&page=project'>
              Github Archive
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Description
