import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Home() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  // const navigate = useNavigate();
  // const [data, setData] = useState([]);
  // const [comment, setComment] = useState("");
  // const [show, setShow] = useState(false);
  // const [item, setItem] = useState([]);

  // // Toast functions
  // const notifyA = (msg) => toast.error(msg);
  // const notifyB = (msg) => toast.success(msg);

  // useEffect(() => {
  //   const token = localStorage.getItem("jwt");
  //   if (!token) {
  //     navigate("./signup");
  //   }

    // Fetching all posts
  //   fetch("http://localhost:5000/allposts", {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       setData(result);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // to show and hide comments
  // const toggleComment = (posts) => {
  //   if (show) {
  //     setShow(false);
  //   } else {
  //     setShow(true);
  //     setItem(posts);
  //   }
  // };

  // const likePost = (id) => {
  //   fetch("http://localhost:5000/like", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       postId: id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       const newData = data.map((posts) => {
  //         if (posts._id == result._id) {
  //           return result;
  //         } else {
  //           return posts;
  //         }
  //       });
  //       setData(newData);
  //       console.log(result);
  //     });
  // };
  // const unlikePost = (id) => {
  //   fetch("http://localhost:5000/unlike", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       postId: id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       const newData = data.map((posts) => {
  //         if (posts._id == result._id) {
  //           return result;
  //         } else {
  //           return posts;
  //         }
  //       });
  //       setData(newData);
  //       console.log(result);
  //     });
  // };

  // function to make comment
  // const makeComment = (text, id) => {
  //   fetch("http://localhost:5000/comment", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //     body: JSON.stringify({
  //       text: text,
  //       postId: id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       const newData = data.map((posts) => {
  //         if (posts._id == result._id) {
  //           return result;
  //         } else {
  //           return posts;
  //         }
  //       });
  //       setData(newData);
  //       setComment("");
  //       notifyB("Comment posted");
  //       console.log(result);
  //     });
  // };

  return (
    <div className="home">
      {/* card */}
     
        return (
          <div className="card">
            {/* card header */}
            <div className="card-header">
              <div className="card-pic">
                <img
                  src={ picLink}
                  alt=""
                />
              </div>
              <h5>
               
              </h5>
            </div>
            {/* card image */}
            <div className="card-image">
              <img src={posts.photo} alt="" />
            </div>

            {/* card content */}
            <div className="card-content">
              {posts.likes.includes(
                JSON.parse(localStorage.getItem("user"))._id
              ) ? (
                <span
                  className="material-symbols-outlined material-symbols-outlined-red"
                  onClick={() => {
                    unlikePost(posts._id);
                  }}
                >
             
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