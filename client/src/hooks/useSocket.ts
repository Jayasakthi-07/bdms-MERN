import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@store/AuthContext';
import toast from 'react-hot-toast';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const socketInstance = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    socketInstance.on('connect', () => {
      console.log('✅ Socket connected');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('notification', (notification) => {
      toast.success(notification.title, {
        duration: 5000,
        icon: '🔔',
      });
    });

    socketInstance.on('low-stock-alert', (alert) => {
      if (user.role === 'ADMIN') {
        toast.error(
          `Low Stock Alert: ${alert.bloodGroup} at ${alert.center} (${alert.units} units)`,
          { duration: 10000 }
        );
      }
    });

    socketInstance.on('request-update', (request) => {
      toast.info(`Your donation request status: ${request.status}`, {
        duration: 5000,
      });
    });

    socketInstance.on('new-request', (request) => {
      if (user.role === 'ADMIN') {
        toast.info('New donation request received', {
          duration: 5000,
          icon: '📋',
        });
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  return { socket, isConnected };
};
