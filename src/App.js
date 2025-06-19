import React, { useState, useEffect, useMemo, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import QueueEmails from './components/QueueEmails';
import ProcessingEmails from './components/ProcessingEmails';
import NotSendedEmails from './components/NotSendedEmails';
import CsvUpload from './components/CsvUpload';
import BatchSend from './components/BatchSend';
import Documentation from './components/Documentation';
import Settings from './components/Settings';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SIDEBAR_WIDTH = 220;

export const SnackbarContext = createContext();

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function AppRoutes({ token, setToken, role, setRole }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f7f8fa' }}>
      {/* Sidebar (all pages except login) */}
      {token && <Sidebar role={role} />}
      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {token && <Navbar onLogout={handleLogout} role={role} />}
        <Box sx={{ flex: 1, pt: token ? '56px' : 0 }}>
          <Routes>
            <Route path="/login" element={<Login onLogin={(t, r) => { setToken(t); setRole(r); localStorage.setItem('role', r); }} />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard token={token} /></PrivateRoute>} />
            <Route path="/queue" element={<PrivateRoute><QueueEmails token={token} /></PrivateRoute>} />
            <Route path="/processing" element={<PrivateRoute><ProcessingEmails token={token} /></PrivateRoute>} />
            <Route path="/not-sended" element={<PrivateRoute><NotSendedEmails token={token} /></PrivateRoute>} />
            {role === 'admin' && <Route path="/upload" element={<PrivateRoute><CsvUpload token={token} /></PrivateRoute>} />}
            {role === 'admin' && <Route path="/batch" element={<PrivateRoute><BatchSend token={token} /></PrivateRoute>} />}
            {role === 'admin' && <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />}
            <Route path="/documentation" element={<Documentation />} />
            <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
  }, []);
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };
  const theme = useMemo(() => createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#f7f8fa',
        paper: '#fff',
      },
      primary: { main: '#1976d2' },
      secondary: { main: '#00C49F' },
      warning: { main: '#FFBB28' },
      error: { main: '#FF8042' },
      success: { main: '#00C49F' },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      fontWeightBold: 700,
      fontWeightMedium: 600,
      fontWeightRegular: 400,
    },
  }), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarContext.Provider value={showSnackbar}>
        <Router>
          <AppRoutes token={token} setToken={setToken} role={role} setRole={setRole} />
        </Router>
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </SnackbarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
