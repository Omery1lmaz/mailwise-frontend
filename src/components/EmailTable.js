import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TablePagination, Typography, Box, Chip, Avatar, Stack, LinearProgress,
    Checkbox, Tooltip, IconButton
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';

const AVATAR_COLORS = ['#1976d2', '#00C49F', '#FFBB28', '#FF8042', '#A020F0'];

function stringToColor(str) {
    let hash = 0;
    if (!str) return AVATAR_COLORS[0];
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
    return color;
}


export default function EmailTable({
    emails,
    loading,
    total,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onSendNow,
    onRetry,
    onDelete,
    onExportCSV,
    onExportEML,
    showCheckbox = false,
    pageType = 'all' // 'all', 'queued'
}) {
    return (
        <Paper elevation={1} sx={{ borderRadius: 3, boxShadow: '0 2px 16px 0 rgba(30,34,40,0.04)', overflow: 'hidden' }}>
            {loading && <Box sx={{ width: '100%' }}><LinearProgress /></Box>}
            <TableContainer>
                <Table size="medium">
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f7f8fa' }}>
                            {showCheckbox && <TableCell padding="checkbox"><Checkbox /></TableCell>}
                            <TableCell>Email</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {emails.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={showCheckbox ? 8 : 7} align="center" sx={{ py: 6, color: '#b0b3b9' }}>
                                    <InboxIcon sx={{ fontSize: 48, mb: 1, color: '#e0e3e8' }} />
                                    <Typography variant="subtitle1" color="#b0b3b9">No emails found</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            emails.map((row) => (
                                <React.Fragment key={row._id}>
                                    <TableRow hover sx={{ transition: 'background 0.2s', '&:hover': { background: '#f5f7fa' } }}>
                                        {showCheckbox && <TableCell padding="checkbox"><Checkbox /></TableCell>}
                                        <TableCell sx={{ py: 1.5 }}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Avatar sx={{ width: 32, height: 32, bgcolor: stringToColor(row.email || row.firstName || 'U') }}>
                                                    {row.firstName?.[0] || row.email?.[0] || 'U'}
                                                </Avatar>
                                                <Typography noWrap sx={{ maxWidth: 200, fontSize: 15, fontWeight: 500 }}>
                                                    {row.to}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell sx={{ py: 1.5, fontSize: 15 }}>{row.firstName}</TableCell>
                                        <TableCell sx={{ py: 1.5, fontSize: 15 }}>{row.lastName}</TableCell>
                                        <TableCell sx={{ py: 1.5, fontSize: 15 }}>{row.company}</TableCell>
                                        <TableCell sx={{ py: 1.5 }}>
                                            <Chip
                                                label={row.isSend ? 'Sent' : (row.status === 'error' ? 'Error' : (row.isProcessing ? 'Processing' : 'Queued'))}
                                                size="small"
                                                color={row.isSend ? "success" : (row.status === 'error' ? "error" : (row.isProcessing ? 'warning' : 'primary'))}
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ py: 1.5, fontSize: 14, color: '#666' }}>{dayjs(row.createdAt).format('DD MMM, YYYY')}</TableCell>
                                        <TableCell sx={{ py: 1.5 }} align="right">
                                            <Stack direction="row" spacing={0} justifyContent="flex-end">
                                                {pageType === 'all' &&
                                                    <Tooltip title="Send Now">
                                                        <IconButton size="small" onClick={() => onSendNow(row._id)} disabled={row.isSend}>
                                                            <SendIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                                {pageType === 'queued' &&
                                                    <Tooltip title="Retry">
                                                        <IconButton size="small" onClick={() => onRetry(row._id)} disabled={row.isSend}>
                                                            <ReplayIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                                <Tooltip title="View Details">
                                                    <IconButton size="small">
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton size="small" onClick={() => onDelete(row)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Export as CSV">
                                                    <IconButton size="small" onClick={() => onExportCSV(row)}>
                                                        <DownloadIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Export as EML">
                                                    <IconButton size="small" onClick={() => onExportEML(row)}>
                                                        <FileOpenIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[20, 50, 100]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Paper>
    );
} 