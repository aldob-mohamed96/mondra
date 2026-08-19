import React from 'react';
import { ScreenType } from '../types';
import { Home, Newspaper, Building2, Paintbrush, MoreHorizontal } from 'lucide-react';

interface BottomNavBarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  savedCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
  savedCount = 0
}) => {
  const isHomeActive = currentScreen === 'home';
  const isNewsActive = currentScreen === 'news';
  const isPropertiesActive = currentScreen === 'properties' || currentScreen === 'comparison';
  const isFinishingActive = currentScreen === 'finishing';
  const isMoreActive = [
    'more',
    'eligibility',
    'expats',
    'favorites',
    'add-listing',
    'notifications',
    'interests'
  ].includes(currentScreen);

  return (
    <nav className="fixed bottom-0 w-full z-50 flex flex-row-reverse justify-around items-center h-[72px] px-2 bg-[#ffffff] shadow-[0_-2px_15px_rgba(0,35,110,0.08)] border-t border-[#E3EAF3] rounded-t-2xl max-w-4xl left-1/2 -translate-x-1/2">
      {/* 1. الرئيسية */}
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
          isHomeActive
            ? 'text-[#00236e] font-bold scale-105'
            : 'text-[#444651] hover:text-[#00236e] hover:bg-[#F2F7FD]'
        }`}
      >
        <Home className={`w-5 h-5 mb-1 ${isHomeActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
        <span className="text-[11px] font-medium leading-none">الرئيسية</span>
      </button>

      {/* 2. الأخبار */}
      <button
        onClick={() => onNavigate('news')}
        className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
          isNewsActive
            ? 'text-[#00236e] font-bold scale-105'
            : 'text-[#444651] hover:text-[#00236e] hover:bg-[#F2F7FD]'
        }`}
      >
        <Newspaper className={`w-5 h-5 mb-1 ${isNewsActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
        <span className="text-[11px] font-medium leading-none">الأخبار</span>
      </button>

      {/* 3. العقارات */}
      <button
        onClick={() => onNavigate('properties')}
        className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
          isPropertiesActive
            ? 'text-[#00236e] font-bold scale-105'
            : 'text-[#444651] hover:text-[#00236e] hover:bg-[#F2F7FD]'
        }`}
      >
        <Building2 className={`w-5 h-5 mb-1 ${isPropertiesActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
        <span className="text-[11px] font-medium leading-none">العقارات</span>
      </button>

      {/* 4. التشطيب */}
      <button
        onClick={() => onNavigate('finishing')}
        className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
          isFinishingActive
            ? 'text-[#00236e] font-bold scale-105'
            : 'text-[#444651] hover:text-[#00236e] hover:bg-[#F2F7FD]'
        }`}
      >
        <Paintbrush className={`w-5 h-5 mb-1 ${isFinishingActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
        <span className="text-[11px] font-medium leading-none">التشطيب</span>
      </button>

      {/* 5. المزيد */}
      <button
        onClick={() => onNavigate('more')}
        className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
          isMoreActive
            ? 'text-[#00236e] font-bold scale-105'
            : 'text-[#444651] hover:text-[#00236e] hover:bg-[#F2F7FD]'
        }`}
      >
        <MoreHorizontal className={`w-5 h-5 mb-1 ${isMoreActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
        <span className="text-[11px] font-medium leading-none">المزيد</span>
        {savedCount > 0 && (
          <span className="absolute top-1 right-2 w-2 h-2 bg-[#fdcc33] rounded-full"></span>
        )}
      </button>
    </nav>
  );
};
