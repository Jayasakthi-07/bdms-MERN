import { memo, useMemo } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Favorite,
  Visibility,
  EmojiEvents,
  TrendingUp,
  People,
  LocalHospital,
} from '@mui/icons-material';

// Extract constants outside component to prevent recreation on every render
const VALUES_DATA = [
  {
    Icon: Favorite,
    title: 'Our Mission',
    description: 'To save lives by making blood donation accessible, efficient, and rewarding for donors while ensuring hospitals have adequate blood supplies.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    Icon: Visibility,
    title: 'Our Vision',
    description: 'A world where no life is lost due to blood shortage, achieved through technology-driven efficient blood management systems.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    Icon: EmojiEvents,
    title: 'Our Values',
    description: 'Compassion, efficiency, transparency, and community - these principles guide everything we do at BDMS.',
    gradient: 'from-amber-500 to-orange-500',
  },
] as const;

const ACHIEVEMENTS_DATA = [
  { Icon: People, value: '10,000+', label: 'Active Donors', gradient: 'from-blue-500 to-cyan-500' },
  { Icon: LocalHospital, value: '150+', label: 'Partner Hospitals', gradient: 'from-emerald-500 to-teal-500' },
  { Icon: TrendingUp, value: '150,000+', label: 'Lives Saved', gradient: 'from-purple-500 to-pink-500' },
] as const;

// Memoized animation variants to prevent recreation
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

// Memoized background blob animations
const blobAnimation1 = {
  scale: [1, 1.2, 1],
  x: [0, 50, 0],
  y: [0, 30, 0],
};

const blobAnimation2 = {
  scale: [1, 1.3, 1],
  x: [0, -50, 0],
  y: [0, -30, 0],
};

const blobTransition1 = { duration: 20, repeat: Infinity, ease: 'easeInOut' };
const blobTransition2 = { duration: 25, repeat: Infinity, ease: 'easeInOut' };

// Memoized Value Card Component
const ValueCard = memo(({ Icon, title, description, gradient }: typeof VALUES_DATA[number]) => (
  <motion.div variants={itemVariants} className="w-full">
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      className="premium-card text-center h-full glow-3d"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className={`feature-icon mx-auto mb-8 bg-gradient-to-br ${gradient}`}
        whileHover={{ scale: 1.15, rotate: 10 }}
      >
        <Icon sx={{ fontSize: 40 }} />
      </motion.div>
      <Typography variant="h5" className="font-bold mb-6 text-center">
        {title}
      </Typography>
      <Typography variant="body1" className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">
        {description}
      </Typography>
    </motion.div>
  </motion.div>
));

ValueCard.displayName = 'ValueCard';

// Memoized Achievement Card Component
const AchievementCard = memo(({ Icon, value, label, gradient, index }: typeof ACHIEVEMENTS_DATA[number] & { index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    className="w-full"
    whileHover={{ scale: 1.05, y: -10 }}
    style={{ transformStyle: 'preserve-3d' }}
  >
    <div className="stats-card text-center h-full card-3d glow-3d">
      <motion.div
        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-6 shadow-xl`}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon sx={{ fontSize: 32 }} />
      </motion.div>
      <Typography variant="h3" className="font-black mb-2 text-glow text-3xl">
        {value}
      </Typography>
      <Typography variant="body1" className="text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </Typography>
    </div>
  </motion.div>
));

AchievementCard.displayName = 'AchievementCard';

function About() {
  // Memoize values and achievements to prevent recreation
  const values = useMemo(() => VALUES_DATA, []);
  const achievements = useMemo(() => ACHIEVEMENTS_DATA, []);

  return (
    <div className="relative overflow-hidden min-h-screen bg-white dark:bg-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
          animate={blobAnimation1}
          transition={blobTransition1}
          style={{ willChange: 'transform' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
          animate={blobAnimation2}
          transition={blobTransition2}
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-8">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Typography
              variant="h1"
              className="text-5xl md:text-7xl font-black mb-8 text-gray-900 dark:text-white text-center"
              sx={{ 
                fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                fontFamily: 'Sora, sans-serif',
              }}
            >
              About BDMS
            </Typography>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-card p-8 md:p-10 rounded-2xl max-w-3xl mx-auto border-2 border-indigo-300/50 dark:border-indigo-700/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Typography
                variant="h5"
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-center"
                sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' } }}
              >
                Blood Donation Management System (BDMS) is a comprehensive platform designed to streamline
                the blood donation process across Tamil Nadu, connecting donors with those in need while maintaining efficient
                inventory management.
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-12">
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <Grid container spacing={8} justifyContent="center" alignItems="stretch">
              {values.map((value) => (
                <Grid item xs={12} md={4} key={value.title} className="flex">
                  <ValueCard {...value} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </section>

      {/* Achievements Section */}
      <section className="relative z-10 py-12 gradient-mesh">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Typography 
              variant="h2" 
              className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white text-center"
              sx={{ fontFamily: 'Sora, sans-serif' }}
            >
              Our Impact
            </Typography>
            <p style={{ textAlign: 'center' }}>
              Numbers that reflect our commitment to saving lives
            </p>
          </motion.div>

          <Grid container spacing={6} justifyContent="center" alignItems="stretch">
            {achievements.map((achievement, index) => (
              <Grid item xs={12} md={4} key={achievement.label} className="flex">
                <AchievementCard {...achievement} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Story Section */}
      <section className="relative z-10 py-12 our-story-section">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-12"
          >
            <Typography 
              variant="h2" 
              className="font-black mb-6 text-gray-900 dark:text-white text-center  "
              sx={{ fontFamily: 'Sora, sans-serif', textAlign: 'center', display: 'block' }}
            >
              Our Story
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-700 dark:text-gray-300 "
              sx={{ textAlign: 'center', display: 'block' }}
            >
              BDMS was born from a simple yet powerful vision: to bridge the gap between blood donors and those in need across Tamil Nadu.
              We recognized that while millions of people in Tamil Nadu are willing to donate blood, the process was often complicated and
              inefficient. Our platform leverages cutting-edge technology to create a seamless, user-friendly experience
              that makes blood donation accessible to everyone in Tamil Nadu.
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-700 dark:text-gray-300 "
              sx={{ textAlign: 'center', display: 'block' }}
            >
              Today, BDMS stands as a testament to what's possible when technology meets compassion. We've built a
              community of dedicated donors across Tamil Nadu, partnered with leading healthcare institutions throughout the state, and created a system that
              ensures no one in Tamil Nadu has to wait for the life-saving blood they need.
            </Typography>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

export default memo(About);
