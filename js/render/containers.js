import { renderDots } from './items.js'

/**
 * @param {...string} data - Header information
 * @returns {string} HTML string
 */
export function renderEmptyContainer(...data) {
  return data
    .filter((x) => !!x)
    .join('')
    .trim()
}

/**
 * @param {number} efficiency
 * @returns {string} HTML string
 */
export function renderDotsContainer(efficiency) {
  if (!efficiency) efficiency = 0

  return `
<div class="skill-level" aria-label="Skill level ${efficiency} out of 10">
    ${renderDots(efficiency)}
</div>
`.trim()
}

export default {
  empty: renderEmptyContainer,
  dots: renderDotsContainer
}
