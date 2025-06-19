import React, { useState } from 'react';
import { sendBatch } from '../api/api';
import { Paper, Typography, Button, Box, Alert, LinearProgress, Avatar, Stack, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function BatchSend({ token }) {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [batchStatus, setBatchStatus] = useState('');

    const handleSend = async () => {
        setSuccess('');
        setError('');
        setLoading(true);
        setBatchStatus('');
        
        try {
            const res = await sendBatch(token);
            setSuccess(res.data.message);
            setBatchStatus(res.data.status);
            
            // 3 saniye sonra success mesajını temizle
            setTimeout(() => {
                setSuccess('');
                setBatchStatus('');
            }, 5000);
            
        } catch (err) {
            console.error('Batch send error:', err);
            setError(err.response?.data?.error || 'Batch başlatılamadı! Lütfen tekrar deneyin.');
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
                    
                    <Typography variant="h5" fontWeight={700} mb={1} color="#222">
                        Batch Email Gönderimi
                    </Typography>
                    
                    <Typography variant="body1" color="#888" mb={3} align="center">
                        Bir tıkla 80 email gönderimini başlat. Bu işlem arka planda gerçekleşir ve ilerleme durumu dashboardda güncellenir.
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                        <Chip 
                            icon={<SendIcon />} 
                            label="80 Email" 
                            color="primary" 
                            variant="outlined"
                        />
                        <Chip 
                            icon={<CheckCircleIcon />} 
                            label="Worker Thread" 
                            color="success" 
                            variant="outlined"
                        />
                    </Stack>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large" 
                        startIcon={<SendIcon />} 
                        disabled={loading} 
                        onClick={handleSend}
                        sx={{ 
                            minWidth: 220, 
                            fontWeight: 700, 
                            fontSize: 16, 
                            borderRadius: 2,
                            py: 1.5
                        }}
                    >
                        {loading ? 'Başlatılıyor...' : '80 Email Gönderimini Başlat'}
                    </Button>

                    {loading && (
                        <Box sx={{ width: '100%', mt: 3 }}>
                            <LinearProgress />
                            <Typography variant="body2" color="#888" mt={1} textAlign="center">
                                Worker thread başlatılıyor...
                            </Typography>
                        </Box>
                    )}

                    {success && (
                        <Alert 
                            severity="success" 
                            sx={{ mt: 3, width: '100%' }}
                            icon={<CheckCircleIcon />}
                        >
                            <Typography variant="body1" fontWeight={600}>
                                {success}
                            </Typography>
                            {batchStatus && (
                                <Typography variant="body2" color="inherit">
                                    Durum: {batchStatus}
                                </Typography>
                            )}
                        </Alert>
                    )}

                    {error && (
                        <Alert 
                            severity="error" 
                            sx={{ mt: 3, width: '100%' }}
                            icon={<ErrorIcon />}
                        >
                            <Typography variant="body1" fontWeight={600}>
                                {error}
                            </Typography>
                        </Alert>
                    )}

                    <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 2, width: '100%' }}>
                        <Typography variant="body2" color="#666" textAlign="center">
                            💡 İpucu: Email gönderimi arka planda devam eder. 
                            İlerleme durumunu Dashboard sayfasından takip edebilirsiniz.
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
} 