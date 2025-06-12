export {}

/** @typedef {'Male' | 'Female'} Sex */
/** @typedef {'Native' | 'Fluent' | 'Intermediate' | 'Basic'} LanguageEfficiency */
/** @typedef {`${string}@${string}.${string}`} Email */
/** @typedef {`+${string}`} Phone */
/** @typedef {`${string}-${string}`} DateStr */

/**
 * @typedef {Object} Header
 * @property {string} title
 * @property {string} tagline
 */

/**
 * @typedef {Object} PersonalInfo
 * @property {string} name
 * @property {number} age
 * @property {Sex} sex
 */

/**
 * @typedef {Object} Contact
 * @property {Email} email
 * @property {Phone} phone
 */

/**
 * @typedef {Object} Account
 * @property {string} name
 * @property {string} url
 * @property {string} icon
 */

/**
 * @typedef {Object} Project
 * @property {string} name
 * @property {string} url
 * @property {DateStr} date - Format: "YYYY-MM"
 * @property {string} description
 */

/**
 * @typedef {Object} Certificate
 * @property {string} name
 * @property {string} id
 * @property {string} image
 * @property {string} link
 * @property {Provider} provider
 */

/**
 * @typedef {Object} Provider
 * @property {string} name
 * @property {string} link
 * @property {string} icon
 */

/**
 * @typedef {Object} Skill
 * @property {string} name
 * @property {number} efficiency - Scale 1-10
 */

/**
 * @typedef {Object} Tool
 * @property {string} name
 * @property {string} icon
 * @property {string} link
 * @property {number} yearsOfExperience - Greater than 0
 */

/**
 * @typedef {Object} Interest
 * @property {string} name
 * @property {string} icon - Emoji or icon class
 */

/**
 * @typedef {Object} Language
 * @property {string} name
 * @property {LanguageEfficiency} efficiency - e.g., "Native", "Fluent", "Intermediate"
 */
