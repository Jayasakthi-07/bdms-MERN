import React, { useState, useEffect, memo, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@store/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  useScrollTrigger,
  Button,
} from '@mui/material';
import {
  AccountCircle,
  ExitToApp,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useTheme } from '@store/ThemeContext';
import { NotificationBell } from '@components/notifications/NotificationBell';
import { motion, AnimatePresence } from 'framer-motion';

// Extract nav links outside component
const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
] as const;

const NavbarComponent: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  useEffect(() => {
    setScrolled(trigger);
  }, [trigger]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  const handleProfile = () => {
    if (user?.role === 'DONOR') {
      navigate('/donor/profile');
    } else if (user?.role === 'ADMIN') {
      navigate('/admin/settings');
    }
    handleMenuClose();
  };

  const navLinks = useMemo(() => NAV_LINKS, []);
  
  // Memoize styles to prevent recreation
  const appBarStyles = useMemo(() => ({
    zIndex: 1300,
    position: 'sticky' as const,
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    display: 'block',
    backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
    backdropFilter: scrolled ? 'blur(20px)' : 'blur(16px)',
    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(16px)',
    boxShadow: scrolled 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
      : '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
    borderBottom: theme === 'dark' 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : '1px solid rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }), [theme, scrolled]);

  return (
    <AppBar 
      position="sticky" 
      className={`navbar-premium ${scrolled ? 'scrolled' : ''}`}
      elevation={0}
      sx={appBarStyles}
    >
      <Toolbar className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3 flex-1">
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <motion.span
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="text-4xl filter drop-shadow-lg"
            >
              🩸
            </motion.span>
            <Typography
              variant="h5"
              component="div"
              className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-indigo-600 transition-all duration-500"
              sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, fontFamily: 'Sora, sans-serif' }}
            >
              BDMS
            </Typography>
          </Link>

          {/* Desktop Navigation Links */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-8 ml-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="no-underline"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
                    style={{
                      color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
                    }}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              <NotificationBell />
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <IconButton 
                  onClick={toggleTheme} 
                  className="hover:bg-gray-100 dark:hover:bg-slate-800/50 rounded-xl"
                  sx={{ 
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </motion.div>
                  </AnimatePresence>
                </IconButton>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-50"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.3, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                    <Avatar
                      className="relative border-2 border-white dark:border-slate-800"
                      sx={{
                        bgcolor: 'transparent',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 700,
                        width: 40,
                        height: 40,
                      }}
                    >
                      {user?.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </div>
                </IconButton>
              </motion.div>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  className: 'glass-card mt-2',
                  sx: { 
                    minWidth: 240,
                    borderRadius: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    mt: 1.5,
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <div className="px-5 py-4 border-b border-gray-200/50 dark:border-white/10">
                  <Typography variant="subtitle1" className="font-bold text-gray-900 dark:text-white">
                    {user?.name}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </Typography>
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <MenuItem 
                  onClick={handleProfile} 
                  className="gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <AccountCircle fontSize="small" />
                  <span className="text-sm">Profile</span>
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout} 
                  className="gap-3 px-5 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <ExitToApp fontSize="small" />
                  <span className="text-sm">Logout</span>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <IconButton 
                  onClick={toggleTheme} 
                  className="hover:bg-gray-100 dark:hover:bg-slate-800/50 rounded-xl"
                  sx={{ 
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={theme}
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
                    </motion.div>
                  </AnimatePresence>
                </IconButton>
              </motion.div>
              
              <Link to="/login" className="no-underline hidden sm:block">
                <motion.button 
                  className="btn-glass text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </motion.button>
              </Link>
              <Link to="/register" className="no-underline">
                <motion.button 
                  className="btn-premium text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Register</span>
                </motion.button>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export const Navbar = memo(NavbarComponent);
