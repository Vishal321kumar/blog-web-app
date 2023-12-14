import "./App.css";
import {  Routes, Route, Link,useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login")
      // window.location.pathname = "/login";
    });
  };

  return (
    <div className="App">

        <nav>
          <Link to="">Home</Link>
          {!isAuth ? (
            <Link to="/login">Login</Link>
            ) : (
              <>
              <Link to="/createpost">CreatePost</Link>
              <button onClick={signUserOut}>LogOut</button>
              </>
          )}
          
        </nav>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth}/>} />
          <Route path="/CreatePost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>

    </div>
  );
}

export default App;
