import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Switch, Paper, Chip, Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip as ReTooltip, ResponsiveContainer, CartesianGrid, Legend, BarChart, Bar } from 'recharts';
import { getQueueEmails, getProcessingEmails, getNotSendedEmails, getEmailStatsByDate, getEmailStatsByCountry } from '../api/api';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = 220;
const COLORS = ['#1976d2', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF69B4', '#00CED1', '#FFA07A'];

const cardData = [
  { label: 'Total Emails', icon: <MailOutlineIcon fontSize="medium" color="primary" />, color: '#1976d2' },
  { label: 'Sent', icon: <SendOutlinedIcon fontSize="medium" color="success" />, color: '#00C49F' },
  { label: 'Processing', icon: <HourglassEmptyOutlinedIcon fontSize="medium" color="warning" />, color: '#FFBB28' },
  { label: 'Not Sent', icon: <ErrorOutlineOutlinedIcon fontSize="medium" color="error" />, color: '#FF8042' },
];

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({ total: 0, sent: 0, notSended: 0, processing: 0 });
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const [queue, processing, notSended, dateStats, countryStats] = await Promise.all([
          getQueueEmails(1, 1),
          getProcessingEmails(1, 1),
          getNotSendedEmails(1, 1),
          getEmailStatsByDate(7),
          getEmailStatsByCountry()
        ]);
        setStats({
          total: queue.data.total,
          sent: queue.data.total - notSended.data.total,
          notSended: notSended.data.total,
          processing: processing.data.total
        });
        setBarData(dateStats.data.stats);
        setPieData(countryStats.data.stats);
      } catch (error) {
        console.error('Dashboard veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  // For the list card (recent emails or top countries)
  const topCountries = pieData.slice(0, 5);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: darkMode ? '#f4f6fa' : '#f7f8fa' }}>
      {/* Sidebar */}
 
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, bgcolor: darkMode ? '#f4f6fa' : '#f7f8fa', maxWidth: 1200, mx: 'auto', px: 2 }}>
        {loading && <LinearProgress sx={{ mb: 3 }} />}
        <Typography variant="h5" fontWeight={700} mb={2} color="#222" sx={{ letterSpacing: 0.5 }}>Dashboard</Typography>
        {/* Modern Processing Progress Card */}
        <Paper elevation={2} sx={{ width: '100%', mb: 4, p: { xs: 2, md: 3 }, borderRadius: 4, boxShadow: '0 2px 16px 0 rgba(255,193,7,0.08)', bgcolor: '#fffbe6', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
              <HourglassEmptyOutlinedIcon sx={{ fontSize: 44, color: '#FFBB28', animation: 'spin 2s linear infinite' }} />
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </Box>
            <Box>
              <Typography fontWeight={800} fontSize={22} color="#FFBB28" sx={{ letterSpacing: 0.5 }}>Processing</Typography>
              <Typography fontWeight={600} fontSize={18} color="#222" mt={0.5}>
                {stats.processing} <span style={{ color: '#888', fontWeight: 500 }}>/ {stats.total}</span>
              </Typography>
              <Typography fontSize={15} color="#b0b3b9" fontWeight={500} mt={0.5}>Yükleniyor...</Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 2, width: '100%' }}>
            <LinearProgress
              variant="indeterminate"
              sx={{
                height: 14,
                borderRadius: 7,
                background: 'linear-gradient(90deg, #fffbe6 0%, #ffe9b3 100%)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #FFBB28 0%, #FFD600 100%)',
                  boxShadow: '0 2px 8px 0 rgba(255,193,7,0.12)'
                }
              }}
              color="warning"
            />
          </Box>
        </Paper>
        {/* Summary Cards */}
        <Grid container spacing={2} mb={2} flex={1}>
          {cardData.map((item, idx) => {
            const value = [stats.total, stats.sent, stats.processing, stats.notSended][idx];
            return (
              <Grid item xs={12} sm={6} md={3} flex={1} key={item.label}>
                <Paper elevation={1} sx={{
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: '#fff',
                  boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  minHeight: 90,
                  flex: 1,
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: '0 4px 16px 0 rgba(0,0,0,0.08)' }
                }}>
                  <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', mb: 1 }}>
                    {item.icon}
                    <Typography fontWeight={600} fontSize={15} color="#888" ml={1}>{item.label}</Typography>
                  </Box>
                  {loading ? (
                    <Skeleton variant="text" width={60} height={36} sx={{ my: 1 }} />
                  ) : (
                    <Typography variant="h5" fontWeight={700} color={item.color}>{value}</Typography>
                  )}
                  {item.label === 'Processing' && !loading && <Typography color="warning.main" variant="body2">Batch running</Typography>}
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* Main Charts Row */}
        <Grid container sx={{ flexDirection: "column" }} spacing={2} mb={2}>
          <Grid item xs={12} flex={1} sx={
            {
              flexDirection: "column"
            }
          } md={8}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#fff', boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)', height: 340, minHeight: 300 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography fontWeight={600} fontSize={16} color="#222">Sales Overview</Typography>
                <Chip onClick={() => {}} label="Last 7 days" size="small" sx={{ bgcolor: '#f0f1f3', color: '#1976d2', fontWeight: 500 }} />
              </Box>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={260} sx={{ borderRadius: 2 }} />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1976d2" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#1976d2" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="colorNotSent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF8042" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#FF8042" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" fontSize={13} tickLine={false} axisLine={false} />
                    <YAxis fontSize={13} tickLine={false} axisLine={false} />
                    <ReTooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                    <Area type="monotone" dataKey="sent" stroke="#1976d2" fillOpacity={1} fill="url(#colorSent)" name="Sent" dot={{ r: 3 }} />
                    <Area type="monotone" dataKey="notSent" stroke="#FF8042" fillOpacity={1} fill="url(#colorNotSent)" name="Not Sent" dot={{ r: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} flex={1} md={4}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#fff', boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)', height: 340, minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography fontWeight={600} fontSize={16} color="#222" mb={1}>Total Subscriber</Typography>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height={220} sx={{ borderRadius: 2 }} />
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" fontSize={13} tickLine={false} axisLine={false} />
                      <YAxis fontSize={13} tickLine={false} axisLine={false} />
                      <ReTooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                      <Bar dataKey="sent" fill="#1976d2" name="Sent" radius={[6, 6, 0, 0]} barSize={24} />
                      <Bar dataKey="notSent" fill="#FF8042" name="Not Sent" radius={[6, 6, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Paper>
            </Grid>
            <Grid item flex={1} maxWidth={500}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#fff', boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)', height: 340, minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography fontWeight={600} fontSize={16} color="#222" mb={1}>Sales Distribution</Typography>
                {loading ? (
                  <Skeleton variant="circular" width={160} height={160} sx={{ borderRadius: '50%' }} />
                ) : (
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        innerRadius={36}
                        paddingAngle={3}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ReTooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <Box sx={{ mt: 1, width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {loading ? (
                    <Skeleton variant="text" width={120} height={24} />
                  ) : (
                    pieData.map((entry, idx) => (
                      <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', mr: 2, mb: 1 }}>
                        <Box sx={{ width: 14, height: 14, bgcolor: COLORS[idx % COLORS.length], borderRadius: '50%', mr: 1 }} />
                        <Typography fontSize={13}>{entry.name}</Typography>
                      </Box>
                    ))
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom Row: Sales Distribution & List of Integration */}
        {/* <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#fff', boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)', height: 260, minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography fontWeight={600} fontSize={16} color="#222" mb={1}>Sales Distribution</Typography>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    innerRadius={36}
                    paddingAngle={3}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ReTooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 1, width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {pieData.map((entry, idx) => (
                  <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', mr: 2, mb: 1 }}>
                    <Box sx={{ width: 14, height: 14, bgcolor: COLORS[idx % COLORS.length], borderRadius: '50%', mr: 1 }} />
                    <Typography fontSize={13}>{entry.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#fff', boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)', height: 260, minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Typography fontWeight={600} fontSize={16} color="#222" mb={1}>Top Countries</Typography>
              <Box sx={{ width: '100%', mt: 1 }}>
                {topCountries.map((entry, idx) => (
                  <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ width: 14, height: 14, bgcolor: COLORS[idx % COLORS.length], borderRadius: '50%', mr: 1 }} />
                    <Typography fontSize={14} fontWeight={500} color="#222">{entry.name}</Typography>
                    <Typography fontSize={13} color="#888" ml={1}>{entry.value} emails</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
} 