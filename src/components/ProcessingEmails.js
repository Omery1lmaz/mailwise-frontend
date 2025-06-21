import React, { useEffect, useState, useMemo } from 'react';
import { getProcessingEmails } from '../api/api';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography, Box, InputBase, Chip, Avatar, Stack, LinearProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import dayjs from 'dayjs';

const AVATAR_COLORS = ['#1976d2', '#00C49F', '#FFBB28', '#FF8042', '#A020F0'];
function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
    return color;
}

// Masking helpers

export default function ProcessingEmails({ token }) {
    const [emails, setEmails] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // Ortalama gönderim süresi (örnek: 45 saniye)
    const AVG_SEND_SEC = 45;
    const estimatedTotalSec = total * AVG_SEND_SEC;
    const estimatedFinish = new Date(Date.now() + estimatedTotalSec * 1000);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const filters = { search };
            const res = await getProcessingEmails(page + 1, rowsPerPage, filters);
            setEmails(res.data.emails);
            setTotal(res.data.total);
            setLoading(false);
        }
        fetchData();
    }, [token, page, rowsPerPage, search]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredEmails = useMemo(() => emails, [emails]);

    return (
        <Box sx={{ bgcolor: '#f7f8fa', minHeight: '100vh', py: 4 }}>
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
                <Typography variant="h5" fontWeight={700} mb={0.5} color="#222">Processing Emails</Typography>
                <Typography variant="body1" color="#888" mb={3}>Emails currently being processed for sending.</Typography>
                {/* Summary Bar */}
                <Paper elevation={1} sx={{ display: 'flex', alignItems: 'center', gap: 4, p: 2, mb: 3, borderRadius: 3, bgcolor: '#fff', boxShadow: '0 1px 4px 0 rgba(30,34,40,0.04)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <GroupIcon color="primary" />
                        <Typography fontWeight={600} fontSize={15} color="#1976d2">Total:</Typography>
                        <Typography fontWeight={700} fontSize={18} color="#222">{total}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon color="warning" />
                        <Typography fontWeight={600} fontSize={15} color="#FFBB28">Average Time:</Typography>
                        <Typography fontWeight={700} fontSize={18} color="#222">{AVG_SEND_SEC} sec</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon color="success" />
                        <Typography fontWeight={600} fontSize={15} color="#00C49F">Estimated Completion:</Typography>
                        <Typography fontWeight={700} fontSize={18} color="#222">{estimatedFinish.toLocaleTimeString('en-US')}</Typography>
                    </Box>
                </Paper>
                {/* Search Bar */}
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#fff', borderRadius: 2, px: 2, py: 1, mb: 2, boxShadow: '0 1px 4px 0 rgba(30,34,40,0.04)', maxWidth: 340 }}>
                    <SearchIcon sx={{ color: '#b0b3b9', fontSize: 20, mr: 1 }} />
                    <InputBase
                        placeholder="Search emails, names, company..."
                        sx={{ fontSize: 15, color: '#888', width: '100%' }}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </Box>
                <Paper elevation={1} sx={{ borderRadius: 3, boxShadow: '0 2px 16px 0 rgba(30,34,40,0.04)', overflow: 'hidden' }}>
                    {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
                    <TableContainer>
                        <Table size="medium">
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f7f8fa' }}>
                                    <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15, py: 2 }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15, py: 2 }}>First Name</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15, py: 2 }}>Last Name</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15, py: 2 }}>Company</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15, py: 2 }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#222', fontSize: 15, py: 2 }}>Created At</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredEmails.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 6, color: '#b0b3b9' }}>
                                            <InboxIcon sx={{ fontSize: 48, mb: 1, color: '#e0e3e8' }} />
                                            <Typography variant="subtitle1" color="#b0b3b9">No emails found</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredEmails.map((row) => (
                                        <TableRow key={row._id} hover sx={{ transition: 'background 0.2s', '&:hover': { bgcolor: '#f5f6fa' } }}>
                                            <TableCell sx={{ py: 1.5 }}>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <Avatar sx={{ width: 32, height: 32, bgcolor: stringToColor(row.email || row.firstName || 'U') }}>
                                                        {row.firstName?.[0] || row.email?.[0] || 'U'}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography fontWeight={600} fontSize={15}>{row.email}</Typography>
                                                    </Box>
                                                </Stack>
                                            </TableCell>
                                            <TableCell sx={{ py: 1.5 }}>{row.firstName}</TableCell>
                                            <TableCell sx={{ py: 1.5 }}>{row.lastName}</TableCell>
                                            <TableCell sx={{ py: 1.5 }}>{row.company}</TableCell>
                                            <TableCell sx={{ py: 1.5 }}>
                                                <Chip
                                                    label={row.isSend ? "Sent" : (row.status === 'error' ? "Error" : (row.isProcessing ? 'Processing' : 'Queued'))}
                                                    size="small"
                                                    color={row.isSend ? "success" : (row.status === 'error' ? "error" : (row.isProcessing ? 'warning' : 'primary'))}
                                                    sx={{ fontWeight: 600 }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ py: 1.5 }}>{dayjs(row.createdAt).format('DD.MM.YYYY HH:mm')}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={total}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10, 20, 50]}
                        sx={{ px: 2, pb: 1 }}
                    />
                </Paper>
            </Box>
        </Box>
    );
} 