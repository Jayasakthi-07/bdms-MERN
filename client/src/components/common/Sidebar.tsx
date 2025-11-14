import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import {
  Dashboard,
  Person,
  History,
  CalendarToday,
  Assignment,
  People,
  Inventory,
  Assessment,
  Settings,
  CheckCircle,
} from '@mui/icons-material';
import { useAuth } from '@store/AuthContext';
import { motion } from 'framer-motion';

interface SidebarProps {
  role: 'DONOR' | 'ADMIN';
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();

  const donorMenuItems = [
    { path: '/donor/dashboard', label: 'Dashboard', icon: <Dashboard /> },
    { path: '/donor/profile', label: 'Profile', icon: <Person /> },
    { path: '/donor/eligibility', label: 'Eligibility', icon: <CheckCircle /> },
    { path: '/donor/new-request', label: 'New Request', icon: <CalendarToday /> },
    { path: '/donor/history', label: 'History', icon: <History /> },
  ];

  const adminMenuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <Dashboard /> },
    { path: '/admin/donors', label: 'Manage Donors', icon: <People /> },
    { path: '/admin/requests', label: 'Requests', icon: <Assignment /> },
    { path: '/admin/inventory', label: 'Inventory', icon: <Inventory /> },
    { path: '/admin/audit-logs', label: 'Audit Logs', icon: <Assessment /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings /> },
  ];

  const menuItems = role === 'DONOR' ? donorMenuItems : adminMenuItems;

  return (
    <div className="w-64 sidebar-premium h-screen sticky top-0">
      <div className="p-6">
        <motion.div 
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="text-4xl filter drop-shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            🩸
          </motion.span>
          <Typography
            variant="h6"
            className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
            sx={{ fontFamily: 'Sora, sans-serif' }}
          >
            BDMS
          </Typography>
        </motion.div>
        
        <Divider className="mb-4 border-gray-200 dark:border-white/10" />
        
        <List sx={{ mt: 2 }}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <ListItem
                  component={Link}
                  to={item.path}
                  className={`rounded-xl mb-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800/50'
                  }`}
                  sx={{
                    '&:hover': {
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      color: isActive ? 'white' : 'inherit',
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.95rem',
                    }}
                  />
                </ListItem>
              </motion.div>
            );
          })}
        </List>
      </div>
    </div>
  );
};
