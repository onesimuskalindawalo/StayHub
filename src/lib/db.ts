// Mock database state for Next.js API routes
export let users = [
  { id: '1', fullName: 'John Resident', email: 'student@example.com', role: 'student', isActive: true },
  { id: '2', fullName: 'Admin User', email: 'admin@example.com', role: 'admin', isActive: true },
  { id: '3', fullName: 'Warden Smith', email: 'warden@example.com', role: 'warden', isActive: true },
  { id: '4', fullName: 'Admin', email: 'admin@stayhub.com', role: 'admin', isActive: true },
  { id: '5', fullName: 'Warden', email: 'warden@stayhub.com', role: 'warden', isActive: true },
  { id: '6', fullName: 'Student', email: 'student@stayhub.com', role: 'student', isActive: true },
];

export let hostels = [
  { id: '1', name: 'Emerald H', location: 'North Campus', description: 'Premium accommodation with modern amenities and high-speed internet.' },
  { id: '2', name: 'Sapphire Residency', location: 'Main Campus', description: 'Centralized location, close to academic blocks and student center.' },
  { id: '3', name: 'Ruby Hall', location: 'South Campus', description: 'Traditional-style hostel with large common areas and sports facilities.' },
];

export let rooms = [
  { id: '1', roomNumber: '101', type: 'Single', capacity: 1, pricePerMonth: 250, status: 'available', amenities: ['AC', 'Wifi'], isAvailable: true, hostelId: '1' },
  { id: '2', roomNumber: '102', type: 'Double', capacity: 2, pricePerMonth: 180, status: 'occupied', amenities: ['Wifi', 'Balcony'], isAvailable: false, hostelId: '1' },
  { id: '3', roomNumber: '205', type: 'Single', capacity: 1, pricePerMonth: 200, status: 'maintenance', amenities: ['AC'], isAvailable: false, hostelId: '1' },
  { id: '4', roomNumber: '304', type: 'Triple', capacity: 3, pricePerMonth: 120, status: 'available', amenities: ['Wifi'], isAvailable: true, hostelId: '2' },
  { id: '5', roomNumber: '401', type: 'Dorm', capacity: 6, pricePerMonth: 80, status: 'available', amenities: ['Locker'], isAvailable: true, hostelId: '2' },
];

export let bookings = [
  { id: '1', userId: '6', roomId: '2', checkInDate: '2025-09-01', checkOutDate: '2026-06-15', status: 'approved' },
];

export let payments = [
  { id: '1', userId: '6', amount: 250, status: 'paid', paymentDate: '2025-10-01' },
  { id: '2', userId: '6', amount: 20, status: 'paid', paymentDate: '2025-09-24' },
];
