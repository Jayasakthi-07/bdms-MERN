import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config({ path: path.join(__dirname, '../../.env') });

import { connectDatabase } from '../config/database';
import { User } from '../models/User.model';
import { DonationRequest } from '../models/DonationRequest.model';
import { Inventory } from '../models/Inventory.model';
import { Notification } from '../models/Notification.model';
import { AuditLog } from '../models/AuditLog.model';
import { hashPassword } from '../utils/password';

// Tamil cities in Tamil Nadu
const tamilCities = [
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Coimbatore', state: 'Tamil Nadu' },
  { city: 'Madurai', state: 'Tamil Nadu' },
  { city: 'Trichy', state: 'Tamil Nadu' },
  { city: 'Salem', state: 'Tamil Nadu' },
  { city: 'Tirunelveli', state: 'Tamil Nadu' },
  { city: 'Erode', state: 'Tamil Nadu' },
  { city: 'Vellore', state: 'Tamil Nadu' },
  { city: 'Thanjavur', state: 'Tamil Nadu' },
  { city: 'Dindigul', state: 'Tamil Nadu' },
  { city: 'Tiruppur', state: 'Tamil Nadu' },
  { city: 'Kanchipuram', state: 'Tamil Nadu' },
  { city: 'Nagercoil', state: 'Tamil Nadu' },
  { city: 'Karur', state: 'Tamil Nadu' },
  { city: 'Hosur', state: 'Tamil Nadu' },
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
// Tamil Nadu Blood Donation Centers
const centers = [
  'Government General Hospital - Chennai',
  'Apollo Hospitals - Chennai',
  'Fortis Malar Hospital - Chennai',
  'KG Hospital - Coimbatore',
  'Meenakshi Mission Hospital - Madurai',
  'CMC Hospital - Vellore',
  'Rajiv Gandhi Government General Hospital - Chennai',
  'Stanley Medical College Hospital - Chennai',
  'Government Rajaji Hospital - Madurai',
  'PSG Hospitals - Coimbatore',
  'Sri Ramakrishna Hospital - Coimbatore',
  'KMCH - Coimbatore',
  'Kauvery Hospital - Trichy',
  'Government Hospital - Salem',
  'Tamil Nadu Blood Bank - Chennai',
];

// Tamil first names (common Tamil names)
const firstNames = [
  // Male names
  'Arjun', 'Karthik', 'Ramesh', 'Suresh', 'Rajesh', 'Prakash', 'Vijay', 'Sathish',
  'Murali', 'Kumar', 'Bala', 'Selvam', 'Ganesh', 'Murugan', 'Anand', 'Srinivasan',
  'Natarajan', 'Venkatesh', 'Krishna', 'Shiva', 'Dinesh', 'Manoj', 'Prasanth', 'Saravanan',
  'Rajkumar', 'Vikram', 'Mohan', 'Harish', 'Ravi', 'Sankar', 'Pradeep', 'Balaji',
  'Jayaram', 'Ashok', 'Naveen', 'Senthil', 'Gopal', 'Mahesh', 'Siva', 'Vishnu',
  
  // Female names
  'Priya', 'Lakshmi', 'Meera', 'Divya', 'Kavya', 'Sneha', 'Anjali', 'Deepika',
  'Shruti', 'Nithya', 'Karthika', 'Malathi', 'Vasanthi', 'Revathi', 'Aarthi', 'Swathi',
  'Kalyani', 'Preethi', 'Jyothi', 'Padma', 'Geetha', 'Saranya', 'Kanchana', 'Manjula',
  'Rekha', 'Shanthi', 'Kamala', 'Latha', 'Vidya', 'Sowmya', 'Pooja', 'Anitha',
  'Rajalakshmi', 'Sujatha', 'Jayanthi', 'Sumathi', 'Vijaya', 'Rani', 'Radha', 'Uma',
];

// Tamil last names (common Tamil surnames)
const lastNames = [
  'Iyer', 'Pillai', 'Menon', 'Nair', 'Reddy', 'Gounder', 'Thevar', 'Nadar',
  'Mudaliar', 'Chettiar', 'Pattar', 'Asari', 'Reddy', 'Naidu', 'Vanniyar', 'Kallar',
  'Maravar', 'Agarwal', 'Kamraj', 'Raman', 'Krishnan', 'Subramanian', 'Venkatesan', 'Natarajan',
  'Srinivasan', 'Ramanathan', 'Lakshmanan', 'Balasubramanian', 'Gopalan', 'Krishnamoorthy', 'Muthu', 'Selvam',
  'Kumar', 'Raj', 'Murugan', 'Shiva', 'Ganesh', 'Krishna', 'Vishnu', 'Anand',
];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomPhone(): string {
  const prefixes = ['98', '97', '96', '95', '94', '93', '92', '91', '90', '89'];
  return randomElement(prefixes) + Math.floor(10000000 + Math.random() * 90000000);
}

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    await connectDatabase();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      DonationRequest.deleteMany({}),
      Inventory.deleteMany({}),
      Notification.deleteMany({}),
      AuditLog.deleteMany({}),
    ]);
    console.log('✅ Existing data cleared\n');

    // Create Admin User
    console.log('👤 Creating admin user...');
    const adminPassword = await hashPassword('Admin@123');
    const admin = await User.create({
      role: 'ADMIN',
      name: 'Admin User',
      email: 'admin@bdms.com',
      passwordHash: adminPassword,
      phone: '9876543210',
      isActive: true,
    });
    console.log('✅ Admin created: admin@bdms.com / Admin@123\n');

    // Create Tamil Donors
    console.log('👥 Creating 120 Tamil donors...');
    const donors = [];
    const donorPassword = await hashPassword('Donor@123');
    const existingEmails = new Set<string>();

    // Tamil street names
    const tamilStreetNames = [
      'Anna Nagar', 'T. Nagar', 'Adyar', 'Mylapore', 'Velachery', 'Tambaram',
      'Chrompet', 'Pallavaram', 'Porur', 'Ambattur', 'Avadi', 'Guindy',
      'Saidapet', 'Egmore', 'Triplicane', 'Royapuram', 'Perambur', 'Villivakkam',
      'KK Nagar', 'Ashok Nagar', 'Kilpauk', 'Aminjikarai', 'Purasawalkam', 'Washermanpet',
    ];

    for (let i = 0; i < 120; i++) {
      const location = randomElement(tamilCities);
      const bloodGroup = randomElement(bloodGroups);
      const firstName = randomElement(firstNames);
      const lastName = randomElement(lastNames);
      const dob = randomDate(new Date(1970, 0, 1), new Date(2002, 11, 31));
      
      // Generate unique email (data is cleared first, but check for duplicates within this batch)
      let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@tamil.com`;
      let emailCounter = 1;
      while (existingEmails.has(email.toLowerCase())) {
        email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}.${emailCounter}@tamil.com`;
        emailCounter++;
      }
      existingEmails.add(email.toLowerCase());
      
      const hasRecentDonation = Math.random() > 0.7;
      const lastDonationDate = hasRecentDonation 
        ? randomDate(new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), new Date())
        : undefined;

      let isEligible = true;
      let nextEligibleDate;

      if (lastDonationDate) {
        const daysSince = Math.floor((Date.now() - lastDonationDate.getTime()) / (24 * 60 * 60 * 1000));
        if (daysSince < 90) {
          isEligible = false;
          nextEligibleDate = new Date(lastDonationDate);
          nextEligibleDate.setDate(nextEligibleDate.getDate() + 90);
        }
      }

      try {
        const donor = await User.create({
          role: 'DONOR',
          name: `${firstName} ${lastName}`,
          email: email.toLowerCase(),
          passwordHash: donorPassword,
          phone: randomPhone(),
          bloodGroup,
          dob,
          address: `${Math.floor(Math.random() * 500) + 1}, ${randomElement(tamilStreetNames)}`,
          city: location.city,
          state: location.state,
          pincode: String(Math.floor(600000 + Math.random() * 99999)), // Tamil Nadu pincodes (600000-699999)
          isActive: Math.random() > 0.05, // 95% active
          eligibility: {
            lastDonationAt: lastDonationDate,
            isEligible,
            nextEligibleAt: nextEligibleDate,
          },
        });

        donors.push(donor);
        
        // Progress indicator
        if ((i + 1) % 20 === 0) {
          console.log(`   Created ${i + 1}/120 Tamil donors...`);
        }
      } catch (error: any) {
        if (error.code === 11000) {
          // Duplicate key error (email), skip this one
          console.warn(`   ⚠️  Skipped duplicate email: ${email}`);
          i--; // Retry this index
          continue;
        }
        throw error;
      }
    }
    console.log(`✅ Created ${donors.length} Tamil donors (Password: Donor@123)\n`);

    // Create Donation Requests
    console.log('📝 Creating 250 donation requests...');
    const statuses = ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED'];
    const statusWeights = [0.15, 0.20, 0.10, 0.50, 0.05];

    const requests = [];
    for (let i = 0; i < 250; i++) {
      const donor = randomElement(donors);
      const center = randomElement(centers);
      
      const rand = Math.random();
      let cumulative = 0;
      let status = statuses[0];
      
      for (let j = 0; j < statuses.length; j++) {
        cumulative += statusWeights[j];
        if (rand <= cumulative) {
          status = statuses[j];
          break;
        }
      }

      const requestedAt = randomDate(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), new Date());
      const preferredDate = new Date(requestedAt);
      preferredDate.setDate(preferredDate.getDate() + Math.floor(Math.random() * 14) + 1);

      const requestData: any = {
        donorId: donor._id,
        requestedAt,
        preferredDate,
        center,
        status,
        donorNotes: Math.random() > 0.5 ? 'Please confirm the appointment time.' : undefined,
      };

      if (status === 'APPROVED' || status === 'COMPLETED') {
        requestData.approvedBy = admin._id;
        requestData.scheduledAt = new Date(requestedAt);
        requestData.scheduledAt.setDate(requestData.scheduledAt.getDate() + Math.floor(Math.random() * 7) + 2);
        requestData.adminNotes = 'Approved. Please arrive 30 minutes early.';
      }

      if (status === 'COMPLETED') {
        requestData.completedAt = new Date(requestData.scheduledAt);
        requestData.completedAt.setHours(requestData.completedAt.getHours() + 2);
      }

      if (status === 'REJECTED') {
        requestData.rejectedBy = admin._id;
        requestData.rejectionReason = randomElement([
          'Recent donation detected in our records',
          'Medical screening indicated temporary deferral',
          'Incomplete health information provided',
        ]);
      }

      const request = await DonationRequest.create(requestData);
      requests.push(request);
    }
    console.log(`✅ Created ${requests.length} donation requests\n`);

    // Create Inventory
    console.log('🏥 Creating inventory records...');
    const inventoryRecords = [];

    for (const center of centers) {
      for (const bloodGroup of bloodGroups) {
        const units = Math.floor(Math.random() * 100);
        const lowStockThreshold = 10 + Math.floor(Math.random() * 10);

        const expiryDates = [];
        const numExpiries = Math.floor(units * 0.3);
        for (let i = 0; i < numExpiries; i++) {
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + Math.floor(Math.random() * 42) + 1);
          expiryDates.push(expiryDate);
        }

        const inventory = await Inventory.create({
          center,
          bloodGroup,
          units,
          lowStockThreshold,
          expiryDates,
          lastUpdatedBy: admin._id,
        });

        inventoryRecords.push(inventory);
      }
    }
    console.log(`✅ Created ${inventoryRecords.length} inventory records\n`);

    // Create Notifications
    console.log('🔔 Creating notifications...');
    const notificationTypes = ['APPT', 'REMINDER', 'ALERT', 'GENERAL'];
    const notifications = [];

    for (let i = 0; i < 300; i++) {
      const donor = randomElement(donors);
      const type = randomElement(notificationTypes);
      
      let title = '';
      let message = '';

      switch (type) {
        case 'APPT':
          title = randomElement(['Request Approved', 'Request Submitted', 'Donation Completed']);
          message = 'Your donation request has been processed.';
          break;
        case 'REMINDER':
          title = 'Upcoming Appointment';
          message = 'You have a blood donation appointment tomorrow.';
          break;
        case 'ALERT':
          title = 'Urgent: Blood Needed';
          message = `Urgent need for ${randomElement(bloodGroups)} blood group.`;
          break;
        case 'GENERAL':
          title = 'Thank You!';
          message = 'Thank you for being a regular donor. You are a hero!';
          break;
      }

      const notification = await Notification.create({
        userId: donor._id,
        type,
        title,
        message,
        isRead: Math.random() > 0.4,
        createdAt: randomDate(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date()),
      });

      notifications.push(notification);
    }
    console.log(`✅ Created ${notifications.length} notifications\n`);

    // Create Audit Logs
    console.log('📋 Creating audit logs...');
    const actions = [
      'UPDATE_DONOR',
      'ACTIVATE_DONOR',
      'DEACTIVATE_DONOR',
      'APPROVE_REQUEST',
      'REJECT_REQUEST',
      'COMPLETE_REQUEST',
      'UPDATE_INVENTORY',
      'CREATE_INVENTORY',
    ];

    const auditLogs = [];
    for (let i = 0; i < 150; i++) {
      const action = randomElement(actions);
      const entityType = action.includes('DONOR') ? 'User' : action.includes('REQUEST') ? 'DonationRequest' : 'Inventory';
      
      const auditLog = await AuditLog.create({
        adminId: admin._id,
        action,
        entityType,
        entityId: entityType === 'User' ? randomElement(donors)._id : undefined,
        meta: { automated: false },
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        createdAt: randomDate(new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), new Date()),
      });

      auditLogs.push(auditLog);
    }
    console.log(`✅ Created ${auditLogs.length} audit logs\n`);

    console.log('═══════════════════════════════════════════');
    console.log('✅ DATABASE SEEDING COMPLETED!\n');
    console.log('📊 Summary:');
    console.log(`   - Admin Users: 1`);
    console.log(`   - Tamil Donors: ${donors.length}`);
    console.log(`   - Donation Requests: ${requests.length}`);
    console.log(`   - Inventory Records: ${inventoryRecords.length}`);
    console.log(`   - Notifications: ${notifications.length}`);
    console.log(`   - Audit Logs: ${auditLogs.length}\n`);
    console.log('🔐 Login Credentials:');
    console.log('   Admin: admin@bdms.com / Admin@123');
    console.log('   Any Tamil Donor: [email from list] / Donor@123');
    console.log('   Example emails:');
    if (donors.length > 0) {
      console.log(`   - ${donors[0].email}`);
      console.log(`   - ${donors[Math.min(1, donors.length - 1)].email}`);
      console.log(`   - ${donors[Math.min(2, donors.length - 1)].email}`);
    }
    console.log('\n📍 All donors are from Tamil Nadu');
    console.log('═══════════════════════════════════════════\n');

    // Close database connection gracefully
    console.log('🔌 Closing database connection...');
    await mongoose.connection.close();
    console.log('✅ Database connection closed successfully\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    console.error('   Error details:', error instanceof Error ? error.message : error);
    
    // Close connection even on error
    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error('   Failed to close connection:', closeError);
    }
    
    process.exit(1);
  }
}

seedDatabase();
