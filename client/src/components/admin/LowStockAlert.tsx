import React from 'react';
import { Alert, AlertTitle, Chip } from '@mui/material';
import { Warning } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { inventoryApi } from '@api/inventory.api';

export const LowStockAlert: React.FC = () => {
  const { data } = useQuery({
    queryKey: ['lowStock'],
    queryFn: inventoryApi.getLowStock,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const lowStockItems = data?.data || [];

  if (lowStockItems.length === 0) return null;

  return (
    <Alert
      severity="error"
      icon={<Warning />}
      sx={{
        mb: 3,
        borderRadius: 2,
        '& .MuiAlert-message': { width: '100%' },
      }}
    >
      <AlertTitle className="font-bold">Low Stock Alert</AlertTitle>
      <div className="flex flex-wrap gap-2 mt-2">
        {lowStockItems.map((item: any) => (
          <Chip
            key={item._id}
            label={`${item.bloodGroup} - ${item.center} (${item.units} units)`}
            size="small"
            color="error"
            variant="outlined"
          />
        ))}
      </div>
    </Alert>
  );
};
