import React from 'react';
import { Property, ScreenType } from '../../types';
import {
  Star,
  ShieldCheck,
  Trash2,
  Share2,
  PlusCircle,
  Building2,
  Check,
  CheckCircle2
} from 'lucide-react';

interface ComparisonScreenProps {
  compareList: Property[];
  onRemoveFromCompare: (propertyId: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onSelectProperty: (property: Property) => void;
}

export const ComparisonScreen: React.FC<ComparisonScreenProps> = ({
  compareList,
  onRemoveFromCompare,
  onNavigate,
  onSelectProperty
}) => {
  // Find minimum price per meter to highlight "الأفضل سعراً"
  const pricePerMeters = compareList.map((p) => p.price / p.area);
  const minPricePerMeter = pricePerMeters.length > 0 ? Math.min(...pricePerMeters) : 0;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'مقارنة عقارات قنا - مُندرة',
        text: `مقارنة بين ${compareList.length} عقارات في قنا وصعيد مصر عبر منصة مندرة`,
        url: window.location.href
      }).catch(() => {});
    } else {
      alert('تم نسخ رابط المقارنة لمشاركته مع العائلة أو الشركاء!');
    }
  };

  return (
    <main className="px-4 py-6 max-w-4xl mx-auto font-['Cairo',sans-serif]">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center" dir="rtl">
        <div>
          <h2 className="text-2xl font-extrabold text-[#00236e]">مقارنة العقارات</h2>
          <p className="text-xs text-[#444651] mt-0.5">
            مقارنة المواصفات والأسعار ووضع الملكية جنباً لجنب
          </p>
        </div>

        <button
          onClick={() => onNavigate('properties')}
          className="text-xs font-bold text-[#00236e] bg-[#e0e8ff] hover:bg-[#DCE9F7] px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          إضافة عقار للمقارنة
        </button>
      </div>

      {compareList.length > 0 ? (
        <>
          {/* Comparison Table Container */}
          <div className="relative rounded-2xl border border-[#E3EAF3] bg-white overflow-hidden shadow-xs" dir="rtl">
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse min-w-[550px]">
                {/* Property Headers (Images, Titles, Prices, Remove Button) */}
                <thead>
                  <tr className="bg-[#F5F8FC] border-b border-[#E3EAF3]">
                    <th className="p-3 w-1/4 text-xs font-bold text-[#444651] align-bottom">
                      المواصفات
                    </th>

                    {compareList.map((prop, idx) => {
                      const isHighlighted = idx === compareList.length - 1 && compareList.length > 2;
                      return (
                        <th
                          key={prop.id}
                          className={`p-3 w-1/4 align-top border-r border-[#E3EAF3] ${
                            isHighlighted ? 'bg-[#F2F7FD]' : ''
                          }`}
                        >
                          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-2 bg-[#d8e2ff]">
                            <img
                              src={prop.images[0]}
                              alt={prop.title}
                              className="object-cover w-full h-full cursor-pointer hover:scale-105 transition-transform"
                              onClick={() => onSelectProperty(prop)}
                            />

                            {/* Badge */}
                            {prop.verificationLevel === 'field_verified' ? (
                              <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-xs rounded-md px-1.5 py-0.5 flex items-center gap-1 shadow-xs">
                                <Star className="w-3 h-3 fill-[#fdcc33] text-[#fdcc33]" />
                                <span className="text-[10px] font-bold text-[#0b1b37]">موثق</span>
                              </div>
                            ) : (
                              <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-xs rounded-md px-1.5 py-0.5 flex items-center gap-1 shadow-xs">
                                <ShieldCheck className="w-3 h-3 text-[#1E9E6A]" />
                                <span className="text-[10px] font-bold text-[#0b1b37]">هوية موثقة</span>
                              </div>
                            )}
                          </div>

                          <div
                            onClick={() => onSelectProperty(prop)}
                            className="font-bold text-xs sm:text-sm text-[#00236e] line-clamp-1 cursor-pointer hover:underline"
                          >
                            {prop.title}
                          </div>

                          <div className="text-xs font-bold text-[#444651] mt-1">
                            {prop.price.toLocaleString()} ج.م
                          </div>

                          <button
                            onClick={() => onRemoveFromCompare(prop.id)}
                            className="mt-2 w-full border border-[#ba1a1a]/40 text-[#ba1a1a] font-bold text-[11px] py-1 rounded-lg hover:bg-[#ffdad6]/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            إزالة
                          </button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody className="text-xs sm:text-sm text-[#0b1b37]">
                  {/* Row 1: Area */}
                  <tr className="border-b border-[#E3EAF3] hover:bg-[#F5F8FC] transition-colors">
                    <td className="p-3 font-bold text-[#444651]">المساحة</td>
                    {compareList.map((prop, idx) => (
                      <td
                        key={prop.id}
                        className={`p-3 border-r border-[#E3EAF3] text-center font-semibold ${
                          idx === compareList.length - 1 && compareList.length > 2 ? 'bg-[#F2F7FD]' : ''
                        }`}
                      >
                        {prop.area} م²
                      </td>
                    ))}
                  </tr>

                  {/* Row 2: Rooms & Baths */}
                  <tr className="border-b border-[#E3EAF3] hover:bg-[#F5F8FC] transition-colors">
                    <td className="p-3 font-bold text-[#444651]">عدد الغرف</td>
                    {compareList.map((prop, idx) => (
                      <td
                        key={prop.id}
                        className={`p-3 border-r border-[#E3EAF3] text-center ${
                          idx === compareList.length - 1 && compareList.length > 2 ? 'bg-[#F2F7FD]' : ''
                        }`}
                      >
                        {prop.rooms > 0 ? `${prop.rooms} غرف, ${prop.bathrooms} حمام` : 'أرض فضاء'}
                      </td>
                    ))}
                  </tr>

                  {/* Row 3: Finishing */}
                  <tr className="border-b border-[#E3EAF3] hover:bg-[#F5F8FC] transition-colors">
                    <td className="p-3 font-bold text-[#444651]">التشطيب</td>
                    {compareList.map((prop, idx) => (
                      <td
                        key={prop.id}
                        className={`p-3 border-r border-[#E3EAF3] text-center ${
                          idx === compareList.length - 1 && compareList.length > 2 ? 'bg-[#F2F7FD]' : ''
                        }`}
                      >
                        {prop.finishing}
                      </td>
                    ))}
                  </tr>

                  {/* Row 4: Ownership */}
                  <tr className="border-b border-[#E3EAF3] hover:bg-[#F5F8FC] transition-colors">
                    <td className="p-3 font-bold text-[#444651]">وضع الملكية</td>
                    {compareList.map((prop, idx) => (
                      <td
                        key={prop.id}
                        className={`p-3 border-r border-[#E3EAF3] text-center text-xs leading-relaxed ${
                          idx === compareList.length - 1 && compareList.length > 2 ? 'bg-[#F2F7FD]' : ''
                        }`}
                      >
                        {prop.ownershipStatus}
                      </td>
                    ))}
                  </tr>

                  {/* Row 5: Price per SQM (Highlighted) */}
                  <tr className="hover:bg-[#F5F8FC] transition-colors">
                    <td className="p-3 font-bold text-[#444651]">سعر المتر</td>
                    {compareList.map((prop, idx) => {
                      const ppm = Math.round(prop.price / prop.area);
                      const isBestPrice = Math.abs(ppm - minPricePerMeter) < 5;

                      return (
                        <td
                          key={prop.id}
                          className={`p-3 border-r border-[#E3EAF3] text-center font-bold relative ${
                            isBestPrice
                              ? 'bg-[#E8F5E9] text-[#1E9E6A]'
                              : idx === compareList.length - 1 && compareList.length > 2
                              ? 'bg-[#F2F7FD]'
                              : ''
                          }`}
                        >
                          {ppm.toLocaleString()} ج.م
                          {isBestPrice && (
                            <span className="block text-[10px] font-extrabold text-[#1E9E6A] mt-0.5">
                              الأفضل سعراً 🏆
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Share Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleShare}
              className="bg-[#00236e] text-white font-bold text-sm h-12 px-8 rounded-xl flex items-center gap-2 hover:bg-[#1b3a8c] transition-colors shadow-md active:scale-95 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              مشاركة المقارنة
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E3EAF3] p-6" dir="rtl">
          <div className="w-16 h-16 bg-[#e0e8ff] rounded-full mx-auto flex items-center justify-center text-[#00236e] mb-3">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#00236e] mb-1">لا توجد عقارات في المقارنة</h3>
          <p className="text-xs text-[#444651] max-w-sm mx-auto mb-5">
            تصفح العقارات واضغط على زر "قارن" لإجراء مقارنة مفصلة بين الأسعار والمواصفات.
          </p>
          <button
            onClick={() => onNavigate('properties')}
            className="px-6 py-2.5 bg-[#00236e] text-white rounded-xl text-xs font-bold hover:bg-[#1b3a8c] transition-colors cursor-pointer"
          >
            تصفح عقارات قنا
          </button>
        </div>
      )}
    </main>
  );
};
