/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
  WARDEN = 'warden',
}

export enum RoomType {
  SINGLE = 'single',
  DOUBLE = 'double',
  TRIPLE = 'triple',
  DORM = 'dorm',
}

export enum RoomStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  MAINTENANCE = 'maintenance',
}

export enum BookingStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface Hostel {
  id: string;
  name: string;
  location: string;
  description: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  type: RoomType;
  capacity: number;
  pricePerMonth: number;
  status: RoomStatus;
  amenities: string[];
  isAvailable: boolean;
  hostelId: string;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  status: BookingStatus;
  checkInDate: string;
  checkOutDate: string;
  createdAt: string;
  room?: Room;
  user?: User;
}

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  paymentDate?: string;
  userId: string;
  bookingId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  userId: string;
}
