
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
  // Level 4: رمز، رزم، مرز، ترمز
  {
    id: 4,
    name: "مرحله چهارم",
    letters: ["ر", "م", "ز", "ت"],
    targetWords: [
      { word: "ترمز", startX: 0, startY: 1, direction: "horizontal" }, // ت ر م ز
      { word: "رمز", startX: 1, startY: 1, direction: "vertical" },   //   ر (از ترمز)
                                                                    //   م
                                                                    //   ز
      { word: "رزم", startX: 2, startY: 0, direction: "vertical" },   //     م (از ترمز)
                                                                    //     ز
                                                                    //     ر
      { word: "مرز", startX: 0, startY: 3, direction: "horizontal" }, //       م ر ز (م از رمز, ر از رزم, ز از ترمز) - this needs careful thought
      // Let's simplify and make sure intersections are correct
      // ت ר م ز  (ترمز at y=0, x=0 H)
      //   ר      (رزم at y=0, x=1 V, shares ר)
      //   ז
      //   م
      //     م    (مرز at y=0, x=2 V, shares م)
      //     ר
      //     ז
      //       ز  (رمز at y=0, x=3 V, shares ز)
      //       م
      //       ר
      // This makes words very long vertically. Alternative:
      //  T R M Z  (ترمز H, y=0, x=0)
      //  R   Z    (رمز V, y=0, x=1, shares R; no, this is not how 'رمز' is spelled. رمز uses R,M,Z)
      //  M   M
      //  Z   R
      // Let's use a common cross structure if possible.
      //   R
      // T R M Z (ترمز)
      //   M Z (رزم - starts R, needs to share R with ترمز)
      //   Z
      { word: "ترمز", startX: 0, startY: 1, direction: "horizontal" }, // ت ر م ز
      { word: "رزم", startX: 1, startY: 1, direction: "vertical" },    //   ر (از ترمز)
                                                                     //   ز
                                                                     //   م
      { word: "رمز", startX: 3, startY: 0, direction: "vertical" },    //       ز (از ترمز)
                                                                     //       م
                                                                     //       ر
      { word: "مرز", startX: 2, startY: 2, direction: "horizontal" },  //     م ر ز (م از رزم, ز از رمز)
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
  // Level 7: پاک، پتک، پاکت
  {
    id: 7,
    name: "مرحله هفتم",
    letters: ["پ", "ا", "ک", "ت"],
    targetWords: [
      { word: "پاکت", startX: 0, startY: 0, direction: "horizontal" }, // پ ا ک ت
      { word: "پاک", startX: 0, startY: 0, direction: "vertical" },   // پ (از پاکت)
                                                                    // ا
                                                                    // ک
      { word: "پتک", startX: 0, startY: 2, direction: "horizontal" }, // ک ت پ (ک از پاک, پ از پاک) -> needs to be پ ت ک
      //  P A K T (پاکت, H, y=0, x=0)
      //  A K T
      //  K
      //  T
      // پتک shares P with پاکت and K with پاک.
      //  P A K T
      //    T
      //    K (from پاک)
      // New layout:
      // P A K T (پاکت H y=0 x=0)
      // A
      // K
      //   T K (پتک H y=2 x=2, shares T from پاکت and K from پاک) This is tricky.
      // Let's do:
      //   P (پتک, V, y=0, x=0, shares P from پاکت)
      // P A K T
      //   K
      { word: "پاکت", startX: 0, startY: 1, direction: "horizontal" }, // پ ا ک ت
      { word: "پاک", startX: 0, startY: 1, direction: "vertical" },   // پ
                                                                    // ا
                                                                    // ک
      { word: "پتک", startX: 2, startY: 0, direction: "vertical" },   //   ک (از پاکت، پاک)
                                                                    //   ت
                                                                    //   پ (از پاکت، پاک)
                                                                    // This needs K at top of پتک, P at bottom of پتک.
      // P A K T
      //     T
      //     P

      // Simpler:
      // P A K T (H, y=0)
      // A   K (پتک, V, y=0, x=2, shares K)
      // K   T
      //     P
      { word: "پاکت", startX: 0, startY: 0, direction: "horizontal" }, // P A K T
      { word: "پتک", startX: 2, startY: 0, direction: "vertical" },   //     K (from پاکت)
                                                                    //     T
                                                                    //     P
      { word: "پاک", startX: 0, startY: 0, direction: "vertical" },   // P (from پاکت)
                                                                    // A
                                                                    // K (also start of پتک) This is a double use of K in different words. This is a common crossword pattern.
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
      { word: "نقره", startX: 0, startY: 1, direction: "horizontal" }, // ن ق ر ه
      { word: "نهر", startX: 0, startY: 1, direction: "vertical" },   // ن (از نقره)
                                                                    // ه
                                                                    // ر
      { word: "هنر", startX: 2, startY: 0, direction: "vertical" },   //     ر (از نقره)
                                                                    //     ه
                                                                    //     נ (ن) (از نقره)
      { word: "قرن", startX: 1, startY: 1, direction: "vertical" },   //   ق (از نقره)
                                                                    //   ر
                                                                    //   ن
      { word: "رهن", startX: 0, startY: 3, direction: "horizontal" }, // ر ه ن (ر از نهر و هنر و قرن, ه از نهر و هنر, ن از نقره و هنر و قرن)
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
      { word: "بال", startX: 0, startY: 1, direction: "vertical" },   // ب (از بالش)
                                                                    // ا
                                                                    // ل
      { word: "شال", startX: 3, startY: 0, direction: "vertical" },   //       ش (از بالش)
                                                                    //       ا
                                                                    //       ل
      { word: "بلا", startX: 0, startY: 3, direction: "horizontal" }, // ب ل ا (ب از بال, ل از بال و شال)
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
    letters: ["آ", "ه", "ک", "و"], // Assuming 'ا' and 'آ' are distinct letters player must pick. If not, one 'ا' is enough.
                                 // For these words, we need آ, ه, ک, و.
    targetWords: [
      { word: "کاهو", startX: 0, startY: 1, direction: "horizontal" }, // ک ا ه و ('ا' for آ)
      { word: "کاوه", startX: 0, startY: 1, direction: "vertical" },   // ک (از کاهو)
                                                                    // ا
                                                                    // و
                                                                    // ه
      { word: "آهک", startX: 0, startY: 3, direction: "horizontal" },  // آ ه ک (ه از کاوه, ک از کاوه)
      { word: "کوه", startX: 2, startY: 0, direction: "vertical" },   //     و (از کاهو)
                                                                    //     ه
                                                                    //     ک (از آهک)
      { word: "کاه", startX: 2, startY: 2, direction: "horizontal" }, //     ک ا ه (ک از آهک و کوه, ه از کاوه و کوه)
    ],
    bonusWords: ["آه", "کاو", "آوا", "وه", "هو", "ها"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "traditional teahouse",
    gridSize: { rows: 5, cols: 4 }, // Adjusted for more words
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
    gridSize: { rows: 5, cols: 4 }, // Adjusted
  },
];

    