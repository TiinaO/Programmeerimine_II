import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

import config from '../config';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    console.log(config.api.url)
    try {
      const response = await axios.post(`${config.api.url}/login`, { email, password });
      if (response.status !== 200) {
        throw new Error('Login failed');
      }
      const { token, id } = response.data;
      login(token);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      console.log('response.data.userId', response);
      console.log('Login Success:');
      navigate('/tasks');
    } catch (error) {
      console.error('Login Error:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="page-container">
      <h2>Login</h2>
      <div className="form-container">  {/* New container div */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
