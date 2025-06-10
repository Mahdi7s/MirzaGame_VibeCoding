
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
    letters: ["ا", "ب", "ن", "ر", "ا"], 
    targetWords: [
      { word: "ابر", startX: 0, startY: 1, direction: "horizontal" }, 
      { word: "انار", startX: 0, startY: 0, direction: "vertical" },   
    ],
    bonusWords: ["بار", "ربا", "ران", "بنا", "نبر", "نار", "رب", "آب", "برنا"], 
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 2,
    name: "مرحله دوم",
    letters: ["س", "ی", "ب", "ا", "م", "ر"], // Added "ر" for "سرب" or "سراب"
    targetWords: [
      { word: "سیب", startX: 0, startY: 0, direction: "horizontal" }, 
      { word: "بام", startX: 2, startY: 0, direction: "vertical" },   
      { word: "آسیا", startX: 0, startY: 2, direction: "horizontal" }, 
    ],
    bonusWords: ["سام", "بیم", "آبی", "سرب", "سراب", "مربی"], // Added "سرب", "سراب", "مربی"
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 },
  },
  {
    id: 3,
    name: "مرحله سوم",
    letters: ["ک", "ت", "ا", "ب", "ف", "ل"], // Added "ل" for "کتابفروشی" or "کفالت" related words
    targetWords: [
      { word: "کتاب", startX: 0, startY: 0, direction: "horizontal" }, 
      { word: "تاب", startX: 2, startY: 0, direction: "vertical" }, 
    ],
    bonusWords: ["کف", "بک", "بافت", "تابک", "فلات", "کابل"], // Added "فلات", "کابل"
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 4, cols: 5 },
  },
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 4,
    name: `مرحله ${i + 4}`,
    letters: ["د", "ر", "س", "ت", "و", "ن", "ی"], // Example letters, added "ی"
    targetWords: [
      { word: "درس", startX: 0, startY: 0, direction: "horizontal" },
      { word: "درست", startX: 0, startY: 0, direction: "vertical" }, // Corrected Y from 1 to 0 to fit better
      { word: "ستون", startX: 2, startY: 0, direction: "vertical" }, // Adjusted startX
    ],
    bonusWords: ["سرد", "تور", "رود", "نور", "سنت", "تند", "یار", "نیرو", "رویت"], // Example bonus words
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 }, 
  })),
];
