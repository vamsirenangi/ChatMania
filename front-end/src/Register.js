import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Register.css'
const Register = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })
    const changeHandler = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post('https://chatmania-backend.onrender.com/register', data).then((res)=>alert(res.data));
    }
  return (
    // <div>
    //     <center>
    //         <form onSubmit={submitHandler}>
    //             <h3>Register</h3>
    //             <input onChange={changeHandler} type='text' name='username' placeholder='username' /><br/>
    //             <input onChange={changeHandler} type='email' name='email' placeholder='email' /><br/>
    //             <input onChange={changeHandler} type='password' name='password' placeholder='password' /><br/>
    //             <input onChange={changeHandler} type='password' name='confirmpassword' placeholder='confirm password' /><br/>
    //             <input type='submit' value='Register' />
    //         </form>
    //     </center>
    // </div>
    <div class="wrapper">
    <h2>Registration</h2>
    <form onSubmit={submitHandler}>
      <div class="input-box">
        <input onChange={changeHandler} type='text' name='username' placeholder='username' required />
      </div>
      <div class="input-box">
        <input onChange={changeHandler} type='email' name='email' placeholder='email' required />
      </div>
      <div class="input-box">
        <input onChange={changeHandler} type='password' name='password' placeholder='password' required />
      </div>
      <div class="input-box">
        <input onChange={changeHandler} type='password' name='confirmpassword' placeholder='confirmpassword' required />
      </div>
      <div class="input-box button">
        <input type="Submit" value="Register Now" />
      </div>
      <div class="text">
        <h3>Already have an account? <Link to='/login'>Login</Link></h3>
      </div>
    </form>
  </div>
  )
}

export default Register