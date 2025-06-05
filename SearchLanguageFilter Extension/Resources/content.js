(function () {
  chrome.storage.local.get(["filterEnabled", "customBlacklist"], (data) => {
    const isEnabled = data.filterEnabled ?? true;
    if (!isEnabled) return;

    const initialDefaults = [
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
      '-site:ru.wiktionary.org',
      '-site:*.wikipedia.org/*hl=ru*',
      '-site:*.wikipedia.org/*lang=ru*'
    ];

    // If no custom list is set, initialize with defaults
    if (!Array.isArray(data.customBlacklist)) {
      chrome.storage.local.set({ customBlacklist: initialDefaults });
      data.customBlacklist = initialDefaults;
    }

    const blacklistTerms = data.customBlacklist;

    const engine = window.location.hostname;

    function alreadyFiltered(query) {
      return blacklistTerms.every(term => query.includes(term));
    }

    function appendFilters(query) {
      return query + ' ' + blacklistTerms.join(' ');
    }

    function updateQueryParam(param) {
      const url = new URL(window.location.href);
      const q = url.searchParams.get(param);

      if (q && !alreadyFiltered(q)) {
        url.searchParams.set(param, appendFilters(q));
        window.location.href = url.toString();
      }
    }

    if (engine.includes("google.")) {
      updateQueryParam("q");
    } else if (engine.includes("bing.com")) {
      updateQueryParam("q");
    }
  });
 // Listen for changes in filterEnabled or customBlacklist and reload the page if changed
 chrome.storage.onChanged.addListener((changes, areaName) => {
   if (areaName === 'local' && (changes.filterEnabled || changes.customBlacklist)) {
     window.location.reload();
   }
 });
})();
