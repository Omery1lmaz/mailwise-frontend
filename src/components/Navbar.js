import React from 'react';
import { Box, InputBase, IconButton, Badge, Avatar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SIDEBAR_WIDTH = 220;

export default function Navbar() {
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
                <IconButton size="small" sx={{ color: '#b0b3b9' }}>
                    <Badge color="error" variant="dot" overlap="circular">
                        <NotificationsNoneOutlinedIcon fontSize="medium" />
                    </Badge>
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f5f6fa', borderRadius: 2, px: 2, py: 0.5, minWidth: 120, cursor: 'pointer' }}>
                    <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" sx={{ width: 32, height: 32, mr: 1 }} />
                    <Box sx={{ mr: 1 }}>
                        <Typography fontWeight={700} fontSize={15} color="#222">Joxy Inc.</Typography>
                        <Typography fontSize={12} color="#b0b3b9">Brand</Typography>
                    </Box>
                    <ArrowDropDownIcon sx={{ color: '#b0b3b9' }} />
                </Box>
            </Box>
        </Box>
    );
} 