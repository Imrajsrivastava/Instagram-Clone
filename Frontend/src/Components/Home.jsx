import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <div className="card">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://media.istockphoto.com/id/1388253782/photo/positive-successful-millennial-business-professional-man-head-shot-portrait.jpg?b=1&s=170667a&w=0&k=20&c=KZM6TIhdaJAy28BA9sg0Sn-ZRd160F6HytdAKykza-s="
              alt=""
            />
          </div>
          <h5>Raj</h5>
        </div>
        {/* card-image  */}
        <div className="card-image">
          <img
            src="https://media.istockphoto.com/id/1407759041/photo/confident-happy-beautiful-hispanic-student-girl-indoor-head-shot-portrait.jpg?b=1&s=170667a&w=0&k=20&c=--Ei0owZ8KqwVppB5o0bMRG4aNV8VA0HHnsH1YfuxAw="
            alt=""
          />
        </div>
        {/* card-content  */}
        <div className="card-content">
          <span class="material-symbols-outlined">favorite</span><br />
          <p>1 Like</p>
          <p>This is amazing</p>
        </div>
        {/* add-comment  */}
        <div className="add-comment">
        <span class="material-symbols-outlined">
mood
</span>
<input type="text" placeholder="Add a comment"/>
<button className="comment">Post</button>
        </div>
      </div>
    </div>
  );
}
