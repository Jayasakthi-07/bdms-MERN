import React from 'react';
import { Container, Typography } from '@mui/material';
import { DonorManagementTable } from '@components/admin/DonorManagementTable';

export default function ManageDonors() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" className="font-bold mb-6">
        Manage Donors
      </Typography>
      <DonorManagementTable />
    </Container>
  );
}
