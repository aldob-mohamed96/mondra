import React, { useState } from 'react';
import { NewsArticle, ScreenType } from '../../types';
import { Newspaper, Calendar, User, Clock, Share2, Tag, ArrowRight, ArrowLeft } from 'lucide-react';

interface NewsScreenProps {
  news: NewsArticle[];
  onNavigate: (screen: ScreenType) => void;
}

export const NewsScreen: React.FC<NewsScreenProps> = ({ news, onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const handleShare = (article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      alert('تم نسخ رابط الخبر بنجاح!');
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-4 flex flex-col gap-5 font-['Cairo',sans-serif]">
      {!selectedArticle ? (
        <>
          <div className="flex justify-between items-center" dir="rtl">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#00236e]">
                نشرة عقارات وتراخيص قنا
              </h1>
              <p className="text-xs text-[#444651]">
                أحدث أخبار الإسكان، طروحات الأراضي، وقوانين البناء والتصالح بالصعيد
              </p>
            </div>
            <span className="text-xs font-bold text-[#00236e] bg-[#e0e8ff] px-3 py-1.5 rounded-xl">
              تحديث مستمر
            </span>
          </div>

          <div className="space-y-4" dir="rtl">
            {news.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedArticle(item)}
                className="bg-white rounded-2xl border border-[#E3EAF3] shadow-xs hover:shadow-md overflow-hidden transition-all flex flex-col sm:flex-row gap-4 p-4 cursor-pointer group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full sm:w-48 h-40 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300 bg-[#d8e2ff]"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold text-[#00236e] bg-[#DCE9F7] px-2.5 py-0.5 rounded-md">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-[#757683] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.readTime}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-[#0b1b37] group-hover:text-[#00236e] transition-colors leading-snug mb-1.5">
                      {item.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#444651] line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E3EAF3] text-xs text-[#757683]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {item.author}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#00236e] flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                      اقرأ المزيد
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        /* Full Article View */
        <article className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3EAF3] shadow-xs space-y-5 animate-in fade-in" dir="rtl">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-1 text-xs font-bold text-[#00236e] bg-[#F5F8FC] hover:bg-[#DCE9F7] px-3.5 py-2 rounded-xl transition-colors cursor-pointer w-fit"
          >
            <ArrowRight className="w-4 h-4" />
            العودة لكافة الأخبار
          </button>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-sm">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-[#00236e] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              {selectedArticle.category}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-4 text-xs text-[#757683]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedArticle.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {selectedArticle.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedArticle.readTime}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-[#00236e] leading-snug">
              {selectedArticle.title}
            </h1>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F8FC] border-r-4 border-[#00236e] text-xs sm:text-sm font-semibold text-[#0b1b37] leading-relaxed">
            {selectedArticle.excerpt}
          </div>

          <div className="text-sm sm:text-base text-[#444651] leading-loose space-y-4">
            <p>{selectedArticle.content}</p>
            <p>
              وتواصل محافظة قنا بالتعاون مع أجهزة المدن الجديدة استقبال استفسارات المواطنين وتقديم التسهيلات للمستثمرين في مختلف القطاعات العقارية والسكنية لتعزيز التنمية المستدامة في الصعيد.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#E3EAF3]">
            {selectedArticle.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold text-[#00236e] bg-[#e0e8ff] px-3 py-1 rounded-full flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share Action */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleShare(selectedArticle)}
              className="px-5 py-2.5 bg-[#00236e] text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#1b3a8c] transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              مشاركة الخبر
            </button>
          </div>
        </article>
      )}
    </main>
  );
};
