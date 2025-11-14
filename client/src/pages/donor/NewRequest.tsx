import React from 'react';
import { Container, Typography } from '@mui/material';
import { AppointmentRequestForm } from '@components/donor/AppointmentRequestForm';

export default function NewRequest() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" className="font-bold mb-6">
        New Donation Request
      </Typography>
      <AppointmentRequestForm />
    </Container>
  );
}
