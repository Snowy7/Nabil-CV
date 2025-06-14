export {}

/** @typedef {'Male' | 'Female'} Sex */
/** @typedef {'Native' | 'Fluent' | 'Intermediate' | 'Basic'} LanguageEfficiency */
/** @typedef {`${string}@${string}.${string}`} Email */
/** @typedef {`+${string}`} Phone */
/** @typedef {`${string}-${string}`} DateStr */

/**
 * @typedef {Object} Header
 * @property {MultiLang<string>} title
 * @property {MultiLang<string>} tagline
 */

/**
 * @typedef {Object} PersonalInfo
 * @property {MultiLang<string>} name
 * @property {number} age
 * @property {MultiLang<Sex>} sex
 */

/**
 * @typedef {Object} Contact
 * @property {Email} email
 * @property {Phone} phone
 */

/**
 * @typedef {Object} Account
 * @property {string} name
 * @property {string} link
 * @property {string} icon
 */

/**
 * @typedef {Object} Project
 * @property {MultiLang<string>} name
 * @property {string} link
 * @property {DateStr} date - Format: "YYYY-MM"
 * @property {MultiLang<string>} description
 */

/**
 * @typedef {Object} Certificate
 * @property {MultiLang<string>} name
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
 * @property {MultiLang<string>} name
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
 * @property {MultiLang<string>} name
 * @property {string} icon - Emoji or icon class
 */

/**
 * @typedef {Object} Language
 * @property {MultiLang<string>} name
 * @property {MultiLang<LanguageEfficiency>} efficiency - e.g., "Native", "Fluent", "Intermediate"
 */

/**
 * @template {string} Value
 * @typedef {{ [key: LangCode]: Value }} MultiLang
 */

// language

/**
 * @typedef {Object} Lang
 * @property {LangCode} code - Language code (e.g., 'en', 'ar')
 * @property {LangName} name - Language name (e.g., 'English', 'العربية')
 * @property {LangDir} dir - Text direction ('ltr' or 'rtl')
 */

/** @typedef {'ar' | 'en'} LangCode */
/** @typedef {'العربية' | 'English'} LangName */
/** @typedef {'rtl' | 'ltr'} LangDir */
