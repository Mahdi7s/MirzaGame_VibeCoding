
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
  gridSize: { rows: number; cols: number };
}

export const levels: Level[] = [
  {
    id: 1,
    name: "مرحله اول",
    letters: ["ا", "ن", "ب", "ت"], // For "انار", "ناب", "نبات", "بنا", "تاب"
    targetWords: [
      { word: "نبات", startX: 0, startY: 1, direction: "horizontal" }, //  ن ب ا ت
      { word: "بنا", startX: 1, startY: 0, direction: "vertical" },   //    ب
                                                                    //    ن
                                                                    //    ا
      { word: "تاب", startX: 3, startY: 0, direction: "vertical" },   //        ت
                                                                    //        ا
                                                                    //        ب
    ],
    bonusWords: ["تب", "تن", "بت", "بان", "نت", "نبأ"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "persian landscape",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 2,
    name: "مرحله دوم",
    letters: ["ر", "ن", "ج", "ب"],
    targetWords: [
      { word: "برنج", startX: 0, startY: 0, direction: "horizontal" }, // ب ر ن ج
      { word: "برج", startX: 0, startY: 0, direction: "vertical" },   // ب
                                                                    // ر
                                                                    // ج
      { word: "رنج", startX: 1, startY: 1, direction: "horizontal" }, //   ر ن ج (shares ر with برج, and ن with برنج) - let's make it simpler
      // Simpler intersection:
      // برنج H (0,0) -> ب ر ن ج
      // برج V (0,0) -> sharing ب
      // رنج V (0,2) -> sharing ن of برنج
      // { word: "برنج", startX: 0, startY: 0, direction: "horizontal" }, // ب ر ن ج
      // { word: "برج", startX: 0, startY: 0, direction: "vertical" },   // ب
      //                                                               // ر
      //                                                               // ج
      { word: "رنج", startX: 2, startY: 0, direction: "vertical" },   //     ن
                                                                    //     ج
    ],
    bonusWords: ["جن", "رج", "رب", "بر", "بن"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "desert oasis",
    gridSize: { rows: 3, cols: 4 },
  },
  {
    id: 3,
    name: "مرحله سوم",
    letters: ["م", "ش", "ک", "ت"],
    targetWords: [
      { word: "تمشک", startX: 0, startY: 0, direction: "horizontal" }, // ت م ش ک
      { word: "تشک", startX: 0, startY: 0, direction: "vertical" },   // ت
                                                                    // ش
                                                                    // ک
      { word: "مشک", startX: 1, startY: 2, direction: "horizontal" }, //   م ش ک (shares ک with تشک)
      { word: "شکم", startX: 2, startY: 0, direction: "vertical" },   //     ش
                                                                    //     ک
                                                                    //     م
    ],
    bonusWords: ["شک", "مت", "کشت", "شم"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "mountain valley",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 4,
    name: "مرحله چهارم",
    letters: ["ر", "م", "ز", "ت"],
    targetWords: [
      { word: "ترمز", startX: 0, startY: 0, direction: "horizontal" }, // ت ر م ز
      { word: "رمز", startX: 1, startY: 0, direction: "vertical" },   //   ر
                                                                    //   م
                                                                    //   ز
      { word: "رزم", startX: 1, startY: 1, direction: "horizontal" }, //   ر ز م (shares ر with ترمز & رمز) - no, this is not good
      //  ترمز H (0,0) -> ت ר م ز (using ר for ر to avoid RTL confusion in comment)
      //  رمز V (0,1) ->   ר
      //                  م
      //                  ز
      //  مرز H (2,0) ->   ت ר م ز
      //                      م ר ز
      //  رزم V (2,2) ->       ز
      //                      מ (m)
      { word: "مرز", startX: 0, startY: 2, direction: "horizontal" }, // م ر ز (shares ر with رمز, and ز with ترمز)
      { word: "رزم", startX: 2, startY: 0, direction: "vertical" },   //     م
                                                                    //     ز
                                                                    //     م
    ],
    bonusWords: ["رز", "رم", "مت", "مر", "تر", "تم"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "ancient ruins",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 5,
    name: "مرحله پنجم",
    letters: ["ر", "ی", "ل", "ا"],
    targetWords: [
      { word: "ریال", startX: 0, startY: 0, direction: "horizontal" }, // ر ی ا ل
      { word: "ریل", startX: 0, startY: 0, direction: "vertical" },   // ر
                                                                    // ی
                                                                    // ل
      { word: "یار", startX: 0, startY: 1, direction: "horizontal" }, //   ی ا ر (shares ی from ریال/ریل)
    ],
    bonusWords: ["یل", "ری", "ایر", "لای", "آری"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "coastal scene",
    gridSize: { rows: 3, cols: 4 },
  },
  {
    id: 6,
    name: "مرحله ششم",
    letters: ["ک", "ل", "م", "ه"],
    targetWords: [
      { word: "کلمه", startX: 0, startY: 0, direction: "horizontal" }, // ک ل م ه
      { word: "ملکه", startX: 2, startY: 0, direction: "vertical" },   //     م
                                                                    //     ل
                                                                    //     ک
                                                                    //     ه
      { word: "کلم", startX: 0, startY: 0, direction: "vertical" },   // ک
                                                                    // ل
                                                                    // م
      { word: "ملک", startX: 0, startY: 2, direction: "horizontal" }, //   م ل ک (shares م with کلمه/کلم, shares ک with ملکه)
    ],
    bonusWords: ["کل", "لک", "هم", "مه", "که"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "flower garden",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 7,
    name: "مرحله هفتم",
    letters: ["پ", "ا", "ک", "ت"],
    targetWords: [
      { word: "پاکت", startX: 0, startY: 0, direction: "horizontal" }, // پ ا ک ت
      { word: "پاک", startX: 0, startY: 0, direction: "vertical" },   // پ
                                                                    // ا
                                                                    // ک
      { word: "پتک", startX: 0, startY: 2, direction: "horizontal" }, //   پ ت ک (shares پ with پاکت/پاک, shares ک with پاک)
    ],
    bonusWords: ["پک", "تک", "تاپ", "کات"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "library interior",
    gridSize: { rows: 3, cols: 4 },
  },
  {
    id: 8,
    name: "مرحله هشتم",
    letters: ["ه", "ن", "ر", "ق"],
    targetWords: [
      { word: "نقره", startX: 0, startY: 0, direction: "horizontal" }, // ن ق ر ه
      { word: "هنر", startX: 3, startY: 0, direction: "vertical" },   //       ه
                                                                    //       נ (n)
                                                                    //       ר (r)
      { word: "رهن", startX: 2, startY: 0, direction: "vertical" },   //     ר
                                                                    //     ה (h)
                                                                    //     נ (n)
      { word: "قرن", startX: 1, startY: 0, direction: "vertical" },   //   ق
                                                                    //   ر
                                                                    //   ن
      { word: "نهر", startX: 0, startY: 2, direction: "horizontal" }, // ن ه ر (shares ن with نقره, ر with نقره/رهن/قرن, ه with هنر) - This is getting complex to fit all nicely.
      // Simpler:
      // نقره H (0,0) -> ن ق ר ه
      // هنر V (0,3, 'ه') -> ه
      //                   נ
      //                   ר
      // قرن V (0,1, 'ق') -> ق
      //                   ר
      //                   נ
      // رهن H (1,2, 'ר' of قرن/نقره) -> ר ה נ
      // نهر (This one is hard to fit with simple intersections without major grid expansion or re-arranging others)
      // Let's make نهر a bonus or rethink one of the vertical words to be horizontal.
      // نقره H (0,0)
      // هنر V (0,3) 'ه'
      // قرن V (0,1) 'ق'
      // رهن H (2,0) -> ر ه ن (shares ر from نقره at (0,2))
      // نهر H (0,0) -> NO, this is not good.
      // Let's try:
      { word: "نهر", startX: 0, startY: 0, direction: "vertical" }, // N H R, sharing N with نقره
                                                                   // ه
                                                                   // ر
    ],
    bonusWords: ["ره", "نه", "رق", "نق", "قر", "هن"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "starry night",
    gridSize: { rows: 5, cols: 4 }, // Increased size
  },
  {
    id: 9,
    name: "مرحله نهم",
    letters: ["ش", "ا", "ل", "ب"],
    targetWords: [
      { word: "بالش", startX: 0, startY: 0, direction: "horizontal" }, // ب ا ل ش
      { word: "شال", startX: 3, startY: 0, direction: "vertical" },   //       ش
                                                                    //       ا
                                                                    //       ل
      { word: "بال", startX: 0, startY: 0, direction: "vertical" },   // ب
                                                                    // ا
                                                                    // ل
      { word: "بلا", startX: 0, startY: 2, direction: "horizontal" }, //   ب ل ا (shares ب with بالش/بال, ل with بالش/شال/بال)
    ],
    bonusWords: ["لب", "آش", "بل", "لاش"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "forest path",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 10,
    name: "مرحله دهم",
    letters: ["آ", "ه", "ک", "و"], // "ا" is also needed for کاوه/کاه if "آ" is distinct
    // Assuming آ and ا can be represented by one 'ا' in the letters array for simplicity of level design.
    // If they must be distinct, letters should be ["آ", "ه", "ک", "و", "ا"]
    // For now, let's use:
    // letters: ["ا", "ه", "ک", "و"], where 'ا' covers 'آ' too.
    targetWords: [
      { word: "کاهو", startX: 0, startY: 0, direction: "horizontal" }, // ک ا ه و
      { word: "کاوه", startX: 0, startY: 0, direction: "vertical" },   // ک
                                                                    // ا
                                                                    // و
                                                                    // ه
      { word: "آهک", startX: 1, startY: 2, direction: "horizontal" }, //   ا ه ک (shares ا with کاهو/کاوه, ه with کاهو/کاوه, ک with کاوه)
      { word: "کوه", startX: 0, startY: 2, direction: "vertical" },   //     ک (shares ک from آهک)
                                                                    //     و (shares و from کاوه)
                                                                    //     ه (shares ه from کاوه/آهک)
      { word: "کاه", startX: 0, startY: 3, direction: "horizontal" }, //     ک ا ه (shares ک,ا,ه with others)
    ],
    bonusWords: ["آه", "کاو", "آوا", "وه", "هو", "ها"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "traditional teahouse",
    gridSize: { rows: 5, cols: 4 },
  },
  {
    id: 11,
    name: "مرحله یازدهم",
    letters: ["م", "ی", "خ", "ر"],
    targetWords: [
      { word: "خمیر", startX: 0, startY: 0, direction: "horizontal" }, // خ م ی ر
      { word: "مریخ", startX: 1, startY: 0, direction: "vertical" },   //   م
                                                                    //   ر
                                                                    //   ی
                                                                    //   خ
      { word: "میخ", startX: 0, startY: 2, direction: "horizontal" }, //     م ی خ (shares م with خمیر/مریخ, ی with خمیر/مریخ, خ with مریخ)
      { word: "خیر", startX: 3, startY: 0, direction: "vertical" },   //         ر (shares ر with خمیر)
                                                                    //         ی (shares ی with خمیر/مریخ/میخ)
                                                                    //         خ (shares خ with خمیر/میخ/مریخ)
    ],
    bonusWords: ["خم", "رخ", "ری", "خی", "مر"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "persian calligraphy",
    gridSize: { rows: 5, cols: 4 },
  },
];
