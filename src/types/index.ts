export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: 'driver' | 'student';
  rating: number;
  avatar?: string;
  createdAt: Date;
}

export interface Driver extends User {
  type: 'driver';
  vehicle: {
    model: string;
    plate: string;
    capacity: number;
    year: number;
  };
  license: {
    number: string;
    expiryDate: Date;
  };
  routes: Route[];
}

export interface Student extends User {
  type: 'student';
  university: string;
  bookings: Booking[];
}

export interface Route {
  id: string;
  driverId: string;
  name: string;
  startLocation: Location;
  endLocation: Location;
  stops: Stop[];
  schedule: {
    departure: string;
    arrival: string;
    days: string[];
  };
  capacity: number;
  availableSeats: number;
  price: number;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface Stop {
  id: string;
  name: string;
  location: Location;
  time: string;
  order: number;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Booking {
  id: string;
  studentId: string;
  routeId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  pickupStop: Stop;
  dropoffStop: Stop;
  bookingDate: Date;
  travelDate: Date;
  price: number;
}

export interface Review {
  id: string;
  reviewerId: string;
  revieweeId: string;
  bookingId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}