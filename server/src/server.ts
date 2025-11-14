import http from 'http';
import app from './app';
import { env } from '@config/env';
import { connectDatabase } from '@config/database';
import { socketService } from '@services/socket.service';

const server = http.createServer(app);

// Initialize Socket.IO
socketService.initialize(server);

const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Start server
    server.listen(env.PORT, () => {
      console.log(`
╔═══════════════════════════════════════════╗
║  🩸 BDMS Server Running                   ║
║  Port: ${env.PORT}                              ║
║  Environment: ${env.NODE_ENV}            ║
║  Docs: http://localhost:${env.PORT}/api/docs  ║
╚═══════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

startServer();
