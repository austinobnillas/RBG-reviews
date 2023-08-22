import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import Home from './components/HomePage';
import CreateReview from './components/CreateReview';
import UpdateReview from './components/UpdateReview';
import Login from './components/login';
import UserForm from './components/register';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/register'} element={<UserForm />} />
          <Route path={'/home'} element={<Home />} />
          <Route path={'/create'} element={<CreateReview />} />
          <Route path={'/update/:id'} element={<UpdateReview />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
