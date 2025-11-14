import React from 'react';
import { Container, Typography } from '@mui/material';
import { AuditLogTable } from '@components/admin/AuditLogTable';

export default function AuditLog() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" className="font-bold mb-6">
        Audit Logs
      </Typography>
      <AuditLogTable />
    </Container>
  );
}
