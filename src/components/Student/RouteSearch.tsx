import React, { useState } from 'react';
import { Search, MapPin, Clock, Users, Star, Car } from 'lucide-react';
import { Route } from '../../types';

interface RouteSearchProps {
  onSearch: (criteria: any) => void;
  routes: Route[];
}

export const RouteSearch: React.FC<RouteSearchProps> = ({ onSearch, routes }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    from: '',
    to: '',
    time: '',
    maxPrice: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">البحث عن رحلة</h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                من
              </label>
              <div className="relative">
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchCriteria.from}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, from: e.target.value }))}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="المنطقة أو الحي"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                إلى
              </label>
              <div className="relative">
                <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchCriteria.to}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="الوجهة"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وقت الانطلاق
              </label>
              <div className="relative">
                <Clock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  value={searchCriteria.time}
                  onChange={(e) => setSearchCriteria(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الحد الأقصى للسعر (ريال)
              </label>
              <input
                type="number"
                value={searchCriteria.maxPrice}
                onChange={(e) => setSearchCriteria(prev => ({ ...prev, maxPrice: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="مثال: 50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            البحث عن الرحلات
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          النتائج المتاحة ({routes.length} رحلة)
        </h3>
        
        {routes.map((route) => (
          <div key={route.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{route.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{route.startLocation.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(route.schedule.departure)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{route.availableSeats} مقعد متاح</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">4.5</span>
                  </div>
                  <span className="text-sm text-gray-500">تقييم السائق</span>
                </div>
              </div>
              
              <div className="text-left">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {route.price} ريال
                </div>
                <div className="text-sm text-gray-500">للرحلة الواحدة</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Car className="h-4 w-4" />
                <span>أيام السير: {route.schedule.days.join(', ')}</span>
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors">
                حجز المقعد
              </button>
            </div>
          </div>
        ))}
        
        {routes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <p className="text-gray-600">لا توجد رحلات متاحة حالياً</p>
            <p className="text-sm text-gray-500 mt-2">جرب البحث بمعايير مختلفة</p>
          </div>
        )}
      </div>
    </div>
  );
};