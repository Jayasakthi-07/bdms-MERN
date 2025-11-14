import React, { useState } from 'react';
import {
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { Notifications as NotificationsIcon, Close } from '@mui/icons-material';
import { useNotifications } from '@hooks/useNotifications';
import { formatTimeAgo } from '@utils/formatters';
import { motion, AnimatePresence } from 'framer-motion';

export const NotificationBell: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } =
    useNotifications();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'APPT':
        return '📅';
      case 'REMINDER':
        return '🔔';
      case 'ALERT':
        return '⚠️';
      case 'GENERAL':
        return '📢';
      default:
        return '📬';
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 400,
            maxHeight: 600,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          },
        }}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <Typography variant="h6" className="font-semibold">
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={() => markAllAsRead()}
              sx={{ textTransform: 'none' }}
            >
              Mark all read
            </Button>
          )}
        </div>

        <List sx={{ p: 0, maxHeight: 480, overflow: 'auto' }}>
          <AnimatePresence>
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 px-4"
              >
                <span className="text-6xl mb-3">📭</span>
                <Typography variant="body2" className="text-gray-500">
                  No notifications yet
                </Typography>
              </motion.div>
            ) : (
              notifications.slice(0, 10).map((notification, index) => (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ListItem
                    sx={{
                      bgcolor: notification.isRead
                        ? 'transparent'
                        : 'action.hover',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.selected',
                      },
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                    }}
                    onClick={() => !notification.isRead && markAsRead(notification._id)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <span className="text-2xl mt-1">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <Typography
                          variant="subtitle2"
                          className="font-semibold truncate"
                        >
                          {notification.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-gray-600 dark:text-gray-400 line-clamp-2"
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="text-gray-500 dark:text-gray-500 mt-1 block"
                        >
                          {formatTimeAgo(notification.createdAt)}
                        </Typography>
                      </div>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification._id);
                        }}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    </div>
                  </ListItem>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </List>

        {notifications.length > 10 && (
          <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
            <Button fullWidth sx={{ textTransform: 'none' }}>
              View All Notifications
            </Button>
          </div>
        )}
      </Popover>
    </>
  );
};
