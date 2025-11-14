import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { EmojiEvents, Favorite, LocalFireDepartment, Star } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface BadgeDisplayProps {
  donationCount: number;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ donationCount }) => {
  const badges = [
    { threshold: 1, name: 'First Timer', icon: <Star />, color: '#fbbf24' },
    { threshold: 5, name: 'Regular Donor', icon: <Favorite />, color: '#ef4444' },
    { threshold: 10, name: 'Super Donor', icon: <LocalFireDepartment />, color: '#f97316' },
    { threshold: 25, name: 'Hero', icon: <EmojiEvents />, color: '#eab308' },
    { threshold: 50, name: 'Legend', icon: <EmojiEvents />, color: '#8b5cf6' },
  ];

  const earnedBadges = badges.filter((badge) => donationCount >= badge.threshold);

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6" className="font-semibold mb-4">
          Your Badges
        </Typography>
        <div className="flex flex-wrap gap-3">
          {earnedBadges.length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              Complete your first donation to earn badges!
            </Typography>
          ) : (
            earnedBadges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Chip
                  icon={badge.icon}
                  label={badge.name}
                  sx={{
                    bgcolor: badge.color,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 1,
                  }}
                />
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
