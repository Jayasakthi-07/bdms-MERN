import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import { CheckCircle, Cancel, Visibility } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@api/admin.api';
import { formatDate, getStatusColor } from '@utils/formatters';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { EmptyState } from '@components/common/EmptyState';
import toast from 'react-hot-toast';

export const RequestApprovalQueue: React.FC = () => {
  const [approveDialog, setApproveDialog] = useState<{ open: boolean; requestId: string | null }>({
    open: false,
    requestId: null,
  });
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; requestId: string | null }>({
    open: false,
    requestId: null,
  });
  const [scheduledAt, setScheduledAt] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['pendingRequests'],
    queryFn: () => adminApi.getAllRequests({ status: 'PENDING' }),
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, scheduledAt, adminNotes }: any) =>
      adminApi.approveRequest(id, scheduledAt, adminNotes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingRequests'] });
      toast.success('Request approved successfully!');
      handleCloseApprove();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, rejectionReason, adminNotes }: any) =>
      adminApi.rejectRequest(id, rejectionReason, adminNotes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingRequests'] });
      toast.success('Request rejected');
      handleCloseReject();
    },
  });

  const handleOpenApprove = (requestId: string) => {
    setApproveDialog({ open: true, requestId });
    setScheduledAt('');
    setAdminNotes('');
  };

  const handleCloseApprove = () => {
    setApproveDialog({ open: false, requestId: null });
  };

  const handleApprove = () => {
    if (approveDialog.requestId && scheduledAt) {
      approveMutation.mutate({
        id: approveDialog.requestId,
        scheduledAt,
        adminNotes,
      });
    }
  };

  const handleOpenReject = (requestId: string) => {
    setRejectDialog({ open: true, requestId });
    setRejectionReason('');
    setAdminNotes('');
  };

  const handleCloseReject = () => {
    setRejectDialog({ open: false, requestId: null });
  };

  const handleReject = () => {
    if (rejectDialog.requestId && rejectionReason) {
      rejectMutation.mutate({
        id: rejectDialog.requestId,
        rejectionReason,
        adminNotes,
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const requests = data?.data?.requests || [];

  return (
    <>
      <Card className="card">
        <CardContent>
          {requests.length === 0 ? (
            <EmptyState
              icon="📋"
              title="No Pending Requests"
              description="All donation requests have been processed."
            />
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Donor</TableCell>
                    <TableCell>Blood Group</TableCell>
                    <TableCell>Request Date</TableCell>
                    <TableCell>Preferred Date</TableCell>
                    <TableCell>Center</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.map((request: any) => (
                    <TableRow key={request._id}>
                      <TableCell>
                        <div>
                          <div className="font-semibold">{request.donorId?.name}</div>
                          <div className="text-sm text-gray-500">{request.donorId?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={request.donorId?.bloodGroup || 'N/A'}
                          size="small"
                          color="error"
                        />
                      </TableCell>
                      <TableCell>{formatDate(request.requestedAt)}</TableCell>
                      <TableCell>
                        {request.preferredDate ? formatDate(request.preferredDate) : 'Flexible'}
                      </TableCell>
                      <TableCell>{request.center || 'Any'}</TableCell>
                      <TableCell>
                        <Chip
                          label={request.status}
                          size="small"
                          className={getStatusColor(request.status)}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton size="small" color="info">
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Approve">
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleOpenApprove(request._id)}
                          >
                            <CheckCircle />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleOpenReject(request._id)}
                          >
                            <Cancel />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Approve Dialog */}
      <Dialog open={approveDialog.open} onClose={handleCloseApprove} maxWidth="sm" fullWidth>
        <DialogTitle>Approve Donation Request</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              type="datetime-local"
              label="Scheduled Date & Time"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Admin Notes (Optional)"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Instructions for the donor..."
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApprove}>Cancel</Button>
          <Button
            onClick={handleApprove}
            variant="contained"
            color="success"
            disabled={!scheduledAt || approveMutation.isPending}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog.open} onClose={handleCloseReject} maxWidth="sm" fullWidth>
        <DialogTitle>Reject Donation Request</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Rejection Reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Provide a clear reason for rejection..."
              required
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Additional Notes (Optional)"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReject}>Cancel</Button>
          <Button
            onClick={handleReject}
            variant="contained"
            color="error"
            disabled={!rejectionReason || rejectMutation.isPending}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
