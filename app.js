const PROFILE = {
  name: "Norbert Mamczura",
  phone: "+48 794 719 123",
  phoneHref: "tel:+48794719123",
};

const COPY = {
  pl: {
    pageTitle: "Portfolio",
    summary: "Programowanie · Prawo · Produkcja wydarzeń",
    education: "Magister prawa · WSPIA Rzeszów · 2017–2022",
    phoneLabel: "Telefon",
    english: "Angielski: C1",
    contactLabel: "Dane kontaktowe",
    areasLabel: "Obszary",
    areasTitle: "Trzy części mojego doświadczenia",
    home: "Strona główna",
    loading: "Wczytywanie…",
    error: "Nie udało się wczytać treści. Sprawdź, czy plik istnieje i czy strona działa przez serwer WWW.",
    areas: {
      it: { title: "IT", description: "Aplikacje webowe, systemy wykorzystujące AI, automatyzacja i praca z danymi." },
      prawo: { title: "Prawo", description: "Prawo, ochrona danych, doradztwo dla zarządu i współpraca z biznesem." },
      eventy: { title: "Eventy", description: "Koordynacja produkcji, scen, zespołów, techniki i ludzi podczas dużych wydarzeń." },
    },
  },
  de: {
    pageTitle: "Portfolio & Lebenslauf",
    summary: "Softwareentwicklung · Recht · Veranstaltungsproduktion",
    education: "Magister der Rechtswissenschaften · WSPIA Rzeszów · 2017–2022",
    phoneLabel: "Telefon",
    english: "Englisch: C1",
    contactLabel: "Kontaktdaten",
    areasLabel: "Bereiche",
    areasTitle: "Drei Bereiche meiner Erfahrung",
    home: "Startseite",
    loading: "Inhalt wird geladen…",
    error: "Der Inhalt konnte nicht geladen werden. Bitte versuchen Sie es später erneut.",
    areas: {
      it: { title: "IT", description: "Webanwendungen, KI-basierte Systeme, Automatisierung und Datenarbeit." },
      prawo: { title: "Recht", description: "Recht, Datenschutz, Beratung der Geschäftsführung und Zusammenarbeit mit Unternehmen." },
      eventy: { title: "Events", description: "Koordination von Produktion, Bühnen, Bands, Technik und Teams bei Großveranstaltungen." },
    },
  },
  en: {
    pageTitle: "Portfolio",
    summary: "Software development · Law · Event production",
    education: "Master of Laws · WSPIA Rzeszów · 2017–2022",
    phoneLabel: "Phone",
    english: "English: C1",
    contactLabel: "Contact details",
    areasLabel: "Areas",
    areasTitle: "Three areas of my experience",
    home: "Home",
    loading: "Loading…",
    error: "The content could not be loaded. Please try again later.",
    areas: {
      it: { title: "IT", description: "Web applications, AI-powered systems, automation and data work." },
      prawo: { title: "Law", description: "Law, data protection, management advisory and cooperation with businesses." },
      eventy: { title: "Events", description: "Coordinating production, stages, artists, technology and teams at major events." },
    },
  },
};

const LANGUAGES = ["pl", "de", "en"];
const SECTIONS = ["it", "prawo", "eventy"];
const state = { language: "pl", section: null };

const elements = {
  name: document.querySelector("#profile-name"),
  summary: document.querySelector("#profile-summary"),
  education: document.querySelector("#profile-education"),
  phone: document.querySelector("#profile-phone"),
  english: document.querySelector("#profile-english"),
  areasLabel: document.querySelector("#areas-label"),
  areasTitle: document.querySelector("#areas-title"),
  areaGrid: document.querySelector("#area-grid"),
  homeView: document.querySelector("#home-view"),
  detailView: document.querySelector("#detail-view"),
  tabs: document.querySelector("#section-tabs"),
  content: document.querySelector("#markdown-content"),
  main: document.querySelector("#main-content"),
  footerCopy: document.querySelector("#footer-copy"),
  footerYear: document.querySelector("#footer-year"),
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const output = [];
  let paragraph = [];
  let listOpen = false;

  const flushParagraph = () => {
    if (paragraph.length) {
      output.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const closeList = () => {
    if (listOpen) {
      output.push("</ul>");
      listOpen = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const listItem = line.match(/^[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      if (!listOpen) {
        output.push("<ul>");
        listOpen = true;
      }
      output.push(`<li>${inlineMarkdown(listItem[1])}</li>`);
      continue;
    }

    const standaloneBold = line.match(/^\*\*(.+)\*\*$/);
    if (standaloneBold) {
      flushParagraph();
      closeList();
      output.push(`<h3>${inlineMarkdown(standaloneBold[1])}</h3>`);
      continue;
    }

    const standaloneItalic = line.match(/^\*(.+)\*$/);
    if (standaloneItalic) {
      flushParagraph();
      closeList();
      output.push(`<p class="stack">${inlineMarkdown(standaloneItalic[1])}</p>`);
      continue;
    }

    closeList();
    paragraph.push(line);
  }

  flushParagraph();
  closeList();
  return output.join("\n");
}

function parseHash() {
  const [languageFromHash, sectionFromHash] = location.hash.replace(/^#/, "").split("/");
  const storedLanguage = localStorage.getItem("cv-language");
  state.language = LANGUAGES.includes(languageFromHash)
    ? languageFromHash
    : LANGUAGES.includes(storedLanguage)
      ? storedLanguage
      : "pl";
  state.section = SECTIONS.includes(sectionFromHash) ? sectionFromHash : null;
}

function setHash(section = state.section) {
  const nextHash = `#${state.language}/${section ?? "home"}`;
  if (location.hash !== nextHash) history.pushState(null, "", nextHash);
}

function renderProfile() {
  const copy = COPY[state.language];
  document.documentElement.lang = state.language;
  document.title = `${PROFILE.name} - ${copy.pageTitle}`;
  elements.name.textContent = PROFILE.name;
  elements.summary.textContent = copy.summary;
  elements.education.textContent = copy.education;
  elements.phone.textContent = `${copy.phoneLabel}: ${PROFILE.phone}`;
  elements.phone.href = PROFILE.phoneHref;
  elements.english.textContent = copy.english;
  elements.footerCopy.textContent = copy.pageTitle;
  elements.footerYear.textContent = String(new Date().getFullYear());

  document.querySelectorAll(".language-button").forEach((button) => {
    const active = button.dataset.language === state.language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderHome() {
  const copy = COPY[state.language];
  elements.homeView.hidden = false;
  elements.detailView.hidden = true;
  elements.areasLabel.textContent = copy.areasLabel;
  elements.areasTitle.textContent = copy.areasTitle;
  elements.areaGrid.innerHTML = SECTIONS.map((section, index) => {
    const item = copy.areas[section];
    return `
      <button class="area-card" type="button" data-section="${section}">
        <span class="area-number">0${index + 1}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <span class="area-arrow" aria-hidden="true">→</span>
      </button>`;
  }).join("");

  elements.areaGrid.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.section));
  });
}

function renderTabs() {
  const copy = COPY[state.language];
  elements.tabs.innerHTML = `
    <button class="section-tab home-tab" type="button" data-home>${copy.home}</button>
    ${SECTIONS.map((section) => `
      <button class="section-tab${state.section === section ? " is-active" : ""}" type="button" data-section="${section}">
        ${copy.areas[section].title}
      </button>`).join("")}
  `;

  elements.tabs.querySelector("[data-home]").addEventListener("click", () => navigate(null));
  elements.tabs.querySelectorAll("[data-section]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.section));
  });
}

async function renderDetail() {
  const copy = COPY[state.language];
  elements.homeView.hidden = true;
  elements.detailView.hidden = false;
  renderTabs();
  elements.content.innerHTML = `<p class="loading">${copy.loading}</p>`;

  try {
    const response = await fetch(`content/${state.language}/${state.section}.md`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    elements.content.innerHTML = markdownToHtml(await response.text());
  } catch (error) {
    console.error(error);
    elements.content.innerHTML = `<p class="error-message">${copy.error}</p>`;
  }
}

async function render() {
  renderProfile();
  if (state.section) await renderDetail();
  else renderHome();
}

async function navigate(section) {
  state.section = SECTIONS.includes(section) ? section : null;
  setHash();
  await render();
  elements.main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", async () => {
    state.language = button.dataset.language;
    localStorage.setItem("cv-language", state.language);
    setHash();
    await render();
  });
});

window.addEventListener("hashchange", async () => {
  parseHash();
  await render();
});

parseHash();
setHash();
render();
