
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
    bonusWords: ["بار", "ربا", "ران", "بنا", "نار", "رب", "آب", "برنا", "بان"], 
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 4, cols: 4 },
  },
  {
    id: 2,
    name: "مرحله دوم",
    letters: ["س", "ی", "ب", "ا", "م", "ر", "ز", "ش"], // "ز" و "ش" اضافه شد
    targetWords: [
      { word: "سیب", startX: 0, startY: 0, direction: "horizontal" }, 
      { word: "بام", startX: 2, startY: 0, direction: "vertical" },   
      { word: "آسیا", startX: 0, startY: 2, direction: "horizontal" }, 
      { word: "شیر", startX: 1, startY: 1, direction: "vertical" }, // کلمه جدید
    ],
    bonusWords: ["سام", "بیم", "آبی", "سرب", "سراب", "مربی", "بار", "سار", "بیمار", "مرز", "زیبا", "میراث", "سیراب", "ریش", "شیب", "میش", "آش", "مار", "بشر"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 },
  },
  {
    id: 3,
    name: "مرحله سوم",
    letters: ["ک", "ت", "ا", "ب", "ف", "ل", "ش", "ق"], // "ق" اضافه شد
    targetWords: [
      { word: "کتاب", startX: 0, startY: 0, direction: "horizontal" }, 
      { word: "تاب", startX: 2, startY: 0, direction: "vertical" }, 
      { word: "شال", startX: 0, startY: 1, direction: "horizontal"},
      { word: "قفل", startX: 3, startY: 1, direction: "vertical"}, // کلمه جدید
    ],
    bonusWords: ["کف", "بک", "بافت", "تابک", "فلات", "کابل", "لاک", "باک", "لفت", "کشف", "بال", "فلش", "شکاف", "کفاش", "شق", "قلب", "قاتل", "بشقاب", "کاشف"],
    backgroundUrl: "https://placehold.co/1920x1080.png",
    gridSize: { rows: 5, cols: 5 }, 
  },
  ...Array.from({ length: 7 }, (_, i) => {
    // حروف رایج‌تر و متنوع‌تر برای مراحل بعدی
    const allPossibleLetters = ["د", "ر", "س", "ت", "و", "ن", "ی", "م", "ه", "گ", "پ", "چ", "ز", "ژ", "ش", "خ", "ج", "ع", "غ", "ص", "ض", "ط", "ظ", "ق", "ک"];
    // انتخاب تصادفی 5 تا 7 حرف منحصر به فرد
    let currentLettersSet = new Set<string>();
    while(currentLettersSet.size < Math.min(allPossibleLetters.length, Math.floor(Math.random() * 3) + 5)) {
        currentLettersSet.add(allPossibleLetters[Math.floor(Math.random() * allPossibleLetters.length)]);
    }
    const currentLetters = Array.from(currentLettersSet);

    // نمونه کلمات هدف (این بخش همچنان نیاز به منطق تولید پازل واقعی دارد)
    // در اینجا فقط چند مثال ساده می‌گذاریم
    // باید کلماتی انتخاب شوند که از حروف موجود قابل ساخت باشند
    let exampleTargetWords: CrosswordEntry[] = [];
    if (currentLetters.includes("د") && currentLetters.includes("ر") && currentLetters.includes("س") && currentLetters.includes("ت")) {
        exampleTargetWords.push({ word: "درس", startX: 0, startY: 0, direction: "horizontal" });
        if (currentLetters.length > 4) exampleTargetWords.push({ word: "دست", startX: 0, startY: 0, direction: "vertical" });
    } else if (currentLetters.includes("م") && currentLetters.includes("ه") && currentLetters.includes("ر") && currentLetters.includes("ب") && currentLetters.includes("ا") && currentLetters.includes("ن")) {
        exampleTargetWords.push({ word: "مهربان", startX: 0, startY: 0, direction: "horizontal" });
    } else if (currentLetters.includes("خ") && currentLetters.includes("ا") && currentLetters.includes("ن") && currentLetters.includes("ه")){
        exampleTargetWords.push({ word: "خانه", startX: 0, startY: 1, direction: "horizontal" });
    }


    // نمونه کلمات امتیازی
    let exampleBonusWords: string[] = [];
     if (currentLetters.includes("ن") && currentLetters.includes("و") && currentLetters.includes("ر")) {
        exampleBonusWords.push("نور");
    }
    if (currentLetters.includes("م") && currentLetters.includes("ا") && currentLetters.includes("ه")) {
        exampleBonusWords.push("ماه");
    }
    if (currentLetters.includes("ش") && currentLetters.includes("ب")) {
        exampleBonusWords.push("شب");
    }


    return {
      id: i + 4,
      name: `مرحله ${i + 4}`,
      letters: currentLetters,
      targetWords: exampleTargetWords.length > 0 ? exampleTargetWords : [{word: "ایران", startX:0, startY:0, direction: "horizontal"}], 
      bonusWords: exampleBonusWords.length > 0 ? exampleBonusWords : ["مهر", "ماه"],
      backgroundUrl: "https://placehold.co/1920x1080.png", 
      gridSize: { rows: Math.max(5, Math.floor(Math.random()*2)+4), cols: Math.max(5, Math.floor(Math.random()*2)+4) }, // Grid size slightly randomized
    };
  }),
];

