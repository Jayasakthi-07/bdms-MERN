import React from 'react';
import { Container, Typography, Grid, TextField, Button, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const muiTheme = useMuiTheme();
  const isDark = muiTheme.palette.mode === 'dark';

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    reset();
  };

  // Shared input styles - no animations, no transitions
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '1rem',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(20px)',
      outline: 'none',
      boxShadow: 'none',
      border: 'none',
      transition: 'none !important',
      animation: 'none !important',
      '& input::placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& input::-webkit-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& input::-moz-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& input:-ms-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea::placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea::-webkit-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea::-moz-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea:-ms-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& fieldset': {
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
        borderWidth: '1px !important',
        borderStyle: 'solid !important',
        borderColor: `${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
        transition: 'none !important',
        animation: 'none !important',
        outline: 'none !important',
      },
      '&:hover': {
        transition: 'none !important',
        animation: 'none !important',
        outline: 'none !important',
        '& fieldset': {
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
          borderWidth: '1px !important',
          borderStyle: 'solid !important',
          borderColor: `${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
          transition: 'none !important',
          animation: 'none !important',
          outline: 'none !important',
        },
      },
      '&.Mui-focused': {
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
        outline: 'none !important',
        boxShadow: 'none !important',
        border: 'none !important',
        transition: 'none !important',
        animation: 'none !important',
        '& fieldset': {
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
          borderWidth: '1px !important',
          borderStyle: 'solid !important',
          borderColor: `${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
          transition: 'none !important',
          animation: 'none !important',
          outline: 'none !important',
        },
        '& input': {
          outline: 'none !important',
          border: 'none !important',
        },
        '& textarea': {
          outline: 'none !important',
          border: 'none !important',
        },
        '& input::placeholder': {
          animation: 'none !important',
          transition: 'none !important',
          opacity: '0.6 !important',
          color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
          WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
        '& input::-webkit-input-placeholder': {
          animation: 'none !important',
          transition: 'none !important',
          opacity: '0.6 !important',
          color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
          WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
        '& textarea::placeholder': {
          animation: 'none !important',
          transition: 'none !important',
          opacity: '0.6 !important',
          color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
        '& textarea::-webkit-input-placeholder': {
          animation: 'none !important',
          transition: 'none !important',
          opacity: '0.6 !important',
          color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
          WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
      },
      '&.Mui-error': {
        transition: 'none !important',
        animation: 'none !important',
        '& fieldset': {
          border: '1px solid #d32f2f',
          borderWidth: '1px',
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
    '& .MuiInputLabel-root': {
      textAlign: 'left',
      zIndex: 1,
      color: isDark ? 'rgba(255, 255, 255, 0.87) !important' : 'rgba(0, 0, 0, 0.87) !important',
      transition: 'none !important',
      animation: 'none !important',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: isDark ? 'rgba(255, 255, 255, 0.87) !important' : 'rgba(0, 0, 0, 0.87) !important',
      transition: 'none !important',
      animation: 'none !important',
    },
    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
      zIndex: 2,
      color: isDark ? 'rgba(255, 255, 255, 0.87) !important' : 'rgba(0, 0, 0, 0.87) !important',
      transition: 'none !important',
      animation: 'none !important',
    },
    '& .MuiInputLabel-root.Mui-error': {
      color: '#d32f2f !important',
      transition: 'none !important',
      animation: 'none !important',
    },
    '& .MuiOutlinedInput-input': {
      zIndex: 1,
      position: 'relative',
      transition: 'none !important',
      animation: 'none !important',
      color: isDark ? 'rgba(255, 255, 255, 0.87) !important' : 'rgba(0, 0, 0, 0.87) !important',
      '&::placeholder': {
        opacity: '0.6 !important',
        visibility: 'visible !important',
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&::-webkit-input-placeholder': {
        opacity: '0.6 !important',
        visibility: 'visible !important',
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&::-moz-placeholder': {
        opacity: '0.6 !important',
        visibility: 'visible !important',
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&:-ms-input-placeholder': {
        opacity: '0.6 !important',
        visibility: 'visible !important',
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&::selection': {
        background: 'rgba(99, 102, 241, 0.2) !important',
        animation: 'none !important',
        transition: 'none !important',
      },
    },
    '& .MuiOutlinedInput-root': {
      transition: 'none !important',
      animation: 'none !important',
      '&:hover': {
        transition: 'none !important',
        animation: 'none !important',
      },
    },
    '& .MuiOutlinedInput-root fieldset': {
      transition: 'none !important',
      animation: 'none !important',
    },
    '& .MuiFormHelperText-root': {
      textAlign: 'left',
      marginLeft: 0,
      color: isDark ? 'rgba(255, 255, 255, 0.7) !important' : 'rgba(0, 0, 0, 0.6) !important',
    },
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 32 }} />,
      title: 'Email',
      content: 'support@bdms.com',
      href: 'mailto:support@bdms.com',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: <Phone sx={{ fontSize: 32 }} />,
      title: 'Phone',
      content: '+91 98765 43210',
      href: 'tel:+919876543210',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: <LocationOn sx={{ fontSize: 32 }} />,
      title: 'Address',
      content: 'Government General Hospital Campus, Park Town, Chennai, Tamil Nadu 600003',
      href: '#',
      gradient: 'from-pink-500 to-rose-500',
    },
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-white dark:bg-slate-950">
      {/* Background Elements */}
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

      {/* Hero Section */}
      <section className="section-spacing relative z-10">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Typography
              variant="h1"
              className="text-5xl md:text-7xl font-black mb-8 text-gray-900 dark:text-white text-center"
              sx={{ 
                fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                fontFamily: 'Sora, sans-serif',
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h5"
              className="text-gray-600 dark:text-gray-400 "
              sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' } }}
            >
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Typography>
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="section-spacing relative z-10">
        <Container maxWidth="lg">
          <Grid container spacing={8} justifyContent="center" alignItems="stretch">
            {/* Contact Form */}
            <Grid item xs={12} md={7} className="flex">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full"
                whileHover={{ y: -5 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="glass-card p-8 h-full">
                  <Typography 
                    variant="h4" 
                    className="font-bold mb-8 text-gray-900 dark:text-white text-center"
                    sx={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    Send us a Message
                  </Typography>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <TextField
                        fullWidth
                        label="Name"
                        {...register('name', { required: 'Name is required' })}
                        error={!!errors.name}
                        helperText={errors.name?.message as string}
                        className="input-premium"
                        sx={inputSx}
                      />
                    </div>
                    <div>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message as string}
                        className="input-premium"
                        sx={inputSx}
                      />
                    </div>
                    <div>
                      <TextField
                        fullWidth
                        label="Subject"
                        {...register('subject', { required: 'Subject is required' })}
                        error={!!errors.subject}
                        helperText={errors.subject?.message as string}
                        className="input-premium"
                        sx={inputSx}
                      />
                    </div>
                    <div>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={6}
                        {...register('message', { required: 'Message is required' })}
                        error={!!errors.message}
                        helperText={errors.message?.message as string}
                        className="input-premium"
                        sx={inputSx}
                      />
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -3 }} 
                      whileTap={{ scale: 0.98, y: 0 }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="mt-4"
                    >
                      <Button
                        type="submit"
                        fullWidth
                        className="btn-premium btn-3d"
                        sx={{
                          py: 1.5,
                          fontSize: '1.1rem',
                          color: '#ffffff !important',
                          '& .MuiButton-label': {
                            color: '#ffffff !important',
                          },
                          '& *': {
                            color: '#ffffff !important',
                          },
                        }}
                      >
                        <span className="flex items-center justify-center gap-2" style={{ color: '#ffffff' }}>
                          <Send sx={{ color: '#ffffff !important' }} />
                          Send Message
                        </span>
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={5}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="space-y-6"
              >
                {contactInfo.map((info, index) => (
                  <motion.div key={index} variants={itemVariants} className="w-full">
                    <motion.a
                      href={info.href}
                      className="block no-underline w-full"
                      whileHover={{ y: -10, scale: 1.02 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className="premium-card p-6 h-full glow-3d">
                        <div className="flex items-start gap-4">
                          <motion.div
                            className={`feature-icon bg-gradient-to-br ${info.gradient}`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {info.icon}
                          </motion.div>
                          <div className="flex-1 text-center">
                            <Typography variant="h6" className="font-bold mb-3 text-center">
                              {info.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="text-gray-600 dark:text-gray-400 leading-relaxed text-center"
                            >
                              {info.content}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  </motion.div>
                ))}
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
}
