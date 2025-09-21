import React, { useState, useEffect } from "react";
import axios from "axios";

const URL ="http://Localhost:5000/users";
const fetchHandler = async ()=>{
    return await axios.get(URL).then((res)=>res.data);
}

function UserProfile() {

    const[users, setUsers] = useState();
    useEffect(()=>{
        fetchHandler().then((data)=> setUsers(data.users));
    },[])

  return (
    <div>
      {users && users.map((user,i)=>(
        <div key={i}>
            <p><strong>Name:</strong> {user.userName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>    
      ))}
    </div>
  )
}

export default UserProfile
