import React from 'react';
import { Container, Typography } from '@mui/material';
import { ResetPasswordForm } from '@components/auth/ResetPasswordForm';
import { motion } from 'framer-motion';

export default function ResetPassword() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <Container maxWidth="sm" className="relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 md:p-12"
        >
          <div className="text-center mb-12">
            <motion.span
              className="text-6xl mb-8 block"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🔑
            </motion.span>
            <Typography 
              variant="h5" 
              className="font-black mb-4 text-gray-900 dark:text-white text-center"
              sx={{ fontFamily: 'Sora, sans-serif' }}
            >
              Reset Password
            </Typography>
            <Typography variant="body2" className="text-gray-600 dark:text-gray-400 text-center text-base">
              Choose a new password for your account
            </Typography>
          </div>
          <ResetPasswordForm />
        </motion.div>
      </Container>
    </div>
  );
}
