import React, { useState, useContext } from 'react';
import { Box, Typography, Paper, TextField, Button, Divider, Card, CardContent, CardActions } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { SnackbarContext } from '../App';

export default function Settings() {
  const showSnackbar = useContext(SnackbarContext);
  const [smtp, setSmtp] = useState(localStorage.getItem('smtp') || 'smtp.gmail.com');
  const [signature, setSignature] = useState(localStorage.getItem('signature') || 'Best regards,\nÖmer Faruk Yılmaz');
  const [subject, setSubject] = useState(localStorage.getItem('subject') || 'Job Application: Software Developer');

  const handleSave = () => {
    localStorage.setItem('smtp', smtp);
    localStorage.setItem('signature', signature);
    localStorage.setItem('subject', subject);
    showSnackbar('Settings saved!', 'success');
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Box sx={{ maxWidth: 540, mx: 'auto', px: 2 }}>
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SettingsIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h5" fontWeight={900} color="primary.main">Admin Settings Panel</Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Card variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography fontWeight={700} mb={2}>SMTP Server</Typography>
              <TextField
                label="SMTP Host"
                fullWidth
                value={smtp}
                onChange={e => setSmtp(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Typography fontWeight={700} mb={2}>Email Subject</Typography>
              <TextField
                label="Subject"
                fullWidth
                value={subject}
                onChange={e => setSubject(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Typography fontWeight={700} mb={2}>Email Signature</Typography>
              <TextField
                label="Signature"
                fullWidth
                multiline
                minRows={3}
                value={signature}
                onChange={e => setSignature(e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={handleSave} sx={{ borderRadius: 2, fontWeight: 700 }}>Save</Button>
            </CardActions>
          </Card>
        </Paper>
      </Box>
    </Box>
  );
} 