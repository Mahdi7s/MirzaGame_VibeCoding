
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
      { word: "بنا", startX: 1, startY: 1, direction: "vertical" },   //   ب (از نبات)
                                                                    //   ن
                                                                    //   ا
      { word: "تاب", startX: 3, startY: 1, direction: "vertical" },   //       ت (از نبات)
                                                                    //       ا
                                                                    //       ب
    ],
    bonusWords: ["تب", "تن", "بت", "نبأ", "ات"],
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
      { word: "برج", startX: 0, startY: 1, direction: "vertical" },   // ب (از برنج)
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
  // Level 4: رمز، رزم، مرز، ترمز - Revised layout
  {
    id: 4,
    name: "مرحله چهارم",
    letters: ["ر", "م", "ز", "ت"],
    targetWords: [
      //  T R M Z
      //  . Z . .
      //  . M . R
      //    . . Z
      { word: "ترمز", startX: 0, startY: 0, direction: "horizontal" }, // T(0,0) R(1,0) M(2,0) Z(3,0)
      { word: "رزم",  startX: 1, startY: 0, direction: "vertical" },   // R(1,0) Z(1,1) M(1,2) - Shares R from ترمز
      { word: "مرز",  startX: 2, startY: 0, direction: "vertical" },   // M(2,0) R(2,2) Z(2,3) - Shares M from ترمز
      { word: "رمز",  startX: 3, startY: 0, direction: "vertical" }    // Z(3,0) M(3,1) R(3,2) - Shares Z from ترمز
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
      { word: "ریل", startX: 0, startY: 1, direction: "vertical" },   // ر (از ریال)
                                                                    // ی
                                                                    // ل
      { word: "یار", startX: 1, startY: 0, direction: "horizontal" }, //   ی ا ر (ی از ریال)
    ],
    bonusWords: ["یل", "ری", "ایر", "لای", "آری"], // "آری" kept with 'آ'
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
      { word: "کلم", startX: 0, startY: 1, direction: "vertical" },   // ک (از کلمه)
                                                                    // ل
                                                                    // م
      { word: "ملکه", startX: 2, startY: 0, direction: "vertical" },  //     م (از کلمه)
                                                                    //     ل
                                                                    //     ک
                                                                    //     ه
      { word: "ملک", startX: 0, startY: 3, direction: "horizontal" }, // م ل ک (م از کلم و ملکه, ل از کلم و ملکه, ک از کلمه و ملکه)
    ],
    bonusWords: ["کل", "لک", "هم", "مه", "که"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "flower garden",
    gridSize: { rows: 5, cols: 4 },
  },
  // Level 7: پاک، پتک، پاکت - Revised layout
  {
    id: 7,
    name: "مرحله هفتم",
    letters: ["پ", "ا", "ک", "ت"], // P, A, K, T
    targetWords: [
      // Layout:
      //   . . P .
      //   . . A P
      //   P A K T
      //   . . . K
      { word: "پاک", startX: 2, startY: 0, direction: "vertical" },     // P(2,0), A(2,1), K(2,2)
      { word: "پاکت", startX: 0, startY: 2, direction: "horizontal" }, // P(0,2), A(1,2), K(2,2) (shares K with پاک), T(3,2)
      { word: "پتک", startX: 3, startY: 1, direction: "vertical" },     // P(3,1), T(3,2) (shares T with پاکت), K(3,3)
    ],
    bonusWords: ["پک", "تک", "تاپ", "کات", "تپ"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "library interior",
    gridSize: { rows: 4, cols: 4 },
  },
  // Level 8: هنر، رهن، قرن، نهر، نقره - Revised Layout
  {
    id: 8,
    name: "مرحله هشتم",
    letters: ["ه", "ن", "ر", "ق"],
    targetWords: [
      //    N Q R H (نقره)
      //    H . H N
      //    R . N R
      //    . R . Q
      { word: "نقره", startX: 0, startY: 0, direction: "horizontal" }, // N(0,0) Q(1,0) R(2,0) H(3,0)
      { word: "هنر", startX: 3, startY: 0, direction: "vertical" },   // H(3,0) N(3,1) R(3,2) - Shares H with نقره
      { word: "نهر", startX: 0, startY: 0, direction: "vertical" },   // N(0,0) H(0,1) R(0,2) - Shares N with نقره
      { word: "قرن", startX: 1, startY: 0, direction: "vertical" },   // Q(1,0) R(1,1) N(1,2) - Shares Q with نقره
      { word: "رهن", startX: 2, startY: 0, direction: "vertical" },   // R(2,0) H(2,1) N(2,2) - Shares R with نقره
    ],
    bonusWords: ["ره", "نه", "رق", "نق", "قر", "هن"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "starry night",
    gridSize: { rows: 4, cols: 4 },
  },
  // Level 9: شال، بال، بلا، بالش - Revised Layout
  {
    id: 9,
    name: "مرحله نهم",
    letters: ["ش", "ا", "ل", "ب"],
    targetWords: [
      //   . . B .
      //   B A L SH
      //   A L A A
      //   L . . L
      { word: "بالش", startX: 0, startY: 1, direction: "horizontal" }, // B(0,1) A(1,1) L(2,1) SH(3,1)
      { word: "بال", startX: 0, startY: 1, direction: "vertical" },   // B(0,1) A(0,2) L(0,3) - Shares B from بالش
      { word: "شال", startX: 3, startY: 1, direction: "vertical" },   // SH(3,1) A(3,2) L(3,3) - Shares SH from بالش
      { word: "بلا", startX: 2, startY: 0, direction: "vertical" },   // B(2,0) L(2,1) A(2,2) - Shares L from بالش
    ],
    bonusWords: ["لب", "آش", "بل", "لاش"], // "آش" kept with 'آ'
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "forest path",
    gridSize: { rows: 4, cols: 4 },
  },
  // Level 10: آهک، کوه، کاه، کاوه، کاهو
  {
    id: 10,
    name: "مرحله دهم",
    letters: ["ا", "ه", "ک", "و"], // Changed 'آ' to 'ا'
    targetWords: [
      { word: "کاهو", startX: 0, startY: 1, direction: "horizontal" }, // ک ا ه و ('ا' for آ)
      { word: "کاوه", startX: 0, startY: 1, direction: "vertical" },   // ک (از کاهو)
                                                                    // ا
                                                                    // و
                                                                    // ه
      { word: "آهک", startX: 0, startY: 3, direction: "horizontal" },  // آ ه ک (ه از کاوه, ک از کاوه) - Kept 'آ'
      { word: "کوه", startX: 2, startY: 0, direction: "vertical" },   //     و (از کاهو)
                                                                    //     ه
                                                                    //     ک (از آهک)
      { word: "کاه", startX: 2, startY: 2, direction: "horizontal" }, //     ک ا ه (ک از آهک و کوه, ه از کاوه و کوه)
    ],
    bonusWords: ["آه", "کاو", "آوا", "وه", "هو", "ها"], // "آه", "آوا" kept with 'آ'
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "traditional teahouse",
    gridSize: { rows: 5, cols: 4 },
  },
  // Level 11: میخ، خیر، مریخ، خمیر
  {
    id: 11,
    name: "مرحله یازدهم",
    letters: ["م", "ی", "خ", "ر"],
    targetWords: [
      { word: "خمیر", startX: 0, startY: 1, direction: "horizontal" }, // خ م ی ر
      { word: "مریخ", startX: 1, startY: 0, direction: "vertical" },   //   م (از خمیر)
                                                                    //   ر
                                                                    //   ی
                                                                    //   خ
      { word: "میخ", startX: 0, startY: 3, direction: "horizontal" },  // م ی خ (م از مریخ, ی از مریخ, خ از مریخ)
      { word: "خیر", startX: 3, startY: 1, direction: "vertical" },   //       ر (از خمیر)
                                                                    //       ی
                                                                    //       خ (از مریخ و میخ)
    ],
    bonusWords: ["خم", "رخ", "ری", "خی", "مر"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "persian calligraphy",
    gridSize: { rows: 5, cols: 4 },
  },
];
