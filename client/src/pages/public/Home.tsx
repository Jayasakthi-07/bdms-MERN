import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Favorite,
  People,
  LocalHospital,
  TrendingUp,
  Speed,
  Security,
  Star,
  VerifiedUser,
  Schedule,
  Notifications,
  Analytics,
  ArrowForward,
  FormatQuote,
} from '@mui/icons-material';

// Extract constants outside component
const STATS_DATA = [
    { 
      Icon: People, 
      value: '10,000+', 
      label: 'Active Donors',
      gradient: 'from-indigo-500 to-blue-500',
      delay: 0.1
    },
    { 
      Icon: Favorite, 
      value: '50,000+', 
      label: 'Units Donated',
      gradient: 'from-pink-500 to-rose-500',
      delay: 0.2
    },
    { 
      Icon: LocalHospital, 
      value: '150+', 
      label: 'Partner Hospitals',
      gradient: 'from-emerald-500 to-teal-500',
      delay: 0.3
    },
    { 
      Icon: TrendingUp, 
      value: '150,000+', 
      label: 'Lives Saved',
      gradient: 'from-purple-500 to-indigo-500',
      delay: 0.4
    },
  ] as const;

const FEATURES_DATA = [
    { 
      Icon: Speed, 
      title: 'Lightning Fast', 
      desc: 'Quick appointment scheduling with real-time availability and instant confirmations',
      gradient: 'from-indigo-500 to-blue-500'
    },
    { 
      Icon: Security, 
      title: 'Secure & Private', 
      desc: 'Bank-level encryption keeps your data completely safe and confidential',
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      Icon: VerifiedUser, 
      title: 'Verified Donors', 
      desc: 'All donors undergo comprehensive health screening and verification',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      Icon: Star, 
      title: 'Premium Experience', 
      desc: '24/7 support and seamless donation journey with personalized care',
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      Icon: Schedule, 
      title: 'Flexible Scheduling', 
      desc: 'Book appointments at your convenience, anytime, anywhere',
      gradient: 'from-cyan-500 to-blue-500'
    },
    { 
      Icon: Notifications, 
      title: 'Smart Reminders', 
      desc: 'Never miss a donation with intelligent notifications and tracking',
      gradient: 'from-rose-500 to-pink-500'
    },
  ] as const;

const TESTIMONIALS_DATA = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Donor',
      image: '👩',
      text: 'BDMS made donating blood so easy and convenient. The platform is intuitive and the team is incredibly supportive. I\'ve been donating regularly for 2 years now!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'First-time Donor',
      image: '👨',
      text: 'As a first-time donor, I was nervous, but BDMS guided me through every step. The eligibility checker was helpful and the appointment booking was seamless.',
      rating: 5,
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Hospital Partner',
      image: '👩‍⚕️',
      text: 'BDMS has revolutionized our blood inventory management. The real-time tracking and donor network have significantly improved our operations.',
      rating: 5,
    },
  ] as const;

const STEPS_DATA = [
    { 
      step: '01', 
      title: 'Create Account', 
      desc: 'Sign up in minutes with a simple registration process',
      icon: '✨',
      gradient: 'from-indigo-500 to-purple-500'
    },
    { 
      step: '02', 
      title: 'Check Eligibility', 
      desc: 'Complete our quick eligibility assessment',
      icon: '✅',
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      step: '03', 
      title: 'Schedule Appointment', 
      desc: 'Book your donation at a time that works for you',
      icon: '📅',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      step: '04', 
      title: 'Save Lives', 
      desc: 'Make your donation and help save up to 3 lives',
      icon: '🩸',
      gradient: 'from-pink-500 to-rose-500'
    },
  ] as const;

// Memoized animation variants
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
        ease: 'easeOut',
      },
    },
  };

function Home() {
  // Memoize data arrays
  const stats = useMemo(() => STATS_DATA, []);
  const features = useMemo(() => FEATURES_DATA, []);
  const testimonials = useMemo(() => TESTIMONIALS_DATA, []);
  const steps = useMemo(() => STEPS_DATA, []);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
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

        <Container maxWidth="lg" className="relative z-10 py-20 md:py-32">
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block mb-6"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                    Trusted by 10,000+ Donors
                  </span>
                </motion.div>
                
                <Typography
                  variant="h1"
                  className="text-5xl md:text-7xl font-black mb-8 leading-tight text-gray-900 dark:text-white text-center"
                  sx={{ 
                    fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                    lineHeight: 1.1,
                    fontFamily: 'Sora, sans-serif',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Save Lives,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                    Donate Blood
                  </span>
                </Typography>
                
                <Typography 
                  variant="h5" 
                  className="mb-16 text-gray-600 dark:text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto text-center"
                  sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' } }}
                >
                  Every donation can save up to 3 lives. Join our community of heroes and make a difference today with our modern, seamless platform.
                </Typography>
                
                <motion.div 
                  className="flex flex-wrap gap-6 items-center justify-center mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link to="/register" className="no-underline">
                    <motion.button 
                      className="btn-premium"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center gap-4">
                         Become a Donor
                        <ArrowForward sx={{ fontSize: 10 }} />
                      </span>
                    </motion.button>
                  </Link>
                  <Link to="/about" className="no-underline">
                    <motion.button 
                      className="btn-glass"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6} className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative w-full flex items-center justify-center"
              >
                <div className="relative z-10 flex items-center justify-center w-full">
                  <motion.div
                    className="text-[200px] md:text-[300px] filter drop-shadow-2xl"
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    🩸
                  </motion.div>
                  
                  {/* Floating Cards */}
                  <motion.div
                    className="absolute top-10 left-4 md:left-10 glass-card p-4 rounded-xl text-center"
                    animate={{ 
                      y: [0, -15, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <Typography className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">10K+</Typography>
                    <Typography className="text-sm text-gray-600 dark:text-gray-400 text-center">Donors</Typography>
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-20 right-4 md:right-10 glass-card p-4 rounded-xl text-center"
                    animate={{ 
                      y: [0, -15, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <Typography className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">50K+</Typography>
                    <Typography className="text-sm text-gray-600 dark:text-gray-400 text-center">Donations</Typography>
                  </motion.div>
                </div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative z-10">
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Grid container spacing={6} justifyContent="center" alignItems="stretch">
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index} className="flex">
                  <motion.div variants={itemVariants} className="w-full">
                    <div className="glass-card text-center h-full p-8 hover:scale-105 transition-transform duration-300">
                      <motion.div
                        className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white mb-6 shadow-lg mx-auto`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <stat.Icon sx={{ fontSize: 40 }} />
                      </motion.div>
                      <Typography variant="h3" className="font-black mb-4 text-gray-900 dark:text-white text-3xl text-center">
                        {stat.value}
                      </Typography>
                      <Typography variant="body1" className="text-gray-600 dark:text-gray-400 font-medium text-center">
                        {stat.label}
                      </Typography>
                    </div>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10 bg-gray-50/50 dark:bg-slate-900/50">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Typography variant="h" className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white text-center" sx={{ fontFamily: 'Sora, sans-serif' }}>
              Why Choose BDMS?
            </Typography>
            <Typography 
              variant="h6" 
              className=" md:text-5xl font-black mb-12 text-gray-900 dark:text-white text-center"
              sx={{ 
                textAlign: 'center',
                display: 'block',
              }}
            >
              Experience the future of blood donation management with cutting-edge technology and compassionate care
            </Typography>
          </motion.div>

          <Grid container spacing={6} justifyContent="center" alignItems="stretch">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} className="flex">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="w-full"
                  whileHover={{ y: -8 }}
                >
                  <div className="glass-card h-full p-8 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg mx-auto`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.Icon sx={{ fontSize: 32 }} />
                    </motion.div>
                    <Typography variant="h5" className="font-bold mb-4 text-gray-900 dark:text-white text-center">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">
                      {feature.desc}
                    </Typography>
                  </div>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative z-10">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Typography variant="h" className="text-4xl md:text-5xl font-black mb-12 text-gray-900 dark:text-white text-center" sx={{ fontFamily: 'Sora, sans-serif' }}>
              How It Works
            </Typography>
            <Typography variant="h6" className="md:text-5xl font-black mb-12 text-gray-900 dark:text-white text-center mt-4">
              Start your journey to save lives in just four simple steps
            </Typography>
          </motion.div>

          <Grid container spacing={8} justifyContent="center" alignItems="flex-start">
            {steps.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="text-center"
                  whileHover={{ y: -10 }}
                >
                  <div className="relative mx-auto mb-8 w-24 h-24">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl opacity-20`}
                      animate={{ 
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <div className="relative glass-card w-full h-full flex items-center justify-center text-5xl">
                      {item.icon}
                    </div>
                    <motion.div
                      className={`absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg`}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      {item.step}
                    </motion.div>
                  </div>
                  <Typography variant="h5" className="font-bold mb-3 text-gray-900 dark:text-white text-center">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">
                    {item.desc}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative z-10">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Typography variant="h" className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white text-center" sx={{ fontFamily: 'Sora, sans-serif' }}>
              What People Say
            </Typography>
            <Typography variant="h6" className="md:text-5xl font-black mb-12 text-gray-900 dark:text-white text-center">
              Join thousands of satisfied donors and healthcare professionals
            </Typography>
          </motion.div>

          <Grid container spacing={6} justifyContent="center" alignItems="stretch">
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index} className="flex">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="w-full"
                  whileHover={{ y: -8 }}
                >
                  <div className="glass-card h-full p-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ fontSize: 20, color: '#fbbf24' }} />
                      ))}
                    </div>
                    <div className="flex justify-center mb-4">
                      <FormatQuote sx={{ fontSize: 40, color: '#6366f1', opacity: 0.2 }} />
                    </div>
                    <Typography variant="body1" className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                      {testimonial.text}
                    </Typography>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl flex-shrink-0">
                        {testimonial.image}
                      </div>
                      <div className="text-center">
                        <Typography variant="subtitle1" className="font-bold text-gray-900 dark:text-white text-center">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500 dark:text-gray-400 text-center">
                          {testimonial.role}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <Container maxWidth="md" className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            <Typography variant="h2" className="text-4xl md:text-5xl font-black mb-6 text-white" sx={{ fontFamily: 'Sora, sans-serif' }}>
              Ready to Make a Difference?
            </Typography>
            <Typography variant="h6" className="mb-16 text-white/90 font-normal max-w-2xl mx-auto leading-relaxed">
              Join thousands of donors who are saving lives every day. Your donation matters.
            </Typography>
            <Link to="/register" className="no-underline mt-8">
              <motion.button 
                className="bg-white text-indigo-600 font-semibold py-4 px-12 rounded-xl shadow-2xl hover:shadow-3xl transition-all text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-1">
                  Register Now
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowForward sx={{ fontSize: 24 }} />
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

export default memo(Home);
