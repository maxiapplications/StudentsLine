import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CreditCard, Star, CheckCircle, XCircle } from 'lucide-react';
import { RouteSearch } from './RouteSearch';
import { Route, Booking } from '../../types';

const mockRoutes: Route[] = [
  {
    id: '1',
    driverId: 'driver1',
    name: 'خط جامعة الملك سعود - العليا',
    startLocation: {
      lat: 24.7136,
      lng: 46.6753,
      address: 'العليا، الرياض'
    },
    endLocation: {
      lat: 24.7219,
      lng: 46.6147,
      address: 'جامعة الملك سعود، الرياض'
    },
    stops: [
      {
        id: 's1',
        name: 'مركز الملك عبدالله المالي',
        location: { lat: 24.7195, lng: 46.6396, address: 'KAFD' },
        time: '07:15',
        order: 1
      }
    ],
    schedule: {
      departure: '07:00',
      arrival: '07:45',
      days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']
    },
    capacity: 4,
    availableSeats: 2,
    price: 45,
    status: 'active',
    createdAt: new Date()
  },
  {
    id: '2',
    driverId: 'driver2',
    name: 'خط جامعة الأميرة نورة - السليمانية',
    startLocation: {
      lat: 24.7311,
      lng: 46.7240,
      address: 'السليمانية، الرياض'
    },
    endLocation: {
      lat: 24.8412,
      lng: 46.7255,
      address: 'جامعة الأميرة نورة، الرياض'
    },
    stops: [
      {
        id: 's2',
        name: 'مجمع الرياض بارك',
        location: { lat: 24.7892, lng: 46.7255, address: 'الرياض بارك' },
        time: '07:30',
        order: 1
      }
    ],
    schedule: {
      departure: '07:15',
      arrival: '08:00',
      days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']
    },
    capacity: 5,
    availableSeats: 3,
    price: 40,
    status: 'active',
    createdAt: new Date()
  }
];

const mockBookings: Booking[] = [
  {
    id: 'b1',
    studentId: 'student1',
    routeId: '1',
    status: 'confirmed',
    pickupStop: mockRoutes[0].stops[0],
    dropoffStop: {
      id: 'end1',
      name: 'جامعة الملك سعود',
      location: mockRoutes[0].endLocation,
      time: '07:45',
      order: 2
    },
    bookingDate: new Date(),
    travelDate: new Date(),
    price: 45
  }
];

export const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'bookings' | 'history'>('search');
  const [routes, setRoutes] = useState(mockRoutes);
  const [bookings] = useState(mockBookings);

  const handleSearch = (criteria: any) => {
    // Filter routes based on search criteria
    console.log('Searching with criteria:', criteria);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'مؤكد';
      case 'pending':
        return 'قيد المراجعة';
      case 'cancelled':
        return 'ملغي';
      case 'completed':
        return 'مكتمل';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">مرحباً بك في نقلي</h1>
        <p className="text-gray-600">ابحث عن رحلتك المثالية أو راجع حجوزاتك</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-reverse space-x-8">
          <button
            onClick={() => setActiveTab('search')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'search'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            البحث عن رحلة
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            حجوزاتي الحالية
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            سجل الرحلات
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'search' && (
        <RouteSearch routes={routes} onSearch={handleSearch} />
      )}

      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">حجوزاتك الحالية</h2>
          
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const route = routes.find(r => r.id === booking.routeId);
                if (!route) return null;
                
                return (
                  <div key={booking.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{route.name}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>من: {booking.pickupStop.name}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>إلى: {booking.dropoffStop.name}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>وقت الانطلاق: {booking.pickupStop.time}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>تاريخ الرحلة: {booking.travelDate.toLocaleDateString('ar-SA')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CreditCard className="h-4 w-4" />
                        <span>السعر: {booking.price} ريال</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                          إلغاء الحجز
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm">
                          تفاصيل أكثر
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">لا توجد حجوزات حالية</p>
              <p className="text-sm text-gray-500 mt-2">ابحث عن رحلة واحجز مقعدك</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">سجل رحلاتك</h2>
          
          <div className="text-center py-12">
            <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">سجل رحلاتك فارغ</p>
            <p className="text-sm text-gray-500 mt-2">ستظهر هنا رحلاتك المكتملة</p>
          </div>
        </div>
      )}
    </div>
  );
};