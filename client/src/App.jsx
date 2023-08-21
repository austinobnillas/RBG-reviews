import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Home from './components/HomePage';

function App() {
  // const [allReviews, setAllReviews] = useState([]);

  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/api/viewreviews')
  //       .then(res => setAllReviews(res.data))
  //       .catch(err => {
  //           console.log(err)
  //       })
  //   }, [])

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={'/'} element={<Home /*allItems={allReviews*/ />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
