// Safari
const defaultFilters = [
  '-lang:ru',
  '-site:ru',
  '-site:*.ru',
  '-site:*.su',
  '-site:*.рф',
  '-site:*.yandex.*',
  '-site:*.vk.com',
  '-site:*.mail.ru',
  '-site:*.ok.ru',
  '-site:gufo.me',
  '-site:redboxsoft.com',
  '-site:stackexchange.com',
  '-site:russkiypro.com',
  '-site:ru.wiktionary.org',
  '-site:*.wikipedia.org/*hl=ru*',
  '-site:*.wikipedia.org/*lang=ru*'
];

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.local.set({
      customBlacklist: defaultFilters,
      filterEnabled: true,
      hasInitialized: true
    });
  }
});