import React from 'react'
import { useState, createContext } from 'react'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './Nav'
import Login from './Login'
import Register from './Register'
import Myprofile from './Myprofile'

export const store = createContext();

const App = () => {
  const [token, setToken] = useState(null);
  return (
    <div>
      <store.Provider value={[token, setToken]}>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Nav/>} />
                <Route exact path='/register' element={<Register/>} />
                <Route exact path='/login' element={<Login/>} />
                <Route exact path='/myprofile' element={<Myprofile />} />
            </Routes>
        </BrowserRouter>
       </store.Provider>
    </div>
  )
}

export default App