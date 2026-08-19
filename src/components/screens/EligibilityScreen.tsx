import React, { useState } from 'react';
import { EligibilityFormData, EligibilityResult } from '../../types';
import { Info, CheckSquare, Sparkles, CheckCircle2, XCircle, AlertCircle, ArrowLeft, Download, RefreshCw, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EligibilityScreen: React.FC = () => {
  const [formData, setFormData] = useState<EligibilityFormData>({
    age: '35',
    maritalStatus: 'married',
    incomeTier: '3',
    previousSupport: 'no',
    governorate: 'qena'
  });

  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const calculateEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(formData.age, 10);
    const reasons: string[] = [];
    const recommendations: string[] = [];
    let score = 100;
    let isEligible = true;

    // Rule 1: Age >= 21
    if (isNaN(ageNum) || ageNum < 21) {
      isEligible = false;
      score -= 50;
      reasons.push('السن أقل من 21 سنة (الحد الأدنى للتقديم في طروحات الإسكان الحكومي هو 21 عاماً).');
      recommendations.push('يجب بلوغ سن 21 عاماً كشرط أساسي للأهلية القانونية للحجز.');
    } else {
      reasons.push('السن مطابق للاشتراطات الرسمية (أكبر من 21 عاماً).');
    }

    // Rule 2: Previous Government Support
    if (formData.previousSupport === 'yes') {
      isEligible = false;
      score -= 40;
      reasons.push('تم الاستفادة من دعم إسكان حكومي سابقاً، مما يتعارض مع شرط الاستحقاق لأول مرة.');
      recommendations.push('يمكنك التقديم باسم أحد أفراد الأسرة المستحقين (الزوج/الزوجة غير المستفيدين) أو التوجه للإسكان الحر الاستثماري.');
    } else {
      reasons.push('عدم الحصول على دعم حكومي سابق يزيد من أولوية القبول.');
    }

    // Rule 3: Governorate Priority
    if (formData.governorate === 'qena') {
      score += 10;
      reasons.push('أولوية لأبناء محافظة قنا وقاطنيها بحسب الاشتراطات الجغرافية.');
    } else if (['luxor', 'aswan', 'sohag', 'assiut'].includes(formData.governorate)) {
      reasons.push('المتقدم من محافظات الصعيد المجاورة المشمولة بالطرح الإقليمي.');
    }

    // Rule 4: Income Tier
    if (formData.incomeTier === '4') {
      recommendations.push('فئة دخلك تتناسب بشكل مثالي مع كراسات الإسكان الأكثر تميزاً واستثمار الأراضي الممتازة.');
    } else {
      recommendations.push('يمكنك الاستفادة من مبادرة التمويل العقاري الحكومية بفائدة مخفضة للأراضي والوحدات.');
    }

    const calculatedScore = Math.max(10, Math.min(100, score));

    const finalResult: EligibilityResult = {
      isEligible: isEligible && calculatedScore >= 60,
      score: calculatedScore,
      title: isEligible && calculatedScore >= 60
        ? 'مؤهل للتقديم في طرح أراضي الإسكان المتميز'
        : 'غير مستوفٍ لكافة شروط الطرح الحالي',
      summary: isEligible && calculatedScore >= 60
        ? 'تهانينا! بياناتك مطابقة للشروط الأساسية لكراسة شروط هيئة المجتمعات العمرانية لطرح قنا وغرب قنا.'
        : 'للأسف، توجد بعض الشروط الواجب مراجعتها قبل استكمال إجراءات الحجز الرسمي.',
      reasons,
      recommendations
    };

    setResult(finalResult);
    setShowResultModal(true);

    if (finalResult.isEligible) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    }
  };

  return (
    <div className="flex-grow container mx-auto px-4 py-6 md:max-w-2xl font-['Cairo',sans-serif]">
      {/* Header */}
      <div className="mb-6 text-center">
        <span className="inline-flex items-center gap-1.5 bg-[#e0e8ff] text-[#00236e] px-3.5 py-1 rounded-full text-xs font-bold mb-3 shadow-2xs">
          <Info className="w-3.5 h-3.5" />
          تحقق من الأهلية
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#00236e] mb-2">
          طرح أراضي الإسكان المتميز
        </h1>
        <p className="text-sm md:text-base text-[#444651] max-w-md mx-auto leading-relaxed">
          أجب عن الأسئلة التالية لمعرفة مدى أهليتك للتقديم في هذا الطرح الحكومي بقنا وصعيد مصر.
        </p>
      </div>

      {/* Form Canvas */}
      <div className="bg-white rounded-2xl p-5 md:p-7 shadow-xs border border-[#E3EAF3]">
        <form onSubmit={calculateEligibility} className="space-y-6">
          {/* Question 1: Age */}
          <div>
            <label className="block text-base font-bold text-[#0b1b37] mb-2 text-right">
              السن (بالسنوات)
            </label>
            <div className="relative rounded-xl border border-[#c5c6d3] focus-within:border-[#00236e] focus-within:ring-3 focus-within:ring-[#DCE9F7] overflow-hidden transition-all bg-white">
              <input
                type="number"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="مثال: 35"
                required
                className="w-full h-13 px-4 bg-transparent border-none focus:outline-none text-base text-[#0b1b37] text-right"
              />
            </div>
          </div>

          {/* Question 2: Marital Status */}
          <div>
            <label className="block text-base font-bold text-[#0b1b37] mb-2 text-right">
              الحالة الاجتماعية
            </label>
            <div className="flex gap-2.5">
              {[
                { id: 'single', label: 'أعزب' },
                { id: 'married', label: 'متزوج' },
                { id: 'widowed_divorced', label: 'أرمل/مطلق' }
              ].map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      maritalStatus: chip.id as 'single' | 'married' | 'widowed_divorced'
                    })
                  }
                  className={`flex-1 py-3 px-3 border rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    formData.maritalStatus === chip.id
                      ? 'bg-[#00236e] text-white border-[#00236e] shadow-xs'
                      : 'border-[#c5c6d3] text-[#444651] hover:bg-[#F2F7FD]'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Monthly Income */}
          <div>
            <label className="block text-base font-bold text-[#0b1b37] mb-2 text-right">
              متوسط الدخل الشهري
            </label>
            <div className="relative rounded-xl border border-[#c5c6d3] focus-within:border-[#00236e] focus-within:ring-3 focus-within:ring-[#DCE9F7] overflow-hidden transition-all bg-white">
              <select
                value={formData.incomeTier}
                onChange={(e) => setFormData({ ...formData, incomeTier: e.target.value })}
                className="w-full h-13 px-4 bg-transparent border-none focus:outline-none text-base text-[#0b1b37] text-right appearance-none cursor-pointer"
              >
                <option value="" disabled>اختر الفئة</option>
                <option value="1">أقل من 5,000 ج.م</option>
                <option value="2">5,000 - 10,000 ج.م</option>
                <option value="3">10,000 - 15,000 ج.م</option>
                <option value="4">أكثر من 15,000 ج.م</option>
              </select>
            </div>
          </div>

          {/* Question 4: Previous Support */}
          <div>
            <label className="block text-base font-bold text-[#0b1b37] mb-2 text-right">
              هل حصلت على دعم حكومي (إسكان) سابقاً؟
            </label>
            <div className="flex gap-2.5">
              {[
                { id: 'yes', label: 'نعم' },
                { id: 'no', label: 'لا' }
              ].map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      previousSupport: chip.id as 'yes' | 'no'
                    })
                  }
                  className={`flex-1 py-3 px-4 border rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    formData.previousSupport === chip.id
                      ? 'bg-[#00236e] text-white border-[#00236e] shadow-xs'
                      : 'border-[#c5c6d3] text-[#444651] hover:bg-[#F2F7FD]'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 5: Governorate */}
          <div>
            <label className="block text-base font-bold text-[#0b1b37] mb-2 text-right">
              المحافظة (محل الإقامة الحالي)
            </label>
            <div className="relative rounded-xl border border-[#c5c6d3] focus-within:border-[#00236e] focus-within:ring-3 focus-within:ring-[#DCE9F7] overflow-hidden transition-all bg-white">
              <select
                value={formData.governorate}
                onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                className="w-full h-13 px-4 bg-transparent border-none focus:outline-none text-base text-[#0b1b37] text-right appearance-none cursor-pointer"
              >
                <option value="" disabled>اختر المحافظة</option>
                <option value="qena">قنا</option>
                <option value="luxor">الأقصر</option>
                <option value="aswan">أسوان</option>
                <option value="sohag">سوهاج</option>
                <option value="assiut">أسيوط</option>
                <option value="cairo">القاهرة والجيزة</option>
                <option value="other">محافظة أخرى</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-13 bg-[#00236e] text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 hover:bg-[#1b3a8c] active:scale-[0.99] transition-all shadow-md cursor-pointer"
            >
              <CheckSquare className="w-5 h-5" />
              عرض النتيجة
            </button>
            <p className="text-center text-xs text-[#444651] mt-3">
              هذه النتيجة استرشادية وتستند إلى القواعد العامة لكراسات شروط هيئة المجتمعات العمرانية.
            </p>
          </div>
        </form>
      </div>

      {/* Result Modal */}
      {showResultModal && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-[#E3EAF3] max-h-[90vh] overflow-y-auto" dir="rtl">
            <div className="text-center mb-5">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 shadow-md ${
                  result.isEligible ? 'bg-[#E8F5E9] text-[#1E9E6A]' : 'bg-[#ffdad6] text-[#ba1a1a]'
                }`}
              >
                {result.isEligible ? (
                  <CheckCircle2 className="w-9 h-9" />
                ) : (
                  <AlertCircle className="w-9 h-9" />
                )}
              </div>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                  result.isEligible
                    ? 'bg-[#1E9E6A]/20 text-[#1E9E6A]'
                    : 'bg-[#ba1a1a]/20 text-[#ba1a1a]'
                }`}
              >
                نسبة التطابق: {result.score}%
              </span>

              <h2 className="text-xl font-bold text-[#00236e] mb-2">{result.title}</h2>
              <p className="text-sm text-[#444651] leading-relaxed">{result.summary}</p>
            </div>

            {/* Checklist */}
            <div className="bg-[#F5F8FC] rounded-2xl p-4 mb-5 border border-[#E3EAF3] space-y-2.5">
              <h4 className="text-xs font-bold text-[#00236e] uppercase tracking-wider mb-2">
                تقييم المعايير الأساسية
              </h4>
              {result.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#0b1b37]">
                  <CheckSquare className="w-4 h-4 text-[#00236e] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{reason}</span>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold text-[#755b00] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                نصائح منصة مُندرة للتقديم
              </h4>
              {result.recommendations.map((rec, idx) => (
                <p key={idx} className="text-xs text-[#444651] bg-[#FDF4D8] p-2.5 rounded-xl border border-[#fdcc33]/40">
                  {rec}
                </p>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  alert('تم تنزيل ملخص كراسة الشروط الرسمية لطرح أراضي قنا وغرب قنا بنجاح!');
                }}
                className="w-full py-3 bg-[#00236e] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1b3a8c] transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                تحميل كراسة الشروط ودليل الحجز
              </button>

              <button
                onClick={() => setShowResultModal(false)}
                className="w-full py-2.5 border border-[#c5c6d3] text-[#444651] rounded-xl text-sm font-semibold hover:bg-[#F2F7FD] transition-colors cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
