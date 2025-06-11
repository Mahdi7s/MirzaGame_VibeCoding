
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
  backgroundUrl: string; 
  dataAiHint?: string; 
  gridSize: { rows: number; cols: number };
}

export const levels: Level[] = [
  {
    id: 1,
    name: "مرحله اول",
    letters: ["ا", "ن", "ب", "ت"],
    targetWords: [
      { word: "نبات", startX: 0, startY: 1, direction: "horizontal" },
      { word: "بنا", startX: 1, startY: 0, direction: "vertical" },  
      { word: "تاب", startX: 3, startY: 0, direction: "vertical" },
    ],
    bonusWords: ["تب", "تن", "بت", "نبأ", "ات", "بان", "آن", "تا", "نت"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "persian garden",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 2,
    name: "مرحله دوم",
    letters: ["ر", "ن", "ج", "ب"],
    targetWords: [
      { word: "برنج", startX: 0, startY: 1, direction: "horizontal" },
      { word: "برج", startX: 0, startY: 0, direction: "vertical" },  
      { word: "رنج", startX: 1, startY: 1, direction: "vertical" },
    ],
    bonusWords: ["جن", "رج", "رب", "بر", "بن"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "desert oasis",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 3,
    name: "مرحله سوم",
    letters: ["م", "ش", "ک", "ت"],
    targetWords: [
      { word: "تمشک", startX: 0, startY: 0, direction: "horizontal" },
      { word: "تشک", startX: 0, startY: 0, direction: "vertical" },  
      { word: "شکم", startX: 2, startY: 0, direction: "vertical" },  
      { word: "مشک", startX: 1, startY: 0, direction: "vertical" },
    ],
    bonusWords: ["شک", "مت", "کشت", "شم"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "mountain valley",
    gridSize: { rows: 3, cols: 4 },
  },
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
  {
    id: 5,
    name: "مرحله پنجم",
    letters: ["ر", "ی", "ل", "ا"],
    targetWords: [
      { word: "ریال", startX: 0, startY: 1, direction: "horizontal" },
      { word: "ریل", startX: 0, startY: 0, direction: "vertical" },  
      { word: "یار", startX: 1, startY: 0, direction: "horizontal" },
    ],
    bonusWords: ["یل", "ری", "ایر", "لای", "آری"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "coastal scene",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 6,
    name: "مرحله ششم",
    letters: ["ک", "ل", "م", "ه"],
    targetWords: [
      { word: "کلمه", startX: 0, startY: 1, direction: "horizontal" },
      { word: "کلم", startX: 0, startY: 0, direction: "vertical" },  
      { word: "ملکه", startX: 2, startY: 0, direction: "vertical" },
      { word: "ملک", startX: 0, startY: 2, direction: "horizontal" },
    ],
    bonusWords: ["کل", "لک", "هم", "مه", "که"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "flower garden",
    gridSize: { rows: 5, cols: 4 },
  },
  {
    id: 7,
    name: "مرحله هفتم",
    letters: ["پ", "ا", "ک", "ت"],
    targetWords: [
      { word: "پاکت", startX: 0, startY: 1, direction: "horizontal" }, // P(0,1) A(1,1) K(2,1) T(3,1)
      { word: "پاک", startX: 0, startY: 0, direction: "vertical" },    // P(0,0) A(0,1) K(0,2) - A is shared
      { word: "پتک", startX: 2, startY: 0, direction: "vertical" },    // P(2,0) T(2,1) K(2,2) - T is shared
    ],
    bonusWords: ["پک", "تک", "تاپ", "کات", "تپ"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "library interior",
    gridSize: { rows: 3, cols: 4 },
  },
  {
    id: 8,
    name: "مرحله هشتم",
    letters: ["ه", "ن", "ر", "ق"],
    targetWords: [
      { word: "نقره", startX: 0, startY: 0, direction: "horizontal" }, // ن(0,0) ق(1,0) ر(2,0) ه(3,0)
      { word: "نهر", startX: 0, startY: 0, direction: "vertical" },   // ن(0,0) ه(0,1) ر(0,2)
      { word: "قرن", startX: 1, startY: 0, direction: "vertical" },   // ق(1,0) ر(1,1) ن(1,2)
      { word: "رهن", startX: 2, startY: 0, direction: "vertical" },   // ر(2,0) ه(2,1) ن(2,2)
      { word: "هنر", startX: 3, startY: 0, direction: "vertical" },   // ه(3,0) ن(3,1) ر(3,2)
    ],
    bonusWords: ["ره", "نه", "رق", "نق", "قر", "هن"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "starry night",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 9,
    name: "مرحله نهم",
    letters: ["ش", "ا", "ل", "ب"],
    targetWords: [
      { word: "بالش", startX: 0, startY: 1, direction: "horizontal" }, // ب(0,1) ا(1,1) ل(2,1) ش(3,1)
      { word: "بال", startX: 0, startY: 0, direction: "vertical" },   // ب(0,0) ا(0,1) ل(0,2) - 'ا' shared
      { word: "شال", startX: 3, startY: 0, direction: "vertical" },   // ش(3,0) ا(3,1) ل(3,2) - 'ا' shared
      { word: "بلا", startX: 2, startY: 0, direction: "vertical" },   // ب(2,0) ل(2,1) ا(2,2) - 'ل' shared
    ],
    bonusWords: ["لب", "آش", "بل", "لاش"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "forest path",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 10,
    name: "مرحله دهم",
    letters: ["ا", "ه", "ک", "و"],
    targetWords: [
      { word: "کاوه", startX: 1, startY: 0, direction: "vertical" },   // ک(1,0) ا(1,1) و(1,2) ه(1,3)
      { word: "کاهو", startX: 1, startY: 0, direction: "horizontal" },  // ک(1,0) ا(2,0) ه(3,0) و(4,0) - ک مشترک با کاوه
      { word: "آهک", startX: 0, startY: 3, direction: "horizontal" },   // آ(0,3) ه(1,3) ک(2,3) - ه مشترک با کاوه
      { word: "کوه", startX: 2, startY: 3, direction: "vertical" },     // ک(2,3) و(2,4) ه(2,5) - ک مشترک با آهک
      // { word: "کاه", startX: 1, startY: 0, direction: "horizontal" }, // ک(1,0) ا(2,0) ه(3,0) This is identical to first 3 letters of کاهو
    ],
    bonusWords: ["آه", "کاو", "آوا", "وه", "هو", "ها", "کاه"], // کاه moved to bonus
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "traditional teahouse",
    gridSize: { rows: 6, cols: 5 },
  },
  {
    id: 11,
    name: "مرحله یازدهم",
    letters: ["م", "ی", "خ", "ر"],
    targetWords: [
      { word: "خمیر", startX: 0, startY: 1, direction: "vertical" },   // خ(0,1), م(0,2), ی(0,3), ر(0,4)
      { word: "مریخ", startX: 0, startY: 2, direction: "horizontal" }, // م(0,2), ر(1,2), ی(2,2), خ(3,2) - 'م' مشترک
      { word: "میخ", startX: 3, startY: 0, direction: "vertical" },   // م(3,0), ی(3,1), خ(3,2) - 'خ' مشترک
      { word: "خیر", startX: 0, startY: 1, direction: "horizontal" },  // خ(0,1), ی(1,1), ر(2,1) - 'خ' مشترک
    ],
    bonusWords: ["خم", "رخ", "ری", "خی", "مر"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    dataAiHint: "persian calligraphy",
    gridSize: { rows: 5, cols: 4 },
  },
];
