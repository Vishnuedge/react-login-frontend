import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Home({ history }) {
  const [error, setError] = useState();
  const [privateData, setPrivateData] = useState();

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      history.push('/login');
    }
    const fetchPrivateData = async () => {
      const config = {
        header: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      };
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/auth/register',
          config
        );
        setPrivateData(data.data);
      } catch (err) {
        localStorage.removeItem('authToken');
        setError('You are not authorized please login');
      }
    };
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history.push('/login');
  };

  return (
    <>
      <h1>Hi from HOME</h1>
      {error ? (
        <span>{error}</span>
      ) : (
        <div style={{ background: 'green', color: 'white' }}>{privateData}</div>
      )}
      <button class="btn btn-danger text-white" onClick={handleLogout}>
        LOGOUT
      </button>
    </>
  );
}
