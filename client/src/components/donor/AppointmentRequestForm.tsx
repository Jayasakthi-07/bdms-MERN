import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  useTheme as useMuiTheme,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { donorApi } from '@api/donor.api';
import { DONATION_CENTERS } from '@utils/constants';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const requestSchema = z.object({
  preferredDate: z.string().min(1, 'Preferred date is required'),
  center: z.string().min(1, 'Center is required'),
  donorNotes: z.string().max(500).optional(),
});

type RequestFormData = z.infer<typeof requestSchema>;

export const AppointmentRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const muiTheme = useMuiTheme();
  const isDark = muiTheme.palette.mode === 'dark';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
  });

  const mutation = useMutation({
    mutationFn: donorApi.createDonationRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donationHistory'] });
      toast.success('Donation request submitted successfully!');
      navigate('/donor/history');
    },
  });

  const onSubmit = (data: RequestFormData) => {
    // Convert datetime-local format (YYYY-MM-DDTHH:mm) to ISO datetime string
    const submitData: any = {
      center: data.center,
      donorNotes: data.donorNotes,
    };

    if (data.preferredDate && data.preferredDate.trim()) {
      // datetime-local format can be YYYY-MM-DDTHH:mm or YYYY-MM-DDTHH:mm:ss
      // Parse the string to extract date and time components
      const dateTimeMatch = data.preferredDate.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/);
      
      if (dateTimeMatch) {
        try {
          // Create a Date object from the datetime-local string components (in local time)
          // Format: YYYY-MM-DDTHH:mm or YYYY-MM-DDTHH:mm:ss (local time, no timezone)
          const [, year, month, day, hours, minutes, seconds] = dateTimeMatch;
          // Create date in local timezone (month is 0-indexed in Date constructor)
          const date = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            parseInt(hours),
            parseInt(minutes),
            seconds ? parseInt(seconds) : 0,
            0
          );
          
          if (!isNaN(date.getTime())) {
            // Convert to ISO string (UTC) - this will be in format: YYYY-MM-DDTHH:mm:ss.sssZ
            submitData.preferredDate = date.toISOString();
          } else {
            toast.error('Invalid date or time selected');
            return;
          }
        } catch (error) {
          console.error('Date conversion error:', error);
          toast.error('Invalid date format');
          return;
        }
      } else {
        // Fallback: try to parse as-is (in case browser returns a different format)
        try {
          const date = new Date(data.preferredDate);
          if (!isNaN(date.getTime())) {
            submitData.preferredDate = date.toISOString();
          } else {
            toast.error('Invalid date format. Please select a valid date and time.');
            return;
          }
        } catch (error) {
          toast.error('Invalid date format. Please select a valid date and time.');
          return;
        }
      }
    }

    mutation.mutate(submitData);
  };

  // Calculate minimum date for datetime-local input (must be at least tomorrow at midnight local time)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  minDate.setHours(0, 0, 0, 0);
  // Format as YYYY-MM-DDTHH:mm for datetime-local input (using local time)
  const year = minDate.getFullYear();
  const month = String(minDate.getMonth() + 1).padStart(2, '0');
  const day = String(minDate.getDate()).padStart(2, '0');
  const hours = String(minDate.getHours()).padStart(2, '0');
  const minutes = String(minDate.getMinutes()).padStart(2, '0');
  const minDateStr = `${year}-${month}-${day}T${hours}:${minutes}`;

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      transition: 'none !important',
      animation: 'none !important',
      '& input::placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& input::-webkit-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& input::-moz-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& input:-ms-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea::placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea::-webkit-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea::-moz-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea:-ms-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& fieldset': {
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
        borderWidth: '1px !important',
        borderStyle: 'solid !important',
        borderColor: `${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
        transition: 'none !important',
        animation: 'none !important',
        outline: 'none !important',
      },
      '&:hover': {
        transition: 'none !important',
        animation: 'none !important',
        outline: 'none !important',
        '& fieldset': {
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
          borderWidth: '1px !important',
          borderStyle: 'solid !important',
          borderColor: `${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
          transition: 'none !important',
          animation: 'none !important',
          outline: 'none !important',
        },
      },
      '&.Mui-focused': {
        border: 'none !important',
        outline: 'none !important',
        boxShadow: 'none !important',
        transition: 'none !important',
        animation: 'none !important',
        '& fieldset': {
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
          borderWidth: '1px !important',
          borderStyle: 'solid !important',
          borderColor: `${isDark ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)'} !important`,
          transition: 'none !important',
          animation: 'none !important',
          outline: 'none !important',
        },
        '& input': {
          outline: 'none !important',
          border: 'none !important',
        },
        '& textarea': {
          outline: 'none !important',
          border: 'none !important',
        },
        '& input::placeholder': {
          animation: 'none !important',
          transition: 'none !important',
          color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
          WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
        '& input::-webkit-input-placeholder': {
          animation: 'none !important',
          transition: 'none !important',
          color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
          WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
        '& textarea::placeholder': {
          animation: 'none !important',
          transition: 'none !important',
          color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
        '& textarea::-webkit-input-placeholder': {
          animation: 'none !important',
          transition: 'none !important',
          color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
          WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
      },
      '&.Mui-error': {
        transition: 'none !important',
        animation: 'none !important',
        '& fieldset': {
          border: '1px solid #d32f2f',
          borderWidth: '1px',
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
    '& .MuiInputLabel-root': {
      color: isDark ? 'rgba(255, 255, 255, 0.87) !important' : 'rgba(0, 0, 0, 0.87) !important',
      transition: 'none !important',
      animation: 'none !important',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: isDark ? 'rgba(255, 255, 255, 0.87) !important' : 'rgba(0, 0, 0, 0.87) !important',
      transition: 'none !important',
      animation: 'none !important',
    },
    '& .MuiInputLabel-root.Mui-error': {
      color: '#d32f2f !important',
      transition: 'none !important',
      animation: 'none !important',
    },
    '& .MuiOutlinedInput-input': {
      transition: 'none !important',
      animation: 'none !important',
      color: isDark ? 'rgba(255, 255, 255, 0.87) !important' : 'rgba(0, 0, 0, 0.87) !important',
      '&::placeholder': {
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&::-webkit-input-placeholder': {
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&::-moz-placeholder': {
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&:-ms-input-placeholder': {
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&::selection': {
        background: 'rgba(25, 118, 210, 0.2) !important',
        animation: 'none !important',
        transition: 'none !important',
      },
    },
    '& .MuiFormHelperText-root': {
      color: isDark ? 'rgba(255, 255, 255, 0.7) !important' : 'rgba(0, 0, 0, 0.6) !important',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="card max-w-2xl mx-auto">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <TextField
              fullWidth
              type="datetime-local"
              label="Preferred Date & Time"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: minDateStr }}
              {...register('preferredDate')}
              error={!!errors.preferredDate}
              helperText={errors.preferredDate?.message}
              sx={inputSx}
            />

            <TextField
              fullWidth
              select
              label="Donation Center"
              {...register('center')}
              error={!!errors.center}
              helperText={errors.center?.message}
              sx={inputSx}
            >
              {DONATION_CENTERS.map((center) => (
                <MenuItem key={center} value={center}>
                  {center}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Additional Notes (Optional)"
              placeholder="Any special requests or information..."
              {...register('donorNotes')}
              error={!!errors.donorNotes}
              helperText={errors.donorNotes?.message}
              sx={inputSx}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={() => navigate('/donor/dashboard')}
                sx={{ textTransform: 'none', borderRadius: 2 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={mutation.isPending}
                sx={{ textTransform: 'none', borderRadius: 2 }}
              >
                {mutation.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Submit Request'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
