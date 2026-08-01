import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import { Feather } from './components/Icons';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import SinglePost from './pages/SinglePost';
import EditPost from './pages/EditPost';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/create"
          element={
            localStorage.getItem('token')
              ? <CreatePost />
              : <Login />
          }
        />

        <Route
          path="/post/:id"
          element={<SinglePost />}
        />

        <Route
          path="/edit/:id"
          element={<EditPost />}
        />
      </Routes>

      <footer className="footer">
        <h3><Feather width={20} height={20} /> BlogSphere</h3>

        <p>Full Stack Blogging Platform</p>

        <p>Built by Sayali Lagad</p>

        <p>© 2026 All Rights Reserved</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;