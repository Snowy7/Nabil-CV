/** @import { Account, Certificate, Contact, Header, Interest, Language, PersonalInfo, Project, Skill, Tool } from '../types.js' */

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
  return render.container.empty(
    render.item.title(title),
    render.item.tagline(tagline)
  )
}

/**
 * Renders personal information as a definition list
 * @param {PersonalInfo} data - Personal information object
 * @returns {string} HTML string for personal info
 */
export function renderPersonalInfo({ name, age, sex }) {
  return render.container.empty(
    render.item.keyValue('Name', name),
    render.item.keyValue('Age', age.toString()),
    render.item.keyValue('Gender', sex)
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

  function renderAccount({ name, url, icon }) {
    return render.container.empty(
      `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${name} profile">`,

      render.item.icon(icon),
      name,

      '</a>'
    )
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
    const type = 'project'
    const renderedName = render.item.sectionTitle(name, type)

    const nameContainer = render.container.empty(
      '<div class="project-header">',

      render.item.url(url, renderedName, type),
      render.item.date(date, 'project'),

      '</div>'
    )

    return render.container.empty(
      '<article class="project">',

      nameContainer,
      render.item.description(description, 'project'),

      '</article>'
    )
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
    const renderedImage = render.item.image(image, name, 'certificate')

    return render.container.empty(
      '<div class="certificate">',

      render.item.url(link, renderedImage, 'provider'),
      render.item.sectionTitle(name, 'certificate'),
      render.item.text(id, 'certificate-id'),
      render.item.url(provider.link, provider.name, 'provider'),

      '</div>'
    )
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
    return render.container.empty(
      '<div class="skill">',

      render.item.name(name, 'skill'),
      render.container.dots(efficiency),

      '</div>'
    )
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
    const nameContainer = render.container.empty(
      `<a href="${link}" target="_blank" rel="noopener noreferrer">`,

      render.item.icon(icon),
      name,

      '</a>'
    )

    const toolNameContainer = render.container.empty(
      '<div class="tool-name">',

      nameContainer,

      '</div>'
    )

    return render.container.empty(
      '<div class="tool">',

      toolNameContainer,
      render.item.experience(yearsOfExperience, 'tool'),

      '</div>'
    )
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
    return render.container.empty(
      '<span class="interest">',

      `${icon} ${name}`,

      '</span>'
    )
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
    return render.container.empty(
      '<div class="language">',

      render.item.name(name, 'language'),
      render.item.name(efficiency, 'language'),

      '</div>'
    )
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
