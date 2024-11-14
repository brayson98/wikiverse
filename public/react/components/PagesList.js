import React from 'react'
import { Link } from 'react-router-dom'

export const PagesList = ({ pages }) => {
  return (
    <div>
      {pages.map((page) => (
        <div key={page.id}>
          <h3>
            <Link to={`/page/${page.slug}`}>{page.title}</Link>
          </h3>
        </div>
      ))}
    </div>
  )
}
export default PagesList;