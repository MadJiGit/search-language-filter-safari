document.addEventListener("DOMContentLoaded", () => {
  const statusSpan = document.getElementById("status");
  const toggleBtn = document.getElementById("toggleBtn");
  const customInput = document.getElementById("customInput");
  const addBtn = document.getElementById("addBtn");

  function updateUI(isEnabled) {
    statusSpan.textContent = isEnabled ? "Filtering is ON" : "Filtering is OFF";
    toggleBtn.classList.remove("on", "off"); 
    toggleBtn.classList.add(isEnabled ? "on" : "off");
    toggleBtn.textContent = isEnabled ? "Turn OFF" : "Turn ON";
  }

  function renderCustomList() {
    chrome.storage.local.get("customBlacklist", (data) => {
      const container = document.getElementById("customList");
      const list = data.customBlacklist ?? [];
      container.innerHTML = "";

      if (list.length === 0) {
        container.innerHTML = "<i>No custom filters</i>";
        return;
      }

      list.forEach((item, index) => {
        const row = document.createElement("div");
        row.style.marginBottom = "4px";

        const span = document.createElement("span");
        span.textContent = item;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.style.marginLeft = "6px";
        removeBtn.style.fontSize = "10px";
        removeBtn.style.cursor = "pointer";
        removeBtn.style.background = "transparent";
        removeBtn.style.border = "none";
        removeBtn.style.color = "red";

        removeBtn.addEventListener("click", () => {
          const updated = list.filter((_, i) => i !== index);
          chrome.storage.local.set({ customBlacklist: updated }, () => {
            renderCustomList(); // Refresh
          });
        });

        row.appendChild(span);
        row.appendChild(removeBtn);
        container.appendChild(row);
      });
    });
  }

  chrome.storage.local.get("filterEnabled", (data) => {
    const isEnabled = data.filterEnabled ?? true;
    updateUI(isEnabled);
  });

  toggleBtn.addEventListener("click", () => {
    chrome.storage.local.get("filterEnabled", (data) => {
      const current = data.filterEnabled ?? true;
      const next = !current;
      chrome.storage.local.set({ filterEnabled: next }, () => {
        updateUI(next);
      });
    });
  });

  addBtn.addEventListener("click", () => {
    let newFilter = customInput.value.trim();
    if (!newFilter) return;

    if (!newFilter.startsWith("-site:") && !newFilter.startsWith("-lang:")) {
      newFilter = `-site:${newFilter}`;
    }

    chrome.storage.local.get("customBlacklist", (data) => {
      const existing = data.customBlacklist ?? [];
      if (!existing.includes(newFilter)) {
        existing.push(newFilter);
        chrome.storage.local.set({ customBlacklist: existing }, () => {
          customInput.value = "";
          renderCustomList();
          alert(`Added: ${newFilter}`);
        });
      } else {
        alert("This filter is already added.");
      }
    });
  });

  renderCustomList();
});