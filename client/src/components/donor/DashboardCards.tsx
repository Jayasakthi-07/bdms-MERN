import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  CalendarToday,
  Favorite,
  CheckCircle,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Card className="stat-card hover:shadow-2xl">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Typography
              variant="body2"
              className="text-gray-600 dark:text-gray-400 mb-2"
            >
              {title}
            </Typography>
            <Typography variant="h4" className="font-bold">
              {value}
            </Typography>
          </div>
          <Box
            sx={{
              bgcolor: `${color}.100`,
              color: `${color}.600`,
              p: 2,
              borderRadius: 2,
            }}
          >
            {icon}
          </Box>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

interface DashboardCardsProps {
  totalDonations: number;
  nextAppointment?: string;
  eligibilityStatus: 'eligible' | 'not-eligible';
  donationStreak: number;
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({
  totalDonations,
  nextAppointment,
  eligibilityStatus,
  donationStreak,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Donations"
        value={totalDonations}
        icon={<Favorite fontSize="large" />}
        color="error"
        delay={0}
      />
      
      <StatsCard
        title="Next Appointment"
        value={nextAppointment || 'None'}
        icon={<CalendarToday fontSize="large" />}
        color="primary"
        delay={0.1}
      />
      
      <StatsCard
        title="Eligibility Status"
        value={eligibilityStatus === 'eligible' ? 'Eligible' : 'Not Eligible'}
        icon={<CheckCircle fontSize="large" />}
        color={eligibilityStatus === 'eligible' ? 'success' : 'warning'}
        delay={0.2}
      />
      
      <StatsCard
        title="Donation Streak"
        value={`${donationStreak} times`}
        icon={<TrendingUp fontSize="large" />}
        color="secondary"
        delay={0.3}
      />
    </div>
  );
};
