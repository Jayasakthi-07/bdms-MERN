import mongoose from 'mongoose';
import { env } from './env';

export const connectDatabase = async (): Promise<void> => {
  try {
    // Connection options for better reliability
    const options: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 10000, // Increased timeout to 10 seconds
      socketTimeoutMS: 45000, // Socket timeout
      connectTimeoutMS: 10000, // Connection timeout
      maxPoolSize: 10, // Maximum number of connections
      retryWrites: true,
      // Only set w: 'majority' for replica sets, not for standalone
      // w: 'majority', // Commented out for local MongoDB compatibility
    };

    console.log('🔄 Attempting to connect to MongoDB...');
    console.log(`📍 Connection URI: ${env.MONGODB_URI.replace(/:[^:@]+@/, ':****@')}`); // Hide password in logs

    const conn = await mongoose.connect(env.MONGODB_URI, options);

    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Ready State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);

    // Connection event handlers
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
      console.error('   Full error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected successfully');
    });

    mongoose.connection.on('connecting', () => {
      console.log('🔄 Connecting to MongoDB...');
    });

    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connection established');
    });

  } catch (error: any) {
    console.error('❌ Error connecting to MongoDB:');
    console.error('   Error Message:', error.message);
    
    if (error.name === 'MongoServerSelectionError') {
      console.error('   ⚠️  Could not connect to MongoDB server.');
      console.error('   💡 Please check:');
      console.error('      1. MongoDB is running');
      console.error('      2. MONGODB_URI is correct in .env file');
      console.error('      3. Network connectivity');
      console.error('      4. Firewall settings');
    } else if (error.name === 'MongoParseError') {
      console.error('   ⚠️  Invalid MongoDB connection string.');
      console.error('   💡 Please check your MONGODB_URI format in .env file');
    } else if (error.name === 'MongoAuthenticationError') {
      console.error('   ⚠️  Authentication failed.');
      console.error('   💡 Please check your MongoDB username and password');
    } else {
      console.error('   Full error:', error);
    }
    
    console.error('\n📝 Make sure you have a .env file in the server directory with MONGODB_URI set.');
    console.error('   You can copy .env.example to .env and update the values.\n');
    
    process.exit(1);
  }
};
