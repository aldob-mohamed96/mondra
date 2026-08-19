import React, { useState } from 'react';
import { Property } from '../types';
import {
  X,
  MapPin,
  Maximize2,
  Receipt,
  Star,
  ShieldCheck,
  Heart,
  Phone,
  MessageCircle,
  Calendar,
  Layers,
  FileText,
  Calculator,
  Share2,
  CheckCircle2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onToggleFavorite: (propertyId: string) => void;
  isFavorite: boolean;
  onToggleCompare: (property: Property) => void;
  isCompared: boolean;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onToggleFavorite,
  isFavorite,
  onToggleCompare,
  isCompared
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30);
  const [loanYears, setLoanYears] = useState<number>(5);

  const pricePerMeter = Math.round(property.price / property.area);
  const downPaymentAmount = Math.round(property.price * (downPaymentPercent / 100));
  const remainingAmount = property.price - downPaymentAmount;
  const monthlyInstallment = Math.round(remainingAmount / (loanYears * 12));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} في ${property.location} بسعر ${property.price.toLocaleString()} ج.م على مندرة`,
        url: window.location.href
      }).catch(() => {});
    } else {
      alert('تم نسخ رابط العقار بنجاح!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#E3EAF3]"
        dir="rtl"
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-[#E3EAF3] flex items-center justify-between bg-[#F5F8FC]">
          <div className="flex items-center gap-2">
            {property.verificationLevel === 'field_verified' ? (
              <span className="text-xs font-bold text-[#755b00] bg-[#FDF4D8] px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#755b00]" />
                موثق ميدانياً
              </span>
            ) : (
              <span className="text-xs font-bold text-[#00236e] bg-[#e0e8ff] px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                هوية المالك موثقة
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(property.id)}
              className="p-2 rounded-full hover:bg-white text-[#ba1a1a] transition-colors cursor-pointer"
              title="حفظ"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#ba1a1a]' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-white text-[#444651] transition-colors cursor-pointer"
              title="مشاركة"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white text-[#444651] transition-colors cursor-pointer"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Image Carousel */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#d8e2ff]">
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />

            {property.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                <button
                  onClick={() =>
                    setActiveImageIndex(
                      (activeImageIndex - 1 + property.images.length) % property.images.length
                    )
                  }
                  className="p-2 rounded-full bg-black/40 text-white backdrop-blur-xs hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((activeImageIndex + 1) % property.images.length)
                  }
                  className="p-2 rounded-full bg-black/40 text-white backdrop-blur-xs hover:bg-black/60 transition-colors pointer-events-auto cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-lg">
              {activeImageIndex + 1} / {property.images.length}
            </div>
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#00236e] leading-snug">
                {property.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-[#444651] mt-1">
                <MapPin className="w-4 h-4 text-[#00236e]" />
                <span>{property.location}</span>
                <span className="text-[#757683]">({property.postedDate})</span>
              </div>
            </div>

            <div className="bg-[#F5F8FC] p-3 rounded-2xl border border-[#DCE9F7] text-left sm:text-right">
              <span className="text-xs text-[#444651] block">السعر المطلوب:</span>
              <span className="text-xl font-black text-[#00236e]">
                {property.price.toLocaleString()}{' '}
                <span className="text-xs font-bold text-[#444651]">ج.م</span>
              </span>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#F5F8FC] p-3 rounded-xl border border-[#E3EAF3] text-center">
              <span className="text-xs text-[#444651] block mb-1">المساحة</span>
              <span className="text-base font-bold text-[#00236e]">{property.area} م²</span>
            </div>
            <div className="bg-[#F5F8FC] p-3 rounded-xl border border-[#E3EAF3] text-center">
              <span className="text-xs text-[#444651] block mb-1">سعر المتر</span>
              <span className="text-base font-bold text-[#00236e]">{pricePerMeter.toLocaleString()} ج</span>
            </div>
            <div className="bg-[#F5F8FC] p-3 rounded-xl border border-[#E3EAF3] text-center">
              <span className="text-xs text-[#444651] block mb-1">الغرف والحمامات</span>
              <span className="text-base font-bold text-[#00236e]">
                {property.rooms > 0 ? `${property.rooms} غرف | ${property.bathrooms} حمام` : 'أرض'}
              </span>
            </div>
            <div className="bg-[#F5F8FC] p-3 rounded-xl border border-[#E3EAF3] text-center">
              <span className="text-xs text-[#444651] block mb-1">التشطيب</span>
              <span className="text-xs font-bold text-[#00236e]">{property.finishing}</span>
            </div>
          </div>

          {/* Legal Status & Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#00236e] flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              الوضع القانوني والمواصفات
            </h3>
            <div className="p-3.5 bg-[#F5F8FC] rounded-xl text-xs space-y-1.5 border border-[#E3EAF3]">
              <div className="flex items-center gap-1.5 text-[#0b1b37]">
                <CheckCircle2 className="w-4 h-4 text-[#1E9E6A]" />
                <span>حالة التسجيل: <strong>{property.ownershipStatus}</strong></span>
              </div>
              <p className="text-[#444651] leading-relaxed pt-1">{property.description}</p>
            </div>
          </div>

          {/* Loan / Installment Calculator */}
          <div className="bg-[#FDF4D8] p-4 rounded-2xl border border-[#fdcc33]/40 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#755b00] flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                حاسبة القسط والتمويل التقديري
              </h3>
              <span className="text-[11px] font-bold text-[#755b00] bg-white/70 px-2 py-0.5 rounded-md">
                فائدة تقريبية
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#755b00] font-bold mb-1">
                  المقدم: {downPaymentPercent}% ({downPaymentAmount.toLocaleString()} ج.م)
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#755b00] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-[#755b00] font-bold mb-1">
                  فترة التقسيط: {loanYears} سنوات
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full accent-[#755b00] cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl flex items-center justify-between border border-[#fdcc33]/50">
              <span className="text-xs font-bold text-[#444651]">القسط الشهري المتوقع:</span>
              <span className="text-base font-black text-[#755b00]">
                {monthlyInstallment.toLocaleString()} ج.م / شهر
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer / Contact Actions */}
        <div className="p-4 border-t border-[#E3EAF3] bg-white flex flex-col sm:flex-row gap-2.5">
          <a
            href={`https://wa.me/201012345678?text=مرحباً،%20أنا%20مهتم%20بالعقار%20كود%20${property.id}%20(${property.title})`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 h-12 bg-[#25D366] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            تواصل عبر واتساب
          </a>

          <a
            href={`tel:${property.contactPhone || '+201012345678'}`}
            className="flex-1 h-12 bg-[#00236e] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#1b3a8c] transition-colors shadow-xs"
          >
            <Phone className="w-4 h-4" />
            اتصال هاتفي
          </a>

          <button
            onClick={() => onToggleCompare(property)}
            className={`px-4 h-12 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer ${
              isCompared
                ? 'bg-[#1E9E6A] text-white'
                : 'bg-[#DCE9F7] text-[#00236e] hover:bg-[#c5c6d3]'
            }`}
          >
            <span>{isCompared ? 'في المقارنة ✓' : 'مقارنة'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
