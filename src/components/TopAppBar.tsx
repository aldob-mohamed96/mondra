import React from 'react';
import { ScreenType } from '../types';
import { Bell, Menu, ArrowRight, X } from 'lucide-react';

interface TopAppBarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenDrawer: () => void;
  unreadCount: number;
  onBack?: () => void;
  showBack?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentScreen,
  onNavigate,
  onOpenDrawer,
  unreadCount,
  onBack,
  showBack
}) => {
  return (
    <header className="w-full top-0 sticky bg-[#F5F8FC]/95 backdrop-blur-md z-40 border-b border-[#E3EAF3] shadow-xs">
      <div className="flex flex-row-reverse justify-between items-center px-4 h-14 w-full max-w-4xl mx-auto">
        {/* Left Icon: Menu Drawer or Close/Back */}
        <div className="flex items-center gap-1">
          {showBack ? (
            <button
              onClick={onBack}
              className="text-[#00236e] hover:bg-[#DCE9F7] p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
              title="رجوع"
              aria-label="رجوع"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onOpenDrawer}
              className="text-[#444651] hover:bg-[#F2F7FD] hover:text-[#00236e] p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
              title="القائمة"
              aria-label="القائمة"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Center: Brand Title */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer group transition-transform active:scale-95"
        >
          <div className="w-7 h-7 rounded-lg bg-[#00236e] text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-[#1b3a8c]">
            M
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#00236e]">
            Mondera
          </span>
          <span className="text-[11px] font-bold text-[#755b00] bg-[#FDF4D8] px-1.5 py-0.5 rounded-sm hidden sm:inline-block">
            قنا والصعيد
          </span>
        </button>

        {/* Right Icon: Notification Bell */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onNavigate('notifications')}
            className={`p-2 rounded-full transition-colors relative flex items-center justify-center cursor-pointer ${
              currentScreen === 'notifications'
                ? 'bg-[#00236e] text-white'
                : 'text-[#444651] hover:bg-[#F2F7FD] hover:text-[#00236e]'
            }`}
            title="الإشعارات"
            aria-label="الإشعارات"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#ba1a1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
