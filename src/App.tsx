/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, Property, NotificationItem } from './types';
import {
  MOCK_PROPERTIES,
  BUILDING_MATERIALS,
  INITIAL_NOTIFICATIONS,
  MOCK_NEWS
} from './data/mockData';

import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { SideDrawer } from './components/SideDrawer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AiAssistantModal } from './components/AiAssistantModal';

// Screens
import { HomeScreen } from './components/screens/HomeScreen';
import { EligibilityScreen } from './components/screens/EligibilityScreen';
import { InterestsModal } from './components/screens/InterestsModal';
import { ExpatsScreen } from './components/screens/ExpatsScreen';
import { FinishingCalculatorScreen } from './components/screens/FinishingCalculatorScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { AddListingScreen } from './components/screens/AddListingScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { ComparisonScreen } from './components/screens/ComparisonScreen';
import { PropertiesScreen } from './components/screens/PropertiesScreen';
import { NewsScreen } from './components/screens/NewsScreen';

import {
  CheckCircle2,
  Plane,
  Paintbrush,
  Scale,
  Heart,
  PlusCircle,
  Bell,
  SlidersHorizontal,
  Sparkles,
  ChevronLeft,
  Share2,
  PhoneCall,
  ShieldCheck,
  Building2,
  Compass
} from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['home']);
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['prop-1', 'prop-2']);
  const [compareIds, setCompareIds] = useState<string[]>(['prop-3', 'prop-1', 'prop-4']);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInterestsOpen, setIsInterestsOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Navigation Helper
  const navigateTo = (screen: ScreenType) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const previousScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  // Favorites logic
  const toggleFavorite = (propertyId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  const isFavorite = (propertyId: string) => favoriteIds.includes(propertyId);

  const favoriteProperties = properties.filter((p) => favoriteIds.includes(p.id));

  // Comparison logic
  const toggleCompare = (property: Property) => {
    setCompareIds((prev) => {
      if (prev.includes(property.id)) {
        return prev.filter((id) => id !== property.id);
      } else {
        if (prev.length >= 4) {
          alert('يمكنك مقارنة حتى 4 عقارات كحد أقصى.');
          return prev;
        }
        return [...prev, property.id];
      }
    });
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareIds((prev) => prev.filter((id) => id !== propertyId));
  };

  const isCompared = (propertyId: string) => compareIds.includes(propertyId);

  const compareProperties = properties.filter((p) => compareIds.includes(p.id));

  // Notifications logic
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );

    if (notif.propertyId) {
      const target = properties.find((p) => p.id === notif.propertyId);
      if (target) {
        setSelectedProperty(target);
        return;
      }
    }

    if (notif.targetScreen) {
      navigateTo(notif.targetScreen);
    }
  };

  // Add listing
  const handleListingAdded = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
    // add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'تم نشر إعلانك وجاري التوثيق',
        message: `تم إضافة عقارك "${newProp.title}" بنجاح وجاري إرسال فاحص ميداني.`,
        timeAgo: 'الآن',
        type: 'verification',
        icon: 'verified',
        iconBg: 'bg-[#E8F5E9]',
        iconColor: 'text-[#1E9E6A]',
        read: false,
        targetScreen: 'properties',
        propertyId: newProp.id
      },
      ...prev
    ]);
  };

  const showBackButton = currentScreen !== 'home';

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#0b1b37] flex flex-col font-['Cairo',sans-serif] pb-[84px]">
      {/* Top Header */}
      {currentScreen !== 'add-listing' && (
        <TopAppBar
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          unreadCount={unreadCount}
          onBack={handleBack}
          showBack={showBackButton}
        />
      )}

      {/* Screen Routing */}
      <div className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            properties={properties}
            materials={BUILDING_MATERIALS}
            news={MOCK_NEWS}
            onNavigate={navigateTo}
            onSelectProperty={(p) => setSelectedProperty(p)}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            onOpenInterests={() => setIsInterestsOpen(true)}
          />
        )}

        {currentScreen === 'eligibility' && <EligibilityScreen />}

        {currentScreen === 'expats' && <ExpatsScreen />}

        {currentScreen === 'finishing' && <FinishingCalculatorScreen />}

        {currentScreen === 'favorites' && (
          <FavoritesScreen
            favoriteProperties={favoriteProperties}
            onToggleFavorite={toggleFavorite}
            onSelectProperty={(p) => setSelectedProperty(p)}
            onToggleCompare={toggleCompare}
            isCompared={isCompared}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'comparison' && (
          <ComparisonScreen
            compareList={compareProperties}
            onRemoveFromCompare={removeFromCompare}
            onNavigate={navigateTo}
            onSelectProperty={(p) => setSelectedProperty(p)}
          />
        )}

        {currentScreen === 'properties' && (
          <PropertiesScreen
            properties={properties}
            onSelectProperty={(p) => setSelectedProperty(p)}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            onToggleCompare={toggleCompare}
            isCompared={isCompared}
            onNavigate={navigateTo}
            compareCount={compareIds.length}
          />
        )}

        {currentScreen === 'news' && (
          <NewsScreen news={MOCK_NEWS} onNavigate={navigateTo} />
        )}

        {currentScreen === 'notifications' && (
          <NotificationsScreen
            notifications={notifications}
            onMarkAllAsRead={markAllAsRead}
            onClearNotifications={clearNotifications}
            onNotificationClick={handleNotificationClick}
          />
        )}

        {currentScreen === 'add-listing' && (
          <AddListingScreen
            onClose={handleBack}
            onListingAdded={handleListingAdded}
          />
        )}

        {currentScreen === 'more' && (
          <main className="max-w-4xl mx-auto px-4 py-5 font-['Cairo',sans-serif]" dir="rtl">
            <div className="mb-5">
              <h1 className="text-2xl font-black text-[#00236e]">المزيد والخدمات</h1>
              <p className="text-xs text-[#444651]">
                كافة أدوات منصة مُندرة المتخصصة في عقارات وتراخيص قنا
              </p>
            </div>

            {/* AI Advisor Banner */}
            <div
              onClick={() => setIsAiAdvisorOpen(true)}
              className="bg-gradient-to-l from-[#00236e] to-[#1b3a8c] text-white p-5 rounded-3xl mb-5 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#fdcc33] text-[#6f5600] flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold bg-white/20 text-[#fdcc33] px-2 py-0.5 rounded-full">
                    ذكاء اصطناعي عقاري
                  </span>
                  <h3 className="font-bold text-base mt-1">مستشار مُندرة الذكي</h3>
                  <p className="text-xs text-[#dce1ff]">
                    اسأل عن أسعار المتر، نسب البناء، وإجراءات الشهر العقاري بقنا
                  </p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-[#fdcc33] group-hover:translate-x-[-4px] transition-transform" />
            </div>

            {/* Grid of Tools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 1. فحص الأهلية */}
              <button
                onClick={() => navigateTo('eligibility')}
                className="bg-white p-4 rounded-2xl border border-[#E3EAF3] flex items-center justify-between hover:bg-[#F2F7FD] transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#DCE9F7] text-[#00236e]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0b1b37]">فحص أهلية الإسكان</h3>
                    <p className="text-[11px] text-[#444651]">شروط طرح أراضي الإسكان المتميز</p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-[#757683]" />
              </button>

              {/* 2. خدمات المغتربين */}
              <button
                onClick={() => navigateTo('expats')}
                className="bg-white p-4 rounded-2xl border border-[#E3EAF3] flex items-center justify-between hover:bg-[#F2F7FD] transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#dce1ff] text-[#00236e]">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0b1b37]">خدمات المصريين بالخارج</h3>
                    <p className="text-[11px] text-[#444651]">جولات فيديو ومراجعة عقود</p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-[#757683]" />
              </button>

              {/* 3. حاسبة التشطيب */}
              <button
                onClick={() => navigateTo('finishing')}
                className="bg-white p-4 rounded-2xl border border-[#E3EAF3] flex items-center justify-between hover:bg-[#F2F7FD] transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#E8F5E9] text-[#1E9E6A]">
                    <Paintbrush className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0b1b37]">حاسبة تكاليف التشطيب</h3>
                    <p className="text-[11px] text-[#444651]">تقدير فوري وأسعار مواد البناء</p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-[#757683]" />
              </button>

              {/* 4. المحفوظات */}
              <button
                onClick={() => navigateTo('favorites')}
                className="bg-white p-4 rounded-2xl border border-[#E3EAF3] flex items-center justify-between hover:bg-[#F2F7FD] transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#ffdad6] text-[#ba1a1a]">
                    <Heart className="w-5 h-5 fill-[#ba1a1a]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0b1b37]">المحفوظات ({favoriteIds.length})</h3>
                    <p className="text-[11px] text-[#444651]">عقاراتك المفضلة للرجوع إليها</p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-[#757683]" />
              </button>

              {/* 5. أضف إعلانك */}
              <button
                onClick={() => navigateTo('add-listing')}
                className="bg-white p-4 rounded-2xl border border-[#E3EAF3] flex items-center justify-between hover:bg-[#F2F7FD] transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#DCE9F7] text-[#00236e]">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0b1b37]">أضف إعلانك وتوثيقك</h3>
                    <p className="text-[11px] text-[#444651]">انشر عقارك واطلب فحصاً ميدانياً</p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-[#757683]" />
              </button>

              {/* 6. مقارنة العقارات */}
              <button
                onClick={() => navigateTo('comparison')}
                className="bg-white p-4 rounded-2xl border border-[#E3EAF3] flex items-center justify-between hover:bg-[#F2F7FD] transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#FDF4D8] text-[#755b00]">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0b1b37]">مقارنة العقارات ({compareIds.length})</h3>
                    <p className="text-[11px] text-[#444651]">مقارنة المواصفات وسعر المتر</p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-[#757683]" />
              </button>

              {/* 7. تخصيص الاهتمامات */}
              <button
                onClick={() => setIsInterestsOpen(true)}
                className="bg-white p-4 rounded-2xl border border-[#E3EAF3] flex items-center justify-between hover:bg-[#F2F7FD] transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F2F7FD] text-[#00236e]">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0b1b37]">تحديد الاهتمامات</h3>
                    <p className="text-[11px] text-[#444651]">تخصيص العقارات التي تبحث عنها</p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-[#757683]" />
              </button>

              {/* 8. مركز الإشعارات */}
              <button
                onClick={() => navigateTo('notifications')}
                className="bg-white p-4 rounded-2xl border border-[#E3EAF3] flex items-center justify-between hover:bg-[#F2F7FD] transition-colors cursor-pointer text-right"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#e0e8ff] text-[#00236e]">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0b1b37]">مركز الإشعارات</h3>
                    <p className="text-[11px] text-[#444651]">تنبيهات الأسعار وتطابق العقارات</p>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-[#757683]" />
              </button>
            </div>
          </main>
        )}
      </div>

      {/* Persistent Bottom Navigation */}
      {currentScreen !== 'add-listing' && (
        <BottomNavBar
          currentScreen={currentScreen}
          onNavigate={navigateTo}
          savedCount={favoriteIds.length}
        />
      )}

      {/* Side Slide Drawer */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={navigateTo}
        savedCount={favoriteIds.length}
        unreadCount={unreadCount}
        compareCount={compareIds.length}
        onOpenInterests={() => setIsInterestsOpen(true)}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
      />

      {/* Interests Modal (Screen 2) */}
      <InterestsModal
        isOpen={isInterestsOpen}
        onClose={() => setIsInterestsOpen(false)}
        onSaveInterests={(selected) => {
          navigateTo('properties');
        }}
      />

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onToggleFavorite={toggleFavorite}
        isFavorite={selectedProperty ? isFavorite(selectedProperty.id) : false}
        onToggleCompare={toggleCompare}
        isCompared={selectedProperty ? isCompared(selectedProperty.id) : false}
      />

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
      />
    </div>
  );
}
