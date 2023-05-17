import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function Home() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const navigate = useNavigate();


  const notifyE = (msg) => toast.error(msg);
  const notifyS = (msg) => toast.success(msg);

  useEffect(() => {
    let token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }


   
    fetch("http://localhost:5000/getallPosts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        setData(result)})
      .catch((err) => console.log(err));
  }, [data]);




    // to show and hide comments
    const toggleComment = (posts) => {
      if (show) {
        setShow(false);
      } else {
        setShow(true);
        setItem(posts);
      }
    };
  

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };


  // comment add function here 
    const makeComment = (cmt,id) => {
      fetch("http://localhost:5000/comments", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          text:cmt,
          postId: id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setComment("")
          notifyS("Comment posted")
          console.log(result);
        });
    };
    
 

  return (
    <div className="home">
      {data.map((posts) => {
        return (
          <div className="card">
            <div className="card-header">
              <div className="card-pic">
                <img
                    src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink}
                  alt=""
                />
              </div>
              <Link to={`/profile/${posts.postedBy._id}`}>
              <h5>{posts.postedBy.name}</h5>
              </Link>
            </div>
            {/* card-image  */}
            <div className="card-image">
              <img src={posts.photo} alt="photo" />
            </div>
            {/* card-content  */}
            <div className="card-content">
              {posts.likes.includes(
                JSON.parse(localStorage.getItem("user"))._id
              ) ? (
                <span
                  class="material-symbols-outlined material-symbols-outlined-red"
                  onClick={() => {
                    unlikePost(posts._id);
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  class="material-symbols-outlined"
                  onClick={() => {
                    likePost(posts._id);
                  }}
                >
                  favorite
                </span>
              )}

              {/* <span class="material-symbols-outlined" onClick={()=>{likePost(posts._id)}}>favorite</span> */}
              {/* <span class="material-symbols-outlined material-symbols-outlined-red"  onClick={()=>{unlikePost(posts._id)}}>favorite</span> */}
              <p>{posts.likes.length} Like</p>
              <p>{posts.body}</p>
              <p
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  toggleComment(posts);
                }}
              >
                View all comments
              </p>
            </div>




            {/* add-comment  */}

            <div className="add-comment">
              <span class="material-symbols-outlined">mood</span>
              <input type="text" value={comment} placeholder="Add a comment" onChange={(e)=>{setComment(e.target.value)}} />
              <button className="comment" onClick={()=>{makeComment(comment,posts._id)}}>Post</button>
            </div>



          </div>
        );
      })}



      {/* show comment  */}


      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">
              {/* card header */}
              <div
                className="card-header"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                <div className="card-pic">
                  <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>

              {/* commentSection */}
              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments.map((comment) => {
                  return (
                    <p className="comm">
                      <span
                        className="commenter"
                        style={{ fontWeight: "bolder" }}
                      >
                        {comment.postedBy.name}{" "}
                      </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>

              {/* card content */}
              <div className="card-content">
                <p>{item.likes.length} Likes</p>
                <p>{item.body}</p>
              </div>

              {/* add Comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div
            className="close-comment"
            onClick={() => {
              toggleComment();
            }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>
      )}
 


    </div>
  );
}
