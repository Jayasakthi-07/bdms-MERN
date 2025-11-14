import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config({ path: path.join(__dirname, '../../.env') });

import { connectDatabase } from '../config/database';
import { User } from '../models/User.model';
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

// Tamil first names (common Tamil names)
const tamilFirstNames = [
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
const tamilLastNames = [
  'Iyer', 'Pillai', 'Menon', 'Nair', 'Reddy', 'Gounder', 'Thevar', 'Nadar',
  'Mudaliar', 'Chettiar', 'Pattar', 'Asari', 'Reddy', 'Naidu', 'Vanniyar', 'Kallar',
  'Maravar', 'Agarwal', 'Kamraj', 'Raman', 'Krishnan', 'Subramanian', 'Venkatesan', 'Natarajan',
  'Srinivasan', 'Ramanathan', 'Lakshmanan', 'Balasubramanian', 'Gopalan', 'Krishnamoorthy', 'Muthu', 'Selvam',
  'Kumar', 'Raj', 'Murugan', 'Shiva', 'Ganesh', 'Krishna', 'Vishnu', 'Anand',
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Tamil street names
const tamilStreetNames = [
  'Anna Nagar', 'T. Nagar', 'Adyar', 'Mylapore', 'Velachery', 'Tambaram',
  'Chrompet', 'Pallavaram', 'Porur', 'Ambattur', 'Avadi', 'Guindy',
  'Saidapet', 'Egmore', 'Triplicane', 'Royapuram', 'Perambur', 'Villivakkam',
  'KK Nagar', 'Ashok Nagar', 'Kilpauk', 'Aminjikarai', 'Purasawalkam', 'Washermanpet',
];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomPhone(): string {
  const prefixes = ['98', '97', '96', '95', '94', '93', '92', '91', '90', '89', '88', '87'];
  return randomElement(prefixes) + Math.floor(10000000 + Math.random() * 90000000);
}

async function seedTamilDonors() {
  try {
    console.log('🌱 Starting Tamil donors seeding...\n');

    await connectDatabase();

    // Check if admin exists, if not create one
    let admin = await User.findOne({ role: 'ADMIN' });
    if (!admin) {
      console.log('👤 Creating admin user...');
      const adminPassword = await hashPassword('Admin@123');
      admin = await User.create({
        role: 'ADMIN',
        name: 'Admin User',
        email: 'admin@bdms.com',
        passwordHash: adminPassword,
        phone: '9876543210',
        isActive: true,
      });
      console.log('✅ Admin created: admin@bdms.com / Admin@123\n');
    } else {
      console.log('✅ Admin user already exists\n');
    }

    // Create 130 Tamil Donors
    console.log('👥 Creating 130 Tamil donors...');
    const donors = [];
    const donorPassword = await hashPassword('Donor@123');
    const existingEmails = new Set<string>();

    // Get existing emails to avoid duplicates
    const existingUsers = await User.find({}, { email: 1 });
    existingUsers.forEach(user => existingEmails.add(user.email.toLowerCase()));

    for (let i = 0; i < 130; i++) {
      const location = randomElement(tamilCities);
      const bloodGroup = randomElement(bloodGroups);
      const firstName = randomElement(tamilFirstNames);
      const lastName = randomElement(tamilLastNames);
      const dob = randomDate(new Date(1970, 0, 1), new Date(2002, 11, 31));
      
      // Generate unique email
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
        if ((i + 1) % 10 === 0) {
          console.log(`   Created ${i + 1}/130 donors...`);
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

    console.log(`\n✅ Successfully created ${donors.length} Tamil donors (Password: Donor@123)\n`);

    console.log('═══════════════════════════════════════════');
    console.log('✅ TAMIL DONORS SEEDING COMPLETED!\n');
    console.log('📊 Summary:');
    console.log(`   - Tamil Donors Added: ${donors.length}`);
    console.log(`   - Cities: ${tamilCities.map(c => c.city).join(', ')}`);
    console.log(`   - Total Donors in Database: ${await User.countDocuments({ role: 'DONOR' })}\n`);
    console.log('🔐 Login Credentials:');
    console.log('   Any Tamil Donor: [email from list] / Donor@123');
    console.log('   Example emails:');
    if (donors.length > 0) {
      console.log(`   - ${donors[0].email}`);
      console.log(`   - ${donors[Math.min(1, donors.length - 1)].email}`);
      console.log(`   - ${donors[Math.min(2, donors.length - 1)].email}`);
    }
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

seedTamilDonors();

