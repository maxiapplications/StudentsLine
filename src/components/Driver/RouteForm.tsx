import React, { useState } from 'react';
import { MapPin, Clock, Users, DollarSign, Calendar, Plus, Trash2 } from 'lucide-react';
import { Route, Stop, Location } from '../../types';

interface RouteFormProps {
  route?: Route;
  onSave: (routeData: Partial<Route>) => void;
  onCancel: () => void;
}

export const RouteForm: React.FC<RouteFormProps> = ({ route, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: route?.name || '',
    startLocation: route?.startLocation || { lat: 24.7136, lng: 46.6753, address: '' },
    endLocation: route?.endLocation || { lat: 24.7219, lng: 46.6147, address: '' },
    stops: route?.stops || [],
    departureTime: route?.schedule.departure || '',
    arrivalTime: route?.schedule.arrival || '',
    days: route?.schedule.days || [],
    capacity: route?.capacity || 4,
    price: route?.price || 0,
  });

  const weekDays = [
    'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
  ];

  const addStop = () => {
    const newStop: Stop = {
      id: `stop_${Date.now()}`,
      name: '',
      location: { lat: 24.7136, lng: 46.6753, address: '' },
      time: '',
      order: formData.stops.length + 1,
    };
    setFormData(prev => ({ ...prev, stops: [...prev.stops, newStop] }));
  };

  const removeStop = (stopId: string) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.filter(stop => stop.id !== stopId)
    }));
  };

  const updateStop = (stopId: string, updates: Partial<Stop>) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.map(stop => 
        stop.id === stopId ? { ...stop, ...updates } : stop
      )
    }));
  };

  const toggleDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const routeData: Partial<Route> = {
      name: formData.name,
      startLocation: formData.startLocation,
      endLocation: formData.endLocation,
      stops: formData.stops,
      schedule: {
        departure: formData.departureTime,
        arrival: formData.arrivalTime,
        days: formData.days,
      },
      capacity: formData.capacity,
      price: formData.price,
      availableSeats: formData.capacity, // Initially all seats are available
      status: 'active',
    };

    onSave(routeData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {route ? 'تعديل الخط' : 'إضافة خط جديد'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Route Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اسم الخط
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="مثال: خط جامعة الملك سعود - العليا"
          />
        </div>

        {/* Start and End Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نقطة الانطلاق
            </label>
            <div className="relative">
              <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.startLocation.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  startLocation: { ...prev.startLocation, address: e.target.value }
                }))}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="العنوان الكامل"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الوجهة النهائية
            </label>
            <div className="relative">
              <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.endLocation.address}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  endLocation: { ...prev.endLocation, address: e.target.value }
                }))}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="العنوان الكامل"
              />
            </div>
          </div>
        </div>

        {/* Stops */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-medium text-gray-700">
              المحطات الوسطى
            </label>
            <button
              type="button"
              onClick={addStop}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="h-4 w-4" />
              إضافة محطة
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.stops.map((stop, index) => (
              <div key={stop.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <input
                    type="text"
                    placeholder="اسم المحطة"
                    value={stop.name}
                    onChange={(e) => updateStop(stop.id, { name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="العنوان"
                    value={stop.location.address}
                    onChange={(e) => updateStop(stop.id, {
                      location: { ...stop.location, address: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={stop.time}
                    onChange={(e) => updateStop(stop.id, { time: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeStop(stop.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وقت الانطلاق
            </label>
            <div className="relative">
              <Clock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="time"
                required
                value={formData.departureTime}
                onChange={(e) => setFormData(prev => ({ ...prev, departureTime: e.target.value }))}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وقت الوصول
            </label>
            <div className="relative">
              <Clock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="time"
                required
                value={formData.arrivalTime}
                onChange={(e) => setFormData(prev => ({ ...prev, arrivalTime: e.target.value }))}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Working Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            أيام العمل
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {weekDays.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.days.includes(day)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Capacity and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عدد المقاعد
            </label>
            <div className="relative">
              <Users className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="1"
                max="8"
                required
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="4"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              سعر الرحلة (ريال)
            </label>
            <div className="relative">
              <DollarSign className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="50"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {route ? 'تحديث الخط' : 'إضافة الخط'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};