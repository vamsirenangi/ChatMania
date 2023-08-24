import React, { useContext, useState } from 'react'
import axios from 'axios'
import {store} from './App'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
    let navigate = useNavigate();
    const [token, setToken] = useContext(store)
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const changeHandler = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        console.log('initiated')
        axios.post('http://localhost:5000/login', data).then(
            res => setToken(res.data.token)
        );
    }
    if(token){
        return navigate('/myprofile')
    }
  return (
    // <div>
    //     <center>
    //         <div className='wrapper'>
    //         <form onSubmit={submitHandler} autocomplete='off'>
    //             <h3>Login</h3>
    //             <input onChange={changeHandler} type='email' name='email' placeholder='email' /><br/>
    //             <input onChange={changeHandler} type='password' name='password' placeholder='password' /><br/>
    //             <input type='submit' value='LogIn' />
    //         </form>
    //         </div>
            
    //     </center>
    // </div>
    <div class="wrapper">
        <h2>LogIn</h2>
        <form onSubmit={submitHandler}>
          <div class="input-box">
            <input onChange={changeHandler} type='email' name='email' placeholder='email' required />
          </div>
          <div class="input-box">
            <input onChange={changeHandler} type='password' name='password' placeholder='password' required />
          </div>
          <div class="input-box button">
            <input type="Submit" value="Login" />
          </div>
          <div class="text">
            <h3>Don't have an account? <Link to='/register'>Register</Link></h3>
          </div>
        </form>
  </div>
    
  )
}

export default Login