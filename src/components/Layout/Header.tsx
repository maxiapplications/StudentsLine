import React from 'react';
import { Car, User, LogOut, Bell } from 'lucide-react';
import { User as UserType } from '../../types';

interface HeaderProps {
  user?: UserType | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-reverse space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Car className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">نقلي</h1>
              <p className="text-sm text-gray-500">منصة النقل المشترك</p>
            </div>
          </div>

          {/* User Menu */}
          {user && (
            <div className="flex items-center space-x-reverse space-x-4">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">
                    {user.type === 'driver' ? 'سائق' : 'طالب'}
                  </p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
              >
                <LogOut className="h-5 w-5 text-red-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};