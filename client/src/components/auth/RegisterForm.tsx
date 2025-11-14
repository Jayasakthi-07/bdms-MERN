import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  CircularProgress,
  LinearProgress,
  Typography,
  useTheme as useMuiTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@store/AuthContext';
import { BLOOD_GROUPS } from '@utils/constants';
import { motion } from 'framer-motion';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character'),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, '')) // Clean phone number
    .refine((val) => /^[6-9]\d{9}$/.test(val), {
      message: 'Invalid phone number. Enter 10 digits starting with 6-9.',
    }),
  bloodGroup: z.enum(BLOOD_GROUPS).optional().or(z.literal('')),
  dob: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[a-z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) strength += 25;
  return strength;
};

export const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isDark = muiTheme.palette.mode === 'dark';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');

  React.useEffect(() => {
    setPasswordStrength(getPasswordStrength(password));
  }, [password]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // Prepare submission data
      // Note: phone is already cleaned by zod transform
      const submitData: any = {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        phone: data.phone, // Already cleaned by zod transform
      };
      
      // Convert date to ISO datetime string if provided
      if (data.dob && data.dob.trim()) {
        // If it's just a date (YYYY-MM-DD), convert to ISO datetime
        if (data.dob.match(/^\d{4}-\d{2}-\d{2}$/)) {
          // Date format: add time to make it a valid ISO datetime
          submitData.dob = `${data.dob}T00:00:00.000Z`;
        } else {
          // Already a datetime string, try to convert
          try {
            submitData.dob = new Date(data.dob).toISOString();
          } catch {
            // If conversion fails, skip dob
            console.warn('Invalid date format, skipping DOB');
          }
        }
      }
      
      // Add bloodGroup only if provided and not empty
      if (data.bloodGroup && data.bloodGroup.trim() && data.bloodGroup !== '') {
        submitData.bloodGroup = data.bloodGroup;
      }
      
      await registerUser(submitData);
      navigate('/donor/dashboard');
    } catch (error: any) {
      // Error is already handled by axios interceptor (shows toast)
      // But we can log additional details if needed
      console.error('Registration error:', error);
      // Don't navigate on error - let user see the error message
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 50) return 'error';
    if (passwordStrength < 75) return 'warning';
    return 'success';
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '1rem',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(10px)',
      outline: 'none',
      boxShadow: 'none',
      border: 'none',
      transition: 'none !important',
      animation: 'none !important',
      '& input::placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& input::-webkit-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& input::-moz-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& input:-ms-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea::placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea::-webkit-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea::-moz-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '& textarea:-ms-input-placeholder': {
        animation: 'none !important',
        transition: 'none !important',
        opacity: '0.6 !important',
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
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)',
        outline: 'none !important',
        boxShadow: 'none !important',
        border: 'none !important',
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
          opacity: '0.6 !important',
          color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
          WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
        '& input::-webkit-input-placeholder': {
          animation: 'none !important',
          transition: 'none !important',
          opacity: '0.6 !important',
          color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
          WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
        '& textarea::placeholder': {
          animation: 'none !important',
          transition: 'none !important',
          opacity: '0.6 !important',
          color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        },
        '& textarea::-webkit-input-placeholder': {
          animation: 'none !important',
          transition: 'none !important',
          opacity: '0.6 !important',
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
      textAlign: 'left',
      zIndex: 1,
      color: isDark ? 'rgba(255, 255, 255, 0.87) !important' : 'rgba(0, 0, 0, 0.87) !important',
      transition: 'none !important',
      animation: 'none !important',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: isDark ? 'rgba(255, 255, 255, 0.87) !important' : 'rgba(0, 0, 0, 0.87) !important',
      transition: 'none !important',
      animation: 'none !important',
    },
    '& .MuiInputLabel-root.MuiInputLabel-shrink': {
      zIndex: 2,
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
      zIndex: 1,
      position: 'relative',
      transition: 'none !important',
      animation: 'none !important',
      color: isDark ? 'rgba(255, 255, 255, 0.87) !important' : 'rgba(0, 0, 0, 0.87) !important',
      '&::placeholder': {
        opacity: '0.6 !important',
        visibility: 'visible !important',
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&::-webkit-input-placeholder': {
        opacity: '0.6 !important',
        visibility: 'visible !important',
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
        WebkitTextFillColor: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&::-moz-placeholder': {
        opacity: '0.6 !important',
        visibility: 'visible !important',
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&:-ms-input-placeholder': {
        opacity: '0.6 !important',
        visibility: 'visible !important',
        animation: 'none !important',
        transition: 'none !important',
        color: isDark ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
      },
      '&::selection': {
        background: 'rgba(99, 102, 241, 0.2) !important',
        animation: 'none !important',
        transition: 'none !important',
      },
    },
    '& .MuiOutlinedInput-root': {
      transition: 'none !important',
      animation: 'none !important',
      '&:hover': {
        transition: 'none !important',
        animation: 'none !important',
      },
    },
    '& .MuiOutlinedInput-root fieldset': {
      transition: 'none !important',
      animation: 'none !important',
    },
    '& .MuiFormHelperText-root': {
      textAlign: 'left',
      marginLeft: 0,
      marginRight: 0,
      color: isDark ? 'rgba(255, 255, 255, 0.7) !important' : 'rgba(0, 0, 0, 0.6) !important',
    },
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <TextField
        fullWidth
        label="Full Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        variant="outlined"
        sx={inputSx}
      />

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        variant="outlined"
        sx={inputSx}
      />

      <TextField
        fullWidth
        label="Phone Number"
        placeholder="9876543210"
        {...register('phone')}
        error={!!errors.phone}
                helperText={errors.phone?.message || 'Enter 10-digit phone number'}
        variant="outlined"
        sx={inputSx}
        inputProps={{
          maxLength: 15, // Allow some extra for formatting, but will be cleaned
        }}
      />

      <div>
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  className="text-gray-600 dark:text-gray-400"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={inputSx}
        />
        {password && (
          <div className="mt-3">
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              color={getStrengthColor()}
              sx={{ 
                height: 6, 
                borderRadius: 1,
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 1,
                },
              }}
            />
            <Typography variant="caption" className="text-gray-600 dark:text-gray-400 mt-2 block text-left">
              Password strength: {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Medium' : 'Strong'}
            </Typography>
          </div>
        )}
      </div>

      <TextField
        fullWidth
        select
        label="Blood Group (Optional)"
        {...register('bloodGroup')}
        error={!!errors.bloodGroup}
        helperText={errors.bloodGroup?.message}
        variant="outlined"
        sx={inputSx}
      >
        <MenuItem value="">Select Blood Group</MenuItem>
        {BLOOD_GROUPS.map((group) => (
          <MenuItem key={group} value={group}>
            {group}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label="Date of Birth (Optional)"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register('dob')}
        error={!!errors.dob}
        helperText={errors.dob?.message}
        variant="outlined"
        sx={inputSx}
      />

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mt-4">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isSubmitting}
          className="btn-premium"
          sx={{
            py: 1.5,
            borderRadius: '1rem',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
        </Button>
      </motion.div>

      <div className="text-center mt-8">
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          Already have an account?{' '}
        </span>
        <Link
          to="/login"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
        >
          Login here
        </Link>
      </div>
    </motion.form>
  );
};
