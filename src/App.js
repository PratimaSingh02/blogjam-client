import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar";
import Blog from "./screens/blog";
import Login from "./screens/login";
import Register from "./screens/register";
import Write from "./screens/write";
import Home from "./screens/home";
import Profile from "./screens/profile";
import BlogPost from "./components/blogPost";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route index path="/"
          element={user ? <Home /> : <Register />} />
        <Route path="/register"
          element={user ? <Home /> : <Register />}
        />
        <Route path="/login"
          element={user ? <Home /> : <Login />} />
        <Route path="/write"
          element={user ? <Write /> : <Register />} />
        <Route path="profile/*"
          element={user ? <Profile /> : <Register />} />
        <Route path="/blog/:blogId"
          element={user ? <BlogPost /> : <Register />} >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
