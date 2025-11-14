import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn, 
  Email, 
  Phone, 
  LocationOn,
  Favorite,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '#', label: 'Privacy Policy' },
    { path: '#', label: 'Terms of Service' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <footer className="relative mt-auto overflow-hidden bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-white/10">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-purple-50/50 dark:from-indigo-950/20 dark:via-transparent dark:to-purple-950/20" />
      
      <Container maxWidth="lg" className="relative z-10 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid container spacing={10}>
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.span
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl filter drop-shadow-lg"
                  >
                    🩸
                  </motion.span>
                  <Typography 
                    variant="h5" 
                    className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-center"
                    sx={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    BDMS
                  </Typography>
                </div>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed text-center -mt-2">
                  Connecting donors with those in need. Every donation saves lives and makes a lasting impact on our community.
                </Typography>
                <div className="flex gap-4 justify-center mt-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" className="font-bold mb-6 text-gray-900 dark:text-white text-center" sx={{ fontFamily: 'Sora, sans-serif' }}>
                  Quick Links
                </Typography>
                <ul className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <li key={index} className="text-center">
                      <Link 
                        to={link.path} 
                        className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-center gap-2 group text-sm"
                      >
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" className="font-bold mb-6 text-gray-900 dark:text-white text-center" sx={{ fontFamily: 'Sora, sans-serif' }}>
                  Contact Us
                </Typography>
                <ul className="space-y-4">
                  <li className="flex items-start justify-center gap-3 text-gray-600 dark:text-gray-400 text-center">
                    <LocationOn className="text-indigo-500 mt-1 flex-shrink-0" fontSize="small" />
                    <span className="text-sm leading-relaxed text-center">
                      Government General Hospital Campus<br />
                      Thanjavur , Valam, Tamil Nadu 
                    </span>
                  </li>
                  <li className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400 text-center">
                    <Phone className="text-indigo-500 flex-shrink-0" fontSize="small" />
                    <a 
                      href="tel:+919876543210" 
                      className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-center"
                    >
                      +91 6379555329
                    </a>
                  </li>
                  <li className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-400 text-center">
                    <Email className="text-indigo-500 flex-shrink-0" fontSize="small" />
                    <a 
                      href="mailto:support@bdms.com" 
                      className="text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-center"
                    >
                      support@bdms.com
                    </a>
                  </li>
                </ul>
              </motion.div>
            </Grid>
          </Grid>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="border-t border-gray-200 dark:border-white/10 mt-12 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Typography variant="body2" className="text-gray-500 dark:text-gray-400 text-center md:text-left">
                © {currentYear} Blood Donation Management System. All rights reserved.
              </Typography>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <span className="text-sm">Made with</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Favorite className="text-red-500" fontSize="small" />
                </motion.span>
                <span className="text-sm">for saving lives</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
};
