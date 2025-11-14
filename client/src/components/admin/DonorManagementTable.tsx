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
  TextField,
  MenuItem,
  InputAdornment,
  Switch,
  Tooltip,
} from '@mui/material';
import { Search, Visibility, Edit, Block, CheckCircle } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@api/admin.api';
import { BLOOD_GROUPS } from '@utils/constants';
import { formatDate, formatPhoneNumber } from '@utils/formatters';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { useDebounce } from '@hooks/useDebounce';
import toast from 'react-hot-toast';

export const DonorManagementTable: React.FC = () => {
  const [search, setSearch] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [isActive, setIsActive] = useState<string>('');
  
  const debouncedSearch = useDebounce(search, 500);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['donors', debouncedSearch, bloodGroup, isActive],
    queryFn: () =>
      adminApi.getAllDonors({
        search: debouncedSearch,
        bloodGroup: bloodGroup || undefined,
        isActive: isActive ? isActive === 'true' : undefined,
      }),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: adminApi.toggleDonorStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donors'] });
      toast.success('Donor status updated');
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const donors = data?.data?.donors || [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <TextField
          placeholder="Search donors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300 }}
          size="small"
        />

        <TextField
          select
          label="Blood Group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          sx={{ minWidth: 150 }}
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          {BLOOD_GROUPS.map((group) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Status"
          value={isActive}
          onChange={(e) => setIsActive(e.target.value)}
          sx={{ minWidth: 150 }}
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Active</MenuItem>
          <MenuItem value="false">Inactive</MenuItem>
        </TextField>
      </div>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Blood Group</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Registered</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donors.map((donor: any) => (
              <TableRow key={donor._id}>
                <TableCell className="font-semibold">{donor.name}</TableCell>
                <TableCell>{donor.email}</TableCell>
                <TableCell>{formatPhoneNumber(donor.phone)}</TableCell>
                <TableCell>
                  <Chip label={donor.bloodGroup || 'N/A'} size="small" color="error" />
                </TableCell>
                <TableCell>{donor.city || 'N/A'}</TableCell>
                <TableCell>{formatDate(donor.createdAt)}</TableCell>
                <TableCell>
                  <Switch
                    checked={donor.isActive}
                    onChange={() => toggleStatusMutation.mutate(donor._id)}
                    color="success"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <IconButton size="small" color="info">
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" color="primary">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};



