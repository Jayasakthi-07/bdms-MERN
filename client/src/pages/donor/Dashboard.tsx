import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { donorApi } from '@api/donor.api';
import { DashboardCards } from '@components/donor/DashboardCards';
import { EligibilityChecker } from '@components/donor/EligibilityChecker';
import { LoadingSpinner } from '@components/common/LoadingSpinner';

export default function DonorDashboard() {
  const { data: historyData } = useQuery({
    queryKey: ['donationHistory'],
    queryFn: () => donorApi.getDonationHistory({ limit: 5 }),
  });

  const { data: eligibilityData } = useQuery({
    queryKey: ['eligibility'],
    queryFn: donorApi.getEligibility,
  });

  const completedDonations =
    historyData?.data?.requests.filter((r: any) => r.status === 'COMPLETED').length || 0;
  
  const nextAppointment = historyData?.data?.requests.find((r: any) => r.status === 'APPROVED');

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold">
          Dashboard
        </Typography>
        <Button
          component={Link}
          to="/donor/new-request"
          variant="contained"
          startIcon={<Add />}
        >
          New Request
        </Button>
      </div>

      <DashboardCards
        totalDonations={completedDonations}
        nextAppointment={nextAppointment?.scheduledAt}
        eligibilityStatus={eligibilityData?.data?.isEligible ? 'eligible' : 'not-eligible'}
        donationStreak={completedDonations}
      />

      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <EligibilityChecker />
        </Grid>
        <Grid item xs={12} lg={6}>
          {/* Add recent requests widget here */}
        </Grid>
      </Grid>
    </Container>
  );
}
