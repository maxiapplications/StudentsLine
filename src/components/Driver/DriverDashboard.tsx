import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, MapPin, Clock, DollarSign, Eye } from 'lucide-react';
import { RouteForm } from './RouteForm';
import { RouteMap } from '../Map/RouteMap';
import { Route } from '../../types';

const mockDriverRoutes: Route[] = [
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
  }
];

export const DriverDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'routes' | 'add-route' | 'bookings' | 'earnings'>('routes');
  const [routes, setRoutes] = useState(mockDriverRoutes);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [viewingRoute, setViewingRoute] = useState<Route | null>(null);

  const handleSaveRoute = (routeData: Partial<Route>) => {
    if (editingRoute) {
      // Update existing route
      setRoutes(prev => prev.map(route => 
        route.id === editingRoute.id 
          ? { ...route, ...routeData }
          : route
      ));
      setEditingRoute(null);
    } else {
      // Add new route
      const newRoute: Route = {
        id: `route_${Date.now()}`,
        driverId: 'current_driver',
        ...routeData,
        createdAt: new Date(),
      } as Route;
      setRoutes(prev => [...prev, newRoute]);
    }
    setActiveTab('routes');
  };

  const handleDeleteRoute = (routeId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الخط؟')) {
      setRoutes(prev => prev.filter(route => route.id !== routeId));
    }
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم السائق</h1>
        <p className="text-gray-600">إدارة خطوط النقل والحجوزات</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">إجمالي الخطوط</p>
              <p className="text-2xl font-bold text-gray-900">{routes.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">المقاعد المحجوزة</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">الأرباح هذا الشهر</p>
              <p className="text-2xl font-bold text-orange-600">1,240 ريال</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">معدل التقييم</p>
              <p className="text-2xl font-bold text-yellow-600">4.8</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-reverse space-x-8">
          <button
            onClick={() => setActiveTab('routes')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'routes'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            خطوط النقل
          </button>
          <button
            onClick={() => setActiveTab('add-route')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'add-route'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            إضافة خط جديد
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            إدارة الحجوزات
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'earnings'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            الأرباح والتقارير
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'routes' && !editingRoute && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">خطوط النقل الخاصة بك</h2>
            <button
              onClick={() => setActiveTab('add-route')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              إضافة خط جديد
            </button>
          </div>

          {routes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {routes.map((route) => (
                <div key={route.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{route.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{route.startLocation.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(route.schedule.departure)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{route.availableSeats}/{route.capacity} متاح</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          <span>{route.price} ريال</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        أيام العمل: {route.schedule.days.join(', ')}
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      route.status === 'active' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {route.status === 'active' ? 'نشط' : 'غير نشط'}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      تم إنشاؤه في {route.createdAt.toLocaleDateString('ar-SA')}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewingRoute(route)}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingRoute(route)}
                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRoute(route.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">لا توجد خطوط نقل</p>
              <p className="text-sm text-gray-500 mt-2">أضف خطك الأول للبدء</p>
            </div>
          )}
        </div>
      )}

      {(activeTab === 'add-route' || editingRoute) && (
        <RouteForm
          route={editingRoute || undefined}
          onSave={handleSaveRoute}
          onCancel={() => {
            setEditingRoute(null);
            setActiveTab('routes');
          }}
        />
      )}

      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">إدارة الحجوزات</h2>
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">لا توجد حجوزات حالياً</p>
            <p className="text-sm text-gray-500 mt-2">ستظهر هنا حجوزات الطلاب</p>
          </div>
        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">الأرباح والتقارير</h2>
          <div className="text-center py-12">
            <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">لا توجد بيانات أرباح حالياً</p>
            <p className="text-sm text-gray-500 mt-2">ستظهر هنا تقارير الأرباح والإحصائيات</p>
          </div>
        </div>
      )}

      {/* Route Map Modal */}
      {viewingRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{viewingRoute.name}</h3>
                <button
                  onClick={() => setViewingRoute(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
              
              <RouteMap
                startLocation={viewingRoute.startLocation}
                endLocation={viewingRoute.endLocation}
                stops={viewingRoute.stops}
                className="h-96"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};