
var UID = 0;
function uid() { return ++UID; }
function esc(s) { return String(s); }

var I = {
  search: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>',
  moon: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"></path></svg>',
  bookmark: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v17l-6-4-6 4Z"></path></svg>',
  menu: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>',
  x: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg>',
  caret: '<svg class="sx-icon sx-nav__caret" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>',
  chevL: '<svg class="sx-icon sx-flip-ltr" viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"></path></svg>',
  chevR: '<svg class="sx-icon sx-flip-ltr" viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6"></path></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>',
  bell: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"></path><path d="M10 19a2 2 0 0 0 4 0"></path></svg>',
  camera: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="m9 7 1.5-3h3L15 7"></path><circle cx="12" cy="13" r="3.5"></circle></svg>',
  clock: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path></svg>',
  share: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2.5"></circle><circle cx="17" cy="6" r="2.5"></circle><circle cx="17" cy="18" r="2.5"></circle><path d="m8.3 10.8 6.4-3.6M8.3 13.2l6.4 3.6"></path></svg>',
  fb: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" stroke="none"><path d="M14 8h3V4.5h-3c-2.5 0-4 1.7-4 4V11H7v3.5h3V21h3.5v-6.5h3l.5-3.5h-3.5V9c0-.6.4-1 1-1Z"></path></svg>',
  tw: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" stroke="none"><path d="M4 4h4.6l4 5.6L17.4 4H20l-6 7.2L20.5 20h-4.6l-4.3-6-5 6H4l6.5-7.8Z"></path></svg>',
  ig: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"></circle></svg>',
  tg: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" stroke="none"><path d="M21 4 3 11l5 2 1.5 6 3-3.5L17 19l4-15Z"></path></svg>',
  yt: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="3"></rect><path d="m10.5 10 4 2.5-4 2.5Z" fill="currentColor"></path></svg>',
  wa: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"></path><path d="M9 9.5c.5 2.5 3 5 5.5 5.5l1-1.5-2-1-1 .5c-.8-.5-1.5-1.2-2-2l.5-1-1-2Z" fill="currentColor" stroke="none"></path></svg>',
  mail: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>',
  link: '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 0 0 6 .4l3-3a4 4 0 0 0-5.6-5.6L12 7.2"></path><path d="M14 10a4 4 0 0 0-6-.4l-3 3a4 4 0 0 0 5.6 5.6L12 16.8"></path></svg>',
  pauseI: '<svg class="sx-icon sx-t-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"></path></svg>',
  playI: '<svg class="sx-icon sx-t-play" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"></path></svg>',
  arrow: '<svg class="sx-icon sx-flip-ltr" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6"></path></svg>'
};

var IMG = {
  wide: function (n) { return 'assets/img/ph-wide-' + ((n % 8) + 1) + '.svg'; },
  sq: function (n) { return 'assets/img/ph-sq-' + ((n % 4) + 1) + '.svg'; },
  por: function (n) { return 'assets/img/ph-portrait-' + ((n % 4) + 1) + '.svg'; },
  poster: function (n) { return 'assets/img/ph-poster-' + ((n % 4) + 1) + '.svg'; },
  av: function (n) { return 'assets/img/ph-avatar-' + ((n % 6) + 1) + '.svg'; }
};

var POSTS = {
  palestine: [
    { cat: 'غزة', kicker: 'تغطية مستمرة', title: 'مصادر طبية: ارتفاع حصيلة الشهداء في قطاع غزة إلى 112 منذ فجر اليوم بينهم 34 طفلًا و21 امرأة، ومئات الجرحى في حالات حرجة وسط نقص حاد بالأدوية والمستلزمات الجراحية والوقود اللازم لتشغيل مولدات المستشفيات', excerpt: 'أفادت مصادر طبية في مجمع الشفاء بأن الطواقم تعمل بأقصى طاقتها منذ ساعات الفجر، وسط دعوات عاجلة لفتح ممرات إنسانية آمنة.', date: 'منذ 25 دقيقة', flag: 'video' },
    { cat: 'القدس', title: 'الاحتلال يغلق حاجز قلنديا ويمنع وصول المصلين إلى المسجد الأقصى لصلاة الجمعة', date: 'منذ ساعة' },
    { cat: 'الضفة الغربية', title: 'قوات الاحتلال تقتحم مخيم جنين وتحاصر عددًا من المنازل وسط اشتباكات عنيفة', date: 'منذ ساعتين' },
    { cat: 'غزة', title: 'غزة تحت القصف', date: 'منذ 3 ساعات', flag: 'gallery' },
    { cat: 'الأسرى', title: 'الاحتلال يفرج عن 40 أسيرًا من سجن النقب بينهم قاصرون ومرضى', date: 'منذ 4 ساعات' },
    { cat: 'القدس', title: 'بلدية الاحتلال تخطر بهدم 12 منزلًا في حي سلوان جنوب المسجد الأقصى', date: 'منذ 5 ساعات' },
    { cat: 'الضفة الغربية', title: 'وقفة في رام الله تضامنًا مع الأسرى المضربين عن الطعام لليوم الثامن عشر', date: 'منذ 6 ساعات' },
    { cat: 'غزة', title: 'صيادو غزة يواجهون تقليص مساحة الصيد إلى ثلاثة أميال بحرية', date: 'منذ 7 ساعات' }
  ],
  world: [
    { cat: 'عربي', title: 'القمة العربية الطارئة تختتم أعمالها بالدعوة إلى تحرك دولي عاجل لوقف العدوان', date: 'منذ ساعة' },
    { cat: 'دولي', title: 'الأمم المتحدة: مليونا شخص في القطاع بحاجة إلى مساعدات إنسانية عاجلة', date: 'منذ ساعتين' },
    { cat: 'دولي', title: 'مجلس الأمن يعقد جلسة مغلقة اليوم لبحث تطورات الأوضاع في المنطقة', date: 'منذ 3 ساعات' },
    { cat: 'عربي', title: 'واشنطن تعلن استئناف المفاوضات غير المباشرة عبر الوسيطين المصري والقطري', date: 'منذ 4 ساعات' },
    { cat: 'دولي', title: 'الاتحاد الأوروبي يقر حزمة مساعدات إنسانية جديدة بقيمة 120 مليون يورو', date: 'منذ 5 ساعات' },
    { cat: 'عربي', title: 'مصر تعلن جاهزية معبر رفح لاستقبال قوافل المساعدات على مدار الساعة', date: 'منذ 6 ساعات' }
  ],
  israeli: [
    { cat: 'اسرائيلي', title: 'إعلام عبري: خلافات حادة داخل حكومة الاحتلال حول صفقة التبادل المرتقبة', date: 'منذ 40 دقيقة' },
    { cat: 'اسرائيلي', title: 'استطلاع: 62% من الإسرائيليين يؤيدون الذهاب إلى انتخابات مبكرة', date: 'منذ ساعتين' },
    { cat: 'اسرائيلي', title: 'جيش الاحتلال يقر بمقتل ضابطين في معارك شمال القطاع', date: 'منذ 3 ساعات' },
    { cat: 'اسرائيلي', title: 'صحيفة عبرية: تل أبيب تدرس ردًا محدودًا خشية اتساع المواجهة الإقليمية', date: 'منذ 5 ساعات' },
    { cat: 'اسرائيلي', title: 'تظاهرات في تل أبيب للمطالبة بصفقة تبادل فورية وانتخابات مبكرة', date: 'منذ 6 ساعات' }
  ],
  sports: [
    { cat: 'رياضة', title: 'المنتخب الفلسطيني يتأهل إلى نهائيات كأس آسيا للمرة الثالثة في تاريخه', date: 'منذ ساعة', flag: 'video' },
    { cat: 'رياضة', title: 'خدمات رفح يتوج بلقب دوري غزة لكرة القدم بعد غياب خمس سنوات', date: 'منذ 3 ساعات' },
    { cat: 'رياضة', title: 'وسام أبو علي ينضم رسميًا إلى صفوف الأهلي المصري في صفقة قياسية', date: 'منذ 4 ساعات' },
    { cat: 'رياضة', title: 'اتحاد الكرة يعلن استئناف دوري المحترفين مطلع الشهر المقبل', date: 'منذ 5 ساعات' },
    { cat: 'رياضة', title: 'العداءة الفلسطينية هناء برغوثي تحرز ذهبية غرب آسيا لألعاب القوى', date: 'منذ 7 ساعات' }
  ],
  variety: [
    { cat: 'منوعات', title: 'التطريز الفلسطيني يتصدر أجنحة معرض إسطنبول للتراث بمشاركة 40 حرفيًا', date: 'منذ ساعتين', flag: 'gallery' },
    { cat: 'منوعات', title: 'مبادرة شبابية لزراعة 10 آلاف شجرة زيتون في محافظة الخليل', date: 'منذ 4 ساعات' },
    { cat: 'اقتصاد', title: 'سلطة النقد تبقي أسعار الفائدة دون تغيير للربع الثالث على التوالي', date: 'منذ 5 ساعات' },
    { cat: 'منوعات', title: 'فيلم "أرض البرتقال" يفوز بجائزة لجنة التحكيم في مهرجان قرطاج السينمائي', date: 'منذ 6 ساعات' },
    { cat: 'اقتصاد', title: 'ارتفاع أسعار الخضار في أسواق القطاع مع تشديد القيود على المعابر', date: 'منذ 8 ساعات' }
  ]
};

var TICKER_ITEMS = [
  'عاجل | مصادر طبية: عشرات الشهداء والجرحى في قصف متواصل على أحياء شرق مدينة غزة',
  'الرئاسة الفلسطينية تدين تصاعد اعتداءات المستوطنين في الضفة الغربية وتطالب بحماية دولية',
  'مجلس الأمن يعقد جلسة طارئة مساء اليوم لبحث الأوضاع الإنسانية في قطاع غزة',
  'الأونروا: نفاد الوقود يهدد بتوقف 60% من مرافقنا الصحية خلال 48 ساعة'
];

var WRITERS = [
  { name: 'د. محمد عودة', role: 'أستاذ العلوم السياسية', title: 'عن المقاومة والذاكرة: لماذا لا تُهزم الشعوب التي تروي حكايتها؟', date: 'اليوم' },
  { name: 'سارة الخالدي', role: 'كاتبة وباحثة في الإعلام', title: 'الحرب على الوعي.. معركة الرواية الفلسطينية في الإعلام الغربي', date: 'أمس' },
  { name: 'حسن أبو ليلى', role: 'محلل سياسي', title: 'ماذا بعد المفاوضات؟ قراءة في موازين القوى الإقليمية', date: 'أمس' },
  { name: 'ياسمين نصار', role: 'باحثة في الشأن التربوي', title: 'التعليم في غزة: أجيال تدرس بين الركام', date: 'قبل يومين' },
  { name: 'عبد الرحمن شاهين', role: 'كاتب رأي', title: 'حق العودة ليس شعارًا', date: 'قبل يومين' },
  { name: 'ليلى حمدان', role: 'باحثة اقتصادية', title: 'الاقتصاد الفلسطيني بين قيود الاحتلال وفرص الصمود: نحو نموذج تنموي مقاوم', date: 'قبل 3 أيام' }
];

var QUOTES = [
  { q: 'ما يجري في غزة جريمة مكتملة الأركان، والمجتمع الدولي مطالب بالتحرك فورًا قبل فوات الأوان', name: 'مسؤول أممي رفيع', role: 'في تصريح خاص لشهاب', date: 'منذ ساعة' },
  { q: 'لن نقبل بأي ترتيبات لليوم التالي لا تضمن وحدة الأراضي الفلسطينية وقرارها الوطني المستقل', name: 'قيادي فلسطيني', role: 'تصريح خاص', date: 'منذ 3 ساعات' },
  { q: 'صفقة التبادل ممكنة خلال أسابيع إذا توفرت الإرادة السياسية لدى حكومة الاحتلال', name: 'وسيط إقليمي مطلع', role: 'تصريح خاص', date: 'منذ 5 ساعات' },
  { q: 'الوضع الإنساني في القطاع تجاوز كل الخطوط الحمراء، والمجاعة باتت واقعًا لا تهديدًا', name: 'مدير مكتب إغاثي دولي', role: 'تصريح خاص', date: 'أمس' }
];

var FILES = [
  { title: 'ملف القدس', meta: '48 مادة' }, { title: 'الأسرى والحرية', meta: '36 مادة' },
  { title: 'إعادة إعمار غزة', meta: '29 مادة' }, { title: 'الاستيطان في الضفة', meta: '41 مادة' },
  { title: 'اللاجئون وحق العودة', meta: '22 مادة' }, { title: 'حصاد 2026', meta: '15 مادة' }
];

var PROGRAMS = [
  { title: 'حديث الصباح', meta: 'يوميًا 8:00' }, { title: 'ملف الأسبوع', meta: 'الخميس' },
  { title: 'بودكاست شهاب', meta: 'أسبوعي' }, { title: 'عدسة الميدان', meta: 'وثائقي' },
  { title: 'قراءة في الصحف', meta: 'يوميًا' }, { title: 'لقاء خاص', meta: 'شهري' }
];

var VIDEOS = [
  { title: 'شاهد | لحظة استهداف برج سكني وسط مدينة غزة', dur: '02:14', date: 'منذ ساعة' },
  { title: 'تقرير | كيف يعيش أهالي المخيمات فصل الشتاء؟', dur: '05:47', date: 'منذ 3 ساعات' },
  { title: 'مقابلة خاصة مع الناطق باسم الأونروا حول أزمة التمويل', dur: '12:30', date: 'منذ 5 ساعات' },
  { title: 'عدسة الميدان | جولة في أسواق القدس القديمة قبيل العيد', dur: '04:05', date: 'أمس' },
  { title: 'توثيق | إعادة افتتاح مستشفى الشفاء بعد الترميم', dur: '03:22', date: 'أمس' }
];

var GALLERY = [
  { title: 'عدسة شهاب ترصد آثار القصف على حي الرمال', n: 18 },
  { title: 'صلاة الجمعة في باحات المسجد الأقصى', n: 12 },
  { title: 'موسم قطف الزيتون في سهول جنين', n: 9 },
  { title: 'أطفال غزة يعودون إلى مقاعد الدراسة', n: 14 },
  { title: 'معرض التراث الفلسطيني في إسطنبول', n: 11 },
  { title: 'أمواج بحر غزة في الخريف', n: 7 }
];

var TRENDING = POSTS.palestine.slice(0, 3).concat([POSTS.israeli[0], POSTS.world[0], POSTS.sports[0]]);

/* ---------- builders ---------- */
function card(p, cls, o) {
  o = o || {};
  var mediaImg = o.img || IMG.wide(o.i || 0);
  var flag = p.flag === 'video' ? '<span class="sx-card__flag" aria-hidden="true">' + I.play + '</span>'
    : p.flag === 'gallery' ? '<span class="sx-card__flag" aria-hidden="true">' + I.camera + '</span>' : '';
  var dur = p.dur ? '<span class="sx-card__dur">' + p.dur + '</span>' : '';
  var media = o.noMedia ? '' :
    '<a class="sx-card__media" href="article.html" tabindex="-1" aria-hidden="true"><img src="' + mediaImg + '" alt="" loading="lazy" width="1280" height="720">' + flag + dur + '</a>';
  var num = o.num ? '<span class="sx-card__num" aria-hidden="true">' + o.num + '</span>' : '';
  var kick = o.kicker && p.kicker ? '<span class="sx-card__kicker">' + p.kicker + '</span>' : '';
  var cat = p.cat ? '<a class="sx-card__cat" href="category.html">' + p.cat + '</a>' : '';
  var ex = o.excerpt && p.excerpt ? '<p class="sx-card__excerpt">' + p.excerpt + '</p>' : '';
  var meta = '<div class="sx-card__meta"><time datetime="2026-08-04">' + (p.date || '') + '</time>' + (o.metaExtra || '') + '</div>';
  return '<article class="sx-card' + (cls ? ' ' + cls : '') + '"' + (o.attrs || '') + '>' + media + num +
    '<div class="sx-card__body">' + kick + cat +
    '<h3 class="sx-card__title"><a href="article.html">' + p.title + '</a></h3>' + ex + meta + '</div></article>';
}

function sect(key, v, o) {
  o = o || {};
  var head = o.label
    ? ''
    : '<header class="sx-section__head"><h2 class="sx-section__title" id="sec-' + key + '-' + uid() + '"><a href="' + (o.url || 'category.html') + '">' + o.title + '</a></h2><a class="sx-section__more" href="' + (o.url || 'category.html') + '">المزيد' + I.chevL + '</a></header>';
  return '<section class="sx-section sx-' + key + ' sx-' + key + '--v' + v + (o.extra ? ' ' + o.extra : '') + '" data-section="' + key + '" data-variant="' + v + '"' + (o.label ? ' aria-label="' + o.label + '"' : '') + (o.attrs || '') + '>' +
    '<div class="sx-container">' + head + '<div class="sx-section__body">' + o.body + '</div></div></section>';
}

var B = {
  hero: function (v) {
    var ps = POSTS.palestine;
    var body = '<div class="sx-hero__intro"><div class="sx-hero__intro-card"><div><h2 class="sx-hero__intro-title">ادخل إلى عالم شهاب</h2><p class="sx-hero__intro-desc">مصدرك الأول لتغطية إخبارية شاملة من فلسطين والعالم — سياسة وميدان وملفات خاصة وتقارير معمّقة، بعين مراسلينا في القدس وغزة والضفة الغربية.</p></div><a class="sx-hero__intro-cta" href="page.html">استكشف الموقع<span aria-hidden="true"> ↗</span></a></div></div>' +
      card(ps[0], 'sx-card--lead', { i: 0, excerpt: true, kicker: true }) +
      '<div class="sx-hero__side"><p class="sx-hero__side-head"><span class="sx-live-dot" aria-hidden="true"></span>الأبرز الآن</p>' + ps.slice(1, 5).map(function (p, i) { return card(p, '', { i: i + 1 }); }).join('') + '</div>';
    return sect('hero', v, { label: 'أبرز الأخبار', body: body });
  },
  ticker: function (v) {
    var body = '<span class="sx-ticker__label">عاجل</span>' +
      '<div class="sx-ticker__viewport"><div class="sx-ticker__track">' +
      TICKER_ITEMS.map(function (t) { return '<span class="sx-ticker__item"><a href="article.html">' + t + '</a></span>'; }).join('') +
      '</div></div>' +
      '<button class="sx-ticker__pause" type="button" data-sx-ticker-pause aria-pressed="false" aria-label="إيقاف الشريط مؤقتًا">' + I.pauseI + I.playI + '</button>';
    return sect('ticker', v, { label: 'أخبار عاجلة', body: body, attrs: ' data-sx-ticker' });
  },
  utility: function (v) {
    var rates = [
      ['دولار أمريكي', '3.61', '-0.4%', 'is-down'], ['دينار أردني', '5.09', '+0.1%', 'is-up'],
      ['يورو', '4.18', '+0.6%', 'is-up'], ['جنيه مصري', '0.074', '-0.2%', 'is-down'], ['غرام ذهب 21', '312.4', '+1.2%', 'is-up']
    ];
    var body = rates.map(function (r) {
      return '<div class="sx-utility__item"><span class="sx-utility__lab">' + r[0] + '</span><span class="sx-utility__val">' + r[1] + '</span><span class="sx-utility__delta ' + r[3] + '">' + r[2] + '</span></div>';
    }).join('') +
      '<div class="sx-utility__weather">' + '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"></circle><path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10-1.4 1.4"></path></svg>' +
      '<span>غزة 31°</span><span class="sx-utility__lab">صافٍ</span><span class="sx-utility__lab">·</span><span>القدس 27°</span></div>';
    return sect('utility', v, { label: 'أسعار العملات والطقس', body: body });
  },
  tabs: function (v) {
    var id = uid();
    var groups = [['الكل', POSTS.palestine.slice(2, 8)], ['عربي ودولي', POSTS.world], ['رياضة', POSTS.sports]];
    var navBtns = groups.map(function (gr, i) {
      return '<button class="sx-tabs__tab" role="tab" id="tab' + id + '-' + i + '" aria-selected="' + (i === 0 ? 'true' : 'false') + '" aria-controls="panel' + id + '-' + i + '">' + gr[0] + '</button>';
    }).join('');
    var panels = groups.map(function (gr, i) {
      var cards = gr[1].slice(0, 6).map(function (p, j) { return card(p, j === 0 ? 'sx-card--lead' : '', { i: j + i, excerpt: j === 0 }); }).join('');
      return '<div class="sx-tabs__panel" role="tabpanel" id="panel' + id + '-' + i + '" aria-labelledby="tab' + id + '-' + i + '"' + (i ? ' hidden' : '') + '>' + cards + '</div>';
    }).join('');
    var body = '<div class="sx-tabs__nav" role="tablist" aria-label="تصنيفات الأخبار">' + navBtns + '</div>' + panels;
    return sect('tabs', v, { title: 'المزيد من الأخبار', url: 'category.html', body: body, attrs: ' data-sx-tabs' });
  },
  news: function (v, o) {
    o = o || {};
    var ps = o.posts || POSTS.palestine.slice(0, 5);
    var body = ps.map(function (p, i) {
      return card(p, i === 0 ? 'sx-card--lead' : '', { i: i + (o.imgOffset || 0), num: i + 1, excerpt: i === 0 });
    }).join('');
    return sect('news', v, { title: o.title || 'أخبار فلسطين', url: 'category.html', body: body });
  },
  opinion: function (v) {
    var body = WRITERS.slice(0, 4).map(function (w, i) {
      return '<article class="sx-card"><div class="sx-card__body">' +
        '<h3 class="sx-card__title"><a href="article.html">' + w.title + '</a></h3>' +
        '<div class="sx-card__meta"><time datetime="2026-08-04">' + w.date + '</time></div></div>' +
        '<div class="sx-author"><img src="' + IMG.av(i) + '" alt="" loading="lazy" width="240" height="240"><div><div class="sx-author__name"><a href="writers.html">' + w.name + '</a></div><div class="sx-author__role">' + w.role + '</div></div></div>' +
        '</article>';
    }).join('');
    return sect('opinion', v, { title: 'رأي', url: 'writers.html', body: body });
  },
  quotes: function (v) {
    var body = QUOTES.slice(0, 3).map(function (q, i) {
      return '<article class="sx-card">' +
        '<a class="sx-card__media" href="article.html" tabindex="-1" aria-hidden="true"><img src="' + IMG.por(i) + '" alt="" loading="lazy" width="720" height="960"></a>' +
        '<div class="sx-card__body"><span class="sx-badge">تصريح خاص</span>' +
        '<p class="sx-card__quote"><a href="article.html">«' + q.q + '»</a></p>' +
        '<div class="sx-author"><img src="' + IMG.av(i + 2) + '" alt="" loading="lazy" width="240" height="240"><div><div class="sx-author__name">' + q.name + '</div><div class="sx-author__role">' + q.role + '</div></div></div>' +
        '</div></article>';
    }).join('');
    return sect('quotes', v, { title: 'تصريحات خاصة', url: 'category.html', body: body });
  },
  files: function (v) {
    var body = FILES.slice(0, 5).map(function (f, i) {
      return '<article class="sx-card' + (i === 0 ? ' sx-card--lead' : '') + '">' +
        '<a class="sx-card__media" href="special-file.html" tabindex="-1" aria-hidden="true"><img src="' + IMG.poster(i) + '" alt="" loading="lazy" width="720" height="1000"></a>' +
        '<div class="sx-card__body"><h3 class="sx-card__title"><a href="special-file.html">' + f.title + '</a></h3>' +
        '<div class="sx-card__meta"><span>' + f.meta + '</span></div></div></article>';
    }).join('');
    return sect('files', v, { title: 'ملفات خاصة', url: 'special-file.html', body: body });
  },
  programs: function (v) {
    var body = PROGRAMS.map(function (p, i) {
      return '<article class="sx-card">' +
        '<a class="sx-card__media" href="video.html" tabindex="-1" aria-hidden="true"><img src="' + IMG.sq(i) + '" alt="" loading="lazy" width="800" height="800"></a>' +
        '<div class="sx-card__body"><h3 class="sx-card__title"><a href="video.html">' + p.title + '</a></h3>' +
        '<div class="sx-card__meta"><span>' + p.meta + '</span></div></div></article>';
    }).join('');
    return sect('programs', v, { title: 'برامج شهاب', url: 'video.html', body: body });
  },
  video: function (v, o) {
    o = o || {};
    var VIDS = [
      { t: 'شاهد | لحظة استهداف برج سكني وسط مدينة غزة', dur: '10:35', date: 'منذ ساعة', type: 'youtube', id: 'aqz-KE-bpKQ', poster: 'assets/img/real/gaza-city.png' },
      { t: 'تقرير | كيف يعيش أهالي المخيمات فصل الشتاء؟', dur: '05:47', date: 'منذ 3 ساعات', type: 'file', src: 'assets/video/demo-1.mp4', poster: 'assets/img/real/khan-yunis.png' },
      { t: 'مقابلة خاصة مع الناطق باسم الأونروا حول أزمة التمويل', dur: '12:30', date: 'منذ 5 ساعات', type: 'youtube', id: 'M7lc1UVf-VE', poster: 'assets/img/real/ramallah.png' },
      { t: 'عدسة الميدان | جولة في أسواق القدس القديمة قبيل العيد', dur: '04:05', date: 'أمس', type: 'youtube', id: 'jNQXAC9IVRw', poster: 'assets/img/real/old-city.png' },
      { t: 'توثيق | إعادة افتتاح مستشفى الشفاء بعد الترميم', dur: '03:22', date: 'أمس', type: 'file', src: 'assets/video/demo-2.mp4', poster: 'assets/img/real/port-gaza.png' }
    ];
    var player = '<div class="sx-video__player">' +
      '<div class="sx-video__glow" aria-hidden="true"><img src="' + VIDS[0].poster + '" alt=""></div>' +
      '<div class="sx-video-frame is-poster" data-sx-video-frame>' +
      '<div class="sx-video__statusbar" aria-hidden="true"><span class="sx-video__onair"><span class="sx-live-dot"></span>على الهواء</span><span class="sx-video__chan">SHB•01</span></div>' +
      '<img class="sx-video__poster" src="' + VIDS[0].poster + '" alt="" width="1280" height="720">' +
      '<video playsinline preload="metadata" hidden></video>' +
      '<div class="sx-video__embed" hidden></div>' +
      '<div class="sx-video__msg" hidden>ملف الفيديو المحلي غير متوفر في نسخة المعاينة — ضع ملفات MP4 في <bdo dir="ltr">assets/video/</bdo> وستعمل مباشرة.</div>' +
      '<button class="sx-play" type="button" aria-label="تشغيل الفيديو">' + I.play + '</button>' +
      '<div class="sx-video__controls">' +
      '<button type="button" data-sx-ctl="play" aria-label="تشغيل / إيقاف مؤقت"></button>' +
      '<div class="sx-video__seek"><span class="sx-video__buff"></span><span class="sx-video__fill"></span><input type="range" min="0" max="100" value="0" step="0.1" aria-label="شريط التقدم"></div>' +
      '<span class="sx-video__time">0:00 / 0:00</span>' +
      '<button type="button" data-sx-ctl="mute" aria-label="كتم الصوت"></button>' +
      '<button type="button" data-sx-ctl="fs" aria-label="ملء الشاشة"><svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H4v4m12-4h4v4M8 20H4v-4m12 4h4v-4"></path></svg></button>' +
      '</div></div>' +
      '<div class="sx-video__lower"><span class="sx-video__lower-tag">يعرض الآن</span><div class="sx-video__lower-bar"><p class="sx-video__caption" data-sx-video-caption>' + VIDS[0].t + '</p><span class="sx-video__metaline" data-sx-video-meta>' + VIDS[0].date + '</span></div><span class="sx-badge" data-sx-video-srcbadge>يوتيوب</span></div>' +
      '</div>';
    var list = '<div class="sx-video__playlist">' + VIDS.map(function (vd, i) {
      var data = ' data-sx-video-item data-video-type="' + vd.type + '"' +
        (vd.type === 'youtube' ? ' data-video-id="' + vd.id + '"' : ' data-video-src="' + vd.src + '"') +
        ' data-poster="' + vd.poster + '"';
      return '<article class="sx-card' + (i === 0 ? ' is-active' : '') + '"' + data + '>' +
        '<span class="sx-card__media"><img src="' + vd.poster + '" alt="" loading="lazy" width="1280" height="720">' +
        '<span class="sx-card__dur">' + vd.dur + '</span>' +
        '<span class="sx-eq" aria-hidden="true"><i></i><i></i><i></i></span>' +
        '<span class="sx-nowbadge">على الهواء</span><span class="sx-video__idx">SHB•0' + (i + 1) + '</span></span>' +
        '<div class="sx-card__body">' +
        '<h3 class="sx-card__title"><a href="video.html">' + vd.t + '</a></h3>' +
        '<div class="sx-card__meta"><time datetime="2026-08-04">' + vd.date + '</time><span>·</span><span>' + (vd.type === 'youtube' ? 'يوتيوب' : 'فيديو محلي') + '</span></div>' +
        '</div></article>';
    }).join('') + '</div>';
    return sect('video', v, { title: o.title || 'فيديو', url: 'video.html', body: player + list, attrs: o.noJs ? '' : ' data-sx-video' });
  },
  gallery: function (v) {
    var imgs = [IMG.wide(5), IMG.por(1), IMG.sq(2), IMG.wide(6), IMG.por(3), IMG.sq(0)];
    var slides = '<div class="sx-gallery__slides">' + GALLERY.map(function (g, i) {
      return card({ title: g.title, date: g.n + ' صورة', flag: 'gallery' }, i === 0 ? 'sx-card--lead' : '', { img: imgs[i], attrs: ' data-sx-slide' });
    }).join('') + '</div>';
    var bar = '<div class="sx-gallery__bar"><button class="sx-gallery__btn" type="button" data-sx-prev aria-label="السابق">' + I.chevR + '</button><span class="sx-gallery__counter" data-sx-counter>1 / ' + GALLERY.length + '</span><button class="sx-gallery__btn" type="button" data-sx-next aria-label="التالي">' + I.chevL + '</button></div>';
    return sect('gallery', v, { title: 'بالصور', url: 'gallery.html', body: slides + bar, attrs: ' data-sx-slider' });
  },
  cartoon: function (v) {
    var ARCH = [
      ['«الممر الآمن»', 'أمس · 3 أغسطس'],
      ['«طاولة التفاوض»', '2 أغسطس'],
      ['«الجدار»', '1 أغسطس']
    ];
    var body = '<div class="sx-cartoon__stage">' +
      '<figure class="sx-cartoon__art"><span class="sx-cartoon__stamp" aria-hidden="true">اليوم<br>4 أغسطس</span>' +
      '<a href="gallery.html"><img src="assets/img/ph-cartoon.svg" alt="كاريكاتير اليوم: المفاوضات" loading="lazy" width="1200" height="900"></a></figure>' +
      '<div class="sx-cartoon__meta"><h3 class="sx-cartoon__title">«المفاوضات»</h3>' +
      '<p class="sx-cartoon__desc">ريشة تختصر المشهد السياسي بضربة واحدة — يرسم نزّال يوميات الحصار والمفاوضات منذ خمسة عشر عامًا.</p>' +
      '<div class="sx-author"><img src="' + IMG.av(4) + '" alt="" loading="lazy" width="240" height="240"><div><div class="sx-author__name">أسامة نزّال</div><div class="sx-author__role">رسام الكاريكاتير — شهاب</div></div></div>' +
      '<div class="sx-cartoon__actions"><a class="sx-gallery__btn" href="gallery.html" aria-label="كاريكاتير الأمس">' + I.chevR + '</a><a class="sx-gallery__btn" href="gallery.html" aria-label="كاريكاتير الغد">' + I.chevL + '</a><a class="sx-btn sx-btn--ghost sx-btn--sm" href="gallery.html">الأرشيف الكامل</a></div>' +
      '</div></div>' +
      '<div class="sx-cartoon__archive">' + ARCH.map(function (a) {
        return '<a class="sx-cartoon__item" href="gallery.html">' +
          '<span class="sx-cartoon__item-art"><img src="assets/img/ph-cartoon.svg" alt="" loading="lazy" width="1200" height="900"></span>' +
          '<span class="sx-cartoon__item-title">' + a[0] + '</span><span class="sx-cartoon__item-date">' + a[1] + '</span></a>';
      }).join('') + '</div>';
    return sect('cartoon', v, { title: 'كاريكاتير', url: 'gallery.html', body: body });
  },
  social: function (v) {
    var nets = [
      ['facebook', 'فيسبوك', '524K', I.fb], ['x', 'إكس', '600K', I.tw], ['instagram', 'إنستغرام', '950K', I.ig],
      ['telegram', 'تيليغرام', '160K', I.tg], ['youtube', 'يوتيوب', '210K', I.yt], ['whatsapp', 'واتساب', '95K', I.wa]
    ];
    var body = nets.map(function (n) {
      return '<a data-net="' + n[0] + '" href="#" rel="noopener">' + n[3] + '<span class="sx-social__count">' + n[2] + '</span><span class="sx-social__name">' + n[1] + '</span></a>';
    }).join('');
    return sect('social', v, { label: 'تابعنا على المنصات', body: body });
  },
  trending: function (v) {
    var body = TRENDING.map(function (p, i) {
      return card(p, 'sx-card--rank', { num: i + 1, noMedia: true, metaExtra: '<span>' + (98 - i * 9) + ' ألف قراءة</span>' });
    }).join('');
    return sect('trending', v, { title: 'الأكثر قراءة', url: 'category.html', body: body });
  },
  newsletter: function (v) {
    var id = uid();
    var body = '<div class="sx-newsletter__lead"><h2>نشرة شهاب البريدية</h2><p>خلاصة محررينا لأهم أخبار فلسطين، في رسالة واحدة كل صباح.</p></div>' +
      '<form action="#" method="post"><label class="visually-hidden" for="nl' + id + '">البريد الإلكتروني</label><input type="email" id="nl' + id + '" name="email" placeholder="بريدك الإلكتروني" required><button class="sx-btn" type="submit">اشترك</button></form>' +
      '<span class="sx-newsletter__note">يمكنك إلغاء الاشتراك في أي وقت.</span>';
    return sect('newsletter', v, { label: 'النشرة البريدية', body: body });
  },
  ad: function (kind, n) {
    var sizes = { leaderboard: '970×90', infeed: '728×90', box: '300×250', tall: '300×600' };
    return '<section class="sx-section sx-section--ad" data-section="ad" data-variant="' + n + '" aria-label="إعلان"><div class="sx-container">' +
      '<div class="sx-ad sx-ad--' + kind + '" data-ad-label="إعلان">مساحة إعلانية ' + sizes[kind] + '</div></div></section>';
  }
};

/* ---------- page chrome ---------- */
function chromeHead(title, desc, extraCss) {
  return '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' + title + '</title>\n<meta name="description" content="' + (desc || 'وكالة شهاب للأنباء — آخر أخبار فلسطين لحظة بلحظة') + '">\n' +
    '<link rel="icon" href="assets/img/logo-blue.png">\n' +
    '<link rel="stylesheet" href="assets/css/main.css?v=20260806">\n<link rel="stylesheet" href="assets/css/sections.css?v=20260806">\n<link rel="stylesheet" href="assets/css/components.css?v=20260806">\n<link rel="stylesheet" href="assets/css/dark.css?v=20260806">\n' +
    (extraCss || '') +
    '<script>try{var t=localStorage.getItem("sx-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>\n' +
    ['theme', 'menu', 'tabs', 'ticker', 'slider', 'video', 'video-float', 'poll', 'audio', 'lightbox', 'ads', 'numbers', 'swiper-init'].map(function (m) { return '<script src="assets/js/' + m + '.js?v=20260806" defer></script>'; }).join('\n') +
    '\n</head>\n';
}

function chromeHeader(active, opts) {
  opts = opts || {};
  function navLink(href, label) {
    return '<li><a class="sx-nav__link" href="' + href + '"' + (active === label ? ' aria-current="page"' : '') + '>' + label + '</a></li>';
  }
  var palMenu = '<li class="sx-nav__item" data-sx-dropdown><button class="sx-nav__link" type="button" aria-expanded="false">أخبار فلسطين' + I.caret + '</button><ul class="sx-nav__menu">' +
    ['القدس', 'غزة', 'الضفة الغربية', 'الداخل المحتل', 'الأسرى'].map(function (c) { return '<li><a href="category.html">' + c + '</a></li>'; }).join('') + '</ul></li>';
  var moreMenu = '<li class="sx-nav__item" data-sx-dropdown><button class="sx-nav__link" type="button" aria-expanded="false">المزيد' + I.caret + '</button><ul class="sx-nav__menu">' +
    [['category.html', 'رياضة'], ['category.html', 'منوعات'], ['category.html', 'اقتصاد'], ['gallery.html', 'صور'], ['about.html', 'عن الوكالة']].map(function (c) { return '<li><a href="' + c[0] + '">' + c[1] + '</a></li>'; }).join('') + '</ul></li>';
  var user = opts.loggedIn
    ? '<span class="sx-userchip"><img src="' + IMG.av(3) + '" alt="">أهلًا، أحمد</span>'
    : '<a href="page.html">تسجيل الدخول</a>';
  return '<a class="skip-link" href="#main">تجاوز إلى المحتوى</a>\n<header class="sx-header">' +
    '<div class="sx-topbar"><div class="sx-container sx-topbar__in">' +
    '<span class="sx-topbar__date"><time datetime="2026-08-04">الثلاثاء 4 أغسطس 2026</time></span>' +
    '<span class="sx-topbar__spacer"></span>' +
    '<div class="sx-topbar__links">' +
    '<button type="button" data-sx-theme-toggle aria-pressed="false">' + I.moon + '<span class="visually-hidden">تبديل الوضع الداكن</span></button>' +
    '<a href="index.html" lang="en" dir="ltr">English</a>' +
    '<a href="contact.html">تواصل معنا</a>' + user +
    '</div></div></div>' +
    '<div class="sx-container sx-masthead">' +
    '<button class="sx-iconbtn sx-header__burger" type="button" data-sx-drawer-open aria-expanded="false" aria-label="فتح القائمة">' + I.menu + '</button>' +
    '<a class="sx-masthead__logo" href="index.html"><img class="sx-logo-light" src="assets/img/logo-blue.png" alt="وكالة شهاب للأنباء" width="583" height="377"><img class="sx-logo-dark" src="assets/img/logo-white.png" alt="" width="583" height="377"></a>' +
    '<form class="sx-masthead__search" action="search.html" method="get" role="search">' + I.search + '<label class="visually-hidden" for="q-mast">ابحث في الموقع</label><input type="search" id="q-mast" name="q" placeholder="ابحث عن خبر، ملف، برنامج…"></form>' +
    '<div class="sx-masthead__actions">' +
    '<button class="sx-iconbtn sx-masthead__search-toggle" type="button" data-sx-search-toggle aria-expanded="false" aria-label="بحث">' + I.search + '</button>' +
    '<a class="sx-iconbtn" href="page.html" aria-label="المحفوظات">' + I.bookmark + '</a>' +
    '<a class="sx-live-chip" href="video.html"><span class="sx-live-dot" aria-hidden="true"></span>بث مباشر</a>' +
    '<a class="sx-btn sx-btn--cta" href="contact.html#send-news">أضف خبرًا</a>' +
    '</div></div>' +
    '<nav class="sx-navbar" aria-label="التنقل الرئيسي"><div class="sx-container sx-navbar__in"><ul class="sx-nav__list">' +
    navLink('index.html', 'الرئيسية') + palMenu + navLink('category.html', 'عربي ودولي') + navLink('category.html', 'اسرائيلي') +
    navLink('special-file.html', 'ملفات خاصة') + navLink('video.html', 'فيديو') + navLink('writers.html', 'رأي') + moreMenu +
    '</ul><a class="sx-navbar__latest" href="category.html"><span class="sx-live-dot" aria-hidden="true"></span>آخر الأخبار</a></div></nav>' +
    '<div class="sx-search" data-sx-search><div class="sx-container"><form action="search.html" role="search" method="get"><label class="visually-hidden" for="q-top">ابحث في الموقع</label><input type="search" id="q-top" name="q" placeholder="ابحث في شهاب…"><button class="sx-btn" type="submit">بحث</button></form><p class="sx-search__hint">اقتراحات: غزة · الأسرى · صفقة التبادل · المسجد الأقصى</p></div></div>' +
    '</header>\n' +
    '<div class="sx-drawer" data-sx-drawer aria-label="القائمة الرئيسية">' +
    '<div class="sx-drawer__head"><img class="sx-logo-light" src="assets/img/logo-blue.png" alt="وكالة شهاب"><img class="sx-logo-dark" src="assets/img/logo-white.png" alt="وكالة شهاب" hidden>' +
    '<button class="sx-iconbtn" type="button" data-sx-drawer-close aria-label="إغلاق القائمة">' + I.x + '</button></div>' +
    '<nav aria-label="تنقل الجوال"><ul>' +
    [['index.html', 'الرئيسية'], ['category.html', 'أخبار فلسطين'], ['category.html', 'القدس'], ['category.html', 'عربي ودولي'], ['category.html', 'اسرائيلي'], ['video.html', 'فيديو'], ['writers.html', 'رأي'], ['special-file.html', 'ملفات خاصة'], ['gallery.html', 'صور'], ['category.html', 'رياضة'], ['category.html', 'منوعات']].map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + '</a></li>'; }).join('') +
    '</ul></nav>' +
    '<div class="sx-drawer__foot"><a class="sx-btn" href="page.html">أضف خبرًا</a><a class="sx-btn sx-btn--ghost" href="page.html">تسجيل الدخول</a></div></div>' +
    '<div class="sx-scrim" data-sx-scrim hidden></div>\n';
}

function chromeFooter() {
  var up = '<svg class="sx-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6"></path></svg>';
  var cols = [
    ['الأقسام', [['category.html', 'أخبار فلسطين'], ['category.html', 'القدس'], ['category.html', 'عربي ودولي'], ['category.html', 'اسرائيلي'], ['category.html', 'رياضة'], ['category.html', 'اقتصاد']]],
    ['المحتوى', [['video.html', 'فيديو وبث مباشر'], ['video.html', 'برامج شهاب'], ['video.html', 'بودكاست'], ['special-file.html', 'ملفات خاصة'], ['gallery.html', 'صور وإنفوغراف'], ['gallery.html', 'كاريكاتير']]],
    ['الوكالة', [['page.html', 'من نحن'], ['page.html', 'سياسة التحرير'], ['page.html', 'تواصل معنا'], ['page.html', 'أضف خبرًا'], ['page.html', 'أعلن معنا'], ['page.html', 'انضم لفريقنا']]],
    ['خدمات', [['search.html', 'البحث في الأرشيف'], ['writers.html', 'كتّاب شهاب'], ['page.html', 'إشعارات المتصفح'], ['page.html', 'RSS'], ['page.html', 'خريطة الموقع'], ['index.html', 'English']]]
  ];
  return '<footer class="sx-footer">' +
    '<img class="sx-footer__mark" src="assets/img/logo-white.png" alt="" aria-hidden="true">' +
    '<div class="sx-footer__cta"><div class="sx-container sx-footer__cta-in">' +
    '<div class="sx-footer__cta-lead"><h3>نشرة شهاب البريدية</h3><p>خلاصة محررينا لأهم أخبار فلسطين — رسالة واحدة كل صباح، بلا ضجيج.</p></div>' +
    '<form class="sx-footer__form" action="#" method="post"><label class="visually-hidden" for="fnl">البريد الإلكتروني</label><input type="email" id="fnl" placeholder="بريدك الإلكتروني" required><button class="sx-btn" type="submit">اشترك</button></form>' +
    '</div></div>' +
    '<div class="sx-container"><div class="sx-footer__grid">' +
    '<div class="sx-footer__brand"><img src="assets/img/logo-white.png" alt="وكالة شهاب للأنباء" width="583" height="377">' +
    '<p>وكالة فلسطينية مستقلة تأسست في غزة عام 2007، تنقل الخبر من قلب الميدان بمهنية — انحيازنا الوحيد للحقيقة.</p>' +
    '<span class="sx-footer__stat">أكثر من <strong>2.4 مليون</strong> متابع عبر المنصات</span>' +
    '<div class="sx-footer__social">' +
    [['فيسبوك', I.fb], ['إكس', I.tw], ['إنستغرام', I.ig], ['تيليغرام', I.tg], ['يوتيوب', I.yt], ['واتساب', I.wa]].map(function (s) { return '<a href="#" aria-label="' + s[0] + '">' + s[1] + '</a>'; }).join('') +
    '</div></div>' +
    cols.map(function (c) {
      return '<div class="sx-footer__col"><h3>' + c[0] + '</h3><ul>' + c[1].map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + '</a></li>'; }).join('') + '</ul></div>';
    }).join('') +
    '</div></div>' +
    '<div class="sx-footer__legal"><div class="sx-container sx-footer__legal-in">' +
    '<span>© 2026 وكالة شهاب للأنباء — جميع الحقوق محفوظة</span>' +
    '<span class="sx-footer__legal-links"><a href="page.html">سياسة الخصوصية</a><a href="page.html">شروط الاستخدام</a><a href="page.html">سياسة التصحيح</a></span>' +
    '<a class="sx-footer__totop" href="#main" aria-label="العودة إلى الأعلى">' + up + '</a>' +
    '</div></div></footer>';
}

function pageDoc(title, desc, active, mainHtml, opts) {
  opts = opts || {};
  return chromeHead(title, desc, opts.extraCss) + '<body>\n' + chromeHeader(active, opts) +
    '<main id="main" class="sx-main">\n' + mainHtml + '\n</main>\n' + chromeFooter() +
    (opts.stickyAd ? '\n<div class="sx-ad-sticky" role="complementary" aria-label="إعلان مثبت"><button class="sx-ad-sticky__close" type="button" data-sx-ad-close aria-label="إغلاق الإعلان">' + I.x + '</button><div class="sx-ad" data-ad-label="إعلان">مساحة إعلانية 640×60</div></div>' : '') +
    (opts.beforeEnd || '') + '\n</body>\n</html>\n';
}
