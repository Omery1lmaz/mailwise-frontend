import React, { useEffect, useState } from 'react';
import { fetchInboxApi, getInbox } from '../api/api';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const PAGE_SIZE = 20;

export default function Inbox() {
  const [mails, setMails] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(false);
  const [fetchMsg, setFetchMsg] = useState('');
  const [selectedMail, setSelectedMail] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInbox(page, PAGE_SIZE)
      .then(res => {
        setMails(res.data.mails);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch(err => {
        setError('Gelen mailler alınamadı');
        setLoading(false);
      });
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const fetchInbox = async () => {
    setFetching(true);
    setFetchMsg('');
    try {
      await fetchInboxApi();
      setFetchMsg('Gelen kutuları başarıyla güncellendi.');
      setPage(1); // ilk sayfaya dön
      setTimeout(() => setFetchMsg(''), 3000);
      // Güncel veriyi çek
      setLoading(true);
      getInbox(1, PAGE_SIZE)
        .then(res => {
          setMails(res.data.mails);
          setTotal(res.data.total);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } catch (err) {
      setFetchMsg('Gelen kutusu güncellenemedi!');
    }
    setFetching(false);
  };

  const handleOpenModal = (mail) => {
    setSelectedMail(mail);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMail(null);
  };

  return (
    <Box sx={{ bgcolor: '#f7f8fa', minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" fontWeight={700} color="#222">Gelen Kutusu</Typography>
          <Button variant="contained" onClick={fetchInbox} disabled={fetching} sx={{ borderRadius: 2, fontWeight: 700 }}>
            {fetching ? 'Güncelleniyor...' : 'Gelen Kutusunu Güncelle'}
          </Button>
        </Box>
        {fetchMsg && <Typography sx={{ mb: 2, color: fetchMsg.includes('başarı') ? 'green' : 'red' }}>{fetchMsg}</Typography>}
        {loading ? (
          <Typography>Yükleniyor...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Kimden</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Kime</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Konu</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Tarih</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>İçerik</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Detay</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mails.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: '#b0b3b9' }}>
                      <Typography variant="subtitle1" color="#b0b3b9">Hiç mail bulunamadı</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  mails.map(mail => (
                    <TableRow key={mail._id} hover sx={{ transition: 'background 0.2s', '&:hover': { background: '#f5f7fa' } }}>
                      <TableCell sx={{ maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mail.from}</TableCell>
                      <TableCell sx={{ maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mail.to}</TableCell>
                      <TableCell sx={{ maxWidth: 220, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mail.subject}</TableCell>
                      <TableCell>{mail.date ? new Date(mail.date).toLocaleString() : ''}</TableCell>
                      <TableCell sx={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mail.body?.slice(0, 80)}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Detayları Gör">
                          <IconButton color="primary" onClick={() => handleOpenModal(mail)}>
                            <InfoOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {/* Pagination */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
          <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} sx={{ mr: 2 }}>Önceki</Button>
          <Typography>Sayfa {page} / {totalPages}</Typography>
          <Button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} sx={{ ml: 2 }}>Sonraki</Button>
        </Box>
      </Box>
      {/* Detay Modalı */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Mail Detayı</DialogTitle>
        <DialogContent dividers>
          {selectedMail && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Kimden:</Typography>
              <Typography mb={1}>{selectedMail.from}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Kime:</Typography>
              <Typography mb={1}>{selectedMail.to}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Konu:</Typography>
              <Typography mb={1}>{selectedMail.subject}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Tarih:</Typography>
              <Typography mb={1}>{selectedMail.date ? new Date(selectedMail.date).toLocaleString() : ''}</Typography>
              <Typography variant="subtitle2" color="text.secondary">İçerik:</Typography>
              <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: '#f9f9fa', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 15 }}>
                {selectedMail.body}
              </Paper>
              {selectedMail.attachments && selectedMail.attachments.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Ekler:</Typography>
                  {selectedMail.attachments.map((att, idx) => (
                    <Chip key={idx} label={att.filename} sx={{ mr: 1, mb: 1 }} />
                  ))}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 