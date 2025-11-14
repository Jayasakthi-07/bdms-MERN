import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  MenuItem,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@api/admin.api';
import { formatDateTime } from '@utils/formatters';
import { LoadingSpinner } from '@components/common/LoadingSpinner';

export const AuditLogTable: React.FC = () => {
  const [action, setAction] = useState('');
  const [entityType, setEntityType] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['auditLogs', action, entityType],
    queryFn: () =>
      adminApi.getAuditLogs({
        action: action || undefined,
        entityType: entityType || undefined,
      }),
  });

  if (isLoading) return <LoadingSpinner />;

  const logs = data?.data?.logs || [];

  const actions = [
    'UPDATE_DONOR',
    'ACTIVATE_DONOR',
    'DEACTIVATE_DONOR',
    'APPROVE_REQUEST',
    'REJECT_REQUEST',
    'COMPLETE_REQUEST',
    'UPDATE_INVENTORY',
    'CREATE_INVENTORY',
  ];

  const entityTypes = ['User', 'DonationRequest', 'Inventory'];

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <TextField
          select
          label="Filter by Action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          sx={{ minWidth: 200 }}
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          {actions.map((act) => (
            <MenuItem key={act} value={act}>
              {act}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Filter by Entity"
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          sx={{ minWidth: 200 }}
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          {entityTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Admin</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Entity Type</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>IP Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log: any) => (
              <TableRow key={log._id}>
                <TableCell>{log.adminId?.name || 'Unknown'}</TableCell>
                <TableCell>
                  <Chip label={log.action} size="small" color="primary" />
                </TableCell>
                <TableCell>{log.entityType}</TableCell>
                <TableCell>{formatDateTime(log.createdAt)}</TableCell>
                <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
