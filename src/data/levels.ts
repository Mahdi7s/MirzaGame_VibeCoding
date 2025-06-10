
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
  gridSize: { rows: number; cols: number };
}

export const levels: Level[] = [
  {
    id: 1,
    name: "مرحله اول",
    letters: ["ب", "ن", "ا", "ت"], 
    targetWords: [
      { word: "نبات", startX: 0, startY: 0, direction: "horizontal" }, 
      { word: "بنا", startX: 0, startY: 1, direction: "horizontal" },   
      { word: "تاب", startX: 0, startY: 2, direction: "horizontal" },   
    ],
    bonusWords: ["تب", "تن", "بت", "بان", "آب", "تا", "آن"], 
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 },
  },
  {
    id: 2,
    name: "مرحله دوم",
    letters: ["ر", "ن", "ج", "ب"],
    targetWords: [
      { word: "برنج", startX: 0, startY: 0, direction: "horizontal" }, 
      { word: "رنج", startX: 0, startY: 1, direction: "horizontal" },   
      { word: "برج", startX: 0, startY: 2, direction: "horizontal" }, 
    ],
    bonusWords: ["جن", "رج", "رب"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 },
  },
  {
    id: 3,
    name: "مرحله سوم",
    letters: ["م", "ش", "ک", "ت"],
    targetWords: [
      { word: "تمشک", startX: 0, startY: 0, direction: "horizontal" }, 
      { word: "مشک", startX: 0, startY: 1, direction: "horizontal" }, 
      { word: "شکم", startX: 0, startY: 2, direction: "horizontal" }, 
      { word: "تشک", startX: 0, startY: 3, direction: "horizontal" }, 
    ],
    bonusWords: ["شک", "مت", "کشت"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 6, cols: 6 },
  },
  {
    id: 4,
    name: "مرحله چهارم",
    letters: ["ر", "م", "ز", "ت"],
    targetWords: [
      { word: "ترمز", startX: 0, startY: 0, direction: "horizontal" },
      { word: "رمز", startX: 0, startY: 1, direction: "horizontal" },
      { word: "رزم", startX: 0, startY: 2, direction: "horizontal" },
      { word: "مرز", startX: 0, startY: 3, direction: "horizontal" },
    ],
    bonusWords: ["رز", "رم", "مت", "مر", "تر"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 6, cols: 6 },
  },
  {
    id: 5,
    name: "مرحله پنجم",
    letters: ["ر", "ی", "ل", "ا"],
    targetWords: [
      { word: "ریال", startX: 0, startY: 0, direction: "horizontal" },
      { word: "ریل", startX: 0, startY: 1, direction: "horizontal" },
      { word: "یار", startX: 0, startY: 2, direction: "horizontal" },
    ],
    bonusWords: ["یل", "ری", "ایر", "لای"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 },
  },
  {
    id: 6,
    name: "مرحله ششم",
    letters: ["ک", "ل", "م", "ه"],
    targetWords: [
      { word: "کلمه", startX: 0, startY: 0, direction: "horizontal" },
      { word: "ملکه", startX: 0, startY: 1, direction: "horizontal" },
      { word: "کلم", startX: 0, startY: 2, direction: "horizontal" },
      { word: "ملک", startX: 0, startY: 3, direction: "horizontal" },
    ],
    bonusWords: ["کل", "لک", "هم", "مه"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 6, cols: 6 },
  },
  {
    id: 7,
    name: "مرحله هفتم",
    letters: ["پ", "ا", "ک", "ت"],
    targetWords: [
      { word: "پاکت", startX: 0, startY: 0, direction: "horizontal" },
      { word: "پاک", startX: 0, startY: 1, direction: "horizontal" },
      { word: "پتک", startX: 0, startY: 2, direction: "horizontal" },
    ],
    bonusWords: ["پک", "تک", "تاپ"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 },
  },
  {
    id: 8,
    name: "مرحله هشتم",
    letters: ["ه", "ن", "ر", "ق"],
    targetWords: [
      { word: "نقره", startX: 0, startY: 0, direction: "horizontal" },
      { word: "هنر", startX: 0, startY: 1, direction: "horizontal" },
      { word: "رهن", startX: 0, startY: 2, direction: "horizontal" },
      { word: "قرن", startX: 0, startY: 3, direction: "horizontal" },
      { word: "نهر", startX: 0, startY: 4, direction: "horizontal" },
    ],
    bonusWords: ["ره", "نه", "رق"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 7, cols: 6 },
  },
  {
    id: 9,
    name: "مرحله نهم",
    letters: ["ش", "ا", "ل", "ب"],
    targetWords: [
      { word: "بالش", startX: 0, startY: 0, direction: "horizontal" },
      { word: "شال", startX: 0, startY: 1, direction: "horizontal" },
      { word: "بال", startX: 0, startY: 2, direction: "horizontal" },
      { word: "بلا", startX: 0, startY: 3, direction: "horizontal" },
    ],
    bonusWords: ["لب", "آش", "بل"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 6, cols: 6 },
  },
  {
    id: 10,
    name: "مرحله دهم",
    letters: ["آ", "ه", "ک", "و", "ا"], // 'ا' و 'آ'
    targetWords: [
      { word: "کاهو", startX: 0, startY: 0, direction: "horizontal" },
      { word: "کاوه", startX: 0, startY: 1, direction: "horizontal" },
      { word: "آهک", startX: 0, startY: 2, direction: "horizontal" },
      { word: "کوه", startX: 0, startY: 3, direction: "horizontal" },
      { word: "کاه", startX: 0, startY: 4, direction: "horizontal" },
    ],
    bonusWords: ["آه", "کاو", "آوا", "وه"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 7, cols: 5 },
  },
  {
    id: 11,
    name: "مرحله یازدهم",
    letters: ["م", "ی", "خ", "ر"],
    targetWords: [
      { word: "خمیر", startX: 0, startY: 0, direction: "horizontal" },
      { word: "مریخ", startX: 0, startY: 1, direction: "horizontal" },
      { word: "میخ", startX: 0, startY: 2, direction: "horizontal" },
      { word: "خیر", startX: 0, startY: 3, direction: "horizontal" },
    ],
    bonusWords: ["خم", "رخ", "ری"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 6, cols: 5 },
  },
];
