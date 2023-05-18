import React, { useState, useEffect, useRef } from "react";
import "../css/Profilepic.css"

export default function Profilepic({ chnageProfile }) {
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  // posting image to cloudinary


  const postDetails = ()=>{
   
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
     setUrl(data.url)
    }).catch((err)=>{
      console.log(err);
    })
  
  };

  const postPic = () => {
    // saving post to mongodb
    fetch("http://localhost:5000/uploadProfilePic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        chnageProfile();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    if (image) {
      postDetails();
    }
  }, [image]);
  useEffect(() => {
    if (url) {
      postPic();
      console.log("hii")
    }
    // postPic();
  }, [url]);

  
  return (
    <div className="profilePic darkBgPic">
      <div className="changePic centeredPic" style={{textAlign:"center"}}>
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button
            className="upload-btn"
            style={{ color: "#1EA1F7" }}
            onClick={handleClick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button className="upload-btn" style={{ color: "#ED4956" }} onClick={()=>{
            setUrl(null);
            postPic();
          }}>
            {" "}
            Remove Current Photo
          </button>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button className="CancelBtn" 
            // style={{
            //   background: "none",
            //   border: "none",
            //   cursor: "pointer",
            //   fontSize: "15px",
            // }}
            onClick={chnageProfile}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}