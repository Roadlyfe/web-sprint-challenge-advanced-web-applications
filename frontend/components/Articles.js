import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import PT from 'prop-types'

export default function Articles(props) {
  const { 
    articles, 
    getArticles, 
    deleteArticle, 
    updateArticle,
    spinner,
   } = props

  if (!window.localStorage.getItem('token')) {
    return <Navigate to="/" /> 
  }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    <div className="articles">
      <h2>Articles</h2>
      {
        spinner
        ? "Please Wait..."
        : articles.map(art => {
          return (
            <div className="article" key={art.article_id}>
              <div>
                <h3>{art.title}</h3>
                <p>{art.text}</p>
                <p>topic: {art.topic}</p>
              </div>
              <button onClick={evt => deleteArticle(art.article_id)}>Delete</button>
              <button onClick={evt => updateArticle(art.article_id)}>Update</button>

            </div>
          )
        })
      }
    </div>
  )
}

//deal with this disabled button mess
//<button disabled={true} onClick={Function.prototype}>Edit</button>
//<button disabled={true} onClick={Function.prototype}>Delete</button>


// 🔥 No touchy: Articles expects the following props exactly:
Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({ // the array can be empty
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })).isRequired,
  getArticles: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticleId: PT.number, // can be undefined or null
}
