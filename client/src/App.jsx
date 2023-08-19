import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Home from './components/HomePage';

function App() {
  const [allReviews, setAllReviews] = useState([]);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={'/'} element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
