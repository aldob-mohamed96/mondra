import React from 'react';
import { ScreenType } from '../types';
import {
  X,
  CheckCircle2,
  SlidersHorizontal,
  Plane,
  Paintbrush,
  Heart,
  PlusCircle,
  Bell,
  Scale,
  Building2,
  Newspaper,
  Home,
  MessageCircle,
  Sparkles,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
  savedCount: number;
  unreadCount: number;
  compareCount: number;
  onOpenInterests: () => void;
  onOpenAiAdvisor: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  savedCount,
  unreadCount,
  compareCount,
  onOpenInterests,
  onOpenAiAdvisor
}) => {
  if (!isOpen) return null;

  const navItems = [
    {
      id: 'home' as ScreenType,
      label: 'الرئيسية واستكشاف العقارات',
      icon: Home,
      color: 'text-[#00236e] bg-[#dce1ff]'
    },
    {
      id: 'eligibility' as ScreenType,
      label: 'فحص أهلية أراضي الإسكان',
      badge: 'طرح حكومي',
      badgeColor: 'bg-[#fdcc33] text-[#6f5600]',
      icon: CheckCircle2,
      color: 'text-[#00236e] bg-[#DCE9F7]'
    },
    {
      id: 'interests' as ScreenType,
      label: 'تحديد الاهتمامات (بتدور على إيه؟)',
      icon: SlidersHorizontal,
      color: 'text-[#755b00] bg-[#FDF4D8]',
      action: onOpenInterests
    },
    {
      id: 'expats' as ScreenType,
      label: 'خدمات المصريين بالخارج',
      badge: 'جولات وفحص',
      badgeColor: 'bg-[#00236e] text-white',
      icon: Plane,
      color: 'text-[#00236e] bg-[#dce1ff]'
    },
    {
      id: 'finishing' as ScreenType,
      label: 'حاسبة التشطيب وأسعار البناء',
      badge: 'تحديث يومي',
      badgeColor: 'bg-[#1E9E6A]/20 text-[#1E9E6A]',
      icon: Paintbrush,
      color: 'text-[#1E9E6A] bg-[#E8F5E9]'
    },
    {
      id: 'favorites' as ScreenType,
      label: 'المحفوظات والمفضلة',
      count: savedCount,
      icon: Heart,
      color: 'text-[#ba1a1a] bg-[#ffdad6]'
    },
    {
      id: 'comparison' as ScreenType,
      label: 'مقارنة العقارات جنباً لجنب',
      count: compareCount,
      icon: Scale,
      color: 'text-[#00236e] bg-[#dce1ff]'
    },
    {
      id: 'add-listing' as ScreenType,
      label: 'أضف إعلانك مع توثيق ميداني',
      badge: 'مجاناً',
      badgeColor: 'bg-[#1E9E6A] text-white',
      icon: PlusCircle,
      color: 'text-[#00236e] bg-[#DCE9F7]'
    },
    {
      id: 'notifications' as ScreenType,
      label: 'مركز الإشعارات والتنبيهات',
      count: unreadCount,
      icon: Bell,
      color: 'text-[#00236e] bg-[#F2F7FD]'
    },
    {
      id: 'news' as ScreenType,
      label: 'نشرة أخبار وتراخيص قنا',
      icon: Newspaper,
      color: 'text-[#444651] bg-[#F5F8FC]'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
        dir="rtl"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#E3EAF3] flex items-center justify-between bg-[#F5F8FC]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#00236e] text-white flex items-center justify-center font-bold text-lg">
              M
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#00236e]">مُندرة Mondera</h2>
              <p className="text-xs text-[#444651]">بوابتك لعقارات قنا وصعيد مصر</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#444651] hover:bg-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Advisor Banner in Drawer */}
        <div className="p-4 bg-gradient-to-r from-[#00236e] to-[#1b3a8c] text-white m-3 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold bg-[#fdcc33] text-[#6f5600] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              مستشار الذكاء الاصطناعي
            </span>
            <ShieldCheck className="w-4 h-4 text-sky-200" />
          </div>
          <h3 className="font-bold text-sm mb-1">مستشار مندرة الذكي</h3>
          <p className="text-xs text-sky-100 mb-3 leading-relaxed">
            استشر الذكاء الاصطناعي في أسعار متر الأراضي والشقق وتراخيص البناء في قنا فوراً.
          </p>
          <button
            onClick={() => {
              onClose();
              onOpenAiAdvisor();
            }}
            className="w-full py-2 bg-white text-[#00236e] rounded-xl text-xs font-bold hover:bg-[#F2F7FD] transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            اسأل المستشار الآن
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    onNavigate(item.id);
                  }
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F5F8FC] transition-colors text-right cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${item.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-[#0b1b37] group-hover:text-[#00236e]">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="text-xs font-bold bg-[#00236e] text-white px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Drawer Footer / Contact */}
        <div className="p-4 border-t border-[#E3EAF3] bg-[#F5F8FC] space-y-2">
          <a
            href="https://wa.me/201012345678"
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 bg-[#25D366] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#20bd5a] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            تواصل عبر واتساب المباشر
          </a>
          <div className="flex justify-between items-center text-[11px] text-[#444651] px-1 pt-1">
            <span>دعم العملاء: 01012345678</span>
            <span className="font-bold text-[#00236e]">v2.4 إصدار الصعيد</span>
          </div>
        </div>
      </div>
    </div>
  );
};
