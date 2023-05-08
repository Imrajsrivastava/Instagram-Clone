import logo from './logo.svg';
import './App.css';
// import { Navbar } from './Components/Navbar';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import SignIn from './Components/SignIn'
import Signup from './Components/Signup';
import { Profile } from './Components/Profile';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Createpost } from './Components/Createpost';
import { createContext, useState } from 'react';
import { LoginContext } from './Contextapi/Logincontext';
import Modal from './Components/Modal';



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
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/createPost' element={<Createpost/>}/>
    </Routes>
    <ToastContainer />

    {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}


      </LoginContext.Provider>

    </div>
    </BrowserRouter>
  );
}

export default App;
