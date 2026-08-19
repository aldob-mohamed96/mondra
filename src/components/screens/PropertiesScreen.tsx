import React, { useState } from 'react';
import { Property, PropertyType, ScreenType } from '../../types';
import { QENA_CITIES } from '../../data/mockData';
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Maximize2,
  Receipt,
  Star,
  ShieldCheck,
  Heart,
  Scale,
  Building2,
  X
} from 'lucide-react';

interface PropertiesScreenProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onToggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  onToggleCompare: (property: Property) => void;
  isCompared: (propertyId: string) => boolean;
  onNavigate: (screen: ScreenType) => void;
  compareCount: number;
}

export const PropertiesScreen: React.FC<PropertiesScreenProps> = ({
  properties,
  onSelectProperty,
  onToggleFavorite,
  isFavorite,
  onToggleCompare,
  isCompared,
  onNavigate,
  compareCount
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [onlyVerified, setOnlyVerified] = useState(false);

  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title.includes(searchQuery) ||
      prop.location.includes(searchQuery) ||
      prop.district.includes(searchQuery);

    const matchesType = selectedType === 'all' || prop.propertyType === selectedType;
    const matchesCity = selectedCity === 'all' || prop.city.includes(selectedCity) || prop.location.includes(selectedCity);
    const matchesVerified = !onlyVerified || prop.verificationLevel === 'field_verified';

    return matchesSearch && matchesType && matchesCity && matchesVerified;
  });

  return (
    <main className="max-w-4xl mx-auto px-4 py-4 flex flex-col gap-5 font-['Cairo',sans-serif]">
      {/* Header with Search and Filter bar */}
      <div className="space-y-3" dir="rtl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#00236e]">عقارات قنا والصعيد</h1>
            <p className="text-xs text-[#444651]">
              تصفح {filteredProperties.length} عقار موثق ومتاح للبيع أو الإيجار
            </p>
          </div>

          {compareCount > 0 && (
            <button
              onClick={() => onNavigate('comparison')}
              className="bg-[#00236e] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-[#1b3a8c] transition-colors cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              عرض المقارنة ({compareCount})
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالمنطقة أو المدينة (حوض 10، الشؤون، قنا الجديدة...)"
            className="w-full h-12 pr-11 pl-10 rounded-2xl bg-white border border-[#E3EAF3] text-sm text-[#0b1b37] focus:outline-none focus:border-[#00236e] focus:ring-3 focus:ring-[#DCE9F7] transition-all"
          />
          <Search className="w-4 h-4 text-[#757683] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-[#757683] hover:text-[#0b1b37] absolute left-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'apartment', label: 'شقق' },
            { id: 'villa', label: 'فلل' },
            { id: 'land', label: 'أراضي' },
            { id: 'commercial', label: 'محلات تجارية' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedType === type.id
                  ? 'bg-[#00236e] text-white shadow-xs'
                  : 'bg-white border border-[#E3EAF3] text-[#444651] hover:bg-[#F5F8FC]'
              }`}
            >
              {type.label}
            </button>
          ))}

          {/* Verified toggle pill */}
          <button
            onClick={() => setOnlyVerified(!onlyVerified)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
              onlyVerified
                ? 'bg-[#FDF4D8] text-[#755b00] border border-[#fdcc33]'
                : 'bg-white border border-[#E3EAF3] text-[#444651] hover:bg-[#F5F8FC]'
            }`}
          >
            <Star className={`w-3 h-3 ${onlyVerified ? 'fill-[#755b00]' : ''}`} />
            الموثق ميدانياً فقط
          </button>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="rtl">
        {filteredProperties.map((prop) => {
          const fav = isFavorite(prop.id);
          const compared = isCompared(prop.id);
          const pricePerMeter = Math.round(prop.price / prop.area);

          return (
            <article
              key={prop.id}
              className="bg-white rounded-2xl border border-[#E3EAF3] shadow-xs hover:shadow-md overflow-hidden transition-all flex flex-col"
            >
              {/* Image Header */}
              <div className="relative aspect-video w-full bg-[#d8e2ff] overflow-hidden">
                <img
                  src={prop.images[0]}
                  alt={prop.title}
                  onClick={() => onSelectProperty(prop)}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                />

                {/* Badge */}
                {prop.verificationLevel === 'field_verified' ? (
                  <div className="absolute top-2.5 right-2.5 bg-[#FDF4D8] text-[#755b00] flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-[#755b00]" />
                    <span className="text-[11px] font-bold">{prop.verificationBadgeText}</span>
                  </div>
                ) : (
                  <div className="absolute top-2.5 right-2.5 bg-[#e0e8ff] text-[#00236e] flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs border border-[#E3EAF3]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold">{prop.verificationBadgeText}</span>
                  </div>
                )}

                {/* Heart Button */}
                <button
                  onClick={() => onToggleFavorite(prop.id)}
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

              {/* Body */}
              <div className="p-4 flex flex-col gap-2 flex-1 justify-between">
                <div>
                  <h3
                    onClick={() => onSelectProperty(prop)}
                    className="font-bold text-sm text-[#0b1b37] hover:text-[#00236e] transition-colors line-clamp-1 cursor-pointer"
                  >
                    {prop.title}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-[#444651] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00236e]" />
                    <span>{prop.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#444651] py-1 border-t border-[#E3EAF3]">
                  <div className="flex items-center gap-1 bg-[#F5F8FC] px-2 py-0.5 rounded-md">
                    <Maximize2 className="w-3 h-3" />
                    <span>{prop.area} م²</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#F5F8FC] px-2 py-0.5 rounded-md">
                    <Receipt className="w-3 h-3" />
                    <span>{pricePerMeter.toLocaleString()} ج/م²</span>
                  </div>
                  <span className="mr-auto text-[11px] text-[#757683]">{prop.finishing}</span>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => onSelectProperty(prop)}
                    className="flex-1 py-2 bg-[#00236e] text-white rounded-xl text-xs font-bold hover:bg-[#1b3a8c] transition-colors cursor-pointer"
                  >
                    تفاصيل العقار
                  </button>

                  <button
                    onClick={() => onToggleCompare(prop)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                      compared
                        ? 'bg-[#1E9E6A] text-white'
                        : 'bg-[#DCE9F7] text-[#00236e] hover:bg-[#c5c6d3]'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{compared ? 'مقارن ✓' : 'قارن'}</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E3EAF3] p-6" dir="rtl">
          <Building2 className="w-12 h-12 text-[#757683] mx-auto mb-3" />
          <h3 className="font-bold text-base text-[#0b1b37]">لا توجد عقارات مطابقة للبحث</h3>
          <p className="text-xs text-[#444651] mt-1 mb-4">
            جرب تغيير معايير البحث أو تصفح كافة عقارات المحافظة.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedCity('all');
              setOnlyVerified(false);
            }}
            className="px-5 py-2 bg-[#00236e] text-white text-xs font-bold rounded-xl"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      )}
    </main>
  );
};
