import React, { useState } from 'react';
import { uploadCsv } from '../api/api';
import { Container, Typography, Button, Box, Alert, LinearProgress } from '@mui/material';

export default function CsvUpload({ token }) {
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setSuccess('');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        if (!file) {
            setError('Please select a file!');
            return;
        }
        setLoading(true);
        try {
            const res = await uploadCsv(file);
            setSuccess(res.data.message + ` (${res.data.count})`);
            setFile(null);
        } catch (err) {
            setError('Upload failed!');
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Typography variant="h6">Upload CSV File</Typography>
                <form onSubmit={handleSubmit}>
                    <input type="file" accept=".csv" onChange={handleFileChange} />
                    <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }} disabled={loading}>
                        Upload
                    </Button>
                </form>
                {loading && <LinearProgress sx={{ mt: 2 }} />}
                {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </Box>
        </Container>
    );
} 