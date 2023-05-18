
import './App.css';

import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import SignIn from './Components/SignIn'
import Signup from './Components/Signup';
import { Profile } from './screens/Profile';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Createpost } from './screens/Createpost';
import { createContext, useState } from 'react';
import { LoginContext } from './Contextapi/Logincontext';
import Modal from './Components/Modal';
import UserProfie from './Components/UserProfie';
import Myfollowing from './screens/Myfollowing';
import Profilepic from './Components/Profilepic';



function App() {
  const [userLogin,setUserLogin]=useState(false)
  const [modalOpen,setModalOpen]=useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setUserLogin,userLogin,setModalOpen}}>

    <Navbar/>
    {/* </div> */}
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route exact path='/profile' element={<Profile/>}/>
    <Route path="/profile/:userid" element={<UserProfie/>}></Route>
    <Route path='/createPost' element={<Createpost/>}/>
    <Route path='/myfollows' element={<Myfollowing/>}/>
    <Route path='/profilepic' element={<Profilepic/>}/>
    </Routes>
    <ToastContainer />

    {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}


      </LoginContext.Provider>

    </div>
    </BrowserRouter>
  );
}

export default App;
