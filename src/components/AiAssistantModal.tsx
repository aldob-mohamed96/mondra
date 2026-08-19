import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ShieldCheck } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'مرحباً بك في مستشار مُندرة الذكي 🏛️ أنا هنا لمساعدتك في كل ما يخص عقارات قنا وصعيد مصر، أسعار المتر في حوض 10 والشؤون وقنا الجديدة، حسابات التشطيب، وقوانين التصالح والشهر العقاري. كيف يمكنني مساعدتك اليوم؟',
      timestamp: 'الآن'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'كم متوسط سعر المتر في حوض 10 بقنا؟',
    'ما هي شروط التقديم في أراضي الإسكان المتميز؟',
    'تكلفة تشطيب شقة 120 متر سوبر لوكس في قنا؟',
    'كيف أشتري عقاراً وأنا مقيم بالسعودية بأمان؟'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'الآن'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const q = query.toLowerCase();

      if (q.includes('حوض 10') || q.includes('سعر المتر')) {
        reply = '📍 متوسط أسعار المتر في منطقة حوض 10 بمدينة قنا:\n- للشقق السكنية: يتراوح بين 12,000 إلى 15,000 ج.م/م² حسب الفيو والتشطيب.\n- لقطع الأراضي الفضاء: تتراوح بين 22,000 إلى 30,000 ج.م/م² للمواقع المتميزة.\n- المنطقة تعتبر من أرقى أحياء قنا وبها طلب استثماري مرتفع.';
      } else if (q.includes('أراضي الإسكان') || q.includes('شروط')) {
        reply = '📋 أهم شروط التقديم في طرح أراضي الإسكان بقنا وغرب قنا:\n1. أن يكون المتقدم مصري الجنسية وبالغاً 21 عاماً على الأقل.\n2. ألا يكون قد سبق تخصيص وحدة أو قطعة أرض إسكان اجتماعي له أو لأسرته.\n3. أولوية التخصيص لأبناء محافظة قنا والعاملين بها.\n4. يمكنك فحص أهليتك بالتفصيل عبر شاشة "فحص الأهلية" في التطبيق.';
      } else if (q.includes('تشطيب') || q.includes('120')) {
        reply = '🎨 التكلفة التقديرية لتشطيب شقة 120م² بقنا (سوبر لوكس):\n- الإجمالي: حوالي 320,000 إلى 380,000 ج.م بمعدل 2,800 إلى 3,200 ج.م/م².\n- يشمل: سباكة وكهرباء معتمدة، محارة وجبس، سيراميك فرز أول، دهانات جوتن/سايبس، وأبواب خشبية وألوميتال.\n- يمكنك تجربة الحاسبة الدقيقة في قسم "التشطيب".';
      } else if (q.includes('مقيم') || q.includes('سعودية') || q.includes('مغترب')) {
        reply = '🌍 للمصريين في الخارج، توفر مُندرة:\n1. جولة فيديو حية 360° للموقع والعقار مع مهندس معتمد.\n2. فحص قانوني شامل للأوراق وتراخيص البناء.\n3. متابعة صب الخرسانات والتشطيبات بتقارير مصورة.\n4. حساب السعر بالريال السعودي أو الدرهم أو الدولار مباشرة.';
      } else {
        reply = `شكراً لسؤالك! بناءً على مؤشرات سوق عقارات قنا لعام 2026: عقارات قنا تشهد نمواً ملحوظاً خاصة في التوسعات العمرانية الجديدة (قنا الجديدة وغرب قنا) ومناطق حوض 10 والشؤون. فريقنا من المهندسين والمستشارين القانونيين جاهز لتقديم أي دعم مخصص عبر الواتساب.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: 'الآن'
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="bg-white w-full max-w-lg h-[80vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#E3EAF3]"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-4 bg-[#00236e] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#fdcc33] text-[#6f5600] flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">مستشار مُندرة الذكي</h3>
              <p className="text-[11px] text-[#dce1ff]">إجابات فورية واستشارات عقارية لصعيد مصر</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5F8FC]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user' ? 'bg-[#00236e] text-white' : 'bg-[#fdcc33] text-[#6f5600]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[80%] whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-[#00236e] text-white rounded-tr-xs'
                    : 'bg-white text-[#0b1b37] border border-[#E3EAF3] rounded-tl-xs shadow-2xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-[#757683]">
              <Bot className="w-4 h-4 text-[#fdcc33]" />
              <span>جاري كتابة الرد العقاري المخصص...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="p-2.5 bg-white border-t border-[#E3EAF3] flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] font-semibold text-[#00236e] bg-[#F5F8FC] hover:bg-[#DCE9F7] px-3 py-1 rounded-full whitespace-nowrap border border-[#E3EAF3] transition-colors cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-[#E3EAF3] flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اسأل عن أي عقار، تشطيب، أو قانون بقنا..."
            className="flex-1 h-11 px-4 rounded-xl bg-[#F5F8FC] border border-[#c5c6d3] text-xs sm:text-sm focus:outline-none focus:border-[#00236e]"
          />
          <button
            type="submit"
            className="w-11 h-11 bg-[#00236e] text-white rounded-xl flex items-center justify-center hover:bg-[#1b3a8c] transition-colors cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4 rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
};
