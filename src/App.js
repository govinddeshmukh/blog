import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import { auth } from './firebase/Firebase_config';
import { useEffect, useState } from 'react';
import CreateBlog from './pages/CreateBlog/CreateBlog';
import Navbar from './components/Navbar/Navbar';
import Profile from './pages/Profile/Profile';
import SinglePost from './pages/SinglePost/SinglePost';
import UserPost from './pages/UsersPosts/UserPost';
import CategoriesPost from './pages/CategoriesPost/CategoriesPost';
function App() {
  const [isauth, setauth] = useState(localStorage.getItem("isauth"))
  const [username, setusername] = useState("")
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setusername(user.displayName)
      }
      else{
        setusername("")
      }
      console.log(user)
    })
  },[])
  return (
    <div className="App">
        <Router>
      <Navbar setauth={setauth} name={username} />
          <Routes>
            <Route path='/' element={<Home isauth={isauth} />}>Home</Route>
            <Route path='/profile' element={<Profile />}>Home</Route>
            <Route path='/login' element={<Login setauth={setauth} />}>Home</Route>
            <Route path='/signup' element={<SignUp setauth={setauth} />}>Home</Route>
            <Route path='/createblog' element={<CreateBlog isauth={isauth} />}>Home</Route>
            <Route path='/user/:id' element={<SinglePost  isauth={isauth} setauth={setauth}  />}>Home</Route>
            <Route path='/:id' element={<UserPost isauth={isauth} setauth={setauth}  />}>Home</Route>
            <Route path="/type/:type" element={<CategoriesPost isauth={isauth} setauth={setauth} />} />
            <Route path="/type/:type" element={<CategoriesPost isauth={isauth} setauth={setauth} />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
