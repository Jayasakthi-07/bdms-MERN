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
  IconButton,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { Visibility, GetApp } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { donorApi } from '@api/donor.api';
import { formatDate, getStatusColor } from '@utils/formatters';
import { REQUEST_STATUS } from '@utils/constants';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { EmptyState } from '@components/common/EmptyState';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const DonationHistoryTable: React.FC = () => {
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['donationHistory', status, startDate, endDate],
    queryFn: () =>
      donorApi.getDonationHistory({
        status: status || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      }),
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Donation History', 14, 20);
    
    const tableData = data?.data?.requests.map((request: any) => [
      formatDate(request.requestedAt),
      request.center || 'N/A',
      request.status,
      request.scheduledAt ? formatDate(request.scheduledAt) : 'N/A',
    ]);

    (doc as any).autoTable({
      head: [['Date', 'Center', 'Status', 'Scheduled']],
      body: tableData,
      startY: 30,
    });

    doc.save('donation-history.pdf');
  };

  if (isLoading) return <LoadingSpinner />;

  const requests = data?.data?.requests || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex flex-wrap gap-4 items-center">
        <TextField
          select
          label="Filter by Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ minWidth: 200 }}
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          {Object.keys(REQUEST_STATUS).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          type="date"
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />

        <TextField
          type="date"
          label="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />

        <Button
          variant="outlined"
          startIcon={<GetApp />}
          onClick={exportToPDF}
          disabled={requests.length === 0}
        >
          Export PDF
        </Button>
      </div>

      {requests.length === 0 ? (
        <EmptyState
          icon="📋"
          title="No Donation History"
          description="You haven't made any donation requests yet."
        />
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Center</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Scheduled</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request: any, index: number) => (
                <motion.tr
                  key={request._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  component={TableRow}
                >
                  <TableCell>{formatDate(request.requestedAt)}</TableCell>
                  <TableCell>{request.center || 'Main Center'}</TableCell>
                  <TableCell>
                    <Chip
                      label={request.status}
                      size="small"
                      className={getStatusColor(request.status)}
                    />
                  </TableCell>
                  <TableCell>
                    {request.scheduledAt ? formatDate(request.scheduledAt) : '-'}
                  </TableCell>
                  <TableCell>
                    {request.completedAt ? formatDate(request.completedAt) : '-'}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </motion.div>
  );
};
