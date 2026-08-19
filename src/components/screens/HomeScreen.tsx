import React from 'react';
import { Property, ScreenType, BuildingMaterialPrice, NewsArticle } from '../../types';
import {
  Search,
  CheckCircle2,
  Plane,
  Paintbrush,
  Scale,
  PlusCircle,
  TrendingUp,
  MapPin,
  Maximize2,
  Star,
  ShieldCheck,
  ArrowLeft,
  ChevronLeft,
  Sparkles,
  Heart,
  Eye
} from 'lucide-react';

interface HomeScreenProps {
  properties: Property[];
  materials: BuildingMaterialPrice[];
  news: NewsArticle[];
  onNavigate: (screen: ScreenType) => void;
  onSelectProperty: (property: Property) => void;
  onToggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  onOpenInterests: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  properties,
  materials,
  news,
  onNavigate,
  onSelectProperty,
  onToggleFavorite,
  isFavorite,
  onOpenInterests
}) => {
  const featuredProperties = properties.filter((p) => p.featured || p.verificationLevel === 'field_verified');

  return (
    <main className="max-w-4xl mx-auto px-4 py-4 flex flex-col gap-6 font-['Cairo',sans-serif]">
      {/* Hero Welcome & Quick Search Banner */}
      <section className="bg-gradient-to-l from-[#00236e] to-[#1b3a8c] rounded-3xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10" dir="rtl">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-[#fdcc33] bg-white/10 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              المنصة العقارية الأولى بقنا والصعيد
            </span>

            <button
              onClick={onOpenInterests}
              className="text-xs font-bold text-white/90 hover:text-white bg-white/15 hover:bg-white/25 px-3 py-1 rounded-full transition-colors cursor-pointer"
            >
              تخصيص الاهتمامات ✨
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-black mb-2 leading-tight">
            ابحث عن عقارك الموثق في قنا وصعيد مصر
          </h1>
          <p className="text-xs sm:text-sm text-[#dce1ff] mb-4 max-w-lg">
            عقارات موثقة ميدانياً، خدمات للمغتربين، وحاسبة تشطيب فورية وفقاً لأحدث أسعار مواد البناء.
          </p>

          {/* Quick Search Bar */}
          <div
            onClick={() => onNavigate('properties')}
            className="bg-white rounded-2xl p-2 flex items-center gap-2 shadow-lg cursor-pointer group"
          >
            <div className="p-2.5 bg-[#00236e] text-white rounded-xl group-hover:bg-[#1b3a8c] transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm text-[#757683] flex-1 text-right">
              ابحث بالحي (حوض 10، الشؤون، قنا الجديدة، شارع المحطة...)
            </span>
            <span className="text-xs font-bold text-[#00236e] bg-[#DCE9F7] px-3 py-1.5 rounded-xl">
              تصفح
            </span>
          </div>
        </div>
      </section>

      {/* 4 Major Feature Shortcuts */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3" dir="rtl">
        {/* 1. فحص الأهلية */}
        <button
          onClick={() => onNavigate('eligibility')}
          className="bg-white p-4 rounded-2xl border border-[#E3EAF3] shadow-2xs hover:shadow-md transition-all text-right flex flex-col justify-between h-30 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#DCE9F7] text-[#00236e] flex items-center justify-center group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#755b00] bg-[#FDF4D8] px-2 py-0.5 rounded-md">
              طرح حكومي
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-[#0b1b37] mt-1 line-clamp-1">
              فحص الأهلية
            </h3>
          </div>
        </button>

        {/* 2. خدمات المغتربين */}
        <button
          onClick={() => onNavigate('expats')}
          className="bg-white p-4 rounded-2xl border border-[#E3EAF3] shadow-2xs hover:shadow-md transition-all text-right flex flex-col justify-between h-30 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#dce1ff] text-[#00236e] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#00236e] bg-[#e0e8ff] px-2 py-0.5 rounded-md">
              جولات حية
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-[#0b1b37] mt-1 line-clamp-1">
              المصريين بالخارج
            </h3>
          </div>
        </button>

        {/* 3. حاسبة التشطيب */}
        <button
          onClick={() => onNavigate('finishing')}
          className="bg-white p-4 rounded-2xl border border-[#E3EAF3] shadow-2xs hover:shadow-md transition-all text-right flex flex-col justify-between h-30 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#1E9E6A] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Paintbrush className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#1E9E6A] bg-[#E8F5E9] px-2 py-0.5 rounded-md">
              تحديث يومي
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-[#0b1b37] mt-1 line-clamp-1">
              حاسبة التشطيب
            </h3>
          </div>
        </button>

        {/* 4. مقارنة العقارات */}
        <button
          onClick={() => onNavigate('comparison')}
          className="bg-white p-4 rounded-2xl border border-[#E3EAF3] shadow-2xs hover:shadow-md transition-all text-right flex flex-col justify-between h-30 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FDF4D8] text-[#755b00] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#755b00] bg-[#FDF4D8] px-2 py-0.5 rounded-md">
              أفضل سعر
            </span>
            <h3 className="font-bold text-xs sm:text-sm text-[#0b1b37] mt-1 line-clamp-1">
              مقارنة العقارات
            </h3>
          </div>
        </button>
      </section>

      {/* Building Materials Quick Ticker */}
      <section className="bg-white rounded-2xl p-4 border border-[#E3EAF3] shadow-2xs" dir="rtl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#755b00]" />
            <h3 className="font-bold text-xs sm:text-sm text-[#0b1b37]">
              أسعار مواد البناء اليوم في قنا
            </h3>
          </div>
          <button
            onClick={() => onNavigate('finishing')}
            className="text-[11px] font-bold text-[#00236e] flex items-center gap-0.5 hover:underline cursor-pointer"
          >
            عرض الكل والحاسبة
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {materials.slice(0, 4).map((mat) => (
            <div
              key={mat.id}
              className="bg-[#F5F8FC] p-2.5 rounded-xl border border-[#E3EAF3] flex items-center justify-between"
            >
              <div className="text-right">
                <span className="text-[11px] text-[#444651] block">{mat.name.split('(')[0]}</span>
                <span className="font-extrabold text-xs text-[#00236e]">
                  {mat.price.toLocaleString()} ج.م
                </span>
              </div>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  mat.change === 'up'
                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                    : mat.change === 'down'
                    ? 'bg-[#E8F5E9] text-[#1E9E6A]'
                    : 'bg-[#e0e8ff] text-[#00236e]'
                }`}
              >
                {mat.changeAmount}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Verified Properties */}
      <section dir="rtl">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#00236e]">عقارات مميزة وموثقة</h2>
            <p className="text-xs text-[#444651]">تمت مراجعتها وفحصها ميدانياً بقنا</p>
          </div>
          <button
            onClick={() => onNavigate('properties')}
            className="text-xs font-bold text-[#00236e] bg-[#e0e8ff] hover:bg-[#DCE9F7] px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            عرض كافة العقارات ({properties.length})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredProperties.slice(0, 4).map((prop) => {
            const fav = isFavorite(prop.id);
            return (
              <article
                key={prop.id}
                onClick={() => onSelectProperty(prop)}
                className="bg-white rounded-2xl border border-[#E3EAF3] shadow-xs hover:shadow-md overflow-hidden transition-all cursor-pointer flex flex-col group"
              >
                <div className="relative aspect-video w-full bg-[#d8e2ff] overflow-hidden">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badge */}
                  <div className="absolute top-2.5 right-2.5 bg-[#FDF4D8] text-[#755b00] flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-[#755b00]" />
                    <span className="text-[11px] font-bold">{prop.verificationBadgeText}</span>
                  </div>

                  {/* Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(prop.id);
                    }}
                    className="absolute top-2.5 left-2.5 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        fav ? 'fill-[#ba1a1a] text-[#ba1a1a]' : 'text-[#757683]'
                      }`}
                    />
                  </button>

                  {/* Price Tag */}
                  <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-xs border border-[#E3EAF3]">
                    <span className="font-extrabold text-sm text-[#00236e]">
                      {prop.price.toLocaleString()}{' '}
                      <span className="text-[10px] font-normal text-[#444651]">ج.م</span>
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col gap-2">
                  <h3 className="font-bold text-sm text-[#0b1b37] group-hover:text-[#00236e] transition-colors line-clamp-1">
                    {prop.title}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-[#444651]">
                    <MapPin className="w-3.5 h-3.5 text-[#00236e]" />
                    <span>{prop.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E3EAF3] text-[#444651]">
                    <span>
                      المساحة: <strong>{prop.area} م²</strong>
                    </span>
                    <span>{prop.finishing}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Add Listing CTA Banner */}
      <section className="bg-[#FDF4D8] rounded-3xl p-5 border border-[#fdcc33]/40 flex flex-col sm:flex-row items-center justify-between gap-4" dir="rtl">
        <div>
          <span className="text-[10px] font-bold text-[#755b00] bg-white/80 px-2.5 py-0.5 rounded-full">
            لأصحاب العقارات والمطورين
          </span>
          <h3 className="text-base sm:text-lg font-black text-[#755b00] mt-1">
            عندك عقار في قنا وعايز تبيعه أو تأجره؟
          </h3>
          <p className="text-xs text-[#444651] mt-0.5">
            انشر إعلانك مجاناً مع طلب توثيق ميداني وفحص عقود للوصول للمشترين والمغتربين.
          </p>
        </div>

        <button
          onClick={() => onNavigate('add-listing')}
          className="w-full sm:w-auto px-6 py-3 bg-[#00236e] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1b3a8c] shadow-sm transition-colors cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          أضف إعلانك الآن
        </button>
      </section>

      {/* Latest Housing News */}
      <section className="pb-6" dir="rtl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-black text-[#00236e]">أحدث أخبار طروحات قنا</h2>
          <button
            onClick={() => onNavigate('news')}
            className="text-xs font-bold text-[#00236e] hover:underline cursor-pointer"
          >
            المزيد من الأخبار
          </button>
        </div>

        <div className="space-y-3">
          {news.slice(0, 2).map((item) => (
            <article
              key={item.id}
              onClick={() => onNavigate('news')}
              className="bg-white rounded-2xl p-3.5 border border-[#E3EAF3] flex gap-3.5 items-center hover:shadow-xs transition-shadow cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0 bg-[#d8e2ff]"
              />
              <div className="flex-1">
                <span className="text-[10px] font-bold text-[#00236e] bg-[#e0e8ff] px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-[#0b1b37] mt-1 line-clamp-1 hover:text-[#00236e]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#444651] line-clamp-1 mt-0.5">{item.excerpt}</p>
                <span className="text-[10px] text-[#757683] block mt-1">{item.date}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
