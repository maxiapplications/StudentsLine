import { useState, useCallback } from 'react';
import { User, Driver, Student } from '../types';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (phone: string, password: string, userType: 'driver' | 'student') => {
    setIsLoading(true);
    // محاكاة API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: `${userType}_${Date.now()}`,
      name: userType === 'driver' ? 'أحمد محمود' : 'فاطمة علي',
      phone,
      email: `${userType}@example.com`,
      type: userType,
      rating: 4.5,
      createdAt: new Date(),
    };

    setCurrentUser(mockUser);
    setIsLoading(false);
    return mockUser;
  }, []);

  const register = useCallback(async (userData: Partial<User>) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `${userData.type}_${Date.now()}`,
      name: userData.name || '',
      phone: userData.phone || '',
      email: userData.email || '',
      type: userData.type || 'student',
      rating: 0,
      createdAt: new Date(),
    };

    setCurrentUser(newUser);
    setIsLoading(false);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return {
    currentUser,
    isLoading,
    login,
    register,
    logout,
  };
};