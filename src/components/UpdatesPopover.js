import React from 'react';
import { Popover, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TranslateIcon from '@mui/icons-material/Translate';
import BuildIcon from '@mui/icons-material/Build';
import SpeedIcon from '@mui/icons-material/Speed';

export default function UpdatesPopover({ anchorEl, open, onClose }) {
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.2)',
                    mt: 1.5,
                    minWidth: 360,
                }
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight={700}>Recent Updates</Typography>
                <Typography variant="body2" color="text.secondary">Here are the latest improvements to Mailwise!</Typography>
            </Box>
            <Divider />
            <List sx={{ p: 2 }}>
                <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}><TranslateIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Full English Language Support" secondary="The entire application has been professionally translated into English." />
                </ListItem>
                <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}><SpeedIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Filtering and Search Enhancements" secondary="Filtering and search are now faster and more accurate, powered by the server." />
                </ListItem>
                <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}><CheckCircleOutlineIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="UI and Usability Improvements" secondary="Status labels and icons are now more consistent and intuitive across all pages." />
                </ListItem>
                <ListItem>
                    <ListItemIcon sx={{ minWidth: 40 }}><BuildIcon color="primary" /></ListItemIcon>
                    <ListItemText primary="Code Quality & Maintainability" secondary="Reduced code duplication, enabling faster updates in the future." />
                </ListItem>
            </List>
        </Popover>
    );
} 