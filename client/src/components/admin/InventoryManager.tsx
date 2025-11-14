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
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material';
import { Add, Edit, Warning } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi } from '@api/inventory.api';
import { BLOOD_GROUPS, DONATION_CENTERS } from '@utils/constants';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { getBloodGroupColor } from '@utils/formatters';
import toast from 'react-hot-toast';

export const InventoryManager: React.FC = () => {
  const [dialog, setDialog] = useState<{ open: boolean; item: any | null }>({
    open: false,
    item: null,
  });
  const [formData, setFormData] = useState({
    center: '',
    bloodGroup: '',
    units: 0,
    lowStockThreshold: 10,
  });

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: inventoryApi.getAllInventory,
  });

  const { data: lowStockData } = useQuery({
    queryKey: ['lowStock'],
    queryFn: inventoryApi.getLowStock,
  });

  const createMutation = useMutation({
    mutationFn: inventoryApi.createInventory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
      toast.success('Inventory created successfully!');
      handleCloseDialog();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => inventoryApi.updateInventory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
      toast.success('Inventory updated successfully!');
      handleCloseDialog();
    },
  });

  const handleOpenDialog = (item: any = null) => {
    if (item) {
      setFormData({
        center: item.center,
        bloodGroup: item.bloodGroup,
        units: item.units,
        lowStockThreshold: item.lowStockThreshold,
      });
    } else {
      setFormData({
        center: '',
        bloodGroup: '',
        units: 0,
        lowStockThreshold: 10,
      });
    }
    setDialog({ open: true, item });
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, item: null });
  };

  const handleSubmit = () => {
    if (dialog.item) {
      updateMutation.mutate({
        id: dialog.item._id,
        data: {
          units: formData.units,
          lowStockThreshold: formData.lowStockThreshold,
        },
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const inventory = data?.data || [];
  const lowStock = lowStockData?.data || [];

  return (
    <>
      {lowStock.length > 0 && (
        <Card className="card mb-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <Warning className="text-red-600" />
              <Typography variant="h6" className="font-semibold text-red-600">
                Low Stock Alert ({lowStock.length} items)
              </Typography>
            </div>
            <div className="flex flex-wrap gap-2">
              {lowStock.map((item: any) => (
                <Chip
                  key={item._id}
                  label={`${item.bloodGroup} at ${item.center} (${item.units} units)`}
                  color="error"
                  size="small"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="card">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-semibold">
              Blood Inventory Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
            >
              Add Inventory
            </Button>
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Center</TableCell>
                  <TableCell>Blood Group</TableCell>
                  <TableCell>Units Available</TableCell>
                  <TableCell>Low Stock Threshold</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventory.map((item: any) => {
                  const isLowStock = item.units < item.lowStockThreshold;
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{item.center}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.bloodGroup}
                          size="small"
                          className={getBloodGroupColor(item.bloodGroup)}
                          sx={{ color: 'white', fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <span className={isLowStock ? 'text-red-600 font-semibold' : ''}>
                          {item.units}
                        </span>
                      </TableCell>
                      <TableCell>{item.lowStockThreshold}</TableCell>
                      <TableCell>
                        {isLowStock ? (
                          <Chip label="Low Stock" color="error" size="small" />
                        ) : (
                          <Chip label="Good" color="success" size="small" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenDialog(item)}
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialog.open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{dialog.item ? 'Update Inventory' : 'Add New Inventory'}</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              select
              label="Center"
              value={formData.center}
              onChange={(e) => setFormData({ ...formData, center: e.target.value })}
              disabled={!!dialog.item}
            >
              {DONATION_CENTERS.map((center) => (
                <MenuItem key={center} value={center}>
                  {center}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              label="Blood Group"
              value={formData.bloodGroup}
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              disabled={!!dialog.item}
            >
              {BLOOD_GROUPS.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              type="number"
              label="Units Available"
              value={formData.units}
              onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) })}
              inputProps={{ min: 0 }}
            />

            <TextField
              fullWidth
              type="number"
              label="Low Stock Threshold"
              value={formData.lowStockThreshold}
              onChange={(e) =>
                setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) })
              }
              inputProps={{ min: 0 }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={
              !formData.center ||
              !formData.bloodGroup ||
              createMutation.isPending ||
              updateMutation.isPending
            }
          >
            {dialog.item ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
