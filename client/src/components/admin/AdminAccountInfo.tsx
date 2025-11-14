import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { donorApi } from '@api/donor.api';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  useTheme as useMuiTheme,
} from '@mui/material';
import { Person, Email, Phone, Shield } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { formatDateTime } from '@utils/formatters';

export const AdminAccountInfo: React.FC = () => {
  const muiTheme = useMuiTheme();
  const isDark = muiTheme.palette.mode === 'dark';

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: donorApi.getProfile,
  });

  if (isLoading) return <LoadingSpinner />;

  const user = profileData?.data;

  const infoItems = [
    {
      icon: <Person />,
      label: 'Full Name',
      value: user?.name || 'N/A',
    },
    {
      icon: <Email />,
      label: 'Email Address',
      value: user?.email || 'N/A',
    },
    {
      icon: <Phone />,
      label: 'Phone Number',
      value: user?.phone || 'N/A',
    },
    {
      icon: <Shield />,
      label: 'Account Role',
      value: user?.role || 'N/A',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Typography variant="h6" className="font-semibold mb-4">
        Account Information
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        View your account details and information.
      </Typography>

      <Grid container spacing={2}>
        {infoItems.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: 2,
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                    color: 'primary.main',
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    {item.label}
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Account Created
        </Typography>
        <Typography variant="body2">
          {user?.createdAt ? formatDateTime(user.createdAt) : 'N/A'}
        </Typography>
      </Box>

      {user?.updatedAt && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Last Updated
          </Typography>
          <Typography variant="body2">
            {formatDateTime(user.updatedAt)}
          </Typography>
        </Box>
      )}
    </motion.div>
  );
};

