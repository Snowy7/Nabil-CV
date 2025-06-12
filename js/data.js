/** @import { Account, Certificate, Contact, Header, Interest, Language, PersonalInfo, Project, Skill, Tool } from './types.js' */

/**
 * Renders header content with job title and tagline
 * @param {Header} data - Header information
 * @returns {string} HTML string for header
 */
const renderHeader = ({ title, tagline }) => {
  return `
<h1>${title}</h1>
<p class="tagline">${tagline}</p>
`.trim()
}

/**
 * Renders personal information as a definition list
 * @param {PersonalInfo} data - Personal information object
 * @returns {string} HTML string for personal info
 */
const renderPersonalInfo = ({ name, age, sex }) => {
  return `
<dt>Name</dt>
<dd>${name}</dd>
<dt>Age</dt>
<dd>${age}</dd>
<dt>Gender</dt>
<dd>${sex}</dd>
`.trim()
}

/**
 * Renders contact information with proper semantic markup
 * @param {Contact} data - Contact information
 * @returns {string} HTML string for contact info
 */
const renderContact = ({ email, phone }) => {
  const emailIcon = 'ic:round-email'
  const phoneIcon = 'ic:round-phone'

  const cleanedPhone = phone.replace(/[^+\d]/g, '')

  return `
<a href="mailto:${email}" aria-label="Send email">
  <span class="iconify-inline" data-icon="${emailIcon}"></span>
  ${email}
</a>
<a href="tel:${cleanedPhone}" aria-label="Call phone number">
  <span class="iconify-inline" data-icon="${phoneIcon}"></span>
  ${phone}
</a>
`.trim()
}

/**
 * Renders social media accounts
 * @param {Account[]} data - Array of account objects
 * @returns {string} HTML string for accounts
 */
const renderAccounts = (data) => {
  return data
    .map(({ name, url, icon }) => {
      return `
<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${name} profile">
  <span class="iconify-inline" data-icon="${icon}"></span>
  ${name}
</a>
`.trim()
    })
    .join('')
}

/**
 * Renders a single project with semantic markup
 * @param {Project[]} data - Project object
 * @returns {string} HTML string for project
 */
const renderProjects = (data) => {
  /**
   * Formats date from YYYY-MM to Month Year
   * @param {string} dateString - Date in YYYY-MM format
   * @returns {string} Formatted date string
   */
  const formatDate = (dateString) => {
    const [year, month] = dateString.split('-')
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    return `${monthNames[parseInt(month) - 1]} ${year}`
  }

  return data
    .map(
      ({ name, description, url, date }) => `<article class="project">
    <div class="project-header">
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="project-link">
          <h3 class="project-name">${name}</h3>
        </a>
        <time class="project-date" datetime="${date}">${formatDate(date)}</time>
    </div>
    <p class="project-description">${description}</p>
    
</article>`
    )
    .join('')
}

/**
 * Renders a certificate with provider information
 * @param {Certificate[]} data - Certificate object
 * @returns {string} HTML string for certificate
 */
const renderCertificates = (data) => {
  return data
    .map(({ name, id, image, link, provider }) => {
      const certId = id ? `<p class="certificate-id">${id}</p>` : ''

      return `
<div class="certificate">
    <a href="${link}" target="_blank" rel="noopener noreferrer" class="provider-link">
        <img src="${image}" alt="${name} certificate" class="certificate-image" onerror="this.style.display='none'">
    </a>
    <h3 class="certificate-name">${name}</h3>
    ${certId}
    <a href="${provider.link}" target="_blank" rel="noopener noreferrer" class="provider-link">
        ${provider.name}
    </a>
</div>
`.trim()
    })
    .join('')
}

/**
 * Renders a skill with visual proficiency indicator
 * @param {Skill[]} data - Skill object
 * @returns {string} HTML string for skill
 */
const renderSkills = (data) => {
  return data
    .sort((a, b) => b.efficiency - a.efficiency)
    .map(({ name, efficiency }) => {
      const dots = Array.from(
        { length: 10 },
        (_, i) =>
          `<span class="skill-dot ${i < efficiency ? 'filled' : ''}"></span>`
      ).join('')

      return `
<div class="skill">
<span class="skill-name">${name}</span>
    <div class="skill-level" aria-label="Skill level ${efficiency} out of 10">
        ${dots}
    </div>
</div>
`.trim()
    })
    .join('')
}

/**
 * Renders a tool with experience information
 * @param {Tool[]} data - Tool object
 * @returns {string} HTML string for tool
 */
const renderTools = (data) => {
  return data
    .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience)
    .map(({ name, icon, link, yearsOfExperience }) => {
      const experienceText =
        yearsOfExperience === 1 ? '1 year' : `${yearsOfExperience} years`

      return `
<div class="tool">
  <div class="tool-name">
      <a href="${link}" target="_blank" rel="noopener noreferrer">
        <span class="iconify-inline" data-icon="${icon}"></span>
        ${name}
      </a>
  </div>
  <span class="tool-experience">${experienceText}</span>
</div>
`.trim()
    })
    .join('')
}

/**
 * Renders an interest with icon
 * @param {Interest[]} data - Interest object
 * @returns {string} HTML string for interest
 */
const renderInterests = (data) => {
  return data
    .map(({ name, icon }) => {
      return `
<span class="interest">
    ${icon} ${name}
</span>
`.trim()
    })
    .join('')
}

/**
 * Renders a language with proficiency level
 * @param {Language[]} data - Language object
 * @returns {string} HTML string for language
 */
const renderLanguages = (data) => {
  return data
    .map(({ name, efficiency }) => {
      return `
<div class="language">
    <span class="language-name">${name}</span>
    <span class="language-level">${efficiency}</span>
</div>
`.trim()
    })
    .join('')
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
