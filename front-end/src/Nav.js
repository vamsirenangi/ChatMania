import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
  return (
    <div className='whole-container'>
              <h1>ChatMania</h1>
                <Link to='/login'><button><p>Login</p></button></Link>
                <Link to='/register'><button><p>Register</p></button></Link>   
    </div>
  )
}

export default Nav