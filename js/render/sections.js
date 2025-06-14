/** @import { Account, Certificate, Contact, Header, Interest, LangCode, Language, PersonalInfo, Project, Skill, Tool } from '../types.js' */

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
  const type = 'project'

  return data
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(renderProject)
    .join('')

  /**
   * @param {Project} project - Project object
   * @returns {string} HTML string for project
   */
  function renderProject({ name, description, link, date }) {
    const renderedName = render.item.sectionTitle(name[lang], type)

    const nameContainer = render.container.div(`${type}-header`, [
      render.item.url(link, renderedName, type),
      render.item.date(date, type)
    ])

    return render.container.article(type, [
      nameContainer,
      render.item.description(description[lang], type)
    ])
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
  const type2 = 'provider'

  return data
    .sort((a, b) => b.provider.name.localeCompare(a.provider.name))
    .map(renderCertificate)
    .join('')

  /**
   * @param {Certificate} certificate - Certificate object
   * @returns {string} HTML string for certificate
   */
  function renderCertificate({ name, id, image, link, provider }) {
    const renderedImage = render.item.image(image, name[lang], type)

    return render.container.div(type, [
      render.item.url(link, renderedImage, type2),
      render.item.sectionTitle(name[lang], type),
      render.item.text(id, `${type}-id`),
      render.item.url(provider.link, provider.name, type2)
    ])
  }
}

/**
 * Renders a skill with visual proficiency indicator
 * @param {Skill[]} data - Skill object
 * @returns {string} HTML string for skill
 */
export function renderSkills(data) {
  const lang = getLang()
  const type = 'skill'

  return data
    .sort((a, b) => b.efficiency - a.efficiency)
    .map(renderSkill)
    .join('')

  /**
   * @param {Skill} skill - Skill object
   * @returns {string} HTML string for skill
   */
  function renderSkill({ name, efficiency }) {
    return render.container.div(type, [
      render.item.name(name[lang], type),
      render.container.dots(efficiency)
    ])
  }
}

/**
 * Renders a tool with experience information
 * @param {Tool[]} data - Tool object
 * @returns {string} HTML string for tool
 */
export function renderTools(data) {
  const lang = getLang()
  const type = 'tool'

  return data
    .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience)
    .map(renderTool)
    .join('')

  /**
   * @param {Tool} tool - Tool object
   * @returns {string} HTML string for tool
   */
  function renderTool({ name, icon, link, yearsOfExperience }) {
    const nameContainer = render.container.url(link, '', [
      render.item.icon(icon),
      ' ',
      name
    ])

    const toolNameContainer = render.container.div(`${type}-name`, [
      nameContainer
    ])

    return render.container.div(type, [
      toolNameContainer,
      render.item.experience(yearsOfExperience, type)
    ])
  }
}

/**
 * Renders an interest with icon
 * @param {Interest[]} data - Interest object
 * @returns {string} HTML string for interest
 */
export function renderInterests(data) {
  const lang = getLang()
  const type = 'interest'

  return data.map(renderInterest).join('')

  /**
   * @param {Interest} interest - Interest object
   * @returns {string} HTML string for interest
   */
  function renderInterest({ name, icon }) {
    return render.container.div(type, [icon, ' ', name[lang]])
  }
}

/**
 * Renders a language with proficiency level
 * @param {Language[]} data - Language object
 * @returns {string} HTML string for language
 */
export function renderLanguages(data) {
  const lang = getLang()
  const type = 'language'

  return data.map(renderLanguage).join('')

  /**
   * @param {Language} language - Language object
   * @returns {string} HTML string for language
   */
  function renderLanguage({ name, efficiency }) {
    return render.container.div(type, [
      render.item.name(name[lang], type),
      render.item.name(efficiency[lang], type)
    ])
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
