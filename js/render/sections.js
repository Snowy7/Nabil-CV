/** @import { Account, Certificate, Contact, Header, Interest, Language, PersonalInfo, Project, Skill, Tool } from '../types.js' */

import render from './items.js'

/**
 * Renders header content with job title and tagline
 * @param {Header} data - Header information
 * @returns {string} HTML string for header
 */
export function renderHeader({ title, tagline }) {
  let html = ''

  html += render.title(title)
  html += render.tagline(tagline)

  return html.trim()
}

/**
 * Renders personal information as a definition list
 * @param {PersonalInfo} data - Personal information object
 * @returns {string} HTML string for personal info
 */
export function renderPersonalInfo({ name, age, sex }) {
  let html = ''

  html += render.keyValue('Name', name)
  html += render.keyValue('Age', age.toString())
  html += render.keyValue('Gender', sex)

  return html.trim()
}

/**
 * Renders contact information with proper semantic markup
 * @param {Contact} data - Contact information
 * @returns {string} HTML string for contact info
 */
export function renderContact({ email, phone }) {
  let html = ''

  html += render.email(email)
  html += render.phone(phone)

  return html.trim()
}

/**
 * Renders social media accounts
 * @param {Account[]} data - Array of account objects
 * @returns {string} HTML string for accounts
 */
export function renderAccounts(data) {
  return data.map(renderAccount).join('')

  function renderAccount({ name, url, icon }) {
    let html = ''

    html += `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${name} profile">`

    html += render.icon(icon)
    html += name

    html += '</a>'

    return html.trim()
  }
}

/**
 * Renders a single project with semantic markup
 * @param {Project[]} data - Project object
 * @returns {string} HTML string for project
 */
export function renderProjects(data) {
  return data.map(renderProject).join('')

  function renderProject({ name, description, url, date }) {
    let html = ''

    html += '<article class="project">'

    if (name) {
      html += '<div class="project-header">'

      html += render.maskedTitle(url, name, 'project')
      html += render.date(date, 'project')

      html += '</div>'
    }
    html += render.description(description, 'project')

    html += '</article>'

    return html.trim()
  }
}

/**
 * Renders a certificate with provider information
 * @param {Certificate[]} data - Certificate object
 * @returns {string} HTML string for certificate
 */
export function renderCertificates(data) {
  return data.map(renderCertificate).join('')

  function renderCertificate({ name, id, image, link, provider }) {
    let html = ''

    html += '<div class="certificate">'

    html += render.maskedImage(image, link, name, 'certificate', 'provider')
    html += `<h3 class="certificate-name">${name}</h3>`
    html += render.text(id, 'certificate-id')
    html += render.maskedText(provider.link, provider.name, 'provider')

    html += '</div>'

    return html.trim()
  }
}

/**
 * Renders a skill with visual proficiency indicator
 * @param {Skill[]} data - Skill object
 * @returns {string} HTML string for skill
 */
export function renderSkills(data) {
  return data
    .sort((a, b) => b.efficiency - a.efficiency)
    .map(renderSkill)
    .join('')

  function renderSkill({ name, efficiency }) {
    let html = ''

    html += '<div class="skill">'

    html += render.name(name, 'skill')
    html += render.dotsContainer(efficiency)

    html += '</div>'

    return html.trim()
  }
}

/**
 * Renders a tool with experience information
 * @param {Tool[]} data - Tool object
 * @returns {string} HTML string for tool
 */
export function renderTools(data) {
  return data
    .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience)
    .map(renderTool)
    .join('')

  function renderTool({ name, icon, link, yearsOfExperience }) {
    let html = ''

    html += '<div class="tool">'

    html += '<div class="tool-name">'

    if (name) {
      html += `<a href="${link}" target="_blank" rel="noopener noreferrer">`

      html += render.icon(icon)
      html += name

      html += '</a>'
    }

    html += '</div>'
    html += render.experience(yearsOfExperience, 'tool')

    html += '</div>'

    return html.trim()
  }
}

/**
 * Renders an interest with icon
 * @param {Interest[]} data - Interest object
 * @returns {string} HTML string for interest
 */
export function renderInterests(data) {
  return data.map(renderInterest).join('')

  function renderInterest({ name, icon }) {
    let html = ''

    html += '<span class="interest">'

    html += `${icon} ${name}`

    html += '</span>'

    return html.trim()
  }
}

/**
 * Renders a language with proficiency level
 * @param {Language[]} data - Language object
 * @returns {string} HTML string for language
 */
export function renderLanguages(data) {
  return data.map(renderLanguage).join('')

  function renderLanguage({ name, efficiency }) {
    let html = ''

    html += '<div class="language">'

    html += render.name(name, 'language')
    html += render.name(efficiency, 'language')

    html += '</div>'

    return html.trim()
  }
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
