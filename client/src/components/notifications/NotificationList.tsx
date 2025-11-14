import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { Close, Circle } from '@mui/icons-material';
import { useNotifications } from '@hooks/useNotifications';
import { formatTimeAgo } from '@utils/formatters';
import { EmptyState } from '@components/common/EmptyState';
import { motion } from 'framer-motion';

export const NotificationList: React.FC = () => {
  const { notifications, markAsRead, deleteNotification } = useNotifications();

  if (notifications.length === 0) {
    return (
      <EmptyState
        icon="📭"
        title="No Notifications"
        description="You're all caught up!"
      />
    );
  }

  return (
    <List sx={{ width: '100%' }}>
      {notifications.map((notification, index) => (
        <motion.div
          key={notification._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <ListItem
            alignItems="flex-start"
            sx={{
              bgcolor: notification.isRead ? 'transparent' : 'action.hover',
              borderRadius: 1,
              mb: 1,
            }}
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => deleteNotification(notification._id)}
              >
                <Close />
              </IconButton>
            }
          >
            <div className="flex items-start gap-3 flex-1">
              {!notification.isRead && (
                <Circle
                  sx={{ fontSize: 10, color: 'primary.main', mt: 1 }}
                />
              )}
              <ListItemText
                primary={
                  <Typography variant="subtitle2" className="font-semibold">
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" component="span">
                      {notification.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {formatTimeAgo(notification.createdAt)}
                    </Typography>
                  </>
                }
                onClick={() => !notification.isRead && markAsRead(notification._id)}
                sx={{ cursor: notification.isRead ? 'default' : 'pointer' }}
              />
            </div>
          </ListItem>
          {index < notifications.length - 1 && <Divider />}
        </motion.div>
      ))}
    </List>
  );
};
