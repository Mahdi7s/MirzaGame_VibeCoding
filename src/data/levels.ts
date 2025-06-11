
export interface CrosswordEntry {
  word: string;
  startX: number;
  startY: number;
  direction: 'horizontal' | 'vertical';
}

export interface Level {
  id: number;
  name: string;
  letters: string[];
  targetWords: CrosswordEntry[];
  bonusWords: string[];
  backgroundUrl: string; // This is not currently used by page.tsx for background
  dataAiHint?: string; // Optional AI hint for background image generation
  gridSize: { rows: number; cols: number };
}

export const levels: Level[] = [
  // Level 1: بنا، تاب، نبات
  {
    id: 1,
    name: "مرحله اول",
    letters: ["ا", "ن", "ب", "ت"],
    targetWords: [
      { word: "نبات", startX: 0, startY: 1, direction: "horizontal" }, // ن ب ا ت
      { word: "بنا", startX: 1, startY: 0, direction: "vertical" },   //   ب (از نبات)
                                                                    //   ن
                                                                    //   ا
      { word: "تاب", startX: 3, startY: 0, direction: "vertical" },   //       ت (از نبات)
                                                                    //       ا
                                                                    //       ب
    ],
    bonusWords: ["تب", "تن", "بت", "نبأ", "ات", "بان", "آن", "تا", "نت"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "persian garden",
    gridSize: { rows: 4, cols: 4 },
  },
  // Level 2: رنج، برج، برنج
  {
    id: 2,
    name: "مرحله دوم",
    letters: ["ر", "ن", "ج", "ب"],
    targetWords: [
      { word: "برنج", startX: 0, startY: 1, direction: "horizontal" }, // ب ر ن ج
      { word: "برج", startX: 0, startY: 0, direction: "vertical" },   // ب (از برنج)
                                                                    // ر
                                                                    // ج
      { word: "رنج", startX: 1, startY: 1, direction: "vertical" },   //   ر (از برنج)
                                                                    //   ن
                                                                    //   ج
    ],
    bonusWords: ["جن", "رج", "رب", "بر", "بن"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "desert oasis",
    gridSize: { rows: 4, cols: 4 },
  },
  // Level 3: مشک، شکم، تشک، تمشک
  {
    id: 3,
    name: "مرحله سوم",
    letters: ["م", "ش", "ک", "ت"],
    targetWords: [
      { word: "تمشک", startX: 0, startY: 0, direction: "horizontal" }, // ت م ش ک
      { word: "تشک", startX: 0, startY: 0, direction: "vertical" },   // ت (از تمشک)
                                                                    // ش
                                                                    // ک
      { word: "شکم", startX: 2, startY: 0, direction: "vertical" },   //     ش (از تمشک)
                                                                    //     ک
                                                                    //     م
      { word: "مشک", startX: 1, startY: 0, direction: "vertical" },   //   م (از تمشک)
                                                                    //   ش
                                                                    //   ک
    ],
    bonusWords: ["شک", "مت", "کشت", "شم"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "mountain valley",
    gridSize: { rows: 3, cols: 4 },
  },
  // Level 4: رمز، رزم، مرز، ترمز
   {
    id: 4,
    name: "مرحله چهارم",
    letters: ["ر", "م", "ز", "ت"],
    targetWords: [
      { word: "ترمز", startX: 0, startY: 1, direction: "horizontal" }, // ت ر م ز
      { word: "رزم", startX: 1, startY: 0, direction: "vertical" },   //   ر (از ترمز)
                                                                    //   ز
                                                                    //   م
      { word: "مرز", startX: 2, startY: 1, direction: "vertical" },   //     م (از ترمز)
                                                                    //     ر
                                                                    //     ز
      { word: "رمز", startX: 3, startY: 0, direction: "vertical" },   //       ز (از ترمز)
                                                                    //       م
                                                                    //       ر
    ],
    bonusWords: ["رز", "رم", "مت", "مر", "تر", "تم"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "ancient ruins",
    gridSize: { rows: 4, cols: 4 },
  },
  // Level 5: ریل، یار، ریال
  {
    id: 5,
    name: "مرحله پنجم",
    letters: ["ر", "ی", "ل", "ا"],
    targetWords: [
      { word: "ریال", startX: 0, startY: 1, direction: "horizontal" }, // ر ی ا ل
      { word: "ریل", startX: 0, startY: 0, direction: "vertical" },   // ر (از ریال)
                                                                    // ی
                                                                    // ل
      { word: "یار", startX: 1, startY: 0, direction: "horizontal" }, //   ی ا ر (ی از ریال)
    ],
    bonusWords: ["یل", "ری", "ایر", "لای", "آری"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "coastal scene",
    gridSize: { rows: 4, cols: 4 },
  },
  // Level 6: کلم، ملک، ملکه، کلمه
  {
    id: 6,
    name: "مرحله ششم",
    letters: ["ک", "ل", "م", "ه"],
    targetWords: [
      { word: "کلمه", startX: 0, startY: 1, direction: "horizontal" }, // ک ل م ه
      { word: "کلم", startX: 0, startY: 0, direction: "vertical" },   // ک (از کلمه)
                                                                    // ل
                                                                    // م
      { word: "ملکه", startX: 2, startY: 0, direction: "vertical" },  //     م (از کلمه)
                                                                    //     ل
                                                                    //     ک
                                                                    //     ه
      { word: "ملک", startX: 0, startY: 2, direction: "horizontal" }, // م ل ک (م از کلم و ملکه, ل از کلم و ملکه, ک از کلمه و ملکه)
    ],
    bonusWords: ["کل", "لک", "هم", "مه", "که"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "flower garden",
    gridSize: { rows: 5, cols: 4 },
  },
  // Level 7: پاک، پتک، پاکت
  {
    id: 7,
    name: "مرحله هفتم",
    letters: ["پ", "ا", "ک", "ت"],
    targetWords: [
      { word: "پاکت", startX: 0, startY: 1, direction: "horizontal" }, // پ ا ک ت
      { word: "پاک", startX: 0, startY: 0, direction: "vertical" },    // پ (از پاکت)
                                                                     // ا
                                                                     // ک
      { word: "پتک", startX: 2, startY: 1, direction: "vertical" },    //   ک (از پاکت)
                                                                     //   ت
                                                                     //   پ
    ],
    bonusWords: ["پک", "تک", "تاپ", "کات", "تپ"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "library interior",
    gridSize: { rows: 4, cols: 4 },
  },
  // Level 8: هنر، رهن، قرن، نهر، نقره
  {
    id: 8,
    name: "مرحله هشتم",
    letters: ["ه", "ن", "ر", "ق"],
    targetWords: [
      { word: "نقره", startX: 0, startY: 0, direction: "horizontal" }, // ن ق ر ه
      { word: "نهر", startX: 0, startY: 0, direction: "vertical" },   // ن (از نقره)
                                                                    // ه
                                                                    // ر
      { word: "قرن", startX: 1, startY: 0, direction: "vertical" },   //   ق (از نقره)
                                                                    //   ر
                                                                    //   ن
      { word: "رهن", startX: 2, startY: 0, direction: "vertical" },   //     ر (از نقره)
                                                                    //     ه
                                                                    //     ن
      { word: "هنر", startX: 3, startY: 0, direction: "vertical" },   //       ه (از نقره)
                                                                    //       ن
                                                                    //       ر
    ],
    bonusWords: ["ره", "نه", "رق", "نق", "قر", "هن"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "starry night",
    gridSize: { rows: 4, cols: 4 },
  },
  // Level 9: شال، بال، بلا، بالش
  {
    id: 9,
    name: "مرحله نهم",
    letters: ["ش", "ا", "ل", "ب"],
    targetWords: [
      { word: "بالش", startX: 0, startY: 1, direction: "horizontal" }, // ب ا ل ش
      { word: "بال", startX: 0, startY: 0, direction: "vertical" },   // ب (از بالش)
                                                                    // ا
                                                                    // ل
      { word: "شال", startX: 3, startY: 0, direction: "vertical" },   //       ش (از بالش)
                                                                    //       ا
                                                                    //       ل
      { word: "بلا", startX: 1, startY: 1, direction: "vertical" },    //   ا (از بالش، اما باید ل باشد - اینجاست مشکل قبلی) -> اصلاح شد: ل از بالش
                                                                    //   ل
                                                                    //   ب
                                                                    // طرح اصلاح شده برای بلا:
                                                                    // بلا باید از ل در بالش منشعب شود
                                                                    // کلمه بالش: ب(0,1) ا(1,1) ل(2,1) ش(3,1)
                                                                    // پس بلا باید:
                                                                    // ب
                                                                    // ل (مشترک با بالش در 2,1)
                                                                    // ا
                                                                    // اگر بلا عمودی باشد و حرف ل آن با بالش مشترک باشد
                                                                    // ل در (2,1). کلمه بلا: ب ل ا
                                                                    // پس ل در (2,1). ب در (2,0). ا در (2,2)
      { word: "بلا", startX: 2, startY: 0, direction: "vertical" }, // ب(2,0) ل(2,1) ا(2,2) (ل مشترک با بالش)
    ],
    bonusWords: ["لب", "آش", "بل", "لاش"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "forest path",
    gridSize: { rows: 4, cols: 4 },
  },
  // Level 10: آهک، کوه، کاه، کاوه، کاهو
  {
    id: 10,
    name: "مرحله دهم",
    letters: ["ا", "ه", "ک", "و"],
    targetWords: [
      { word: "کاوه", startX: 1, startY: 0, direction: "vertical" },   // ک(1,0) ا(1,1) و(1,2) ه(1,3)
      { word: "کاهو", startX: 1, startY: 0, direction: "horizontal" },  // ک(1,0) ا(2,0) ه(3,0) و(4,0) - ک مشترک با کاوه
      { word: "آهک", startX: 0, startY: 3, direction: "horizontal" },   // آ(0,3) ه(1,3) ک(2,3) - ه مشترک با کاوه
      { word: "کوه", startX: 2, startY: 3, direction: "vertical" },     // ک(2,3) و(2,4) ه(2,5) - ک مشترک با آهک
      { word: "کاه", startX: 1, startY: 0, direction: "horizontal" },   // ک(1,0) ا(2,0) ه(3,0) - کل کلمه با کاهو و کاوه مشترک است
    ],
    bonusWords: ["آه", "کاو", "آوا", "وه", "هو", "ها"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "traditional teahouse",
    gridSize: { rows: 6, cols: 5 },
  },
  // Level 11: میخ، خیر، مریخ، خمیر
  {
    id: 11,
    name: "مرحله یازدهم",
    letters: ["م", "ی", "خ", "ر"],
    targetWords: [
      { word: "خمیر", startX: 0, startY: 1, direction: "vertical" },   // خ(0,1), م(0,2), ی(0,3), ر(0,4)
      { word: "مریخ", startX: 0, startY: 2, direction: "horizontal" }, // م(0,2), ر(1,2), ی(2,2), خ(3,2) - م مشترک با خمیر
      { word: "میخ", startX: 3, startY: 0, direction: "vertical" },   // م(3,0), ی(3,1), خ(3,2) - خ مشترک با مریخ
      { word: "خیر", startX: 0, startY: 1, direction: "horizontal" },  // خ(0,1), ی(1,1), ر(2,1) - خ مشترک با خمیر
    ],
    bonusWords: ["خم", "رخ", "ری", "خی", "مر"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "persian calligraphy",
    gridSize: { rows: 5, cols: 4 },
  },
];
