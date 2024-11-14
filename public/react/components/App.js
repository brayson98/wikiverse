import React, { useEffect, useState } from 'react'
import { PagesList } from './PagesList'
import { PageDetails } from './PageDetails'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import and prepend the api URL to any fetch calls
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [isAddingArticle, setIsAddingArticle] = useState(false)  
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    name: '',
    email: '',
    tags: ''
  })
  

  useEffect(() => {
    async function fetchPages () {
      try {
        const response = await fetch(`${apiURL}/wiki`)
        const pagesData = await response.json()
        setPages(pagesData)
      } catch (err) {
        console.log('Oh no an error! ', err)
      }
    }

    fetchPages()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({
      ...newArticle, 
      [name]: value
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      title: newArticle.title,
      content: newArticle.content,
      name: newArticle.name,
      email: newArticle.email,
      tags: newArticle.tags
    }

    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(articleData)
      });

      const data = await response.json();
      if (response.ok) {
        
        const updatedPagesResponse = await fetch(`${apiURL}/wiki`);
        const updatedPagesData = await updatedPagesResponse.json();
        setPages(updatedPagesData);

        setNewArticle({
          title: '',
          content: '',
          name: '',
          email: '',
          tags: ''
        });
        setIsAddingArticle(false);  
      } else {
        console.log('Error adding article:', data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <Router>
      <main>
        <h1>WikiVerse</h1>
        <h2>An interesting 📚</h2>
        
        
        {!isAddingArticle && (
          <button onClick={() => setIsAddingArticle(true)}>Add New Page</button>
        )}

        
        {isAddingArticle ? (
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={newArticle.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Content</label>
              <textarea
                name="content"
                value={newArticle.content}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Author Name</label>
              <input
                type="text"
                name="name"
                value={newArticle.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Author Email</label>
              <input
                type="email"
                name="email"
                value={newArticle.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Tags (separate with spaces)</label>
              <input
                type="text"
                name="tags"
                value={newArticle.tags}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <PagesList pages={pages} />
        )}

        {/* Routes for displaying pages */}
        <Routes>
          <Route path="/" element={<PagesList pages={pages} />} />
          <Route path="/page/:slug" element={<PageDetails />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
