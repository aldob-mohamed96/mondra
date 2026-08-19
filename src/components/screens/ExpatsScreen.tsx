import React, { useState } from 'react';
import { CURRENCY_RATES } from '../../data/mockData';
import {
  Video,
  FileCheck2,
  HardHat,
  Coins,
  ShieldCheck,
  Award,
  Handshake,
  MessageCircle,
  Calendar,
  Sparkles,
  Calculator,
  CheckCircle2,
  Phone
} from 'lucide-react';

export const ExpatsScreen: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('SAR');
  const [egpAmount, setEgpAmount] = useState<number>(1200000);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingService, setBookingService] = useState<string>('جولة فيديو مباشرة');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const selectedRate = CURRENCY_RATES[selectedCurrency] || CURRENCY_RATES['SAR'];
  const convertedAmount = egpAmount > 0 ? (egpAmount / selectedRate.rateToEGP).toLocaleString('en-US', { maximumFractionDigits: 0 }) : '0';

  const handleOpenBooking = (serviceName: string) => {
    setBookingService(serviceName);
    setBookingSuccess(false);
    setShowBookingModal(true);
  };

  return (
    <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6 font-['Cairo',sans-serif]">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden min-h-[280px] flex items-center justify-center shadow-md">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB32JkYIDHZZDrPrK_Od-DPLtszs4qk_96bX2TyogtSLt2Gyn8JB2VgQkQ9fvcXOee-O-hOtX0OhWNwnPnRLZP1zDheniRvJ-0f0oih3CZHxeCQu-Amsgz7TIXKFmHdCBg9gmalS-qQnMNsrHt-IfsoEaHuivezBSW-o7KscoqjGBDboaS8F8RLfg7l-TQNHbEPb-BGm59NE-hWoddjgbGZ3DRDY_OwQCrftcc29oQB-CEGGCk5cA"
          alt="Expats real estate Upper Egypt"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-[#0F2557]/75 backdrop-blur-2xs z-10"></div>
        <div className="relative z-20 text-center px-4 py-8 flex flex-col items-center gap-3">
          <span className="text-xs font-bold text-[#fdcc33] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            مُندرة للمغتربين 🌍
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            خدمات المصريين بالخارج
          </h1>
          <p className="text-sm md:text-base text-[#DCE9F7] max-w-xl text-center leading-relaxed">
            استثمر في عقارات صعيد مصر بأمان تام. نحن نوفر لك خدمات متخصصة لضمان الشفافية والموثوقية وأنت في مكانك.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Service Card 1 */}
        <article
          onClick={() => handleOpenBooking('جولة فيديو مباشرة مع مهندس الموقع')}
          className="bg-white rounded-2xl p-5 border border-[#E3EAF3] shadow-xs flex flex-col gap-3 hover:shadow-md transition-all relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F2F7FD] rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-13 h-13 rounded-full bg-[#00236e] flex items-center justify-center text-white shrink-0 shadow-md">
              <Video className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#00236e]">جولة فيديو مباشرة</h2>
                <span className="text-[11px] font-bold text-[#00236e] bg-[#DCE9F7] px-2 py-0.5 rounded-full">
                  احجز جولة
                </span>
              </div>
              <p className="text-xs text-[#444651] leading-relaxed">
                عاين عقارك كأنك هناك. نوفر لك جولات فيديو حية ومسجلة لتفقد كافة تفاصيل العقار ومحيطه بدقة عالية مع مهندس معتمد.
              </p>
            </div>
          </div>
        </article>

        {/* Service Card 2 */}
        <article
          onClick={() => handleOpenBooking('فحص ومراجعة المستندات والشهر العقاري')}
          className="bg-white rounded-2xl p-5 border border-[#E3EAF3] shadow-xs flex flex-col gap-3 hover:shadow-md transition-all relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FDF4D8] rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-13 h-13 rounded-full bg-[#755b00] flex items-center justify-center text-white shrink-0 shadow-md">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#755b00]">مراجعة المستندات</h2>
                <span className="text-[11px] font-bold text-[#755b00] bg-[#FDF4D8] px-2 py-0.5 rounded-full">
                  فحص قانوني
                </span>
              </div>
              <p className="text-xs text-[#444651] leading-relaxed">
                فحص قانوني شامل لكافة أوراق الملكية والتراخيص لضمان سلامة الموقف القانوني للعقار وتجنب أي نزاعات مستقبلية.
              </p>
            </div>
          </div>
        </article>

        {/* Service Card 3 */}
        <article
          onClick={() => handleOpenBooking('متابعة مراحل البناء والتشطيب')}
          className="bg-white rounded-2xl p-5 border border-[#E3EAF3] shadow-xs flex flex-col gap-3 hover:shadow-md transition-all relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F2F7FD] rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-13 h-13 rounded-full bg-[#00236e] flex items-center justify-center text-white shrink-0 shadow-md">
              <HardHat className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#00236e]">متابعة البناء</h2>
                <span className="text-[11px] font-bold text-[#00236e] bg-[#DCE9F7] px-2 py-0.5 rounded-full">
                  تقارير دورية
                </span>
              </div>
              <p className="text-xs text-[#444651] leading-relaxed">
                تقارير دورية مصورة عن تقدم أعمال البناء والتشطيبات، لتبقى على اطلاع دائم بمراحل تطور استثمارك خطوة بخطوة.
              </p>
            </div>
          </div>
        </article>

        {/* Service Card 4 */}
        <article className="bg-white rounded-2xl p-5 border border-[#E3EAF3] shadow-xs flex flex-col gap-3 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FDF4D8] rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform"></div>
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-13 h-13 rounded-full bg-[#755b00] flex items-center justify-center text-white shrink-0 shadow-md">
              <Coins className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <h2 className="text-lg font-bold text-[#755b00]">عرض السعر بعملتك</h2>
              <p className="text-xs text-[#444651] leading-relaxed">
                تسهيل حساباتك من خلال عرض أسعار العقارات وخيارات السداد بما يعادل العملة التي تتعامل بها في بلد إقامتك.
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Interactive Currency Converter Widget */}
      <section className="bg-white rounded-2xl p-5 border border-[#E3EAF3] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-[#00236e] flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#fdcc33]" />
            حاسبة تحويل سعر العقار للعملات الخليجية والأجنبية
          </h3>
          <span className="text-xs font-semibold text-[#444651] bg-[#F5F8FC] px-2.5 py-1 rounded-full">
            سعر الصرف البنكي
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-[#444651] mb-1.5">
              أدخل سعر العقار بالجنيه المصري (EGP)
            </label>
            <input
              type="number"
              value={egpAmount}
              onChange={(e) => setEgpAmount(Number(e.target.value) || 0)}
              className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-base font-bold text-[#00236e]"
              placeholder="مثال: 1,500,000"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#444651] mb-1.5">
              اختر العملة المقابلة
            </label>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {Object.keys(CURRENCY_RATES).map((currKey) => {
                const info = CURRENCY_RATES[currKey];
                const isSelected = selectedCurrency === currKey;
                return (
                  <button
                    key={currKey}
                    type="button"
                    onClick={() => setSelectedCurrency(currKey)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#00236e] text-white shadow-xs'
                        : 'bg-[#F5F8FC] text-[#444651] border border-[#E3EAF3] hover:bg-[#DCE9F7]'
                    }`}
                  >
                    {info.flag} {info.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-[#FDF4D8] border border-[#fdcc33]/40 flex items-center justify-between">
          <span className="text-xs font-bold text-[#755b00]">السعر التقديري بعملة {selectedRate.name}:</span>
          <div className="text-right">
            <span className="text-xl font-black text-[#755b00]">
              {convertedAmount} {selectedRate.symbol}
            </span>
            <span className="block text-[10px] text-[#755b00]/80">
              (1 {selectedRate.symbol} ≈ {selectedRate.rateToEGP} ج.م)
            </span>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="bg-[#F5F8FC] rounded-2xl p-5 flex flex-wrap items-center justify-around gap-4 border border-[#E3EAF3]">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#755b00]" />
          <span className="text-sm font-bold text-[#0b1b37]">توثيق ميداني معتمد</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#00236e]" />
          <span className="text-sm font-bold text-[#0b1b37]">أمان مالي وقانوني</span>
        </div>
        <div className="flex items-center gap-2">
          <Handshake className="w-5 h-5 text-[#755b00]" />
          <span className="text-sm font-bold text-[#0b1b37]">شفافية تامة بدون وسيط</span>
        </div>
      </section>

      {/* Bottom WhatsApp CTA */}
      <div className="pt-2 pb-6">
        <a
          href="https://wa.me/201012345678?text=مرحباً،%20أنا%20مقيم%20بالخارج%20وأرغب%20في%20استشارة%20عقارية%20بشأن%20عقارات%20قنا"
          target="_blank"
          rel="noreferrer"
          className="w-full h-13 bg-[#25D366] text-white rounded-xl flex items-center justify-center gap-2 text-base font-bold shadow-lg hover:bg-[#20bd5a] active:scale-[0.98] transition-all cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" />
          تحدث مع مستشار العقارات للمغتربين (واتساب)
        </a>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#E3EAF3]" dir="rtl">
            {!bookingSuccess ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBookingSuccess(true);
                }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <span className="text-xs font-bold text-[#00236e] bg-[#DCE9F7] px-3 py-1 rounded-full">
                    طلب خدمة مغترب
                  </span>
                  <h3 className="text-lg font-bold text-[#00236e] mt-2">{bookingService}</h3>
                  <p className="text-xs text-[#444651] mt-1">
                    سيتواصل معك مهندس ومستشار مُندرة لتحديد الموعد المناسب وتجهيز التقرير.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b1b37] mb-1">الاسم الكريم</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد محمود"
                    className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b1b37] mb-1">رقم الواتساب مع كود الدولة</label>
                  <input
                    type="tel"
                    required
                    placeholder="+966 50 123 4567"
                    className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-sm text-left"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b1b37] mb-1">المنطقة أو العقار المستهدف في قنا</label>
                  <input
                    type="text"
                    placeholder="مثال: حوض 10 / قنا الجديدة / الشؤون"
                    className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-sm"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#00236e] text-white rounded-xl font-bold text-sm hover:bg-[#1b3a8c] transition-colors"
                  >
                    تأكيد الطلب
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="px-4 py-3 border border-[#c5c6d3] text-[#444651] rounded-xl font-semibold text-sm"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-[#E8F5E9] text-[#1E9E6A] rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-[#00236e]">تم استلام طلبك بنجاح!</h3>
                <p className="text-xs text-[#444651] leading-relaxed">
                  سيقوم مستشار خدمة المغتربين بالتواصل معك عبر الواتساب في غضون 30 دقيقة لترتيب موعد الجولة أو الفحص.
                </p>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="w-full py-2.5 bg-[#00236e] text-white rounded-xl font-bold text-sm mt-2"
                >
                  حسناً
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
