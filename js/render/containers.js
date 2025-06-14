import { renderDots } from './items.js'

/**
 * @param {...string} data  - HTML strings to be concatenated
 * @returns {string} HTML string
 */
export function renderEmptyContainer(...data) {
  return data
    .filter((x) => !!x)
    .join('')
    .trim()
}

/**
 * @param {string} className
 * @param {string[]} children  - HTML strings to be concatenated
 * @returns {string} HTML string
 */
export function renderDivContainer(className, children) {
  return renderEmptyContainer(
    `<div class="${className}">`,
    ...children,
    '</div>'
  )
}

/**
 * @param {string} url
 * @param {string} label
 * @param {string[]} children - HTML strings to be concatenated
 * @returns {string} HTML string
 */
export function renderUrlContainer(url, label, children) {
  return renderEmptyContainer(
    `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label}">`,
    ...children,
    '</a>'
  )
}

/**
 * @param {string} className
 * @param {string[]} children - HTML strings to be concatenated
 * @returns {string} HTML string
 */
export function renderArticleContainer(className, children) {
  return renderEmptyContainer(
    `<article class="${className}">`,
    ...children,
    '</article>'
  )
}

/**
 * @param {number} efficiency
 * @returns {string} HTML string
 */
export function renderDotsContainer(efficiency) {
  if (!efficiency) efficiency = 0

  return renderEmptyContainer(
    `<div class="skill-level" aria-label="Skill level ${efficiency} out of 10">`,
    renderDots(efficiency),
    '</div>'
  )
}

export default {
  empty: renderEmptyContainer,
  div: renderDivContainer,
  url: renderUrlContainer,
  article: renderArticleContainer,
  dots: renderDotsContainer
}
