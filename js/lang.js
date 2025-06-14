/** @import { Lang, LangCode } from './types.js' */

// Global variable to track current language
let currLang = 'ar'
let translations = {}

/** @type {Record<LangCode, Lang>} */
export const langs = {
  ar: { code: 'ar', name: 'العربية', dir: 'rtl' },
  en: { code: 'en', name: 'English', dir: 'ltr' }
}

// Language toggle functionality
function toggleLanguage() {
  const toggleButton = document.getElementById('languageToggle')

  // Add switching animation
  toggleButton?.classList.add('switching')

  // Toggle language
  currLang = currLang === 'ar' ? 'en' : 'ar'
  updateLanguageDisplay()

  // Store language preference
  localStorage.setItem('preferredLanguage', currLang)

  // Apply translations
  applyTranslations()

  // Reload content with new language
  reloadContentWithLanguage()

  // Remove animation class
  setTimeout(() => {
    toggleButton?.classList.remove('switching')
  }, 400)
}

// Apply translations to elements with data-translate attribute
function applyTranslations() {
  const elementsToTranslate = document.querySelectorAll('[data-translate]')

  elementsToTranslate.forEach((element) => {
    const key = element.getAttribute('data-translate') || ''
    if (translations[currLang] && translations[currLang][key]) {
      element.textContent = translations[currLang][key]
    }
  })
}

// Load translations
async function loadTranslations() {
  try {
    const res = await fetch('data/translations.json')
    if (res.ok) {
      translations = await res.json()
    }
  } catch (error) {
    console.warn('Could not load translations:', error)
  }
}

// Reload content with current language
function reloadContentWithLanguage() {
  // Add fade effect
  const mainContent = document.querySelector('.container')
  mainContent?.classList.add('content-fade')

  setTimeout(() => {
    // This would trigger your existing content loading logic
    // but with the current language parameter
    window.location.reload() // Simple approach - reload page

    // Alternative: You could modify your existing JS to reload sections
    // loadAllSectionsWithLanguage(currentLanguage);
  }, 200)
}

// Initialize language on page load
function initializeLanguage() {
  // Check for stored preference
  const storedLang = localStorage.getItem('preferredLanguage')
  if (storedLang && (storedLang === 'en' || storedLang === 'ar')) {
    currLang = storedLang
  }

  updateLanguageDisplay()
}

function updateLanguageDisplay() {
  const currentLangSpan = document.getElementById('currentLang')
  const altLangSpan = document.getElementById('altLang')

  if (currentLangSpan && altLangSpan) {
    if (currLang === 'ar') {
      currentLangSpan.textContent = 'عربي'
      altLangSpan.textContent = 'EN'
    } else {
      currentLangSpan.textContent = 'EN'
      altLangSpan.textContent = 'عربي'
    }
  }

  document.documentElement.lang = langs[currLang].code
  document.documentElement.dir = langs[currLang].dir
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await loadTranslations()
  initializeLanguage()
  applyTranslations()
})

window['toggleLanguage'] = toggleLanguage // Expose function globally
