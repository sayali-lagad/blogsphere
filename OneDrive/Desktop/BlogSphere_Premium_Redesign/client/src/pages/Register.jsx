import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock } from '../components/Icons';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        }
      );

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="auth-shell">
      <div className="login-container">
        <div className="form-icon-badge">
          <User width={24} height={24} />
        </div>

        <h1>Create your account</h1>
        <p className="form-subtitle">Join BlogSphere and start sharing your story.</p>

        <div className="field-group">
          <label className="field-label"><User width={14} height={14} /> Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label className="field-label"><Mail width={14} height={14} /> Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="field-group">
          <label className="field-label"><Lock width={14} height={14} /> Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" onClick={handleRegister}>
          Register
        </button>

        <p className="auth-footnote">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
