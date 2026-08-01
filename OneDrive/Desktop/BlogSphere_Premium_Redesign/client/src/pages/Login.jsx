import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail } from '../components/Icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(
        'https://blogsphere-vj2p.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.token) {
        localStorage.setItem('token', data.token);

        localStorage.setItem(
          'userEmail',
          email
        );

        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="auth-shell">
      <div className="login-container">
        <div className="form-icon-badge">
          <Lock width={24} height={24} />
        </div>

        <h1>Welcome back</h1>
        <p className="form-subtitle">Log in to keep writing and reading.</p>

        <div className="field-group">
          <label className="field-label"><Mail width={14} height={14} /> Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label className="field-label"><Lock width={14} height={14} /> Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-footnote">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
