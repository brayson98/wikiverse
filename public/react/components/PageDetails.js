import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import apiURL from '../api'
import './PageDetails.css'  // Import the CSS file

export const PageDetails = () => {
  const { slug } = useParams() // Get slug from the URL
  const [page, setPage] = useState(null)
  const navigate = useNavigate() // Hook to navigate programmatically

  useEffect(() => {
    const fetchPageDetails = async () => {
      try {
        const response = await fetch(`${apiURL}/wiki/${slug}`) // Fetch the specific page by slug
        const pageData = await response.json()
        setPage(pageData)
      } catch (err) {
        console.log('Error fetching page details: ', err)
      }
    }

    fetchPageDetails()
  }, [slug]) // Re-fetch when the slug changes

  if (!page) return <p>Loading...</p> // Show loading text while fetching the data

  return (
    <div className="page-details">
      <h2>{page.title}</h2>
      <p><strong>Author:</strong> {page.author.name}</p>
      <p><strong>Content:</strong> {page.content}</p>
      <p><strong>Tags:</strong> <span className="tags">{page.tags.map(tag => tag.name).join(', ')}</span></p>
      <p><strong>Date Created:</strong> {new Date(page.createdAt).toLocaleDateString()}</p>
      <button onClick={() => navigate('/')}>Back to List</button>
    </div>
  )
}

export default PageDetails;
