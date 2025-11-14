import React from 'react';
import { Container, Typography } from '@mui/material';
import { EligibilityChecker } from '@components/donor/EligibilityChecker';

export default function Eligibility() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" className="font-bold mb-6">
        Eligibility Status
      </Typography>
      <EligibilityChecker />
    </Container>
  );
}
