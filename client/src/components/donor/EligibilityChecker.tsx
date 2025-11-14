import React from 'react';
import { Card, CardContent, Typography, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle, Cancel, Info } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { donorApi } from '@api/donor.api';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { formatDate } from '@utils/formatters';
import { motion } from 'framer-motion';

export const EligibilityChecker: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['eligibility'],
    queryFn: donorApi.getEligibility,
  });

  if (isLoading) return <LoadingSpinner />;

  const eligibility = data?.data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="card">
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" className="font-semibold">
              Eligibility Status
            </Typography>
            <Chip
              label={eligibility?.isEligible ? 'Eligible' : 'Not Eligible'}
              color={eligibility?.isEligible ? 'success' : 'error'}
              icon={eligibility?.isEligible ? <CheckCircle /> : <Cancel />}
            />
          </div>

          <List>
            {eligibility?.reasons.map((reason, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon>
                  {eligibility.isEligible ? (
                    <CheckCircle color="success" />
                  ) : (
                    <Info color="warning" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={reason}
                  primaryTypographyProps={{
                    variant: 'body2',
                  }}
                />
              </ListItem>
            ))}
          </List>

          {eligibility?.lastDonationAt && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Typography variant="body2" className="text-gray-700 dark:text-gray-300">
                <strong>Last Donation:</strong>{' '}
                {formatDate(eligibility.lastDonationAt)}
              </Typography>
            </div>
          )}

          {eligibility?.nextEligibleDate && (
            <div className="mt-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Typography variant="body2" className="text-gray-700 dark:text-gray-300">
                <strong>Next Eligible Date:</strong>{' '}
                {formatDate(eligibility.nextEligibleDate)}
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
