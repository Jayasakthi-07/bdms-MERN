// Blood Groups
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;
export type BloodGroup = typeof BLOOD_GROUPS[number];

// Request Status
export const REQUEST_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export type RequestStatus = typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS];

// Notification Types
export const NOTIFICATION_TYPES = {
  APPT: 'APPT',
  REMINDER: 'REMINDER',
  ALERT: 'ALERT',
  GENERAL: 'GENERAL',
} as const;

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

// User Roles
export const USER_ROLES = {
  DONOR: 'DONOR',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Tamil Nadu Districts (Major cities)
export const TAMIL_NADU_DISTRICTS = [
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Trichy',
  'Salem',
  'Tirunelveli',
  'Erode',
  'Vellore',
  'Thanjavur',
  'Dindigul',
  'Tiruppur',
  'Kanchipuram',
  'Nagercoil',
  'Karur',
  'Hosur',
  'Tiruvallur',
  'Cuddalore',
  'Nagapattinam',
  'Thoothukudi',
  'Ramanathapuram',
  'Sivaganga',
  'Virudhunagar',
  'Theni',
  'Krishnagiri',
  'Dharmapuri',
  'Namakkal',
  'Pudukkottai',
  'Ariyalur',
  'Perambalur',
  'Villupuram',
  'Tiruvannamalai',
  'Nilgiris',
] as const;

// Legacy export for backward compatibility (maps to Tamil Nadu)
export const INDIAN_STATES = ['Tamil Nadu'] as const;

// Tamil Nadu Blood Donation Centers
export const DONATION_CENTERS = [
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
] as const;

// Eligibility Criteria
export const ELIGIBILITY_CRITERIA = {
  MINIMUM_AGE: 18,
  MAXIMUM_AGE: 65,
  MINIMUM_WEIGHT_KG: 50,
  DONATION_INTERVAL_DAYS: 90, // 3 months
} as const;

// API Endpoints (for reference)
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USER: {
    PROFILE: '/users/me',
    UPDATE_PROFILE: '/users/me',
    CHANGE_PASSWORD: '/users/me/change-password',
    HISTORY: '/users/me/history',
    ELIGIBILITY: '/users/me/eligibility',
    DELETE: '/users/me',
  },
  DONATION: {
    CREATE: '/requests',
    MY_REQUESTS: '/requests',
    GET_BY_ID: '/requests/:id',
    CANCEL: '/requests/:id/cancel',
  },
  ADMIN: {
    DONORS: '/admin/donors',
    DONOR_BY_ID: '/admin/donors/:id',
    TOGGLE_DONOR_STATUS: '/admin/donors/:id/toggle-status',
    REQUESTS: '/admin/requests',
    APPROVE_REQUEST: '/admin/requests/:id/approve',
    REJECT_REQUEST: '/admin/requests/:id/reject',
    COMPLETE_REQUEST: '/admin/requests/:id/complete',
    AUDIT_LOGS: '/admin/audit-logs',
  },
  INVENTORY: {
    ALL: '/inventory',
    BY_ID: '/inventory/:id',
    CREATE: '/inventory',
    UPDATE: '/inventory/:id',
    DELETE: '/inventory/:id',
    SUMMARY: '/inventory/summary',
    LOW_STOCK: '/inventory/low-stock',
  },
  NOTIFICATIONS: {
    ALL: '/notifications',
    UNREAD_COUNT: '/notifications/unread-count',
    MARK_READ: '/notifications/:id/read',
    MARK_ALL_READ: '/notifications/mark-all-read',
    DELETE: '/notifications/:id',
  },
  METRICS: {
    SUMMARY: '/metrics/summary',
    BLOOD_GROUP_DISTRIBUTION: '/metrics/blood-group-distribution',
    INVENTORY_BY_BLOOD_GROUP: '/metrics/inventory-by-blood-group',
    MONTHLY_DONATIONS: '/metrics/monthly-donations',
    REQUEST_STATUS: '/metrics/request-status',
    FULFILLMENT_RATE: '/metrics/fulfillment-rate',
    AVERAGE_LEAD_TIME: '/metrics/average-lead-time',
  },
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_TIME: 'MMM dd, yyyy hh:mm a',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  INPUT_DATE: 'yyyy-MM-dd',
  INPUT_DATETIME: "yyyy-MM-dd'T'HH:mm",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 5,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
} as const;

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#667eea',
  SECONDARY: '#764ba2',
  SUCCESS: '#10b981',
  ERROR: '#ef4444',
  WARNING: '#f59e0b',
  INFO: '#3b82f6',
  PURPLE: '#8b5cf6',
  PINK: '#ec4899',
} as const;

// Toast Duration
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000,
} as const;
