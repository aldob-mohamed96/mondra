import React, { useState } from 'react';
import { Property, ScreenType } from '../../types';
import {
  Heart,
  MapPin,
  Maximize2,
  Receipt,
  Star,
  ShieldCheck,
  Building2,
  HeartCrack,
  Scale,
  Eye
} from 'lucide-react';

interface FavoritesScreenProps {
  favoriteProperties: Property[];
  onToggleFavorite: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onToggleCompare: (property: Property) => void;
  isCompared: (propertyId: string) => boolean;
  onNavigate: (screen: ScreenType) => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  favoriteProperties,
  onToggleFavorite,
  onSelectProperty,
  onToggleCompare,
  isCompared,
  onNavigate
}) => {
  // Allow toggling empty state preview as illustrated in Image 9
  const [forceShowEmptyDemo, setForceShowEmptyDemo] = useState(false);

  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-6 font-['Cairo',sans-serif]">
      {/* Page Header */}
      <div className="mb-5 text-right">
        <h1 className="text-2xl font-extrabold text-[#00236e]">المحفوظات</h1>
        <p className="text-xs sm:text-sm text-[#444651] mt-1">
          عقاراتك المفضلة للرجوع إليها لاحقاً والتواصل مع أصحابها
        </p>
      </div>

      {/* Populated State: Saved Properties List */}
      {!forceShowEmptyDemo && favoriteProperties.length > 0 ? (
        <div className="flex flex-col gap-4">
          {favoriteProperties.map((property) => {
            const pricePerMeter = Math.round(property.price / property.area);
            const compared = isCompared(property.id);

            return (
              <article
                key={property.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md overflow-hidden flex flex-col relative border border-[#E3EAF3] transition-all"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-video bg-[#d8e2ff] overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => onSelectProperty(property)}
                  />

                  {/* Verification Badge */}
                  {property.verificationLevel === 'field_verified' ? (
                    <div className="absolute top-2.5 right-2.5 bg-[#FDF4D8] text-[#755b00] flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs">
                      <Star className="w-3.5 h-3.5 fill-[#755b00]" />
                      <span className="text-[11px] font-bold">موثق ميدانياً</span>
                    </div>
                  ) : (
                    <div className="absolute top-2.5 right-2.5 bg-[#e0e8ff] text-[#00236e] flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs border border-[#E3EAF3]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold">هوية المالك موثقة</span>
                    </div>
                  )}

                  {/* Filled Heart Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(property.id);
                    }}
                    className="absolute top-2.5 left-2.5 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-[#ba1a1a] hover:scale-110 transition-transform cursor-pointer"
                    title="إزالة من المحفوظات"
                  >
                    <Heart className="w-4 h-4 fill-[#ba1a1a]" />
                  </button>

                  {/* Prominent Price Tag */}
                  <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md shadow-sm px-3 py-1.5 rounded-xl border border-[#E3EAF3]">
                    <span className="font-extrabold text-base text-[#00236e] tracking-tight">
                      {property.price.toLocaleString()}{' '}
                      <span className="text-xs font-normal text-[#444651]">ج.م</span>
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-4 flex flex-col gap-2">
                  <h2
                    onClick={() => onSelectProperty(property)}
                    className="font-bold text-base text-[#0b1b37] hover:text-[#00236e] transition-colors line-clamp-1 cursor-pointer"
                  >
                    {property.title}
                  </h2>

                  <div className="flex items-center gap-1 text-[#444651] text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#00236e]" />
                    <span>{property.location}</span>
                  </div>

                  <div className="w-full h-px bg-[#E3EAF3] my-1"></div>

                  {/* Secondary Specs */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[#444651] bg-[#F5F8FC] px-2.5 py-1 rounded-lg text-xs">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>
                          <strong className="text-[#00236e]">{property.area}</strong> م²
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[#444651] bg-[#F5F8FC] px-2.5 py-1 rounded-lg text-xs">
                        <Receipt className="w-3.5 h-3.5" />
                        <span>
                          سعر المتر: <strong className="text-[#00236e]">{pricePerMeter.toLocaleString()}</strong> ج
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onToggleCompare(property)}
                        className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                          compared
                            ? 'bg-[#00236e] text-white'
                            : 'bg-[#DCE9F7] text-[#00236e] hover:bg-[#c5c6d3]'
                        }`}
                        title={compared ? 'مضاف للمقارنة' : 'أضف للمقارنة'}
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{compared ? 'مقارن' : 'قارن'}</span>
                      </button>

                      <button
                        onClick={() => onSelectProperty(property)}
                        className="p-1.5 rounded-lg bg-[#F5F8FC] text-[#00236e] hover:bg-[#DCE9F7] transition-colors cursor-pointer"
                        title="تفاصيل العقار"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : null}

      {/* Section Divider for Demo / State Switch */}
      <div className="my-8">
        <div className="flex items-center gap-4">
          <div className="h-px bg-[#E3EAF3] flex-1"></div>
          <button
            onClick={() => setForceShowEmptyDemo(!forceShowEmptyDemo)}
            className="text-xs font-bold text-[#757683] hover:text-[#00236e] bg-[#F5F8FC] px-3 py-1 rounded-full border border-[#E3EAF3] cursor-pointer"
          >
            {forceShowEmptyDemo ? 'إظهار القائمة المحفوظة' : 'مثال: حالة عدم وجود محفوظات'}
          </button>
          <div className="h-px bg-[#E3EAF3] flex-1"></div>
        </div>
      </div>

      {/* Empty State Screen (as shown in bottom of Image 9) */}
      {(forceShowEmptyDemo || favoriteProperties.length === 0) && (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in">
          <div className="w-24 h-24 rounded-full bg-[#e0e8ff] flex items-center justify-center mb-4 text-[#757683]">
            <HeartCrack className="w-12 h-12 stroke-1" />
          </div>
          <h2 className="text-xl font-bold text-[#0b1b37] mb-2">لسه ما حفظتش حاجة</h2>
          <p className="text-xs sm:text-sm text-[#444651] max-w-xs mb-6 leading-relaxed">
            اضغط على علامة القلب في أي عقار يعجبك عشان تحفظه هنا وترجعله بسهولة في أي وقت.
          </p>
          <button
            onClick={() => onNavigate('properties')}
            className="bg-[#00236e] text-white font-bold text-sm h-12 px-8 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-[#1b3a8c] transition-colors cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            تصفح العقارات
          </button>
        </div>
      )}
    </main>
  );
};
