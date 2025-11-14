import React from 'react';
import { Container, Typography } from '@mui/material';
import { ProfileForm } from '@components/donor/ProfileForm';

export default function Profile() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" className="font-bold mb-6">
        My Profile
      </Typography>
      <ProfileForm />
    </Container>
  );
}
