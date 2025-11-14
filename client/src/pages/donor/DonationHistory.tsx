import React from 'react';
import { Container, Typography } from '@mui/material';
import { DonationHistoryTable } from '@components/donor/DonationHistoryTable';

export default function DonationHistory() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" className="font-bold mb-6">
        Donation History
      </Typography>
      <DonationHistoryTable />
    </Container>
  );
}
