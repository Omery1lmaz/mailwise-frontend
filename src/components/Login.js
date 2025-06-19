import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert, CircularProgress, ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleChange = (event, newRole) => {
    if (newRole) setRole(newRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let res;
      if (role === 'admin') {
        res = await login(email, password); // admin login
      } else {
        res = await login(email, password, 'user'); // user login
      }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', role);
      if (onLogin) onLogin(res.data.token, role);
      navigate('/dashboard');
    } catch (err) {
      setError('Giriş başarısız!');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h5" align="center">Giriş Yap</Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          <ToggleButtonGroup
            value={role}
            exclusive
            onChange={handleRoleChange}
            aria-label="login role"
            size="small"
          >
            <ToggleButton value="admin" aria-label="admin">Admin</ToggleButton>
            <ToggleButton value="user" aria-label="user">User</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>
      </Box>
    </Container>
  );
} 