import React, { useEffect, useState } from 'react'
import "../css/Profile.css"
import PostDetail from '../Components/PostDetail'
import Profilepic from '../Components/Profilepic'
export const Profile = () => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [mypost,setMypost] = useState([])
    const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([]);
  const [changepic,setChangepic] = useState(false);
  const [user, setUser] = useState("")

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const chnageProfile = ()=>{
    if(changepic){
      setChangepic(false)
    }else{
      setChangepic(true)
    }
  }

  useEffect(()=>{
    fetch(`/users/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setMypost(result.posts);
        setUser(result.user)
        // console.log(mypost);
      });
  },[])
  return (
    <div className='profile'>
      <div className="profile-frame">
        <div className="profile-pic">
          <img 
          onClick={chnageProfile}
          src={user.Photo ? user.Photo : picLink} 
          alt="" />
        </div>
        <div className="profile-data">
          <h1 style={{fontSize:"30px"}}>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{display:"flex"}}>
            <p>40 posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
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

      {
        changepic && <Profilepic chnageProfile={chnageProfile}/>
      }

    
    </div>
  )
}
