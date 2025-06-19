import React, { useState } from 'react';
import { sendBatch } from '../api/api';
import { Paper, Typography, Button, Box, Alert, LinearProgress, Avatar, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function BatchSend({ token }) {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        setSuccess('');
        setError('');
        setLoading(true);
        try {
            const res = await sendBatch(token);
            setSuccess(res.data.message + ` (${res.data.count})`);
        } catch (err) {
            setError('Batch başlatılamadı!');
        }
        setLoading(false);
    };

    return (
        <Box sx={{ bgcolor: '#f7f8fa', minHeight: '100vh', py: 4 }}>
            <Box sx={{ maxWidth: 480, mx: 'auto', px: 2 }}>
                <Paper elevation={2} sx={{ borderRadius: 4, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 16px 0 rgba(30,34,40,0.04)' }}>
                    <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56, mb: 2 }}>
                        <SendIcon sx={{ fontSize: 32, color: '#fff' }} />
                    </Avatar>
                    <Typography variant="h5" fontWeight={700} mb={1} color="#222">Batch Email Gönderimi</Typography>
                    <Typography variant="body1" color="#888" mb={3} align="center">Bir tıkla 80 email gönderimini başlat. Bu işlem arka planda gerçekleşir ve ilerleme durumu dashboardda güncellenir.</Typography>
                    <Button variant="contained" color="primary" size="large" startIcon={<SendIcon />} disabled={loading} sx={{ minWidth: 220, fontWeight: 700, fontSize: 16, borderRadius: 2 }}>
                        80 Email Gönderimini Başlat
                    </Button>
                    {loading && <LinearProgress sx={{ mt: 3, width: '100%' }} />}
                    {success && <Alert severity="success" sx={{ mt: 3, width: '100%' }}>{success}</Alert>}
                    {error && <Alert severity="error" sx={{ mt: 3, width: '100%' }}>{error}</Alert>}
                </Paper>
            </Box>
        </Box>
    );
} 