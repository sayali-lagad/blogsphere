import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Feather, PenSquare, LogOut, Menu, X } from './Icons';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={() => setOpen(false)}>
        <span className="logo-mark">
          <Feather width={18} height={18} />
        </span>
        BlogSphere
      </Link>

      <button
        className="nav-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        {open ? <X /> : <Menu />}
      </button>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>

        {!token ? (
          <>
            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/register" className="nav-cta" onClick={() => setOpen(false)}>
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/create" className="nav-cta" onClick={() => setOpen(false)}>
              <PenSquare width={16} height={16} />
              Create Post
            </Link>

            <button className="logout-btn" onClick={handleLogout}>
              <LogOut width={16} height={16} />
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
