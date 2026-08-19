import React, { useState } from 'react';
import { Property, PropertyType, TransactionType } from '../../types';
import { QENA_CITIES } from '../../data/mockData';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Building,
  Mountain,
  Home,
  Store,
  CheckCircle2,
  Upload,
  Camera,
  ShieldCheck,
  Sparkles,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddListingScreenProps {
  onClose: () => void;
  onListingAdded: (newProperty: Property) => void;
}

export const AddListingScreen: React.FC<AddListingScreenProps> = ({
  onClose,
  onListingAdded
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [transactionType, setTransactionType] = useState<TransactionType>('sell');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('qena_city');
  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');
  const [rooms, setRooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('1');
  const [price, setPrice] = useState('');
  const [finishing, setFinishing] = useState('سوبر لوكس');
  const [ownershipStatus, setOwnershipStatus] = useState('مسجل شهر عقاري');
  const [description, setDescription] = useState('');
  const [requestVerification, setRequestVerification] = useState(true);
  const [phone, setPhone] = useState('');

  const stepTitles = [
    'النوع والتصنيف',
    'مواصفات العقار والموقع',
    'السعر ونظام السداد',
    'الصور والتوثيق الميداني',
    'مراجعة ونشر الإعلان'
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Publish listing
      const newProp: Property = {
        id: `prop-${Date.now()}`,
        title: title || `${propertyType === 'apartment' ? 'شقة' : propertyType === 'villa' ? 'فيلا' : 'عقار'} مميز في ${district || 'قنا'}`,
        location: `قنا, ${district || 'المدينة'}`,
        city: city,
        district: district || 'وسط البلد',
        price: parseFloat(price) || 1200000,
        area: parseFloat(area) || 120,
        rooms: parseInt(rooms, 10) || 3,
        bathrooms: parseInt(bathrooms, 10) || 1,
        propertyType,
        transactionType,
        verificationLevel: requestVerification ? 'field_verified' : 'standard',
        verificationBadgeText: requestVerification ? 'موثق ميدانياً' : 'إعلان قياسي',
        finishing,
        ownershipStatus,
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCTTMizN4fUovniE3I5pwUwImH02AGEistR-FagzfbNimH5rti7h8Q1rqGVN6o_xqaRefRz_7DTb6EcUtnkmt6n3cXMN314eqDXDYPMGyBED5aAHJ-nXGewOKGb_f4E1ubFbqqOhlveoraerl5O8QzF4vEj8by4Moa8PswHmpTmQfyaidEcDhhFhNk0-ehjN4JGeTMzUmxVfzMDK4sDg-qIU3v7q_U27kh3cmpJ8cUaxhgww664Tg'
        ],
        description: description || 'عقار مميز بموقع راقي مع كافة المرافق والخدمات جاهز للمعاينة الفورية.',
        postedDate: 'الآن',
        installmentAvailable: true,
        contactPhone: phone || '+201012345678'
      };

      onListingAdded(newProp);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#0b1b37] pb-24 font-['Cairo',sans-serif]">
      {/* TopAppBar */}
      <header className="bg-white w-full top-0 sticky flex flex-row-reverse justify-between items-center px-4 h-14 z-40 border-b border-[#E3EAF3]">
        <button
          onClick={onClose}
          className="p-2 text-[#00236e] hover:bg-[#F2F7FD] transition-colors rounded-full cursor-pointer"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-lg text-[#00236e] text-center flex-1">
          أضف إعلانك
        </h1>
        <div className="w-9"></div>
      </header>

      {!isSuccess ? (
        <main className="px-4 pt-5 pb-8 max-w-2xl mx-auto" dir="rtl">
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#00236e]">
                {stepTitles[currentStep - 1]}
              </span>
              <span className="text-xs text-[#444651]">
                الخطوة {currentStep} من 5
              </span>
            </div>
            <div className="flex gap-1.5 w-full h-2 rounded-full overflow-hidden">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`h-full flex-1 rounded-full transition-all duration-300 ${
                    step <= currentStep ? 'bg-[#00236e]' : 'bg-[#e0e8ff]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: Type & Classification (Exact match to Image 11) */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              {/* Transaction Type */}
              <section>
                <h2 className="text-base font-bold mb-2.5 text-[#0b1b37]">نوع الإعلان</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTransactionType('sell')}
                    className={`py-3.5 px-4 rounded-xl text-base font-bold transition-all cursor-pointer ${
                      transactionType === 'sell'
                        ? 'bg-[#00236e] text-white shadow-sm'
                        : 'bg-white border border-[#E3EAF3] text-[#444651] hover:bg-[#F5F8FC]'
                    }`}
                  >
                    للبيع
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransactionType('rent')}
                    className={`py-3.5 px-4 rounded-xl text-base font-bold transition-all cursor-pointer ${
                      transactionType === 'rent'
                        ? 'bg-[#00236e] text-white shadow-sm'
                        : 'bg-white border border-[#E3EAF3] text-[#444651] hover:bg-[#F5F8FC]'
                    }`}
                  >
                    للإيجار
                  </button>
                </div>
              </section>

              {/* Property Category (Grid with Icons) */}
              <section>
                <h2 className="text-base font-bold mb-2.5 text-[#0b1b37]">تصنيف العقار</h2>
                <div className="grid grid-cols-2 gap-3">
                  {/* Apartment */}
                  <div
                    onClick={() => setPropertyType('apartment')}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all relative cursor-pointer ${
                      propertyType === 'apartment'
                        ? 'border-[#00236e] bg-[#F2F7FD] text-[#00236e]'
                        : 'border-[#E3EAF3] bg-white text-[#444651] hover:border-[#c5c6d3]'
                    }`}
                  >
                    {propertyType === 'apartment' && (
                      <div className="absolute top-2.5 left-2.5 text-[#00236e]">
                        <CheckCircle2 className="w-5 h-5 fill-[#00236e] text-white" />
                      </div>
                    )}
                    <Building className="w-10 h-10 mb-2" />
                    <span className="font-bold text-base">شقة</span>
                  </div>

                  {/* Land */}
                  <div
                    onClick={() => setPropertyType('land')}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all relative cursor-pointer ${
                      propertyType === 'land'
                        ? 'border-[#00236e] bg-[#F2F7FD] text-[#00236e]'
                        : 'border-[#E3EAF3] bg-white text-[#444651] hover:border-[#c5c6d3]'
                    }`}
                  >
                    {propertyType === 'land' && (
                      <div className="absolute top-2.5 left-2.5 text-[#00236e]">
                        <CheckCircle2 className="w-5 h-5 fill-[#00236e] text-white" />
                      </div>
                    )}
                    <Mountain className="w-10 h-10 mb-2" />
                    <span className="font-bold text-base">أرض</span>
                  </div>

                  {/* Villa */}
                  <div
                    onClick={() => setPropertyType('villa')}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all relative cursor-pointer ${
                      propertyType === 'villa'
                        ? 'border-[#00236e] bg-[#F2F7FD] text-[#00236e]'
                        : 'border-[#E3EAF3] bg-white text-[#444651] hover:border-[#c5c6d3]'
                    }`}
                  >
                    {propertyType === 'villa' && (
                      <div className="absolute top-2.5 left-2.5 text-[#00236e]">
                        <CheckCircle2 className="w-5 h-5 fill-[#00236e] text-white" />
                      </div>
                    )}
                    <Home className="w-10 h-10 mb-2" />
                    <span className="font-bold text-base">فيلا</span>
                  </div>

                  {/* Commercial */}
                  <div
                    onClick={() => setPropertyType('commercial')}
                    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all relative cursor-pointer ${
                      propertyType === 'commercial'
                        ? 'border-[#00236e] bg-[#F2F7FD] text-[#00236e]'
                        : 'border-[#E3EAF3] bg-white text-[#444651] hover:border-[#c5c6d3]'
                    }`}
                  >
                    {propertyType === 'commercial' && (
                      <div className="absolute top-2.5 left-2.5 text-[#00236e]">
                        <CheckCircle2 className="w-5 h-5 fill-[#00236e] text-white" />
                      </div>
                    )}
                    <Store className="w-10 h-10 mb-2" />
                    <span className="font-bold text-base">محل تجاري</span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* STEP 2: Specs & Location */}
          {currentStep === 2 && (
            <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#E3EAF3] animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-[#0b1b37] mb-1">عنوان الإعلان المختصر</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: شقة للبيع بفيو مفتوح في حوض 10"
                  className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0b1b37] mb-1">المركز / المدينة</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-sm bg-white"
                  >
                    {QENA_CITIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b1b37] mb-1">المنطقة أو الحي</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="مثال: الشؤون / حوض 10"
                    className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0b1b37] mb-1">المساحة (م²)</label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="120"
                    className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b1b37] mb-1">عدد الغرف</label>
                  <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0b1b37] mb-1">الحمامات</label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0b1b37] mb-1">حالة التشطيب</label>
                <select
                  value={finishing}
                  onChange={(e) => setFinishing(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-sm bg-white"
                >
                  <option value="سوبر لوكس">سوبر لوكس</option>
                  <option value="لوكس">لوكس</option>
                  <option value="نصف تشطيب">نصف تشطيب</option>
                  <option value="ألترا سوبر لوكس">ألترا سوبر لوكس</option>
                  <option value="طوب أحمر">طوب أحمر بدون تشطيب</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Price & Payment */}
          {currentStep === 3 && (
            <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#E3EAF3] animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-[#0b1b37] mb-1">السعر المطلوب (بالجنيه المصري)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="مثال: 1,200,000"
                  className="w-full h-12 px-4 rounded-xl border border-[#00236e] text-lg font-bold text-[#00236e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0b1b37] mb-1">الوضع القانوني للملكية</label>
                <select
                  value={ownershipStatus}
                  onChange={(e) => setOwnershipStatus(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#c5c6d3] text-sm bg-white"
                >
                  <option value="مسجل شهر عقاري">مسجل شهر عقاري رسمي</option>
                  <option value="عقد ابتدائي صحة توقيع">عقد ابتدائي حاصل على صحة توقيع</option>
                  <option value="تخصيص هيئة المجتمعات العمرانية">تخصيص هيئة المجتمعات العمرانية</option>
                  <option value="حصة في الأرض وترخيص بناء">حصة في الأرض وترخيص بناء سارٍ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0b1b37] mb-1">وصف تفصيلي للعقار</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اكتب مميزات العقار، الواجهة، القرب من الخدمات والمواصلات..."
                  className="w-full p-3 rounded-xl border border-[#c5c6d3] text-sm"
                ></textarea>
              </div>
            </div>
          )}

          {/* STEP 4: Photos & Verification Request */}
          {currentStep === 4 && (
            <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#E3EAF3] animate-in fade-in">
              {/* Image Upload Placeholder */}
              <div className="border-2 border-dashed border-[#00236e]/30 rounded-2xl p-6 text-center bg-[#F2F7FD]/50 hover:bg-[#F2F7FD] transition-colors cursor-pointer">
                <Camera className="w-10 h-10 mx-auto text-[#00236e] mb-2" />
                <h3 className="font-bold text-sm text-[#00236e]">ارفع صور العقار (حتى 10 صور)</h3>
                <p className="text-xs text-[#444651] mt-1">
                  الصور الواضحة تزيد من سرعة بيع وتأجير العقار بنسبة 300%
                </p>
                <span className="inline-block mt-3 px-4 py-1.5 bg-[#00236e] text-white text-xs font-bold rounded-xl shadow-xs">
                  اختر من المعرض
                </span>
              </div>

              {/* Field Verification Request Card */}
              <div className="p-4 rounded-2xl bg-[#FDF4D8] border border-[#fdcc33] flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-[#755b00] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-[#755b00]">
                      طلب التوثيق الميداني المعتمد من مُندرة
                    </h4>
                    <input
                      type="checkbox"
                      checked={requestVerification}
                      onChange={(e) => setRequestVerification(e.target.checked)}
                      className="w-5 h-5 accent-[#00236e] cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-[#444651] mt-1 leading-relaxed">
                    نقوم بإرسال مصور محترف ومراجع قانوني لمعاينة العقار ومنحه الشارة الذهبية الموثقة لجذب المشترين الجادين والمغتربين.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Contact & Final Review */}
          {currentStep === 5 && (
            <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#E3EAF3] animate-in fade-in">
              <div className="text-center mb-2">
                <span className="text-xs font-bold text-[#1E9E6A] bg-[#E8F5E9] px-3 py-1 rounded-full">
                  الخطوة الأخيرة
                </span>
                <h3 className="text-lg font-bold text-[#00236e] mt-1">تأكيد بيانات التواصل</h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0b1b37] mb-1">رقم الهاتف / الواتساب للتواصل مع المشترين</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01012345678"
                  className="w-full h-12 px-4 rounded-xl border border-[#c5c6d3] text-base font-bold text-[#00236e] text-left"
                />
              </div>

              {/* Summary Card */}
              <div className="bg-[#F5F8FC] p-4 rounded-xl text-xs space-y-2 border border-[#E3EAF3]">
                <div className="flex justify-between">
                  <span className="text-[#444651]">نوع العقار:</span>
                  <span className="font-bold text-[#00236e]">{propertyType} ({transactionType === 'sell' ? 'بيع' : 'إيجار'})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#444651]">الموقع:</span>
                  <span className="font-bold text-[#00236e]">قنا - {district || 'المدينة'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#444651]">السعر:</span>
                  <span className="font-bold text-[#00236e]">{price ? Number(price).toLocaleString() : '1,200,000'} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#444651]">شارة التوثيق:</span>
                  <span className="font-bold text-[#1E9E6A]">مطلوب زيارة ميدانية</span>
                </div>
              </div>
            </div>
          )}
        </main>
      ) : (
        /* Celebration / Success Screen */
        <div className="px-4 py-12 max-w-md mx-auto text-center animate-in fade-in" dir="rtl">
          <div className="w-20 h-20 bg-[#E8F5E9] text-[#1E9E6A] rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-black text-[#00236e] mb-2">تم نشر إعلانك بنجاح!</h2>
          <p className="text-sm text-[#444651] mb-6 leading-relaxed">
            سيظهر إعلانك الآن لآلاف الباحثين عن عقارات في قنا والمغتربين بالخارج، وسيقوم فريق التوثيق بالتواصل لتأكيد الزيارة.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-[#00236e] text-white rounded-xl font-bold text-base shadow-md hover:bg-[#1b3a8c] transition-colors cursor-pointer"
          >
            العودة للرئيسية
          </button>
        </div>
      )}

      {/* Fixed Bottom Action Area */}
      {!isSuccess && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-[#E3EAF3] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
          <div className="max-w-2xl mx-auto flex gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="h-13 px-5 border border-[#c5c6d3] text-[#444651] rounded-xl font-bold text-sm hover:bg-[#F2F7FD] transition-colors cursor-pointer"
              >
                السابق
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="flex-1 h-13 bg-[#00236e] text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-[#1b3a8c] active:scale-[0.98] transition-all shadow-md cursor-pointer"
            >
              {currentStep === 5 ? 'نشر الإعلان الآن' : 'التالي'}
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
