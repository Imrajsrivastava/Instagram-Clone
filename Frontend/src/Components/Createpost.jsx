import React from 'react'
import './Createpost.css'

export const Createpost = () => {

    const loadfile = (event)=>{

        var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }

    }
  return (
    <div className='createPost'>
        <div className="create-header">
            <h4>Create New Post</h4>
            <button id='post-btn'>Share</button>
        </div>

        <div className="main-div">
        <img id="output" src='https://static.thenounproject.com/png/212328-200.png'/>
            <input type="file" accept='image/*' onChange={(event)=>{loadfile(event)}}/>
        </div>

        {/* details  */}

        <div className="details">
            <div className="card-header">
                <div className="card-pic">
                    <img src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" />
                </div>
                <h5>Raj</h5>
            </div>

            <textarea type="text" placeholder='Write a caption...'></textarea>
        </div>
    </div>
  )
}
