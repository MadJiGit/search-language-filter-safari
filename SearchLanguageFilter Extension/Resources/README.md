# Search Language Filter

**Search Language Filter** is a lightweight and privacy-friendly browser extension that helps you filter out unwanted search results — especially Russian-language or Russian-domain results — when using Google or Bing.

---

## 🧭 Why This Extension Was Created

This extension was initially designed for Bulgarian users who noticed that search results in Bulgarian often returned irrelevant Russian-language websites.

To improve the quality and relevance of search results, the extension automatically adds filters like `-lang:ru` or `-site:*.ru` to the search query — blocking results from specific countries, languages, or websites.

---

## ⚙️ What It Does

- Appends language and domain exclusion filters to Google and Bing search queries.
- Hides results from Russian-language domains like `.ru`, `.su`, `.рф`, and sites like `vk.com`, `yandex.*`, etc.
- Allows you to toggle filtering **ON/OFF** at any time via a simple popup.
- Lets you add and remove your own custom blacklist entries.
- No tracking, no background communication, 100% offline and privacy-focused.

---

## ✅ Features

- ✅ Google & Bing support (desktop + mobile)
- ✅ Simple ON/OFF toggle
- ✅ Add/remove custom filters
- ✅ Local storage only (no data collected or shared)
- ✅ Works in Chrome, Edge, Firefox*

> *Note: Firefox requires temporary extension loading via `about:debugging`*

---

## 🛠️ How to Use the Custom Blacklist

You can block **any domain or language**, with just a few keystrokes.

**You do NOT need to type** `-site:` or `-lang:` – the extension adds those automatically.

### ✅ Examples

| You Type              | Internally Becomes        |
|-----------------------|---------------------------|
| cnn.com               | `-site:cnn.com`           |
| *.example.org         | `-site:*.example.org`     |
| *.wikipedia.org/*ru*  | `-site:*.wikipedia.org/*ru*` |

You can use:
- Exact domains
- Wildcards (e.g. `*.ru`, `*.mail.ru`)
- Path-based rules (e.g. URLs containing `lang=ru`)

---

## 🔍 Example Queries

**Search Term:** `дума`  
**Filtered Query:**  
```text
дума -lang:ru -site:ru -site:*.ru -site:*.su -site:*.рф -site:*.yandex.* ...
