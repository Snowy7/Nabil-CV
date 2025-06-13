/**
 * @param {string} str
 * @returns {string} HTML string
 */
export function renderTitle(str) {
  return `<h1>${str}</h1>`
}

/**
 * @param {string} str
 * @returns {string} HTML string
 */
export function renderTagline(str) {
  return renderText(str, 'tagline')
}

/**
 * @param {string} str
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderDescription(str, type) {
  return renderText(str, `${type}-description`)
}

/**
 * @param {string} str
 * @param {string} [className] - Optional class name for styling
 * @returns {string} HTML string
 */
export function renderText(str, className) {
  return `<p class="${className}">${str}</p>`
}

/**
 * @param {string} key
 * @param {string} value
 * @returns {string} HTML string
 */
export function renderKeyValue(key, value) {
  return `<dt>${key}</dt><dd>${value}</dd>`
}

/**
 * @param {string} str
 * @returns {string} HTML string
 */
export function renderEmail(str) {
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
  return `<span class="iconify-inline" data-icon="${str}"></span>`
}

/**
 * @param {string} str
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderDate(str, type) {
  const formattedDate = formatDate(str)
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
 * @param {string} text
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderName(text, type) {
  return `<span class="${type}-name">${text}</span>`
}

/**
 * @param {number} num
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderExperience(num, type) {
  const text = num === 1 ? '1 year' : `${num} years`
  return `<span class="${type}-experience">${text}</span>`
}

/**
 * @param {string} image
 * @param {string} url
 * @param {string} alt
 * @param {string} imageType
 * @param {string} urlType
 * @returns {string} HTML string
 */
export function renderMaskedImage(image, url, alt, imageType, urlType) {
  const renderedImage = `<img src="${image}" alt="${alt} ${imageType}" class="${imageType}-image" onerror="this.style.display='none'">`
  return renderMaskedText(url, renderedImage, urlType)
}

/**
 * @param {string} url
 * @param {string} text
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderMaskedTitle(url, text, type) {
  const renderedTitle = `<h3 class="${type}-name">${text}</h3>`
  return renderMaskedText(url, renderedTitle, type)
}

/**
 * @param {string} url
 * @param {string} text
 * @param {string} type
 * @returns {string} HTML string
 */
export function renderMaskedText(url, text, type) {
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
export function renderDotsContainer(efficiency) {
  return `
<div class="skill-level" aria-label="Skill level ${efficiency} out of 10">
    ${renderDots(efficiency)}
</div>
`.trim()
}

/**
 * @param {number} efficiency
 * @returns {string} HTML string
 */
export function renderDots(efficiency) {
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
  maskedImage: renderMaskedImage,
  maskedTitle: renderMaskedTitle,
  maskedText: renderMaskedText,
  dotsContainer: renderDotsContainer,
  dots: renderDots
}
