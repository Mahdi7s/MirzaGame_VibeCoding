
/**
 * @fileOverview Contains a list of distinct Persian words.
 * This file should be populated with words from the provided database.
 * Example: https://github.com/shahind/Persian-Words-Database/blob/master/distinct_words.txt
 *
 * IMPORTANT: Due to limitations, this file is initialized with a small sample.
 * Please replace the sample content with the full list of Persian words for comprehensive validation.
 * Simply copy the content of distinct_words.txt and paste it between the square brackets,
 * with each word enclosed in quotes and separated by a comma.
 */

export const persianWords: Set<string> = new Set([
  // Sample words - REPLACE WITH FULL LIST FROM THE GITHUB LINK
  "ابر", "انار", "بار", "ربا", "ران", "بنا", "ناب", "انبر", "نبر",
  "سیب", "بام", "آسیا", "سام", "بیم", "آبی", "مهر", "ماه", "سهم", "شبیه", "شیر",
  "کتاب", "تاب", "کف", "بک", "شال", "قفل", "ادب", "دقت", "فدا", "لشک",
  "درس", "درست", "سرد", "تور", "ستون", "نور", "رود", "دست", "مهربان", "راه", "خانه",
  "سلام", "خداحافظ", "ماشین", "دوست", "بازار", "مدرسه", "دانشگاه",
  "ایران", "تهران", "شیراز", "اصفهان", "تبریز", "یزد", "کرمان", "رشت", "وطن",
  "روز", "شب", "دل",

  // Words for levels 1-11
  "نبات", "تب", "تن", "بت", "بان", "تا", "آن",
  "برنج", "رنج", "برج", "جن", "رج", "رب",
  "تمشک", "مشک", "شکم", "تشک", "شک", "مت", "کشت",
  "ترمز", "رمز", "رزم", "مرز", "رز", "رم", "مر", "تر",
  "ریال", "ریل", "یار", "یل", "ری", "ایر", "لای",
  "کلمه", "ملکه", "کلم", "ملک", "کل", "لک", "هم", "مه",
  "پاکت", "پاک", "پتک", "پک", "تک", "تاپ",
  "نقره", "هنر", "رهن", "قرن", "نهر", "ره", "نه", "رق",
  "بالش", "بال", "بلا", "لب", "آش", "بل",
  "کاهو", "کاوه", "آهک", "کوه", "کاه", "آه", "کاو", "آوا", "وه",
  "خمیر", "مریخ", "میخ", "خیر", "خم", "رخ",

  // Add many more words here...
]);
