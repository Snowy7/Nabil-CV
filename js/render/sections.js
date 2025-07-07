/** @import { Account, Certificate, Contact, Header, Interest, LangCode, Language, PersonalInfo, Project, Skill, T    return `
      <div class="project" onclick="openProjectModal(${projectData})">
        ${
          banner
            ? `<img src="${banner}" alt="${name[lang]}" class="project-banner" loading="lazy" />`
            : `<div class="project-banner-placeholder">
                <span class="iconify" data-icon="material-symbols:image"></span>
               </div>`
        }
        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">${name[lang]}</h3>
            <div class="project-actions">
              ${
                link
                  ? `<a href="${link}" target="_blank" class="project-link-btn" onclick="event.stopPropagation()" aria-label="Open project in new tab">
                      <span class="iconify" data-icon="material-symbols:open-in-new"></span>
                     </a>`
                  : ''
              }
            </div>
          </div>
          <span class="project-date">${formattedDate}</span>
          <p class="project-description">${description[lang]}</p>
        </div>
      </div>`pes.js' */

import containerRenderers from './containers.js'
import itemRenderers from './items.js'

const render = {
  container: {
    ...containerRenderers
  },
  item: {
    ...itemRenderers
  }
}

/**
 * Renders header content with job title and tagline
 * @param {Header} data - Header information
 * @returns {string} HTML string for header
 */
export function renderHeader({ title, tagline }) {
  const lang = getLang()

  return render.container.empty(
    render.item.title(title[lang]),
    render.item.tagline(tagline[lang])
  )
}

/**
 * Renders personal information as a definition list
 * @param {PersonalInfo} data - Personal information object
 * @returns {string} HTML string for personal info
 */
export function renderPersonalInfo({ name, age, sex }) {
  const lang = getLang()

  const nameKey = lang === 'ar' ? 'الاسم' : 'Name'
  const ageKey = lang === 'ar' ? 'العمر' : 'Age'
  const sexKey = lang === 'ar' ? 'الجنس' : 'Gender'

  return render.container.empty(
    render.item.keyValue(nameKey, name[lang]),
    render.item.keyValue(ageKey, age.toString()),
    render.item.keyValue(sexKey, sex[lang])
  )
}

/**
 * Renders contact information with proper semantic markup
 * @param {Contact} data - Contact information
 * @returns {string} HTML string for contact info
 */
export function renderContact({ email, phone }) {
  return render.container.empty(
    render.item.email(email),
    render.item.phone(phone)
  )
}

/**
 * Renders social media accounts
 * @param {Account[]} data - Array of account objects
 * @returns {string} HTML string for accounts
 */
export function renderAccounts(data) {
  return data.map(renderAccount).join('')

  /**
   * @param {Account} account - Account object
   * @returns {string} HTML string for account
   */
  function renderAccount({ name, link, icon }) {
    return render.container.url(link, `Visit ${name} profile`, [
      render.item.icon(icon),
      ' ',
      name
    ])
  }
}

/**
 * Renders a single project with semantic markup
 * @param {Project[]} data - Project object
 * @returns {string} HTML string for project
 */
export function renderProjects(data) {
  const lang = getLang()

  return data
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(renderProject)
    .join('')

  /**
   * @param {Project} project - Project object
   * @returns {string} HTML string for project
   */
  function renderProject({ name, description, link, date, banner }) {
    const formattedDate = new Date(date).toLocaleDateString(
      lang === 'ar' ? 'ar-SA' : 'en-US',
      {
        year: 'numeric',
        month: 'short'
      }
    )

    const projectData = JSON.stringify({
      name,
      description,
      link,
      date,
      banner
    }).replace(/"/g, '&quot;')

    return `
      <div class="project" onclick="openProjectModal(${projectData})">
        ${
          banner
            ? `<img src="${banner}" alt="${name[lang]}" class="project-banner" loading="lazy" />`
            : `<div class="project-banner-placeholder">
                <span class="iconify" data-icon="material-symbols:image"></span>
               </div>`
        }
        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">${name[lang]}</h3>
            <div class="project-actions">
              ${
                link
                  ? `<a href="${link}" target="_blank" class="project-link-btn" onclick="event.stopPropagation()" aria-label="Open project in new tab">
                      <span class="iconify" data-icon="material-symbols:open-in-new"></span>
                     </a>`
                  : ''
              }
            </div>
          </div>
          <span class="project-date">${formattedDate}</span>
          <p class="project-description">${description[lang]}</p>
        </div>
      </div>`
  }
}

/**
 * Renders a certificate with provider information
 * @param {Certificate[]} data - Certificate object
 * @returns {string} HTML string for certificate
 */
export function renderCertificates(data) {
  const lang = getLang()
  const type = 'certificate'

  return data
    .sort((a, b) => b.provider.name.localeCompare(a.provider.name))
    .map(renderCertificate)
    .join('')

  /**
   * @param {Certificate} certificate - Certificate object
   * @returns {string} HTML string for certificate
   */
  function renderCertificate({ name, id, image, link, provider }) {
    const certData = JSON.stringify({
      name,
      id,
      image,
      link,
      provider
    }).replace(/"/g, '&quot;')

    return `
      <div class="${type}" onclick="openCertificateModal(${certData})">
              <div class="${type}-overlay">
          <span class="iconify" data-icon="material-symbols:visibility"></span>
          <span>View Certificate</span>
        </div>
        <img src="${image}" alt="${name[lang]}" class="${type}-image" />
        <div class="${type}-info">
          <div class="certificate-header">
            <h4 class="${type}-title">${name[lang]}</h4>
            ${
              link
                ? `<a href="${link}" target="_blank" class="cert-external-link-btn" onclick="event.stopPropagation()" aria-label="Open certificate in new tab">
                    <span class="iconify" data-icon="material-symbols:open-in-new"></span>
                   </a>`
                : ''
            }
          </div>
          <p class="${type}-provider">${provider.name}</p>
        </div>
      </div>
    `
  }
}

/**
 * Renders a skill with visual proficiency indicator
 * @param {Skill[]} data - Skill object
 * @returns {string} HTML string for skill
 */
export function renderSkills(data) {
  const lang = getLang()

  return data
    .sort((a, b) => b.efficiency - a.efficiency)
    .map(renderSkill)
    .join('')
  /**
   * @param {Skill} skill - Skill object
   * @returns {string} HTML string for skill
   */
  function renderSkill({ name, efficiency }) {
    // Normalize efficiency to 5-point scale (assuming input is 0-10)
    const normalizedEfficiency = Math.min(
      5,
      Math.max(0, Math.round(efficiency / 2))
    )
    const proficiencyDots =
      '●'.repeat(normalizedEfficiency) + '○'.repeat(5 - normalizedEfficiency)

    return `
      <div class="skill-tag" title="Proficiency: ${efficiency}/10">
        <span>${name[lang]}</span>
        <span class="skill-proficiency">${proficiencyDots}</span>
      </div>
    `
  }
}

/**
 * Renders a tool with experience information
 * @param {Tool[]} data - Tool object
 * @returns {string} HTML string for tool
 */
export function renderTools(data) {
  const lang = getLang()

  return data
    .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience)
    .map(renderTool)
    .join('')

  /**
   * @param {Tool} tool - Tool object
   * @returns {string} HTML string for tool
   */
  function renderTool({ name, icon, link, yearsOfExperience }) {
    const iconHtml = icon
      ? `<span class="iconify" data-icon="${icon}"></span>`
      : ''
    const experienceText =
      yearsOfExperience > 1
        ? `${yearsOfExperience} years`
        : `${yearsOfExperience} year`

    return `
      <div class="tool-tag" title="${experienceText} of experience">
        ${iconHtml}
        <span>${name}</span>
        <span class="tool-experience">${experienceText}</span>
      </div>
    `
  }
}

/**
 * Renders an interest with icon
 * @param {Interest[]} data - Interest object
 * @returns {string} HTML string for interest
 */
export function renderInterests(data) {
  const lang = getLang()

  return data.map(renderInterest).join('')

  /**
   * @param {Interest} interest - Interest object
   * @returns {string} HTML string for interest
   */
  function renderInterest({ name, icon }) {
    const iconHtml = icon
      ? `<span class="iconify" data-icon="${icon}"></span>`
      : ''

    return `
      <div class="interest-tag">
        ${iconHtml}
        <span>${name[lang]}</span>
      </div>
    `
  }
}

/**
 * Renders a language with proficiency level
 * @param {Language[]} data - Language object
 * @returns {string} HTML string for language
 */
export function renderLanguages(data) {
  const lang = getLang()

  return data.map(renderLanguage).join('')

  /**
   * @param {Language} language - Language object
   * @returns {string} HTML string for language
   */
  function renderLanguage({ name, efficiency }) {
    return `
      <div class="language-item">
        <span class="language-name">${name[lang]}</span>
        <span class="language-level">${efficiency[lang]}</span>
      </div>
    `
  }
}

/**
 * @returns {LangCode} lang - Language object
 */
function getLang() {
  // @ts-expect-error
  return document.documentElement.lang || 'ar'
}

export default {
  header: renderHeader,
  personalInfo: renderPersonalInfo,
  contact: renderContact,
  accounts: renderAccounts,
  projects: renderProjects,
  certificates: renderCertificates,
  skills: renderSkills,
  tools: renderTools,
  interests: renderInterests,
  languages: renderLanguages
}
