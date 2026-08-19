import React from 'react';
import { NotificationItem, ScreenType } from '../../types';
import {
  Building2,
  TrendingDown,
  Megaphone,
  CheckCircle2,
  Bell,
  CheckCheck,
  Trash2
} from 'lucide-react';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  onNotificationClick: (notif: NotificationItem) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onMarkAllAsRead,
  onClearNotifications,
  onNotificationClick
}) => {
  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'match':
        return <Building2 className="w-6 h-6 text-[#00236e]" />;
      case 'price':
        return <TrendingDown className="w-6 h-6 text-[#755b00]" />;
      case 'news':
        return <Megaphone className="w-6 h-6 text-[#ba1a1a]" />;
      case 'verification':
        return <CheckCircle2 className="w-6 h-6 text-[#1E9E6A]" />;
      default:
        return <Bell className="w-6 h-6 text-[#00236e]" />;
    }
  };

  return (
    <main className="px-4 pt-4 pb-12 max-w-2xl mx-auto font-['Cairo',sans-serif]">
      {/* Header with actions */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-[#00236e]">الإشعارات</h2>
        <div className="flex items-center gap-2">
          {notifications.some((n) => !n.read) && (
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-bold text-[#00236e] bg-[#e0e8ff] hover:bg-[#DCE9F7] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              تحديد الكل كمقروء
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={onClearNotifications}
              className="text-xs text-[#444651] hover:text-[#ba1a1a] p-1.5 rounded-lg transition-colors cursor-pointer"
              title="مسح الكل"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <div className="flex flex-col gap-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onNotificationClick(item)}
              className={`bg-white rounded-2xl p-4.5 shadow-xs border transition-all cursor-pointer flex items-start gap-4 hover:bg-[#F2F7FD]/60 ${
                item.read
                  ? 'border-[#E3EAF3] opacity-80'
                  : 'border-[#00236e]/30 bg-white shadow-sm ring-1 ring-[#00236e]/10'
              }`}
            >
              <div
                className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${item.iconBg}`}
              >
                {getIcon(item.type)}
              </div>

              <div className="flex-1 text-right">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm text-[#0b1b37] flex items-center gap-1.5">
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#00236e]"></span>
                    )}
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-[#444651] whitespace-nowrap mr-2">
                    {item.timeAgo}
                  </span>
                </div>
                <p className="text-xs text-[#444651] leading-relaxed">{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#F5F8FC] rounded-full mx-auto flex items-center justify-center text-[#757683] mb-3">
            <Bell className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-base text-[#0b1b37]">لا توجد إشعارات حالياً</h3>
          <p className="text-xs text-[#444651] mt-1">
            سنخطرك بأحدث العقارات المطابقة وتغيرات الأسعار أولاً بأول.
          </p>
        </div>
      )}
    </main>
  );
};
