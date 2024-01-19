import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './pages/Login';
import Users from './pages/Users';
import Tasks from './pages/Tasks';
import CreateTasks from './pages/CreateTasks';
import './App.css';

const App = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="App">
      <Router>
        <nav className="nav">
          <Link to="/login">Login</Link> | 
          <Link to="/users">Users</Link> | 
          <Link to="/tasks">Tasks</Link> | 
          <Link to="/create-task">Create Task</Link> |
          {isAuthenticated && (
            <> | <button onClick={logout}>Logout</button></>
          )}
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/create-task" element={<CreateTasks />} />
        </Routes>
      </Router>
    </div>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
