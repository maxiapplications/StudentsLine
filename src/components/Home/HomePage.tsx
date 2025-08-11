import React, { useState } from 'react';
import { Car, GraduationCap, MapPin, Users, Star, Clock, Shield, Smartphone } from 'lucide-react';

interface HomePageProps {
  onLogin: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onLogin }) => {
  const [userTypeHover, setUserTypeHover] = useState<'driver' | 'student' | null>(null);

  const features = [
    {
      icon: MapPin,
      title: 'مسارات مرنة',
      description: 'اختر المسار الأنسب لك مع إمكانية التوقف في عدة محطات'
    },
    {
      icon: Users,
      title: 'مجتمع آمن',
      description: 'تواصل مع سائقين وطلاب موثوقين مع نظام تقييم شامل'
    },
    {
      icon: Clock,
      title: 'مواعيد مضبوطة',
      description: 'جدولة دقيقة للرحلات مع إشعارات فورية لأي تغيير'
    },
    {
      icon: Shield,
      title: 'حماية كاملة',
      description: 'بياناتك وأموالك محمية بأعلى معايير الأمان الرقمي'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-4 rounded-2xl shadow-lg">
              <Car className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            مرحباً بك في <span className="text-blue-600">نقلي</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            منصة النقل المشترك الأولى للطلاب في المملكة العربية السعودية. 
            اربط بين السائقين والطلاب بطريقة آمنة ومريحة واقتصادية.
          </p>

          {/* User Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div 
              className={`group p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                userTypeHover === 'student' 
                  ? 'border-blue-500 bg-blue-50 shadow-xl scale-105' 
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
              }`}
              onMouseEnter={() => setUserTypeHover('student')}
              onMouseLeave={() => setUserTypeHover(null)}
              onClick={onLogin}
            >
              <div className="bg-blue-100 group-hover:bg-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                <GraduationCap className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">أنا طالب</h3>
              <p className="text-gray-600 leading-relaxed">
                ابحث عن رحلات مريحة وآمنة للوصول إلى جامعتك يومياً. 
                وفر المال والوقت مع سائقين موثوقين.
              </p>
              <div className="mt-6 text-blue-600 font-medium">
                ابدأ البحث عن رحلتك ←
              </div>
            </div>

            <div 
              className={`group p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                userTypeHover === 'driver' 
                  ? 'border-green-500 bg-green-50 shadow-xl scale-105' 
                  : 'border-gray-200 hover:border-green-300 hover:shadow-lg'
              }`}
              onMouseEnter={() => setUserTypeHover('driver')}
              onMouseLeave={() => setUserTypeHover(null)}
              onClick={onLogin}
            >
              <div className="bg-green-100 group-hover:bg-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                <Car className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">أنا سائق</h3>
              <p className="text-gray-600 leading-relaxed">
                حول رحلتك اليومية إلى مصدر دخل إضافي. 
                اربح المال مع الحفاظ على جدولك اليومي.
              </p>
              <div className="mt-6 text-green-600 font-medium">
                ابدأ الربح من سيارتك ←
              </div>
            </div>
          </div>

          <button
            onClick={onLogin}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ابدأ رحلتك الآن
          </button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-blue-100 to-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">نقلي بالأرقام</h2>
            <p className="text-xl text-gray-600">الثقة التي بناها آلاف المستخدمين</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600 text-lg">طالب نشط</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">450+</div>
              <div className="text-gray-600 text-lg">سائق موثوق</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">15,000+</div>
              <div className="text-gray-600 text-lg">رحلة مكتملة</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center gap-1 mb-2">
                <span className="text-5xl font-bold text-yellow-600">4.9</span>
                <Star className="h-8 w-8 text-yellow-500 fill-current" />
              </div>
              <div className="text-gray-600 text-lg">تقييم المنصة</div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">كيف يعمل نقلي؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">١. سجل واختر</h3>
              <p className="text-gray-600 leading-relaxed">
                أنشئ حسابك واختر نوع الخدمة - طالب أو سائق - وأكمل ملفك الشخصي
              </p>
              {/* Connection Line */}
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-green-300 z-0" style={{ width: 'calc(100% - 2.5rem)' }} />
            </div>

            <div className="relative">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">٢. ابحث أو أضف</h3>
              <p className="text-gray-600 leading-relaxed">
                الطلاب: ابحثوا عن الرحلات المناسبة | السائقون: أضيفوا خطوطكم ومساراتكم
              </p>
              {/* Connection Line */}
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-green-300 to-orange-300 z-0" style={{ width: 'calc(100% - 2.5rem)' }} />
            </div>

            <div className="relative">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">٣. اربط واستمتع</h3>
              <p className="text-gray-600 leading-relaxed">
                تواصل بأمان، احجز مقعدك، واستمتع برحلة مريحة وآمنة كل يوم
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">جاهز لتجربة نقل أفضل؟</h2>
          <p className="text-xl mb-8 opacity-90">
            انضم إلى آلاف الطلاب والسائقين الذين يثقون بنقلي يومياً
          </p>
          <button
            onClick={onLogin}
            className="bg-white text-blue-600 hover:text-blue-700 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            ابدأ الآن مجاناً
          </button>
        </div>
      </div>
    </div>
  );
};