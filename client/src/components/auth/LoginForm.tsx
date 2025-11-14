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
  FormControlLabel,
  Checkbox,
  CircularProgress,
  useTheme as useMuiTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@store/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isDark = muiTheme.palette.mode === 'dark';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'DONOR') {
        navigate('/donor/dashboard');
      } else if (user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
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
        label="Email Address"
        type="email"
        autoComplete="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        variant="outlined"
        sx={inputSx}
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
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

      <div className="flex items-center justify-between mb-2">
        <FormControlLabel
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              sx={{
                color: '#6366f1',
                '&.Mui-checked': {
                  color: '#6366f1',
                },
              }}
            />
          }
          label={<span className="text-sm text-gray-700 dark:text-gray-300 text-left">Remember me</span>}
        />
        <Link
          to="/forgot-password"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium transition-colors"
        >
          Forgot password?
        </Link>
      </div>

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
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </Button>
      </motion.div>

      <div className="text-center mt-8">
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          Don't have an account?{' '}
        </span>
        <Link
          to="/register"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
        >
          Register here
        </Link>
      </div>
    </motion.form>
  );
};
