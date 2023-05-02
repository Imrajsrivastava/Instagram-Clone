import logo from './logo.svg';
import './App.css';
// import { Navbar } from './Components/Navbar';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Components/Home';
import SignIn from './Components/SignIn'
import Signup from './Components/Signup';
import { Profile } from './Components/Profile';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Navbar/>
    </div>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/profile' element={<Profile/>}/>
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
