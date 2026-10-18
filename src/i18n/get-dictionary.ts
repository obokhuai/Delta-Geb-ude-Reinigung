import "server-only";
import type { Locale } from "./config";
import de from "./dictionaries/de";
import en from "./dictionaries/en";

const dictionaries = { de, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
