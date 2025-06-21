import React, { useEffect, useState, useMemo } from 'react';
import { getNotSendedEmails, sendQueueEmail, removeQueueEmail, exportQueueEmails, getCompanies } from '../api/api';
import {
    Typography, Box, InputBase, MenuItem, Select, FormControl, InputLabel, TextField, Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EmailTable from './EmailTable';

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

export default function NotSendedEmails({ token }) {
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
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const res = await getCompanies();
                setCompanies(res.data.companies);
            } catch (error) {
                console.error("Failed to fetch companies", error);
            }
        }
        fetchCompanies();
    }, []);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const filters = {
                search,
                company: companyFilter,
                status: statusFilter,
                date: dateFilter,
                sort: sortBy,
                order: sortOrder
            };
            const res = await getNotSendedEmails(page + 1, rowsPerPage, filters);
            setEmails(res.data.emails);
            setTotal(res.data.total);
            setLoading(false);
        }
        fetchData();
    }, [token, page, rowsPerPage, search, companyFilter, statusFilter, dateFilter, sortBy, sortOrder]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredEmails = useMemo(() => emails, [emails]);

    // Actions
    const handleRetry = async (id) => {
        try {
            await sendQueueEmail(id);
            setSnackbar({ open: true, message: 'Resent successfully!', severity: 'success' });
            setEmails(emails => emails.map(e => e._id === id ? { ...e, isSend: true } : e));
        } catch (err) {
            setSnackbar({ open: true, message: 'Error resending!', severity: 'error' });
        }
    };
    const handleRemove = async (id) => {
        try {
            await removeQueueEmail(id);
            setSnackbar({ open: true, message: 'Removed from queue!', severity: 'success' });
            setEmails(emails => emails.filter(e => e._id !== id));
        } catch (err) {
            setSnackbar({ open: true, message: 'Error deleting!', severity: 'error' });
        }
    };
    const handleExport = async () => {
        try {
            const res = await exportQueueEmails();
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'not_sent_export.csv');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setSnackbar({ open: true, message: 'CSV exported!', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Export error!', severity: 'error' });
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
                    <Typography variant="h5" fontWeight={700} color="#222">Queued Emails</Typography>
                    <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport} sx={{ borderRadius: 2, fontWeight: 700 }}>
                        Export CSV
                    </Button>
                </Box>
                <Typography variant="body1" color="#888" mb={3}>This page lists emails that have been saved to the database but have not yet started the sending process.</Typography>
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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2} alignItems="center">
                    <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel>Company</InputLabel>
                        <Select value={companyFilter} label="Company" onChange={e => setCompanyFilter(e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            {companies.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        size="small"
                        label="Date"
                        type="date"
                        value={dateFilter}
                        onChange={e => setDateFilter(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 140 }}
                    />
                </Stack>
                <EmailTable
                    emails={filteredEmails}
                    loading={loading}
                    total={total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    onRetry={handleRetry}
                    onDelete={handleDeleteClick}
                    onExportCSV={exportAsCSV}
                    onExportEML={exportAsEML}
                    pageType="queued"
                />
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={snackbar.severity}
                    >
                        {snackbar.message}
                    </MuiAlert>
                </Snackbar>
                <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                    <DialogTitle>Delete Email</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this email from the queue? This action cannot be undone.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteCancel}>Cancel</Button>
                        <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
} 