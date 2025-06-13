/** @import { Account, Certificate, Contact, Header, Interest, Language, PersonalInfo, Project, Skill, Tool } from './types.js' */

/**
 * Renders header content with job title and tagline
 * @param {Header} data - Header information
 * @returns {string} HTML string for header
 */
const renderHeader = ({ title, tagline }) => {
  let html = ''

  if (title) {
    html += `<h1>${title}</h1>`
  }

  if (tagline) {
    html += `<p class="tagline">${tagline}</p>`
  }

  return html.trim()
}

/**
 * Renders personal information as a definition list
 * @param {PersonalInfo} data - Personal information object
 * @returns {string} HTML string for personal info
 */
const renderPersonalInfo = ({ name, age, sex }) => {
  let html = ''

  if (name) {
    html += `<dt>Name</dt><dd>${name}</dd>`
  }

  if (age) {
    html += `<dt>Age</dt><dd>${age}</dd>`
  }

  if (sex) {
    html += `<dt>Gender</dt><dd>${sex}</dd>`
  }

  return html.trim()
}

/**
 * Renders contact information with proper semantic markup
 * @param {Contact} data - Contact information
 * @returns {string} HTML string for contact info
 */
const renderContact = ({ email, phone }) => {
  let html = ''

  if (email) {
    html += `
<a href="mailto:${email}" aria-label="Send email">
  <span class="iconify-inline" data-icon="ic:round-email"></span>
  ${email}
</a>
`.trim()
  }

  if (phone) {
    const cleanedPhone = phone.replace(/[^+\d]/g, '')

    html += `
<a href="tel:${cleanedPhone}" aria-label="Call phone number">
  <span class="iconify-inline" data-icon="ic:round-phone"></span>
  ${phone}
</a>
`.trim()
  }

  return html.trim()
}

/**
 * Renders social media accounts
 * @param {Account[]} data - Array of account objects
 * @returns {string} HTML string for accounts
 */
const renderAccounts = (data) => {
  return data
    .map(({ name, url, icon }) => {
      let html = ''

      html += `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${name} profile">`

      if (icon) {
        html += `<span class="iconify-inline" data-icon="${icon}"></span>`
      }

      if (name) {
        html += name
      }

      html += '</a>'

      return html.trim()
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
    .map(({ name, description, url, date }) => {
      let html = ''

      html += '<article class="project">'

      if (name) {
        html += '<div class="project-header">'

        html += `    
<a href="${url}" target="_blank" rel="noopener noreferrer" class="project-link">
  <h3 class="project-name">${name}</h3>
</a>
`.trim()

        if (date) {
          const formattedDate = formatDate(date)
          html += `<time class="project-date" datetime="${date}">${formattedDate}</time>`
        }

        html += '</div>'
      }

      if (description) {
        html += `<p class="project-description">${description}</p>`
      }

      html += '</article>'

      return html.trim()
    })
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
      let html = ''

      html += '<div class="certificate">'

      if (image) {
        html += `
<a href="${link}" target="_blank" rel="noopener noreferrer" class="provider-link">
  <img src="${image}" alt="${name} certificate" class="certificate-image" onerror="this.style.display='none'">
</a>
`.trim()
      }

      if (name) {
        html += `<h3 class="certificate-name">${name}</h3>`
      }

      if (id) {
        html += `<p class="certificate-id">${id}</p>`
      }

      if (provider) {
        html += `
<a href="${provider.link}" target="_blank" rel="noopener noreferrer" class="provider-link">
  ${provider.name}
</a>
`.trim()
      }

      html += '</div>'

      return html.trim()
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
      const dots = Array.from({ length: 10 }, (_, i) => {
        const filled = i < efficiency ? 'filled' : ''
        return `<span class="skill-dot ${filled}"></span>`
      }).join('')

      let html = ''

      html += '<div class="skill">'

      if (name) {
        html += `<span class="skill-name">${name}</span>`
      }

      html += `
<div class="skill-level" aria-label="Skill level ${efficiency} out of 10">
    ${dots}
</div>
`.trim()

      html += '</div>'

      return html
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
      let html = ''

      html += '<div class="tool">'

      html += '<div class="tool-name">'

      if (name) {
        html += `<a href="${link}" target="_blank" rel="noopener noreferrer">`

        if (icon) {
          html += `<span class="iconify-inline" data-icon="${icon}"></span>`
        }

        html += name

        html += '</a>'
      }

      html += '</div>'

      if (yearsOfExperience) {
        const experienceText =
          yearsOfExperience === 1 ? '1 year' : `${yearsOfExperience} years`
        html += `<span class="tool-experience">${experienceText}</span>`
      }

      html += '</div>'
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
      let html = ''

      html += '<span class="interest">'

      if (icon) {
        html += `${icon} ${name}`
      } else {
        html += name
      }

      html += '</span>'

      return html.trim()
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
      let html = ''

      html += '<div class="language">'

      if (name) {
        html += `<span class="language-name">${name}</span>`
      }

      if (efficiency) {
        html += `<span class="language-level">${efficiency}</span>`
      }

      html += '</div>'

      return html.trim()
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
