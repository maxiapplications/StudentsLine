import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { AuthModal } from './components/Auth/AuthModal';
import { HomePage } from './components/Home/HomePage';
import { StudentDashboard } from './components/Student/StudentDashboard';
import { DriverDashboard } from './components/Driver/DriverDashboard';
import { useAuth } from './hooks/useAuth';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { currentUser, isLoading, login, register, logout } = useAuth();

  const handleLogin = async (phone: string, password: string, userType: 'driver' | 'student') => {
    await login(phone, password, userType);
    setShowAuthModal(false);
  };

  const handleRegister = async (userData: any) => {
    await register(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={currentUser} onLogout={handleLogout} />
      
      <main>
        {!currentUser ? (
          <HomePage onLogin={() => setShowAuthModal(true)} />
        ) : currentUser.type === 'student' ? (
          <StudentDashboard />
        ) : (
          <DriverDashboard />
        )}
      </main>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-center">جاري التحميل...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;