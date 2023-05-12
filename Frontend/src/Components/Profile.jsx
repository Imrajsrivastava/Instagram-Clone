import React, { useEffect, useState } from 'react'
import "./Profile.css"
import PostDetail from './PostDetail'

export const Profile = () => {
  const [mypost,setMypost] = useState([])
    const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([]);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

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
          <h1 style={{fontSize:"30px"}}>{JSON.parse(localStorage.getItem("user")).name}</h1>
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
            
            <img src={post.photo} alt="post" onClick={()=>{toggleDetails(post)}} />
          )
        })
      }
       
      </div>

      {
        show &&   <PostDetail item={posts} toggleDetails={toggleDetails}/>
      }

    
    </div>
  )
}
