import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {icon && (
        <Box
          sx={{
            fontSize: 80,
            opacity: 0.5,
            mb: 2,
          }}
        >
          {icon}
        </Box>
      )}
      
      <Typography
        variant="h5"
        className="font-semibold text-gray-800 dark:text-gray-200 mb-2"
      >
        {title}
      </Typography>
      
      <Typography
        variant="body1"
        className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-4"
      >
        {description}
      </Typography>
      
      {actionLabel && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          sx={{
            mt: 2,
            textTransform: 'none',
            borderRadius: 2,
          }}
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};
