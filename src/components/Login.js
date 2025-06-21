import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, CircularProgress, Paper, Avatar, InputAdornment, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('omer@omerfarukyilmaz.dev');
  const [password, setPassword] = useState('Test.122');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(email, password, 'user'); // always user login
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'user');
      if (onLogin) onLogin(res.data.token, 'user');
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed!');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ bgcolor: '#f7f8fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4, boxShadow: '0 2px 16px 0 rgba(30,34,40,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: '#1976d2', width: 64, height: 64, mb: 2 }}>
            <LockOutlinedIcon sx={{ fontSize: 36 }} />
          </Avatar>
          <Typography variant="h4" fontWeight={700} color="#1976d2" mb={1} align="center">
            Mailwise Login
          </Typography>
          <Typography variant="body1" color="#888" mb={3} align="center">
            Log in to access your personal dashboard.
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(v => !v)} edge="end" size="small">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontWeight: 700, fontSize: 17, borderRadius: 2, boxShadow: 'none' }}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Paper>
        <Box sx={{ mt: 4, textAlign: 'center', color: '#b0b3b9', fontSize: 14 }}>
          <Typography variant="body2" color="#b0b3b9">
            © {new Date().getFullYear()} Mailwise. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 