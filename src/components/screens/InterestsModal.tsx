import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface InterestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveInterests: (selected: string[]) => void;
}

export const InterestsModal: React.FC<InterestsModalProps> = ({
  isOpen,
  onClose,
  onSaveInterests
}) => {
  const [selectedChips, setSelectedChips] = useState<string[]>([
    'شقة',
    'قنا',
    'استثمار'
  ]);

  if (!isOpen) return null;

  const chips = [
    'شقة',
    'أرض',
    'محل',
    'فيلا',
    'سكن',
    'استثمار',
    'قنا',
    'قنا الجديدة',
    'غرب قنا',
    'نجع حمادي',
    'قوص',
    'حوض 10'
  ];

  const toggleChip = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleStart = () => {
    onSaveInterests(selectedChips);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#0F2557] overflow-hidden text-white font-['Cairo',sans-serif]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlI4tBifcJPPvUFyfoJYL6SQYUdLX48OEJUOxcQbFxIdHKYjnIQ8DyZGzaeuRDHIV9kJOKAHsuC6B5U798iXBSL1C8o7S9Kf8XcAswegd4QIAh0k6QZeNcK6WFNIo05ZK-yxt8hqrjBO8RbeeJnf0o1zSn_G9paqLaYr8fPEcH0sLAwjvJz49-4M-gpAiGX3eF6P8B8NUwK2KYtxiwW6o0oeT7mQTB-pgOLWu9PauuCdBXy8q9Kw"
          alt="Architecture background"
          className="w-full h-full object-cover opacity-35 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2557] via-[#0F2557]/80 to-transparent"></div>
      </div>

      {/* Top Action Bar (Skip) */}
      <div className="relative z-10 flex justify-end px-6 pt-6" dir="rtl">
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors py-2 px-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold cursor-pointer hover:bg-white/20"
        >
          تخطي
        </button>
      </div>

      {/* Main Content Area (Glassmorphism Bottom Card) */}
      <main className="relative z-10 flex-1 flex flex-col justify-end px-4 pb-6 mt-auto max-w-xl mx-auto w-full" dir="rtl">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-t-[32px] rounded-b-2xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
              بتدور على إيه؟
            </h1>
            <p className="text-sm sm:text-base text-[#b5c4ff]">
              ساعدنا نخصص تجربتك ونعرض لك اللي يهمك في سوق عقارات قنا والصعيد
            </p>
          </div>

          {/* Chips Container */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {chips.map((chip) => {
              const isSelected = selectedChips.includes(chip);
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => toggleChip(chip)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#fdcc33] text-[#6f5600] border-[#fdcc33] shadow-md scale-105'
                      : 'border-[#b5c4ff]/40 text-white hover:bg-white/15 bg-white/5'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          {/* Page Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#b5c4ff]/30"></div>
            <div className="w-2 h-2 rounded-full bg-[#b5c4ff]/30"></div>
            <div className="w-6 h-2 rounded-full bg-[#fdcc33]"></div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={handleStart}
            className="w-full h-13 bg-[#fdcc33] text-[#6f5600] font-black text-base rounded-xl flex items-center justify-center gap-2 hover:bg-[#f1c027] active:scale-[0.99] transition-all shadow-lg shadow-[#fdcc33]/20 cursor-pointer"
          >
            <span>ابدأ الآن</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};
