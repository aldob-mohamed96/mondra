import { BuildingMaterialPrice, NewsArticle, NotificationItem, Property } from '../types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'فيلا مستقلة طابقين بتشطيب فاخر',
    location: 'قنا, حوض 10',
    city: 'قنا',
    district: 'حوض 10',
    price: 3250000,
    area: 240,
    rooms: 5,
    bathrooms: 4,
    propertyType: 'villa',
    transactionType: 'sell',
    verificationLevel: 'field_verified',
    verificationBadgeText: 'موثق ميدانياً',
    finishing: 'ألترا سوبر لوكس',
    ownershipStatus: 'عقد ابتدائي صحة توقيع',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHp797rMQhnpikHa_hDOmqRFv5WR2Yvfu_tB-gI3G36OrJ-EUPnwNtciRb2Op9hgiYb_AHOb6Yaw5EZv1mkbrNu0QKe9fVTQi3AwMDGgiIDVYx4UAoi9-4tctobQQSuuokuu1MdlKynk7uVfCtHS38WYHPXT6T1oRWMDz-TePw8cvmroP-ykZNCCghPtDVrLFCC3X034_sgYnM-gJkpJ9Xwh7f0msM8jzYBzs1omtEmIp2I1WpIg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCi7JStNBvib18n7Y3MVDfdJblqZABOys67jbzO9L5ATqz3kolZtOHAsHsYitQe2yDzRV8q4QWi1crnf_Ubm0KvWHm-nCBMoEzwCcflNfd84jUtdVwTP_g2ePTfu5rec_WcAtMTjT-k09L8HM1ciEFMt0XkrWOUdCmzVY8nBv-9WFyGjFMhDegjNHQ37wGeA1uSfuxyzyqUaQT6ZgdP1_Nj7hecGwyf4AERwGRxGDlX4XtuhV_W_A'
    ],
    description: 'فيلا فخمة مبنية على أعلى معايير الجودة في أرقى مناطق حوض 10 بمدينة قنا. حديقة خاصة، مدخل فندقي، تشطيب كامل رخام وبورسلين مستورد، عدادات كهرباء ومياه خاصة.',
    featured: true,
    postedDate: 'منذ يومين',
    installmentAvailable: true,
    installmentDetails: 'مقدم 50% والباقي على 24 شهراً بدون فوائد',
    contactPhone: '+201012345678',
    viewsCount: 418
  },
  {
    id: 'prop-2',
    title: 'شقة 3 غرف في عمارة حديثة البناء',
    location: 'قنا, الشئون',
    city: 'قنا',
    district: 'الشئون',
    price: 1150000,
    area: 135,
    rooms: 3,
    bathrooms: 2,
    floor: 'الدور الثالث (يوجد أسانسير)',
    propertyType: 'apartment',
    transactionType: 'sell',
    verificationLevel: 'owner_verified',
    verificationBadgeText: 'هوية المالك موثقة',
    finishing: 'سوبر لوكس',
    ownershipStatus: 'مسجل شهر عقاري',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTTMizN4fUovniE3I5pwUwImH02AGEistR-FagzfbNimH5rti7h8Q1rqGVN6o_xqaRefRz_7DTb6EcUtnkmt6n3cXMN314eqDXDYPMGyBED5aAHJ-nXGewOKGb_f4E1ubFbqqOhlveoraerl5O8QzF4vEj8by4Moa8PswHmpTmQfyaidEcDhhFhNk0-ehjN4JGeTMzUmxVfzMDK4sDg-qIU3v7q_U27kh3cmpJ8cUaxhgww664Tg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqkpbeGTZa-w_azrLWDMDu3dFDeVsSbaza2BfPTYT2qJuGJKk91fnzw3bJK1yj9YqurNZsGs2OvlF-eGxlMo6RbSLE1Oxps7LkxR2DiaPKcplqg0mcLn1VG4WqRl9TX_-ipARbGFKYcQKILaVoWAqA_A4rkKCP9lEwk6_nVRd_VAfewfQlsbi9-u3z-MHSWtGg8cdhyVMgaioQPNKFGtdw3lDEnKa2YUCRpNZJ_WBXClCU96goVw'
    ],
    description: 'شقة سكنية متكاملة المرافق بمنطقة الشؤون الحيوية بقنا. واجهة بحرية تطل على شارع رئيسي عريض، حصة في الأرض، مداخل رخام فاخر ومصعد حديث إيطالي.',
    featured: true,
    postedDate: 'منذ 5 ساعات',
    installmentAvailable: false,
    contactPhone: '+201098765432',
    viewsCount: 652
  },
  {
    id: 'prop-3',
    title: 'شقة عصرية بالمدينة - فيو مفتوح',
    location: 'قنا, شارع المحطة',
    city: 'قنا',
    district: 'وسط البلد',
    price: 1200000,
    area: 150,
    rooms: 3,
    bathrooms: 2,
    floor: 'الدور الخامس',
    propertyType: 'apartment',
    transactionType: 'sell',
    verificationLevel: 'field_verified',
    verificationBadgeText: 'موثق',
    finishing: 'نصف تشطيب',
    ownershipStatus: 'مسجل شهر عقاري',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqkpbeGTZa-w_azrLWDMDu3dFDeVsSbaza2BfPTYT2qJuGJKk91fnzw3bJK1yj9YqurNZsGs2OvlF-eGxlMo6RbSLE1Oxps7LkxR2DiaPKcplqg0mcLn1VG4WqRl9TX_-ipARbGFKYcQKILaVoWAqA_A4rkKCP9lEwk6_nVRd_VAfewfQlsbi9-u3z-MHSWtGg8cdhyVMgaioQPNKFGtdw3lDEnKa2YUCRpNZJ_WBXClCU96goVw'
    ],
    description: 'موقع مميز جداً بالقرب من محطة قطار قنا والخدمات الحكومية. مساحة مفتوحة تسمح بتقسيم مخصص ومثالية للسكن أو الاستثمار الإيجاري.',
    featured: false,
    postedDate: 'أمس',
    installmentAvailable: true,
    installmentDetails: 'دفع 40% مقدم وتقسيط حتى 3 سنوات',
    contactPhone: '+201122334455',
    viewsCount: 389
  },
  {
    id: 'prop-4',
    title: 'شقة تشطيب سوبر لوكس جاهزة للسكن',
    location: 'قنا الجديدة, الحي الأول',
    city: 'قنا الجديدة',
    district: 'الحي الأول',
    price: 950000,
    area: 120,
    rooms: 3,
    bathrooms: 1,
    floor: 'الدور الثاني',
    propertyType: 'apartment',
    transactionType: 'sell',
    verificationLevel: 'field_verified',
    verificationBadgeText: 'موثق ميدانياً',
    finishing: 'سوبر لوكس',
    ownershipStatus: 'حصة في الأرض وتخصيص جهاز',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4e4TRHAJnVj1cGsyopEHiExIv6N2ZZwGydzPExIHM_LAkIMcqymg6QpoAZ2W8uus2UA2jIkdt5haZUbXymP45F8t-8jUxnViAwKBenX1G0R9pG8Zza-QqgFav-6HNCxdWSQ1YDA9IJXt6u4lfUjmYtyhvNBjBaN3IKlznI5a-vT0qHa0cE5NcQWNOHDPW7nMfAoTRZjWIYUPQbbEYBwHYqhefzDD7AneMiuqlLyrLzIykuv-n5Q'
    ],
    description: 'شقة بعمارة متميزة في قنا الجديدة قريبة من جامعة جنوب الوادي والمدرسة اليابانية. تشطيب سوبر لوكس لا يحتاج لأي مصاريف إضافية.',
    featured: false,
    postedDate: 'منذ 3 أيام',
    installmentAvailable: true,
    contactPhone: '+201055566778',
    viewsCount: 520
  },
  {
    id: 'prop-5',
    title: 'قطعة أرض مميزة على شارع رئيسي',
    location: 'غرب قنا, المجاورة الثانية',
    city: 'غرب قنا',
    district: 'المجاورة 2',
    price: 850000,
    area: 276,
    rooms: 0,
    bathrooms: 0,
    propertyType: 'land',
    transactionType: 'sell',
    verificationLevel: 'owner_verified',
    verificationBadgeText: 'أوراق رسمية كاملة',
    finishing: 'أرض فضاء صالحة للبناء',
    ownershipStatus: 'تخصيص هيئة المجتمعات العمرانية',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlI4tBifcJPPvUFyfoJYL6SQYUdLX48OEJUOxcQbFxIdHKYjnIQ8DyZGzaeuRDHIV9kJOKAHsuC6B5U798iXBSL1C8o7S9Kf8XcAswegd4QIAh0k6QZeNcK6WFNIo05ZK-yxt8hqrjBO8RbeeJnf0o1zSn_G9paqLaYr8fPEcH0sLAwjvJz49-4M-gpAiGX3eF6P8B8NUwK2KYtxiwW6o0oeT7mQTB-pgOLWu9PauuCdBXy8q9Kw'
    ],
    description: 'أرض إسكان متميز بمدينة غرب قنا الجديدة، مهلة بناء سارية، رخصة بدروم وأرضي و3 أدوار متكررة، جاهزة للحفر والبناء الفوري.',
    featured: true,
    postedDate: 'منذ 4 أيام',
    installmentAvailable: true,
    contactPhone: '+201200112233',
    viewsCount: 310
  },
  {
    id: 'prop-6',
    title: 'محل تجاري واجهة زجاجية بموقع حيوي',
    location: 'قنا, شارع 23 يوليو',
    city: 'قنا',
    district: 'وسط البلد',
    price: 1800000,
    area: 65,
    rooms: 1,
    bathrooms: 1,
    floor: 'أرضي تجاري',
    propertyType: 'commercial',
    transactionType: 'sell',
    verificationLevel: 'field_verified',
    verificationBadgeText: 'موثق ميدانياً',
    finishing: 'لوكس تجاري',
    ownershipStatus: 'مسجل شهر عقاري تجاري',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB32JkYIDHZZDrPrK_Od-DPLtszs4qk_96bX2TyogtSLt2Gyn8JB2VgQkQ9fvcXOee-O-hOtX0OhWNwnPnRLZP1zDheniRvJ-0f0oih3CZHxeCQu-Amsgz7TIXKFmHdCBg9gmalS-qQnMNsrHt-IfsoEaHuivezBSW-o7KscoqjGBDboaS8F8RLfg7l-TQNHbEPb-BGm59NE-hWoddjgbGZ3DRDY_OwQCrftcc29oQB-CEGGCk5cA'
    ],
    description: 'محل تجاري استثماري استثنائي في أنشط شوارع قنا التجارية، مناسب لعلامة تجارية، عيادة، كافيه أو معرض إلكترونيات. عائد إيجاري مضمون.',
    featured: false,
    postedDate: 'منذ أسبوع',
    installmentAvailable: false,
    contactPhone: '+201088776655',
    viewsCount: 712
  }
];

export const BUILDING_MATERIALS: BuildingMaterialPrice[] = [
  {
    id: 'mat-1',
    name: 'الأسمنت البورتلاندي (طن)',
    unit: 'طن',
    price: 2450,
    change: 'up',
    changeAmount: '+50 ج.م',
    icon: 'view_agenda',
    category: 'core'
  },
  {
    id: 'mat-2',
    name: 'حديد التسليح (طن)',
    unit: 'طن',
    price: 42000,
    change: 'stable',
    changeAmount: 'ثابت',
    icon: 'construction',
    category: 'core'
  },
  {
    id: 'mat-3',
    name: 'سيراميك فرز أول (م٢)',
    unit: 'م²',
    price: 180,
    change: 'down',
    changeAmount: '-10 ج.م',
    icon: 'grid_view',
    category: 'finishing'
  },
  {
    id: 'mat-4',
    name: 'طوب أحمر (ألف طوبة)',
    unit: 'ألف طوبة',
    price: 1200,
    change: 'up',
    changeAmount: '+40 ج.م',
    icon: 'apps',
    category: 'masonry'
  },
  {
    id: 'mat-5',
    name: 'رمل بناء حرش (متر مكعب)',
    unit: 'م³',
    price: 140,
    change: 'stable',
    changeAmount: 'ثابت',
    icon: 'layers',
    category: 'core'
  },
  {
    id: 'mat-6',
    name: 'سن مجرور رقم 1 و 2 (متر)',
    unit: 'م³',
    price: 260,
    change: 'stable',
    changeAmount: 'ثابت',
    icon: 'grain',
    category: 'core'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'عقار جديد يطابق بحثك',
    message: 'تم إضافة شقة جديدة في منطقة الشؤون تناسب المعايير التي تبحث عنها. 120 متر، تشطيب سوبر لوكس.',
    timeAgo: 'منذ ساعة',
    type: 'match',
    icon: 'home_work',
    iconBg: 'bg-[#dce1ff]',
    iconColor: 'text-[#00236e]',
    read: false,
    targetScreen: 'properties',
    propertyId: 'prop-2'
  },
  {
    id: 'notif-2',
    title: 'تغير سعر عقار محفوظ',
    message: 'تم تخفيض سعر الشقة المعروضة في شارع المحطة بنسبة 5%. فرصة ممتازة للشراء الآن.',
    timeAgo: 'منذ 3 ساعات',
    type: 'price',
    icon: 'trending_down',
    iconBg: 'bg-[#ffdf90]',
    iconColor: 'text-[#755b00]',
    read: false,
    targetScreen: 'favorites',
    propertyId: 'prop-3'
  },
  {
    id: 'notif-3',
    title: 'خبر هام في النشرة',
    message: 'تحديثات جديدة حول قانون التصالح في مخالفات البناء وتأثيره على سوق العقارات في قنا.',
    timeAgo: 'أمس',
    type: 'news',
    icon: 'campaign',
    iconBg: 'bg-[#ffdad6]',
    iconColor: 'text-[#ba1a1a]',
    read: true,
    targetScreen: 'news'
  },
  {
    id: 'notif-4',
    title: 'تم توثيق إعلانك',
    message: 'نجح فريقنا في مطابقة بيانات العقار الخاص بك. سيظهر الإعلان الآن مع شارة التوثيق الذهبية.',
    timeAgo: 'منذ يومين',
    type: 'verification',
    icon: 'verified',
    iconBg: 'bg-[#E8F5E9]',
    iconColor: 'text-[#1E9E6A]',
    read: true,
    targetScreen: 'properties'
  }
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'طرح جديد لأراضي الإسكان المتميز والمحاور بمحافظة قنا وغرب قنا',
    excerpt: 'وزارة الإسكان تعلن تفاصيل كراسة شروط طرح قطع الأراضي الأكثر تميزاً واستكمال البنية التحتية بالصعيد.',
    content: 'أعلنت وزارة الإسكان والمجتمعات العمرانية بالتعاون مع جهاز مدينة قنا الجديدة عن فتح باب الحجز لقطع أراضي الإسكان المتميز والمتوسط بمدينتي قنا الجديدة وغرب قنا، مع توفير تسهيلات سداد تمتد حتى 5 سنوات.',
    author: 'محرر الشؤون العقارية',
    date: '18 أغسطس 2026',
    category: 'طروحات حكومية',
    readTime: '3 دقائق',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlI4tBifcJPPvUFyfoJYL6SQYUdLX48OEJUOxcQbFxIdHKYjnIQ8DyZGzaeuRDHIV9kJOKAHsuC6B5U798iXBSL1C8o7S9Kf8XcAswegd4QIAh0k6QZeNcK6WFNIo05ZK-yxt8hqrjBO8RbeeJnf0o1zSn_G9paqLaYr8fPEcH0sLAwjvJz49-4M-gpAiGX3eF6P8B8NUwK2KYtxiwW6o0oeT7mQTB-pgOLWu9PauuCdBXy8q9Kw',
    tags: ['قنا الجديدة', 'أراضي الإسكان', 'استثمار صعيد مصر']
  },
  {
    id: 'news-2',
    title: 'مستجدات اللائحة التنفيذية لقانون التصالح وتسهيلات استخراج تراخيص البناء بقنا',
    excerpt: 'المحافظة تعلن تخفيض رسوم التقنين في القرى والمدن وتيسير فحص الطلبات للمواطنين.',
    content: 'أكد ديوان عام محافظة قنا تفعيل المراكز التكنولوجية بجميع مراكز المحافظة (قوص، نجع حمادي، دشنا، نقادة، قفط) لتسريع وتيرة البت في طلبات التصالح وتوثيق الملكيات لرفع القيمة السوقية للعقارات.',
    author: 'فريق التوثيق القانوني بمندرة',
    date: '16 أغسطس 2026',
    category: 'قوانين وتراخيص',
    readTime: '4 دقائق',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTTMizN4fUovniE3I5pwUwImH02AGEistR-FagzfbNimH5rti7h8Q1rqGVN6o_xqaRefRz_7DTb6EcUtnkmt6n3cXMN314eqDXDYPMGyBED5aAHJ-nXGewOKGb_f4E1ubFbqqOhlveoraerl5O8QzF4vEj8by4Moa8PswHmpTmQfyaidEcDhhFhNk0-ehjN4JGeTMzUmxVfzMDK4sDg-qIU3v7q_U27kh3cmpJ8cUaxhgww664Tg',
    tags: ['التصالح', 'تراخيص قنا', 'الشهر العقاري']
  },
  {
    id: 'news-3',
    title: 'دليل المستثمر المغترب: كيف تشتري عقاراً موثقاً في صعيد مصر دون السفر؟',
    excerpt: 'خطوات الفحص الميداني، التوكيلات القنصلية، وضمان تحويلات الأموال بحسابات الضمان المعتمدة.',
    content: 'يقدم خبراء منصة مُندرة دليلاً شاملاً للمصريين المقيمين في دول الخليج وأوروبا الراغبين في الاستثمار العقاري بصعيد مصر، متضمناً آليات التوكيل الرسمي، الاستعانة بمحامي فحص، وتتبع صب الخرسانات بالفيديو المباشر.',
    author: 'مستشار شؤون المغتربين',
    date: '14 أغسطس 2026',
    category: 'خدمات المغتربين',
    readTime: '5 دقائق',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB32JkYIDHZZDrPrK_Od-DPLtszs4qk_96bX2TyogtSLt2Gyn8JB2VgQkQ9fvcXOee-O-hOtX0OhWNwnPnRLZP1zDheniRvJ-0f0oih3CZHxeCQu-Amsgz7TIXKFmHdCBg9gmalS-qQnMNsrHt-IfsoEaHuivezBSW-o7KscoqjGBDboaS8F8RLfg7l-TQNHbEPb-BGm59NE-hWoddjgbGZ3DRDY_OwQCrftcc29oQB-CEGGCk5cA',
    tags: ['المصريين بالخارج', 'تحويلات', 'توثيق ميداني']
  }
];

export const QENA_CITIES = [
  { id: 'qena_city', name: 'مدينة قنا' },
  { id: 'qena_new', name: 'قنا الجديدة' },
  { id: 'west_qena', name: 'غرب قنا' },
  { id: 'naga_hammadi', name: 'نجع حمادي' },
  { id: 'qous', name: 'قوص' },
  { id: 'qift', name: 'قفط' },
  { id: 'naqada', name: 'نقادة' },
  { id: 'farshout', name: 'فرشوط' },
  { id: 'dishna', name: 'دشنا' },
  { id: 'abu_tish', name: 'أبو تشت' },
  { id: 'al_waqf', name: 'الوقف' }
];

export const CURRENCY_RATES: Record<string, { name: string; symbol: string; rateToEGP: number; flag: string }> = {
  SAR: { name: 'ريال سعودي', symbol: 'ر.س', rateToEGP: 13.05, flag: '🇸🇦' },
  AED: { name: 'درهم إماراتي', symbol: 'د.إ', rateToEGP: 13.35, flag: '🇦🇪' },
  KWD: { name: 'دينار كويتي', symbol: 'د.ك', rateToEGP: 159.8, flag: '🇰🇼' },
  USD: { name: 'دولار أمريكي', symbol: '$', rateToEGP: 49.1, flag: '🇺🇸' },
  EUR: { name: 'يورو أوروبي', symbol: '€', rateToEGP: 53.4, flag: '🇪🇺' },
  QAR: { name: 'ريال قطري', symbol: 'ر.ق', rateToEGP: 13.48, flag: '🇶🇦' },
  OMR: { name: 'ريال عماني', symbol: 'ر.ع', rateToEGP: 127.5, flag: '🇴🇲' }
};
