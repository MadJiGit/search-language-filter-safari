(function () {
  chrome.storage.local.get(["filterEnabled", "customBlacklist"], (data) => {
    const isEnabled = data.filterEnabled ?? true;
    if (!isEnabled) return;

    const rawUserFilters = data.customBlacklist ?? [];

    const userFilters = rawUserFilters.map(f => {
      const trimmed = f.trim();
      if (trimmed.startsWith("-site:") || trimmed.startsWith("-lang:")) {
        return trimmed;
      } else {
        return `-site:${trimmed}`;
      }
    });

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
      '-site:ru.wiktionary.org',
      '-site:*.wikipedia.org/*hl=ru*',
      '-site:*.wikipedia.org/*lang=ru*'
    ];

    const blacklistTerms = [...defaultFilters, ...userFilters];
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
})();