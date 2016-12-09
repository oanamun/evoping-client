// TODO decide on how and what to use fot this
const currentLocale = 'en';

function parseLocale(locale) {
  const locales = locale.replace(/_/g, '-').split('-');
  let parsedLocale = locales[0];
  if (locales.length > 1) {
    parsedLocale = `${parsedLocale}-${locales[1].toUpperCase()}`;
  }

  return parsedLocale;
}

export function getLocale() { // eslint-disable-line
  try {
    const locale = window.navigator.languages ?
      window.navigator.languages[0] :
      (window.navigator.language || window.navigator.userLanguage);

    return parseLocale(locale);
  } catch (e) {
    return currentLocale;
  }
}
