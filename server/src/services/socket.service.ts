import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { env } from '@config/env';
import { verifyAccessToken } from '@utils/jwt';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  role?: string;
}

class SocketService {
  private io: SocketIOServer | null = null;
  private userSockets: Map<string, string[]> = new Map();

  initialize(server: HTTPServer): void {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: env.SOCKET_CORS_ORIGIN,
        credentials: true,
      },
    });

    this.io.use((socket: AuthenticatedSocket, next) => {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication error'));
      }

      try {
        const payload = verifyAccessToken(token);
        socket.userId = payload.userId;
        socket.role = payload.role;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });

    this.io.on('connection', (socket: AuthenticatedSocket) => {
      console.log(`✅ Socket connected: ${socket.id} (User: ${socket.userId})`);

      // Track user's socket connections
      if (socket.userId) {
        const userSocketIds = this.userSockets.get(socket.userId) || [];
        userSocketIds.push(socket.id);
        this.userSockets.set(socket.userId, userSocketIds);

        // Join user-specific room
        socket.join(`user:${socket.userId}`);

        // Join role-specific room
        if (socket.role) {
          socket.join(`role:${socket.role}`);
        }
      }

      socket.on('disconnect', () => {
        console.log(`❌ Socket disconnected: ${socket.id}`);

        if (socket.userId) {
          const userSocketIds = this.userSockets.get(socket.userId) || [];
          const filteredSockets = userSocketIds.filter((id) => id !== socket.id);

          if (filteredSockets.length > 0) {
            this.userSockets.set(socket.userId, filteredSockets);
          } else {
            this.userSockets.delete(socket.userId);
          }
        }
      });
    });

    console.log('✅ Socket.IO initialized');
  }

  emitToUser(userId: string, event: string, data: any): void {
    if (this.io) {
      this.io.to(`user:${userId}`).emit(event, data);
    }
  }

  emitToRole(role: string, event: string, data: any): void {
    if (this.io) {
      this.io.to(`role:${role}`).emit(event, data);
    }
  }

  emitToAll(event: string, data: any): void {
    if (this.io) {
      this.io.emit(event, data);
    }
  }

  broadcastLowStockAlert(bloodGroup: string, center: string, units: number): void {
    this.emitToRole('ADMIN', 'low-stock-alert', {
      bloodGroup,
      center,
      units,
      timestamp: new Date(),
    });
  }

  notifyDonor(userId: string, notification: any): void {
    this.emitToUser(userId, 'notification', notification);
  }

  notifyRequestUpdate(userId: string, request: any): void {
    this.emitToUser(userId, 'request-update', request);
  }

  notifyAdminNewRequest(request: any): void {
    this.emitToRole('ADMIN', 'new-request', request);
  }
}

export const socketService = new SocketService();
