import React from 'react';
import { Container, Typography } from '@mui/material';
import { InventoryManager } from '@components/admin/InventoryManager';

export default function ManageInventory() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" className="font-bold mb-6">
        Blood Inventory
      </Typography>
      <InventoryManager />
    </Container>
  );
}
