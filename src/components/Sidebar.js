import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 220;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#fff',
          border: 'none',
          boxShadow: '2px 0 16px 0 rgba(30,34,40,0.04)',
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,
          p: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          minHeight: '100vh',
        }
      }}
    >
      {/* Logo and Brand */}
      <Box sx={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: 'none', mb: 2 }}>
        <Box sx={{ width: 38, height: 38, bgcolor: '#1976d2', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
          <DashboardIcon sx={{ color: '#fff', fontSize: 24 }} />
        </Box>
        <Typography fontWeight={900} fontSize={24} color="#1976d2" letterSpacing={1} sx={{ fontFamily: 'inherit' }}>Mailwise</Typography>
      </Box>
      {/* Navigation Sections */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 3, px: 2 }}>
        <Box>
          <Typography fontSize={11} color="#b0b3b9" fontWeight={700} mb={1.5} letterSpacing={1} sx={{ pl: 1 }}>GENERAL</Typography>
          <List disablePadding>
            <ListItem button selected={location.pathname === '/dashboard'} onClick={() => navigate('/dashboard')} sx={{ borderRadius: 2, mb: 1, pl: 2, py: 1.2, '&.Mui-selected': { bgcolor: '#f0f6ff', fontWeight: 700 }, '&:hover': { bgcolor: '#f0f6ff', fontWeight: 700 } }}>
              <ListItemIcon sx={{ minWidth: 36 }}><DashboardIcon color="primary" /></ListItemIcon>
              <ListItemText primary={<Typography fontWeight={600} fontSize={15}>Dashboard</Typography>} />
            </ListItem>
          </List>
        </Box>
        <Box>
          <Typography fontSize={11} color="#b0b3b9" fontWeight={700} mb={1.5} letterSpacing={1} sx={{ pl: 1 }}>TOOLS</Typography>
          <List disablePadding>
            <ListItem button selected={location.pathname === '/queue'} onClick={() => navigate('/queue')} sx={{ borderRadius: 2, mb: 1, pl: 2, py: 1.2, '&.Mui-selected': { bgcolor: '#f0f6ff', fontWeight: 700 }, '&:hover': { bgcolor: '#f0f6ff', fontWeight: 700 } }}>
              <ListItemIcon sx={{ minWidth: 36 }}><EmailIcon /></ListItemIcon>
              <ListItemText primary={<Typography fontWeight={600} fontSize={15}>Queue</Typography>} />
            </ListItem>
            <ListItem button selected={location.pathname === '/processing'} onClick={() => navigate('/processing')} sx={{ borderRadius: 2, mb: 1, pl: 2, py: 1.2, '&.Mui-selected': { bgcolor: '#f0f6ff', fontWeight: 700 }, '&:hover': { bgcolor: '#f0f6ff', fontWeight: 700 } }}>
              <ListItemIcon sx={{ minWidth: 36 }}><ScheduleIcon /></ListItemIcon>
              <ListItemText primary={<Typography fontWeight={600} fontSize={15}>Processing</Typography>} />
            </ListItem>
            <ListItem button selected={location.pathname === '/not-sended'} onClick={() => navigate('/not-sended')} sx={{ borderRadius: 2, mb: 1, pl: 2, py: 1.2, '&.Mui-selected': { bgcolor: '#f0f6ff', fontWeight: 700 }, '&:hover': { bgcolor: '#f0f6ff', fontWeight: 700 } }}>
              <ListItemIcon sx={{ minWidth: 36 }}><ErrorOutlineIcon /></ListItemIcon>
              <ListItemText primary={<Typography fontWeight={600} fontSize={15}>Not Sended</Typography>} />
            </ListItem>
            <ListItem button selected={location.pathname === '/upload'} onClick={() => navigate('/upload')} sx={{ borderRadius: 2, mb: 1, pl: 2, py: 1.2, '&.Mui-selected': { bgcolor: '#f0f6ff', fontWeight: 700 }, '&:hover': { bgcolor: '#f0f6ff', fontWeight: 700 } }}>
              <ListItemIcon sx={{ minWidth: 36 }}><CloudUploadIcon /></ListItemIcon>
              <ListItemText primary={<Typography fontWeight={600} fontSize={15}>CSV Upload</Typography>} />
            </ListItem>
            <ListItem button selected={location.pathname === '/batch'} onClick={() => navigate('/batch')} sx={{ borderRadius: 2, mb: 1, pl: 2, py: 1.2, '&.Mui-selected': { bgcolor: '#f0f6ff', fontWeight: 700 }, '&:hover': { bgcolor: '#f0f6ff', fontWeight: 700 } }}>
              <ListItemIcon sx={{ minWidth: 36 }}><SendIcon /></ListItemIcon>
              <ListItemText primary={<Typography fontWeight={600} fontSize={15}>Batch Send</Typography>} />
            </ListItem>
          </List>
        </Box>
        <Box>
          <Typography fontSize={11} color="#b0b3b9" fontWeight={700} mb={1.5} letterSpacing={1} sx={{ pl: 1 }}>SUPPORT</Typography>
          <List disablePadding>
            <ListItem button sx={{ borderRadius: 2, mb: 1, pl: 2, py: 1.2, '&:hover': { bgcolor: '#f0f6ff', fontWeight: 700 } }}>
              <ListItemIcon sx={{ minWidth: 36 }}><HelpOutlineIcon color="primary" /></ListItemIcon>
              <ListItemText primary={<Typography fontWeight={600} fontSize={15}>Help</Typography>} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
} 