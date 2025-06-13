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
  const type = 'project'

  return data.map(renderProject).join('')

  function renderProject({ name, description, url, date }) {
    const type = 'project'
    const renderedName = render.item.sectionTitle(name, type)

    const nameContainer = render.container.empty(
      `<div class="${type}-header">`,

      render.item.url(url, renderedName, type),
      render.item.date(date, type),

      '</div>'
    )

    return render.container.empty(
      `<article class="${type}">`,

      nameContainer,
      render.item.description(description, type),

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
  const type = 'certificate'
  const type2 = 'provider'

  return data.map(renderCertificate).join('')

  function renderCertificate({ name, id, image, link, provider }) {
    const renderedImage = render.item.image(image, name, type)

    return render.container.empty(
      '<div class="certificate">',

      render.item.url(link, renderedImage, type2),
      render.item.sectionTitle(name, type),
      render.item.text(id, `${type}-id`),
      render.item.url(provider.link, provider.name, type2),

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
  const type = 'skill'

  return data
    .sort((a, b) => b.efficiency - a.efficiency)
    .map(renderSkill)
    .join('')

  function renderSkill({ name, efficiency }) {
    return render.container.empty(
      `<div class="${type}">`,

      render.item.name(name, type),
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
  const type = 'tool'

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
      `<div class="${type}-name">`,

      nameContainer,

      '</div>'
    )

    return render.container.empty(
      `<div class="${type}">`,

      toolNameContainer,
      render.item.experience(yearsOfExperience, type),

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
  const type = 'interest'

  return data.map(renderInterest).join('')

  function renderInterest({ name, icon }) {
    return render.container.empty(
      `<span class="${type}">`,

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
  const type = 'language'

  return data.map(renderLanguage).join('')

  function renderLanguage({ name, efficiency }) {
    return render.container.empty(
      `<div class="${type}">`,

      render.item.name(name, type),
      render.item.name(efficiency, type),

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
