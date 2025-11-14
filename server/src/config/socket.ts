import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { env } from './env';
import { verifyAccessToken } from '@utils/jwt';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  role?: string;
}

export class SocketConfig {
  private io: SocketIOServer | null = null;

  initialize(server: HTTPServer): SocketIOServer {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: env.SOCKET_CORS_ORIGIN,
        credentials: true,
        methods: ['GET', 'POST'],
      },
      transports: ['websocket', 'polling'],
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    // Authentication middleware
    this.io.use((socket: AuthenticatedSocket, next) => {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication token missing'));
      }

      try {
        const payload = verifyAccessToken(token);
        socket.userId = payload.userId;
        socket.role = payload.role;
        next();
      } catch (error) {
        next(new Error('Invalid authentication token'));
      }
    });

    this.setupEventHandlers();

    console.log('✅ Socket.IO server initialized');
    return this.io;
  }

  private setupEventHandlers(): void {
    if (!this.io) return;

    this.io.on('connection', (socket: AuthenticatedSocket) => {
      console.log(`✅ Socket connected: ${socket.id} (User: ${socket.userId})`);

      // Join user-specific room
      if (socket.userId) {
        socket.join(`user:${socket.userId}`);
      }

      // Join role-specific room
      if (socket.role) {
        socket.join(`role:${socket.role}`);
      }

      // Handle custom events
      socket.on('ping', () => {
        socket.emit('pong', { timestamp: Date.now() });
      });

      socket.on('disconnect', (reason) => {
        console.log(`❌ Socket disconnected: ${socket.id} (Reason: ${reason})`);
      });

      socket.on('error', (error) => {
        console.error(`Socket error for ${socket.id}:`, error);
      });
    });
  }

  getIO(): SocketIOServer | null {
    return this.io;
  }
}

export const socketConfig = new SocketConfig();
