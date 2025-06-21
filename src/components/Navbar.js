import React, { useState } from 'react';
import { Box, IconButton, Badge, Avatar, Typography, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import UpdatesPopover from './UpdatesPopover';

const SIDEBAR_WIDTH = 220;

export default function Navbar({ onLogout }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [updatesAnchor, setUpdatesAnchor] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        handleMenuClose();
        if (onLogout) onLogout();
    };

    const handleUpdatesClick = (event) => {
        setUpdatesAnchor(event.currentTarget);
    };

    const handleUpdatesClose = () => {
        setUpdatesAnchor(null);
    };

    return (
        <Box sx={{
            width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
            height: 56,
            bgcolor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: 3,
            boxShadow: '0 1px 8px 0 rgba(30,34,40,0.04)',
            position: 'fixed',
            left: `${SIDEBAR_WIDTH}px`,
            top: 0,
            zIndex: 1200
        }}>
            {/* Right side: notification + user/company */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton size="small" sx={{ color: '#b0b3b9' }} onClick={handleUpdatesClick}>
                    <Badge color="error" variant="dot" overlap="circular">
                        <CardGiftcardIcon fontSize="medium" />
                    </Badge>
                </IconButton>
                <IconButton size="small" sx={{ color: '#b0b3b9' }}>
                    <Badge color="error" variant="dot" overlap="circular">
                        <NotificationsNoneOutlinedIcon fontSize="medium" />
                    </Badge>
                </IconButton>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f5f6fa', borderRadius: 2, px: 2, py: 0.5, minWidth: 140, cursor: 'pointer' }}
                    onClick={handleMenuOpen}
                >
                    <AccountCircleIcon sx={{ width: 32, height: 32, mr: 1, color: '#1976d2' }} />
                    <Box sx={{ mr: 1 }}>
                        <Typography fontWeight={700} fontSize={15} color="#222">Admin</Typography>
                        <Typography fontSize={12} color="#FFBB28" fontWeight={700}>admin</Typography>
                    </Box>
                    <ArrowDropDownIcon sx={{ color: '#b0b3b9' }} />
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{ sx: { mt: 1, minWidth: 140, borderRadius: 2 } }}
                >
                    <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f', fontWeight: 700 }}>Logout</MenuItem>
                </Menu>
            </Box>
            <UpdatesPopover
                anchorEl={updatesAnchor}
                open={Boolean(updatesAnchor)}
                onClose={handleUpdatesClose}
            />
        </Box>
    );
} 