
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
  "ابر", "انار", "بار", "ربا", "ران", "بنا", "ناب", "انبر",
  "سیب", "بام", "آسیا", "سام", "بیم", "آبی", "مهر", "ماه", "سهم", "شبیه", "شیر",
  "کتاب", "کف", "بک", "شال", "قفل", "ادب", "دقت", "فدا", "لشک",
  "درس", "درست", "سرد", "تور", "ستون", "نور", "رود", "دست", "مهربان", "راه", "خانه",
  "سلام", "خداحافظ", "ماشین", "دوست", "بازار", "مدرسه", "دانشگاه",
  "ایران", "تهران", "شیراز", "اصفهان", "تبریز", "یزد", "کرمان", "رشت", "وطن",
  "روز", "شب", "دل",

  // Words for levels 1-11 (Target & Bonus)
  "نبات", "تب", "تن", "بت", "بان", "تا", "آن", "نت", "نبأ", "تاب",
  "برنج", "رنج", "برج", "جن", "رج", "رب", "بر", "بن",
  "تمشک", "مشک", "شکم", "تشک", "شک", "مت", "کشت", "شم",
  "ترمز", "رمز", "رزم", "مرز", "رز", "رم", "مر", "تر", "تم",
  "ریال", "ریل", "یار", "یل", "ری", "ایر", "لای", "آری",
  "کلمه", "ملکه", "کلم", "ملک", "کل", "لک", "هم", "مه", "که",
  "پاکت", "پاک", "پتک", "پک", "تک", "تاپ", "کات",
  "نقره", "هنر", "رهن", "قرن", "نهر", "ره", "نه", "رق", "نق", "قر", "هن",
  "بالش", "بال", "بلا", "لب", "آش", "بل", "لاش",
  "کاهو", "کاوه", "آهک", "کوه", "کاه", "آه", "کاو", "آوا", "وه", "هو", "ها",
  "خمیر", "مریخ", "میخ", "خیر", "خم", "رخ", "ری", "خی", "مر",

  // Add many more words here...
]);
