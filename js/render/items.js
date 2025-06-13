/**
 * @param {string} str
 * @returns {string} HTML string
 */
export function renderTitle(str) {
  if (!str) str = '...'

  return `<h1>${str}</h1>`
}

/**
 * @param {string} str
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderSectionTitle(str, type) {
  if (!str) str = '...'

  return `<h3 class="${type}-name">${str}</h3>`
}

/**
 * @param {string} str
 * @returns {string} HTML string
 */
export function renderTagline(str) {
  if (!str) return ''

  return renderText(str, 'tagline')
}

/**
 * @param {string} str
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderDescription(str, type) {
  if (!str) return ''

  return renderText(str, `${type}-description`)
}

/**
 * @param {string} str
 * @param {string} [className] - Optional class name for styling
 * @returns {string} HTML string
 */
export function renderText(str, className) {
  if (!str) return ''

  return `<p class="${className}">${str}</p>`
}

/**
 * @param {string} key
 * @param {string} value
 * @returns {string} HTML string
 */
export function renderKeyValue(key, value) {
  if (!key && !value) return ''

  if (!key) key = '...'
  if (!value) value = '?'

  return `<dt>${key}</dt><dd>${value}</dd>`
}

/**
 * @param {string} str
 * @returns {string} HTML string
 */
export function renderEmail(str) {
  if (!str) str = 'e@ma.il'

  return `
<a href="mailto:${str}" aria-label="Send email">
  ${renderIcon('ic:round-email')}
  ${str}
</a>
`.trim()
}

/**
 * @param {string} str
 * @returns {string} HTML string
 */
export function renderPhone(str) {
  if (!str) str = '+0-000-000-0000'

  const cleanedPhone = str.replace(/[^+\d]/g, '')

  return `
<a href="tel:${cleanedPhone}" aria-label="Call phone number">
  ${renderIcon('ic:round-phone')}
  ${str}
</a>
`.trim()
}

/**
 * @param {string} str
 * @returns {string} HTML string
 */
export function renderIcon(str) {
  if (!str) str = 'icon-park-outline:error-picture'

  return `<span class="iconify-inline" data-icon="${str}"></span>`
}

/**
 * @param {string} str
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderDate(str, type) {
  let formattedDate = formatDate(str)

  if (!str) formattedDate = 'Month 0000'

  return `<time class="${type}-date" datetime="${str}">${formattedDate}</time>`

  /**
   * Formats date from YYYY-MM to Month Year
   * @param {string} str - Date in YYYY-MM format
   * @returns {string} Formatted date string
   */
  function formatDate(str) {
    const [year, month] = str.split('-')
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
}

/**
 * @param {string} str
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderName(str, type) {
  if (!str) str = '...'

  return `<span class="${type}-name">${str}</span>`
}

/**
 * @param {number} num
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderExperience(num, type) {
  if (!num) num = 0

  const text = num === 1 ? '1 year' : `${num} years`
  return `<span class="${type}-experience">${text}</span>`
}

/**
 * @param {string} image
 * @param {string} alt
 * @param {string} imageType
 * @returns {string} HTML string
 */
export function renderImage(image, alt, imageType) {
  if (!image) {
    if (!alt) return ''

    return alt
  }

  return `<img src="${image}" alt="${alt} ${imageType}" class="${imageType}-image" onerror="this.style.display='none'">`
}

/**
 * @param {string} url
 * @param {string} text
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderUrl(url, text, type) {
  if (!text) {
    if (!url) return ''

    return renderUrl(url, url, type)
  }

  if (!url) return text

  return `
<a href="${url}" target="_blank" rel="noopener noreferrer" class="${type}-link">
  ${text}
</a>
`.trim()
}

/**
 * @param {number} efficiency
 * @returns {string} HTML string
 */
export function renderDots(efficiency) {
  if (!efficiency) efficiency = 0

  return Array.from({ length: 10 }, (_, i) => renderDot(efficiency, i)).join('')

  /**
   * @param {number} efficiency
   * @param {number} i
   * @returns {string} HTML string
   */
  function renderDot(efficiency, i) {
    const filled = i < efficiency ? 'filled' : ''
    return `<span class="skill-dot ${filled}"></span>`
  }
}

export default {
  title: renderTitle,
  sectionTitle: renderSectionTitle,
  tagline: renderTagline,
  description: renderDescription,
  text: renderText,
  keyValue: renderKeyValue,
  email: renderEmail,
  phone: renderPhone,
  icon: renderIcon,
  date: renderDate,
  name: renderName,
  experience: renderExperience,
  image: renderImage,
  url: renderUrl,
  dots: renderDots
}
