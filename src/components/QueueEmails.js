import React, { useEffect, useState } from 'react';
import { getQueueEmails, sendQueueEmail, removeQueueEmail, exportQueueEmails } from '../api/api';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography, Box, InputBase, Chip, Avatar, Stack, LinearProgress, MenuItem, Select, FormControl, InputLabel, TextField, TableSortLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import ReplayIcon from '@mui/icons-material/Replay';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

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

export default function QueueEmails({ token }) {
    const [emails, setEmails] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [companyFilter, setCompanyFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const res = await getQueueEmails( page + 1, rowsPerPage);
            setEmails(res.data.emails);
            setTotal(res.data.total);
            setLoading(false);
        }
        fetchData();
    }, [token, page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Unique companies for filter
    const companies = Array.from(new Set(emails.map(e => e.company).filter(Boolean)));

    // Filter & sort
    let filteredEmails = emails.filter(row => {
        let match = true;
        if (companyFilter && row.company !== companyFilter) match = false;
        if (statusFilter && row.status !== statusFilter) match = false;
        if (dateFilter && dayjs(row.createdAt).format('YYYY-MM-DD') !== dateFilter) match = false;
        return match;
    });
    filteredEmails = filteredEmails.sort((a, b) => {
        let aVal = a[sortBy] || '';
        let bVal = b[sortBy] || '';
        if (sortBy === 'createdAt') {
            aVal = dayjs(aVal).valueOf();
            bVal = dayjs(bVal).valueOf();
        } else {
            aVal = (aVal || '').toString().toLowerCase();
            bVal = (bVal || '').toString().toLowerCase();
        }
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    // Actions
    const handleSendNow = async (id) => {
        try {
            await sendQueueEmail(id);
            setSnackbar({ open: true, message: 'E-posta başarıyla gönderildi!', severity: 'success' });
            setEmails(emails => emails.map(e => e._id === id ? { ...e, isSend: true } : e));
        } catch (err) {
            setSnackbar({ open: true, message: 'Gönderim hatası!', severity: 'error' });
        }
    };
    const handleRemove = async (id) => {
        try {
            await removeQueueEmail(id);
            setSnackbar({ open: true, message: 'Kuyruktan silindi!', severity: 'success' });
            setEmails(emails => emails.filter(e => e._id !== id));
        } catch (err) {
            setSnackbar({ open: true, message: 'Silme hatası!', severity: 'error' });
        }
    };
    const handleExport = async () => {
        try {
            const res = await exportQueueEmails();
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'queue_export.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setSnackbar({ open: true, message: 'CSV dışa aktarıldı!', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Export hatası!', severity: 'error' });
        }
    };
    const handleDeleteClick = (row) => {
        setDeleteTarget(row);
        setDeleteDialogOpen(true);
    };
    const handleDeleteConfirm = () => {
        if (deleteTarget) handleRemove(deleteTarget._id);
        setDeleteDialogOpen(false);
        setDeleteTarget(null);
    };
    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setDeleteTarget(null);
    };
    const exportAsCSV = (row) => {
        const csv = `To,Subject,Body\n"${row.to}","${row.subject}","${row.body?.replace(/"/g, '""')}"`;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mail_${row._id}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };
    const exportAsEML = (row) => {
        const eml = `To: ${row.to}\nSubject: ${row.subject}\n\n${row.body || ''}\n\n${row.signature || ''}`;
        const blob = new Blob([eml], { type: 'message/rfc822' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mail_${row._id}.eml`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Box sx={{ bgcolor: '#f7f8fa', minHeight: '100vh', py: 4 }}>
            <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h5" fontWeight={700} color="#222">Queue</Typography>
                    <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport} sx={{ borderRadius: 2, fontWeight: 700 }}>
                        Export CSV
                    </Button>
                </Box>
                <Typography variant="body1" color="#888" mb={3}>See all emails in the queue and their status.</Typography>
                {/* Filters */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} alignItems="center">
                    <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>Şirket</InputLabel>
                        <Select value={companyFilter} label="Şirket" onChange={e => setCompanyFilter(e.target.value)}>
                            <MenuItem value="">Tümü</MenuItem>
                            {companies.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>Durum</InputLabel>
                        <Select value={statusFilter} label="Durum" onChange={e => setStatusFilter(e.target.value)}>
                            <MenuItem value="">Tümü</MenuItem>
                            <MenuItem value="queued">Kuyrukta</MenuItem>
                            <MenuItem value="processing">Gönderiliyor</MenuItem>
                            <MenuItem value="error">Hata</MenuItem>
                            <MenuItem value="sent">Gönderildi</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        size="small"
                        label="Tarih"
                        type="date"
                        value={dateFilter}
                        onChange={e => setDateFilter(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 140 }}
                    />
                </Stack>
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
                {/* Table */}
                <Paper elevation={1} sx={{ borderRadius: 3, boxShadow: '0 2px 16px 0 rgba(30,34,40,0.04)', overflow: 'hidden' }}>
                    {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
                    <TableContainer>
                        <Table size="medium">
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f7f8fa' }}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={false}
                                            checked={false}
                                            onChange={() => {}}
                                        />
                                    </TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortBy === 'firstName'}
                                            direction={sortBy === 'firstName' ? sortOrder : 'asc'}
                                            onClick={() => {
                                                setSortBy('firstName');
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            }}
                                        >Ad</TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortBy === 'lastName'}
                                            direction={sortBy === 'lastName' ? sortOrder : 'asc'}
                                            onClick={() => {
                                                setSortBy('lastName');
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            }}
                                        >Soyad</TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortBy === 'company'}
                                            direction={sortBy === 'company' ? sortOrder : 'asc'}
                                            onClick={() => {
                                                setSortBy('company');
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            }}
                                        >Şirket</TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortBy === 'createdAt'}
                                            direction={sortBy === 'createdAt' ? sortOrder : 'desc'}
                                            onClick={() => {
                                                setSortBy('createdAt');
                                                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                                            }}
                                        >Tarih</TableSortLabel>
                                    </TableCell>
                                    <TableCell>isSend</TableCell>
                                    <TableCell>isProcessing</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Hata Detayı</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredEmails.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center" sx={{ py: 6, color: '#b0b3b9' }}>
                                            <InboxIcon sx={{ fontSize: 48, mb: 1, color: '#e0e3e8' }} />
                                            <Typography variant="subtitle1" color="#b0b3b9">No emails found</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredEmails.map((row) => (
                                        <React.Fragment key={row._id}>
                                            <TableRow
                                                hover
                                                sx={{ transition: 'background 0.2s', '&:hover': { background: '#f5f7fa' } }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={false}
                                                        onChange={() => {}}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ py: 1.5 }}>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <Avatar sx={{ width: 32, height: 32, bgcolor: stringToColor(row.email || row.firstName || 'U') }}>
                                                            {row.firstName?.[0] || row.email?.[0] || 'U'}
                                                        </Avatar>
                                                        {row.companyLogo && (
                                                            <Avatar src={row.companyLogo} sx={{ width: 28, height: 28, ml: -1 }} variant="rounded" />
                                                        )}
                                                        <Box>
                                                            <Tooltip title={row.email}>
                                                                <Typography fontWeight={600} fontSize={15}>{row.email}</Typography>
                                                            </Tooltip>
                                                        </Box>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ py: 1.5 }}>
                                                    <Tooltip title={row.firstName}>
                                                        <Typography>{row.firstName}</Typography>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell sx={{ py: 1.5 }}>
                                                    <Tooltip title={row.lastName}>
                                                        <Typography>{row.lastName}</Typography>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell sx={{ py: 1.5 }}>
                                                    <Tooltip title={row.company}>
                                                        <Typography>{row.company}</Typography>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell sx={{ py: 1.5 }}>{dayjs(row.createdAt).format('DD.MM.YYYY HH:mm')}</TableCell>
                                                <TableCell sx={{ py: 1.5 }}>
                                                    <Chip
                                                        label={row.isSend ? 'Sent' : 'Not Sent'}
                                                        size="small"
                                                        sx={{ bgcolor: row.isSend ? '#e6f4ea' : '#fff4e6', color: row.isSend ? '#00C49F' : '#FF8042', fontWeight: 700 }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ py: 1.5 }}>
                                                    <Chip
                                                        label={row.isProcessing ? 'Processing' : 'Idle'}
                                                        size="small"
                                                        sx={{ bgcolor: row.isProcessing ? '#e3f2fd' : '#f5f6fa', color: row.isProcessing ? '#1976d2' : '#888', fontWeight: 700 }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ py: 1.5 }}>
                                                    <Tooltip title={row.status === 'processing' ? 'Gönderiliyor' : row.status === 'error' ? 'Hata' : row.status === 'sent' ? 'Gönderildi' : 'Kuyrukta'}>
                                                        <Chip
                                                            label={row.status === 'processing' ? 'Gönderiliyor' : row.status === 'error' ? 'Hata' : row.status === 'sent' ? 'Gönderildi' : 'Kuyrukta'}
                                                            color={row.status === 'processing' ? 'info' : row.status === 'error' ? 'error' : row.status === 'sent' ? 'success' : 'default'}
                                                            size="small"
                                                            sx={{ fontWeight: 600 }}
                                                        />
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell sx={{ py: 1.5 }}>
                                                    <Tooltip title={row.status === 'error' && row.errorMessage ? row.errorMessage : ''}>
                                                        {row.status === 'error' && row.errorMessage ? (
                                                            <Chip label="Hata Detayı" color="error" size="small" />
                                                        ) : null}
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell sx={{ py: 0.5, px: 1, minWidth: 140 }}>
                                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                                        <IconButton color="primary" onClick={() => handleSendNow(row._id)} disabled={row.isSend} size="small" sx={{ p: 0.75 }} title="Send Now">
                                                            <SendIcon />
                                                        </IconButton>
                                                        <IconButton color="primary" onClick={() => exportAsCSV(row)} size="small" sx={{ p: 0.75 }} title="CSV Olarak Dışa Aktar">
                                                            <DownloadIcon />
                                                        </IconButton>
                                                        <IconButton color="primary" onClick={() => exportAsEML(row)} size="small" sx={{ p: 0.75 }} title="EML Olarak Dışa Aktar">
                                                            <FileOpenIcon />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => handleDeleteClick(row)} size="small" sx={{ p: 0.75 }} title="Remove from Queue">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        {row.status === 'error' && (
                                                            <IconButton color="warning" onClick={() => handleSendNow(row._id)} size="small" sx={{ p: 0.75 }} title="Tekrar Gönder">
                                                                <ReplayIcon />
                                                            </IconButton>
                                                        )}
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                            {row.status === 'processing' && (
                                                <TableRow>
                                                    <TableCell colSpan={10} sx={{ p: 0 }}>
                                                        <LinearProgress color="info" />
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
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
                <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                        {snackbar.message}
                    </MuiAlert>
                </Snackbar>
            </Box>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>E-postayı Sil</DialogTitle>
                <DialogContent>
                    <Typography>Bu e-postayı silmek istediğinize emin misiniz?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel}>Vazgeç</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">Sil</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
} 