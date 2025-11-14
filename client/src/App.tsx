import React, { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/store/AuthContext';
import { ThemeProvider, useTheme } from '@/store/ThemeContext';
import { router } from '@/routes';
import { useSocket } from '@/hooks/useSocket';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { 
      refetchOnWindowFocus: false, 
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  useSocket(); // Initialize socket connection

  // Memoize theme creation to prevent recreation on every render
  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: theme,
      primary: { 
        main: '#667eea',
        light: '#a78bfa',
        dark: '#5b21b6',
      },
      secondary: { 
        main: '#ec4899',
        light: '#f9a8d4',
        dark: '#be185d',
      },
      error: { main: '#ef4444' },
      success: { main: '#10b981' },
      warning: { main: '#f59e0b' },
      info: { main: '#3b82f6' },
    },
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '& input::placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
            },
            '& textarea::placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
            },
            '& input::-webkit-input-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
              WebkitTextFillColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
            },
            '& textarea::-webkit-input-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
              WebkitTextFillColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
            },
            '& input::-moz-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
            },
            '& textarea::-moz-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
            },
            '& input:-ms-input-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
            },
            '& textarea:-ms-input-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
            },
          },
          input: {
            '&::placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
              WebkitTextFillColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
            },
            '&::-webkit-input-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
              WebkitTextFillColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
            },
            '&::-moz-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
            },
            '&:-ms-input-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& fieldset': {
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
              borderWidth: '1px',
            },
            '&.Mui-focused': {
              '& fieldset': {
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23) !important',
                borderWidth: '1px !important',
              },
            },
            '&.Mui-error fieldset': {
              borderColor: '#d32f2f',
            },
          },
          input: {
            '&::placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
              WebkitTextFillColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
            },
            '&::-webkit-input-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
              WebkitTextFillColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
            },
            '&::-moz-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
            },
            '&:-ms-input-placeholder': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6) !important' : 'rgba(0, 0, 0, 0.6) !important',
              opacity: '0.6 !important',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            '&.Mui-focused': {
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
            },
          },
        },
      },
    },
  }), [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#1f2937' : '#ffffff',
            color: theme === 'dark' ? '#f3f4f6' : '#111827',
            border: '1px solid',
            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
