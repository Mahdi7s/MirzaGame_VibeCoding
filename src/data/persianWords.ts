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
  "ابر", "انار", "بار", "ربا", "ران", "بنا",
  "سیب", "بام", "آسیا", "سام", "بیم", "آبی",
  "کتاب", "تاب", "کف", "بک",
  "درس", "درست", "سرد", "تور",
  "سلام", "خداحافظ", "خانه", "ماشین", "دوست", "بازار", "مدرسه", "دانشگاه",
  "ایران", "تهران", "شیراز", "اصفهان", "تبریز", "یزد", "کرمان", "رشت",
  // Add many more words here...
]);
