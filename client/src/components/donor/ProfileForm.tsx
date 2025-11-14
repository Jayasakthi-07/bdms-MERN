import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Grid,
  CircularProgress,
  useTheme as useMuiTheme,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { donorApi } from '@api/donor.api';
import { BLOOD_GROUPS, INDIAN_STATES, TAMIL_NADU_DISTRICTS } from '@utils/constants';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  bloodGroup: z.enum(BLOOD_GROUPS).optional(),
  dob: z.string().optional(),
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  state: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode').optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const ProfileForm: React.FC = () => {
  const queryClient = useQueryClient();
  const muiTheme = useMuiTheme();
  const isDark = muiTheme.palette.mode === 'dark';

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: donorApi.getProfile,
  });

  const mutation = useMutation({
    mutationFn: donorApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully!');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: profileData?.data
      ? {
          name: profileData.data.name,
          phone: profileData.data.phone,
          bloodGroup: profileData.data.bloodGroup,
          dob: profileData.data.dob?.split('T')[0],
          address: profileData.data.address || '',
          city: profileData.data.city || '',
          state: profileData.data.state || 'Tamil Nadu',
          pincode: profileData.data.pincode || '',
        }
      : undefined,
  });

  if (isLoading) return <LoadingSpinner />;

  const onSubmit = (data: ProfileFormData) => {
    mutation.mutate(data);
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
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
      <Card className="card">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Blood Group"
                  {...register('bloodGroup')}
                  error={!!errors.bloodGroup}
                  helperText={errors.bloodGroup?.message}
                  sx={inputSx}
                >
                  {BLOOD_GROUPS.map((group) => (
                    <MenuItem key={group} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  InputLabelProps={{ shrink: true }}
                  {...register('dob')}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={2}
                  {...register('address')}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  sx={inputSx}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="City"
                  {...register('city')}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  sx={inputSx}
                >
                  {TAMIL_NADU_DISTRICTS.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  select
                  label="State"
                  {...register('state')}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  defaultValue="Tamil Nadu"
                  sx={inputSx}
                >
                  {INDIAN_STATES.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Pincode"
                  {...register('pincode')}
                  error={!!errors.pincode}
                  helperText={errors.pincode?.message}
                  sx={inputSx}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={mutation.isPending}
              sx={{
                mt: 3,
                py: 1.5,
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              {mutation.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Update Profile'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
