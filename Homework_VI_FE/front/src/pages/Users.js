import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.api.url}/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status !== 200) {
          throw new Error(response);
        }
        setUsers(response.data.users);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="page-container">
      <h2>Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.firstName} {user.lastName} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
