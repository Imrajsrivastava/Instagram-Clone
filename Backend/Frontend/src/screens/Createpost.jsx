import React, { useEffect, useState } from "react";
import "../css/Createpost.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const Createpost = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url,setUrl] = useState("");
  const navigate = useNavigate()

   // Toast functions
   const notifyA = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

    const notifyS = (msg)=>toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });


  useEffect(()=>{

     //saving post in mongodb

    if(url){

      fetch("/creatPost",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          body,
          pic:url
        })
      }).then((res)=>{
        return res.json();
      }).then((data)=>{
        if(data.error){
          notifyA(data.error);
        }else{
          notifyS("Successfully Posted");
          navigate("/");
        }
      }).catch((err)=>{
        console.log(err);
      })
    }
    


  },[url])


  // posting image to clodinary 

 const postDetails = ()=>{
  console.log(body,image)

  const data = new FormData();
  data.append("file",image);
  data.append("upload_preset","Instagram-clone");
  data.append("cloud_name","raj4485cloud");

  fetch("https://api.cloudinary.com/v1_1/raj4485cloud/image/upload",{
    method:"post",
    body:data
  }).then((res)=>{
   return res.json();
  })
  .then((data)=>{
    console.log(data.url);
    setUrl(data.url);
  }).catch((err)=>{
    console.log(err);
  })


  //saving post in mongodb it is definig in use effect ...


// fetch("http://localhost:5000/creatPost",{
//   method:"post",
//   headers:{
//     "Content-Type":"application/json",
//     "Authorization":"Bearer "+localStorage.getItem("jwt")
//   },
//   body:JSON.stringify({
//     body,
//     pic:url
//   })
// })

 }

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <div className="createPost">
      <div className="create-header">
        <h4>Create New Post</h4>
        <button id="post-btn" onClick={postDetails}>Share</button>
      </div>

      <div className="main-div">
        <img
          id="output"
          src="https://static.thenounproject.com/png/212328-200.png"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>

      {/* details  */}

      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <h5>Raj</h5>
        </div>

        <textarea
          type="text"
          value={body}
          placeholder="Write a caption..."
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};
