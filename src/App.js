import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Avatar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import QueueEmails from './components/QueueEmails';
import ProcessingEmails from './components/ProcessingEmails';
import NotSendedEmails from './components/NotSendedEmails';
import CsvUpload from './components/CsvUpload';
import BatchSend from './components/BatchSend';

const SIDEBAR_WIDTH = 220;

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f7f8fa' }}>
        {/* Sidebar (all pages except login) */}
        {token && <Sidebar />}
        {/* Main Content */}
        <Box sx={{ flex: 1,  display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {token && <Navbar onLogout={handleLogout} />}
          <Box sx={{ flex: 1, pt: token ? '56px' : 0 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard token={token} /></PrivateRoute>} />
              <Route path="/queue" element={<PrivateRoute><QueueEmails token={token} /></PrivateRoute>} />
              <Route path="/processing" element={<PrivateRoute><ProcessingEmails token={token} /></PrivateRoute>} />
              <Route path="/not-sended" element={<PrivateRoute><NotSendedEmails token={token} /></PrivateRoute>} />
              <Route path="/upload" element={<PrivateRoute><CsvUpload token={token} /></PrivateRoute>} />
              <Route path="/batch" element={<PrivateRoute><BatchSend token={token} /></PrivateRoute>} />
              <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
