import React from 'react';
import { Container, Typography } from '@mui/material';
import { RequestApprovalQueue } from '@components/admin/RequestApprovalQueue';

export default function ApproveRequests() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" className="font-bold mb-6">
        Approve Requests
      </Typography>
      <RequestApprovalQueue />
    </Container>
  );
}
