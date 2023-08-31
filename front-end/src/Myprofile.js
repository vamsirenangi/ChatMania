import React, {useContext, useState, useEffect} from 'react'
import {store} from './App'
import {Navigate} from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'

const Myprofile = () => {
  const [token, setToken] = useContext(store)
  const [data, setData] = useState(null);
  const [allMsg, setAllMsg] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  useEffect(() => {
    axios.get('https://chatmania-backend.onrender.com/myprofile',{
      headers: {
        'x-token': token
      }
    } ).then(res=>setData(res.data)).catch(err=>console.log(err))

    axios.get('https://chatmania-backend.onrender.com/getmsg',{
      headers: {
        'x-token': token
      }
    } ).then(res=>setAllMsg(res.data)).catch(err=>console.log(err))
  })
const submitHandler = (e)=>{
  e.preventDefault();
  axios.post('https://chatmania-backend.onrender.com/addmsg', {text: newMsg},{
      headers: {
        'x-token': token
      }
    } ).then(res=>setAllMsg(res.data)).catch(err=>console.log(err))
}
 
  if(!token){
    return <Navigate to='/login' />
  }
  return (
    <div>
      {
        data &&
        <center><br />
                <div class="card" style={{"width": "38rem", 'backgroundColor': 'transparent','border':'2px solid black',  'textAlign': 'left'}}>
                    <div  class="card-body" style={{'height': '70vh', 'overflowY': 'scroll'}}   >
                      {
                        allMsg.length >=1 ?
                          allMsg.map((message)=>(
                            <div class='card'  >
                              <div class='card-body' >
                                <h5 class='card-title' >{message.username}  <Moment style={{'font-size':'11px'}} format='YYYY:MM:DD hh:mm:ss'>{message.date}</Moment></h5>
                                <p>{message.text}</p>
                              </div>
                            </div>
                          ))
                        :
                        <h1>Messages Loading......</h1>

                      }
                    </div>
                    <div class='card-body'>  
                      <form onSubmit={submitHandler}>
                        <input type='text' onChange={(e)=> setNewMsg(e.target.value)} />
                        <input type='submit' value='Send Message' />
                      </form>
                      < hr style={{'border': '2px solid black'}}/>
                      <button  class="btn btn-primary" onClick={() => setToken(null)}>Leave</button>
                    </div>
                  </div>
                
        </center>
}
    </div>
  )
}

export default Myprofile
