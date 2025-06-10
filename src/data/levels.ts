export interface CrosswordEntry {
  word: string; // The actual word in Persian
  startX: number; // 0-indexed column
  startY: number; // 0-indexed row
  direction: 'horizontal' | 'vertical';
}

export interface Level {
  id: number;
  name: string; // e.g., "مرحله اول" (First Stage)
  letters: string[]; // Letters for the circle
  targetWords: CrosswordEntry[]; // Words to be found and their placement
  bonusWords: string[]; // Optional bonus words
  backgroundUrl: string; // URL for background image
  gridSize: { rows: number; cols: number };
}

export const levels: Level[] = [
  {
    id: 1,
    name: "مرحله اول",
    letters: ["ا", "ب", "ن", "ر"],
    targetWords: [
      { word: "ابر", startX: 0, startY: 1, direction: "horizontal" }, // Cloud
      { word: "انار", startX: 0, startY: 0, direction: "vertical" },   // Pomegranate
    ],
    bonusWords: ["بار", "ربا", "ران", "بنا"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 2,
    name: "مرحله دوم",
    letters: ["س", "ی", "ب", "ا", "م"],
    targetWords: [
      { word: "سیب", startX: 0, startY: 0, direction: "horizontal" }, // Apple
      { word: "بام", startX: 2, startY: 0, direction: "vertical" },   // Roof
      { word: "آسیا", startX: 0, startY: 2, direction: "horizontal" }, // Asia / Mill
    ],
    bonusWords: ["سام", "بیم", "آبی"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 },
  },
  {
    id: 3,
    name: "مرحله سوم",
    letters: ["ک", "ت", "ا", "ب", "ف"],
    targetWords: [
      { word: "کتاب", startX: 0, startY: 0, direction: "horizontal" }, // Book
      { word: "تاب", startX: 2, startY: 0, direction: "vertical" }, // Swing
    ],
    bonusWords: ["کف", "بک"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 4, cols: 5 },
  },
  // Stub out more levels to reach at least 10
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 4,
    name: `مرحله ${i + 4}`,
    letters: ["د", "ر", "س", "ت", "و"],
    targetWords: [
      { word: "درس", startX: 0, startY: 0, direction: "horizontal" },
      { word: "درست", startX: 0, startY: 1, direction: "vertical" },
    ],
    bonusWords: ["سرد", "تور"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 },
  })),
];

// Add data-ai-hint to background URLs in a real scenario
levels.forEach(level => {
  const img = new Image();
  img.src = level.backgroundUrl;
  img.setAttribute('data-ai-hint', 'persian landscape nature');
});
