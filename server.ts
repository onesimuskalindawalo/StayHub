import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- MOCK DATA ---
  let users = [
    { id: '1', fullName: 'John Resident', email: 'student@example.com', role: 'student', isActive: true },
    { id: '2', fullName: 'Admin User', email: 'admin@example.com', role: 'admin', isActive: true },
    { id: '3', fullName: 'Warden Smith', email: 'warden@example.com', role: 'warden', isActive: true },
  ];

  let hostels = [
    { id: '1', name: 'Emerald H', location: 'North Campus', description: 'Premium accommodation with modern amenities and high-speed internet.' },
    { id: '2', name: 'Sapphire Residency', location: 'Main Campus', description: 'Centralized location, close to academic blocks and student center.' },
    { id: '3', name: 'Ruby Hall', location: 'South Campus', description: 'Traditional-style hostel with large common areas and sports facilities.' },
  ];

  let rooms = [
    { id: '1', roomNumber: '101', type: 'Single', capacity: 1, pricePerMonth: 250, status: 'available', amenities: ['AC', 'Wifi'], isAvailable: true, hostelId: '1' },
    { id: '2', roomNumber: '102', type: 'Double', capacity: 2, pricePerMonth: 180, status: 'occupied', amenities: ['Wifi', 'Balcony'], isAvailable: false, hostelId: '1' },
    { id: '3', roomNumber: '205', type: 'Single', capacity: 1, pricePerMonth: 200, status: 'maintenance', amenities: ['AC'], isAvailable: false, hostelId: '1' },
    { id: '4', roomNumber: '304', type: 'Triple', capacity: 3, pricePerMonth: 120, status: 'available', amenities: ['Wifi'], isAvailable: true, hostelId: '2' },
    { id: '5', roomNumber: '401', type: 'Dorm', capacity: 6, pricePerMonth: 80, status: 'available', amenities: ['Locker'], isAvailable: true, hostelId: '2' },
  ];

  let bookings = [
    { id: '1', studentId: '1', roomId: '2', checkInDate: '2025-09-01', checkOutDate: '2026-06-15', status: 'approved' },
  ];

  let payments = [
    { id: '1', studentId: '1', amount: 250, status: 'paid', paymentDate: '2025-10-01' },
    { id: '2', studentId: '1', amount: 20, status: 'paid', paymentDate: '2025-09-24' },
  ];

  // --- API ROUTES ---

  // Auth
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (user) {
      res.json({ user, access_token: 'mock-jwt-token' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  app.post('/api/auth/register', (req, res) => {
    const newUser = { ...req.body, id: String(users.length + 1), role: 'student', isActive: true };
    users.push(newUser);
    res.json(newUser);
  });

  app.get('/api/auth/me', (req, res) => {
    // For demo, return first user if authenticated (token present)
    res.json(users[0]);
  });

  app.post('/api/auth/logout', (req, res) => {
    res.json({ message: 'Logged out' });
  });

  // Users
  app.get('/api/users', (req, res) => res.json(users));
  app.get('/api/users/:id', (req, res) => res.json(users.find(u => u.id === req.params.id)));
  app.get('/api/users/:id/fines', (req, res) => res.json([]));
  app.get('/api/users/:id/hostel', (req, res) => res.json(hostels[0]));
  app.get('/api/users/:id/reservations', (req, res) => res.json(bookings.filter(b => b.studentId === req.params.id)));

  // Hostels
  app.get('/api/hostel', (req, res) => res.json(hostels));
  app.post('/api/hostel', (req, res) => {
    const newHostel = { ...req.body, id: String(hostels.length + 1) };
    hostels.push(newHostel);
    res.json(newHostel);
  });

  // Rooms
  app.get('/api/rooms', (req, res) => res.json(rooms));
  app.get('/api/rooms/hostel/:hostelId', (req, res) => res.json(rooms.filter(r => r.hostelId === req.params.hostelId)));
  app.get('/api/rooms/:id', (req, res) => res.json(rooms.find(r => r.id === req.params.id)));
  app.put('/api/rooms/:id/status', (req, res) => {
    const room = rooms.find(r => r.id === req.params.id);
    if (room) {
      room.status = req.body.status;
      res.json(room);
    } else res.status(404).json({ message: 'Room not found' });
  });

  // Payments
  app.get('/api/payments', (req, res) => res.json(payments));
  app.post('/api/payments', (req, res) => {
    const newPayment = { ...req.body, id: String(payments.length + 1), status: 'paid', paymentDate: new Date().toISOString() };
    payments.push(newPayment);
    res.json(newPayment);
  });

  // Bookings
  app.get('/api/bookings', (req, res) => res.json(bookings));
  app.post('/api/bookings', (req, res) => {
    const newBooking = { ...req.body, id: String(bookings.length + 1), status: 'pending' };
    bookings.push(newBooking);
    res.json(newBooking);
  });
  app.post('/api/bookings/:id/approve', (req, res) => {
    const booking = bookings.find(b => b.id === req.params.id);
    if (booking) {
      booking.status = 'approved';
      res.json(booking);
    } else res.status(404).json({ message: 'Booking not found' });
  });

  // Reports
  app.get('/api/reports/occupancy', (req, res) => res.json({
    occupied: rooms.filter(r => r.status === 'occupied').length,
    available: rooms.filter(r => r.status === 'available').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
  }));
  app.get('/api/reports/revenue', (req, res) => res.json([
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
  ]));

  // Notifications
  app.get('/api/notifications', (req, res) => res.json([]));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
