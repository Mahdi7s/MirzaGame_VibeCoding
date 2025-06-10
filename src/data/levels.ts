
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
    bonusWords: ["بار", "ربا", "ران", "بنا", "نبر", "نار", "رب", "آب", "برنا", "بان"], 
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 2,
    name: "مرحله دوم",
    letters: ["س", "ی", "ب", "ا", "م", "ر", "ز"], // اضافه کردن "ز" برای کلمات بیشتر
    targetWords: [
      { word: "سیب", startX: 0, startY: 0, direction: "horizontal" }, 
      { word: "بام", startX: 2, startY: 0, direction: "vertical" },   
      { word: "آسیا", startX: 0, startY: 2, direction: "horizontal" }, 
    ],
    bonusWords: ["سام", "بیم", "آبی", "سرب", "سراب", "مربی", "بار", "سار", "بیمار", "مرز", "زیبا", "میراث", "سیراب"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 },
  },
  {
    id: 3,
    name: "مرحله سوم",
    letters: ["ک", "ت", "ا", "ب", "ف", "ل", "ش"], // اضافه کردن "ش"
    targetWords: [
      { word: "کتاب", startX: 0, startY: 0, direction: "horizontal" }, 
      { word: "تاب", startX: 2, startY: 0, direction: "vertical" }, 
      { word: "شال", startX: 0, startY: 1, direction: "horizontal"}, // کلمه جدید
    ],
    bonusWords: ["کف", "بک", "بافت", "تابک", "فلات", "کابل", "لاک", "باک", "لفت", "کشف", "بال", "فلش", "شکاف", "کفاش"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 }, // افزایش اندازه گرید
  },
  // مراحل ۴ تا ۱۰ با کلمات متنوع‌تر
  ...Array.from({ length: 7 }, (_, i) => {
    const commonLetters = ["د", "ر", "س", "ت", "و", "ن", "ی", "م", "ه", "گ", "پ", "چ"];
    const currentLetters = Array.from(new Set(Array(7).fill(null).map(() => commonLetters[Math.floor(Math.random() * commonLetters.length)]))).slice(0, Math.max(5, Math.floor(Math.random() * 3) + 5)); // بین 5 تا 7 حرف منحصر به فرد

    // کلمات نمونه ساده بر اساس حروف بالا - این بخش نیاز به منطق پیچیده‌تری برای تولید واقعی پازل دارد
    // در اینجا فقط چند مثال ساده می‌گذاریم
    let exampleTargetWords: CrosswordEntry[] = [];
    if (currentLetters.includes("د") && currentLetters.includes("ر") && currentLetters.includes("س") && currentLetters.includes("ت")) {
        exampleTargetWords.push({ word: "درس", startX: 0, startY: 0, direction: "horizontal" });
        exampleTargetWords.push({ word: "دست", startX: 0, startY: 0, direction: "vertical" });
    } else if (currentLetters.includes("م") && currentLetters.includes("ر") && currentLetters.includes("د")) {
        exampleTargetWords.push({ word: "مرد", startX: 1, startY: 0, direction: "horizontal" });
    }
     if (currentLetters.includes("س") && currentLetters.includes("ر") && currentLetters.includes("د")) {
        exampleTargetWords.push({ word: "سرد", startX: 0, startY: 1, direction: "horizontal" });
    }


    let exampleBonusWords: string[] = [];
     if (currentLetters.includes("ن") && currentLetters.includes("و") && currentLetters.includes("ر")) {
        exampleBonusWords.push("نور");
    }
    if (currentLetters.includes("ر") && currentLetters.includes("و") && currentLetters.includes("د")) {
        exampleBonusWords.push("رود");
    }
    if (currentLetters.includes("ت") && currentLetters.includes("و") && currentLetters.includes("ر")) {
        exampleBonusWords.push("تور");
    }
    if (currentLetters.includes("س") && currentLetters.includes("ی") && currentLetters.includes("ر")) {
        exampleBonusWords.push("سیر");
    }


    return {
      id: i + 4,
      name: `مرحله ${i + 4}`,
      letters: currentLetters,
      targetWords: exampleTargetWords.length > 0 ? exampleTargetWords : [{word: "ایران", startX:0, startY:0, direction: "horizontal"}], // fallback
      bonusWords: exampleBonusWords.length > 0 ? exampleBonusWords : ["مهر", "ماه"], // fallback
      backgroundUrl: "https://placehold.co/1920x1080.png", 
      gridSize: { rows: 5, cols: 5 }, 
    };
  }),
];
