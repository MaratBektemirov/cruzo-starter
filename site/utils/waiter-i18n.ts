export async function waitForI18n<T extends Record<string, any>>(
  i18n: Record<string, T>,
  getLang: () => unknown,
  checkInterval = 16,
): Promise<T> {
  while (true) {
    const lang = getLang();
    const shortLang = String(lang ?? "").slice(0, 2);

    if (shortLang && i18n[shortLang]) {
      return i18n[shortLang];
    }

    await new Promise((resolve) => setTimeout(resolve, checkInterval));
  }
}