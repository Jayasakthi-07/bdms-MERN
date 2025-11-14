import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, CircularProgress, Alert, useTheme as useMuiTheme } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@api/auth.api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
    onSuccess: () => {
      toast.success('Password reset link sent to your email!');
    },
  });

  const muiTheme = useMuiTheme();
  const isDark = muiTheme.palette.mode === 'dark';

  const onSubmit = (data: ForgotPasswordData) => {
    mutation.mutate(data.email);
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
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {mutation.isSuccess && (
        <Alert severity="success" sx={{ borderRadius: '1rem' }}>
          If an account exists with this email, you will receive a password reset link.
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email Address"
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={inputSx}
      />

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mt-4">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={mutation.isPending}
          className="btn-premium"
          sx={{
            py: 1.5,
            borderRadius: '1rem',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {mutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
        </Button>
      </motion.div>
    </motion.form>
  );
};
