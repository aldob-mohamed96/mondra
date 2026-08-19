import React, { useState } from 'react';
import { BUILDING_MATERIALS, QENA_CITIES } from '../../data/mockData';
import { FinishingQuality, FinishingCostResult } from '../../types';
import {
  Maximize2,
  Building,
  Paintbrush,
  MapPin,
  Calculator,
  TrendingUp,
  Info,
  Wrench,
  Layers,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export const FinishingCalculatorScreen: React.FC = () => {
  const [area, setArea] = useState<string>('120');
  const [propertyType, setPropertyType] = useState<'apartment' | 'villa' | 'shop'>('apartment');
  const [finishingLevel, setFinishingLevel] = useState<FinishingQuality>('lux');
  const [city, setCity] = useState<string>('qena_city');
  const [calculatedResult, setCalculatedResult] = useState<FinishingCostResult | null>(null);

  const calculateCost = (e: React.FormEvent) => {
    e.preventDefault();
    const areaNum = parseFloat(area) || 0;
    if (areaNum <= 0) return;

    // Rate per square meter based on level in Qena
    let ratePerMeter = 2800; // default for lux
    let duration = '6 إلى 8 أسابيع';

    if (finishingLevel === 'half_lux') {
      ratePerMeter = 1600;
      duration = '3 إلى 5 أسابيع';
    } else if (finishingLevel === 'lux') {
      ratePerMeter = 2800;
      duration = '6 إلى 8 أسابيع';
    } else if (finishingLevel === 'super_lux') {
      ratePerMeter = 4200;
      duration = '8 إلى 12 أسبوعاً';
    }

    // Adjust for property type
    if (propertyType === 'villa') ratePerMeter *= 1.15;
    if (propertyType === 'shop') ratePerMeter *= 0.9;

    const total = areaNum * ratePerMeter;
    const minTotal = Math.round(total * 0.92);
    const maxTotal = Math.round(total * 1.08);

    setCalculatedResult({
      totalEstimatedMin: minTotal,
      totalEstimatedMax: maxTotal,
      pricePerMeter: Math.round(ratePerMeter),
      breakdown: {
        plumbingAndElectrical: Math.round(total * 0.25),
        masonryAndPlaster: Math.round(total * 0.20),
        tilesAndFlooring: Math.round(total * 0.25),
        carpentryAndAlumital: Math.round(total * 0.15),
        paintAndDecor: Math.round(total * 0.15)
      },
      durationWeeks: duration
    });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6 font-['Cairo',sans-serif]">
      {/* Header Section */}
      <section className="flex flex-col gap-1 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#00236e]">حاسبة التشطيب</h2>
        <p className="text-sm md:text-base text-[#444651]">
          احسب التكلفة التقديرية لتشطيب وحدتك في قنا بناءً على أحدث أسعار السوق.
        </p>
      </section>

      {/* Calculator Form */}
      <section className="bg-white rounded-2xl p-5 md:p-7 shadow-xs border border-[#E3EAF3]">
        <form onSubmit={calculateCost} className="space-y-5">
          {/* Row 1: Area & Property Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Area Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="area" className="font-bold text-sm text-[#0b1b37] flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#00236e]" />
                المساحة (م٢)
              </label>
              <div className="relative">
                <input
                  id="area"
                  type="number"
                  min="10"
                  max="2000"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="أدخل المساحة..."
                  required
                  className="w-full bg-[#f9f9ff] border border-[#c5c6d3] rounded-xl px-4 py-3 text-base text-[#0b1b37] focus:outline-none focus:border-[#00236e] focus:ring-3 focus:ring-[#DCE9F7] transition-all text-right"
                />
              </div>
            </div>

            {/* Property Type Radio Group */}
            <div className="flex flex-col gap-2">
              <label className="font-bold text-sm text-[#0b1b37] flex items-center gap-1.5">
                <Building className="w-4 h-4 text-[#00236e]" />
                نوع الوحدة
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'apartment', label: 'شقة' },
                  { id: 'villa', label: 'فيلا' },
                  { id: 'shop', label: 'محل' }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPropertyType(type.id as 'apartment' | 'villa' | 'shop')}
                    className={`flex-1 py-3 px-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      propertyType === type.id
                        ? 'bg-[#00236e] text-white shadow-xs'
                        : 'border border-[#c5c6d3] text-[#444651] hover:bg-[#F2F7FD]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Finishing Level (3 Options with badge) */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm text-[#0b1b37] flex items-center gap-1.5">
              <Paintbrush className="w-4 h-4 text-[#00236e]" />
              مستوى التشطيب
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Half Lux */}
              <button
                type="button"
                onClick={() => setFinishingLevel('half_lux')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer relative h-22 ${
                  finishingLevel === 'half_lux'
                    ? 'bg-[#00236e] text-white border-[#00236e] shadow-xs'
                    : 'border-[#c5c6d3] text-[#444651] hover:bg-[#F2F7FD]'
                }`}
              >
                <span className="font-bold text-sm">نص لوكس</span>
                <span className="text-[11px] opacity-80 mt-1">أساسيات اقتصادية</span>
              </button>

              {/* Lux (Most Popular) */}
              <button
                type="button"
                onClick={() => setFinishingLevel('lux')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer relative h-22 overflow-hidden ${
                  finishingLevel === 'lux'
                    ? 'bg-[#00236e] text-white border-[#00236e] shadow-xs'
                    : 'border-[#c5c6d3] text-[#444651] hover:bg-[#F2F7FD]'
                }`}
              >
                <div className="absolute top-0 right-0 bg-[#fdcc33] text-[#6f5600] px-2 py-0.5 rounded-bl-lg text-[10px] font-bold">
                  الأكثر طلباً
                </div>
                <span className="font-bold text-sm mt-2">لوكس</span>
                <span className="text-[11px] opacity-80 mt-0.5">جودة قياسية</span>
              </button>

              {/* Super Lux */}
              <button
                type="button"
                onClick={() => setFinishingLevel('super_lux')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer relative h-22 ${
                  finishingLevel === 'super_lux'
                    ? 'bg-[#00236e] text-white border-[#00236e] shadow-xs'
                    : 'border-[#c5c6d3] text-[#444651] hover:bg-[#F2F7FD]'
                }`}
              >
                <span className="font-bold text-sm">سوبر لوكس</span>
                <span className="text-[11px] opacity-80 mt-1">خامات ممتازة</span>
              </button>
            </div>
          </div>

          {/* Row 3: City */}
          <div className="flex flex-col gap-2">
            <label htmlFor="city" className="font-bold text-sm text-[#0b1b37] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#00236e]" />
              المدينة (محافظة قنا)
            </label>
            <div className="relative">
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#f9f9ff] border border-[#c5c6d3] rounded-xl px-4 py-3 text-base text-[#0b1b37] focus:outline-none focus:border-[#00236e] focus:ring-3 focus:ring-[#DCE9F7] transition-all text-right appearance-none cursor-pointer"
              >
                {QENA_CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-[#757683]">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-13 bg-[#00236e] hover:bg-[#1b3a8c] text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
            >
              <Calculator className="w-5 h-5" />
              احسب التكلفة التقديرية
            </button>
          </div>
        </form>

        {/* Calculation Result Panel */}
        {calculatedResult && (
          <div className="mt-6 pt-6 border-t border-[#E3EAF3] animate-in fade-in duration-300">
            <div className="bg-[#F5F8FC] rounded-2xl p-5 border border-[#DCE9F7] mb-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
                <div>
                  <span className="text-xs font-bold text-[#755b00] bg-[#FDF4D8] px-2.5 py-1 rounded-full">
                    تقدير التكلفة الإجمالية
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#00236e] mt-1.5">
                    {calculatedResult.totalEstimatedMin.toLocaleString()} - {calculatedResult.totalEstimatedMax.toLocaleString()}{' '}
                    <span className="text-sm font-semibold text-[#444651]">ج.م</span>
                  </div>
                  <p className="text-xs text-[#444651] mt-0.5">
                    متوسط سعر المتر: <span className="font-bold text-[#00236e]">{calculatedResult.pricePerMeter.toLocaleString()} ج.م/م²</span>
                  </p>
                </div>

                <div className="bg-white px-4 py-2.5 rounded-xl border border-[#E3EAF3] shadow-2xs">
                  <span className="text-[11px] text-[#444651] block">المدة التقديرية للتسليم:</span>
                  <span className="text-sm font-bold text-[#1E9E6A]">{calculatedResult.durationWeeks}</span>
                </div>
              </div>

              {/* Itemized Breakdown */}
              <div className="mt-5 space-y-2">
                <h4 className="text-xs font-bold text-[#00236e] mb-2 flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5" />
                  توزيع التكلفة التقديري على مراحل التنفيذ:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between p-2.5 rounded-lg bg-white border border-[#E3EAF3]">
                    <span className="text-[#444651]">⚡ سباكة وتأسيس كهرباء (25%)</span>
                    <span className="font-bold text-[#00236e]">{calculatedResult.breakdown.plumbingAndElectrical.toLocaleString()} ج.م</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-white border border-[#E3EAF3]">
                    <span className="text-[#444651]">🧱 محارة وجبس بورد (20%)</span>
                    <span className="font-bold text-[#00236e]">{calculatedResult.breakdown.masonryAndPlaster.toLocaleString()} ج.م</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-white border border-[#E3EAF3]">
                    <span className="text-[#444651]">🏠 سيراميك وبورسلين (25%)</span>
                    <span className="font-bold text-[#00236e]">{calculatedResult.breakdown.tilesAndFlooring.toLocaleString()} ج.م</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-white border border-[#E3EAF3]">
                    <span className="text-[#444651]">🚪 نجارة وألوميتال وأبواب (15%)</span>
                    <span className="font-bold text-[#00236e]">{calculatedResult.breakdown.carpentryAndAlumital.toLocaleString()} ج.م</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Market Prices Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold text-[#0b1b37] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#755b00]" />
            أسعار مواد البناء اليوم في قنا
          </h3>
          <span className="text-xs font-bold text-[#00236e] bg-[#e0e8ff] px-2.5 py-1 rounded-md">
            تحديث يومي
          </span>
        </div>

        {/* 4 Grid Cards as shown in Image 7 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Cement */}
          <div className="bg-white rounded-xl p-3.5 border border-[#E3EAF3] shadow-xs flex flex-col gap-1 items-start relative overflow-hidden group">
            <div className="bg-[#F2F7FD] p-2 rounded-lg text-[#00236e] mb-1">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xs text-[#444651]">الأسمنت (طن)</span>
            <span className="text-base font-bold text-[#0b1b37]">2,450 ج.م</span>
          </div>

          {/* Steel */}
          <div className="bg-white rounded-xl p-3.5 border border-[#E3EAF3] shadow-xs flex flex-col gap-1 items-start relative overflow-hidden group">
            <div className="bg-[#ffdad6]/50 p-2 rounded-lg text-[#ba1a1a] mb-1">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xs text-[#444651]">الحديد (طن)</span>
            <span className="text-base font-bold text-[#0b1b37]">42,000 ج.م</span>
          </div>

          {/* Ceramics */}
          <div className="bg-white rounded-xl p-3.5 border border-[#E3EAF3] shadow-xs flex flex-col gap-1 items-start relative overflow-hidden group">
            <div className="bg-[#DCE9F7] p-2 rounded-lg text-[#00236e] mb-1">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs text-[#444651]">سيراميك فرز أول (م٢)</span>
            <span className="text-base font-bold text-[#0b1b37]">180 ج.م</span>
          </div>

          {/* Bricks */}
          <div className="bg-white rounded-xl p-3.5 border border-[#E3EAF3] shadow-xs flex flex-col gap-1 items-start relative overflow-hidden group">
            <div className="bg-[#FDF4D8] p-2 rounded-lg text-[#755b00] mb-1">
              <Building className="w-5 h-5" />
            </div>
            <span className="text-xs text-[#444651]">طوب أحمر (ألف طوبة)</span>
            <span className="text-base font-bold text-[#0b1b37]">1,200 ج.م</span>
          </div>
        </div>

        <p className="text-xs text-[#444651] opacity-80 mt-1 flex items-start gap-1">
          <Info className="w-4 h-4 shrink-0 text-[#00236e]" />
          الأسعار تقريبية وقد تختلف قليلاً حسب التاجر وتكاليف النقل داخل مراكز قنا (نجع حمادي، قوص، نقادة، قفط، دشنا).
        </p>
      </section>
    </main>
  );
};
