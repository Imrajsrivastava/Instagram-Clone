import React, { useEffect, useState } from 'react'
import "./Profile.css"

export const Profile = () => {
  const [mypost,setMypost] = useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/myposts",{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")

      }
    }).then((res)=>{
      return res.json()
    })
    .then((data)=>{
      console.log((data));
      setMypost(data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div className='profile'>
      <div className="profile-frame">
        <div className="profile-pic">
          <img src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" />
        </div>
        <div className="profile-data">
          <h1 style={{fontSize:"30px"}}>Raj Srivastava</h1>
          <div className="profile-info" style={{display:"flex"}}>
            <p>40 posts</p>
            <p>400 following</p>
            <p>600 followers</p>
          </div>
        </div>
      </div>
<hr  style={{width:"90%",opacity:"0.8",margin:"25px auto"}}/>
      {/* gallery  */}
   

      <div className="gallery">

      {
        mypost.map((post)=>{
          return (
            
            <img src={post.photo} alt="post" />
          )
        })
      }
        {/* <img src="https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        <img src="https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        <img src="https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        <img src="https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        <img src="https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" /> */}
      </div>
    </div>
  )
}
