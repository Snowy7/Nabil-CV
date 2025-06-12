# AI Prompt: Generate a Modular CV Static Site

Create a professional, text-oriented CV static site using native HTML/CSS/JS with the following specifications:

## Architecture Requirements

### File Structure
```
project-root/
├── index.html
├── style.css
├── assets/
│   └── cert/
├── src/
│   ├── index.js
│   ├── data.js
│   └── types.js
├── pages/
│   ├── PAGE_NAME.html
├── sections/
│   ├── header.html
│   ├── personal-info.html
│   ├── contact.html
│   ├── accounts.html
│   ├── projects.html
│   ├── certificates.html
│   ├── skills.html
│   ├── tools.html
│   ├── interests.html
│   └── languages.html
├── components/
│   ├── project.html
│   ├── certificate.html
│   ├── skill.html
│   ├── tool.html
│   ├── interest.html
│   └── language.html
└── data/
    ├── schemas/
    │   ├── header.schema.json
    │   ├── project.schema.json
    │   ├── certificate.schema.json
    │   ├── skill.schema.json
    │   ├── tool.schema.json
    │   ├── interest.schema.json
    │   └── language.schema.json
    ├── personal-info.json
    ├── contact.json
    ├── accounts.json
    └── PAGE_NAME/
        ├── header.json
        ├── projects.json
        ├── certificates.json
        ├── skills.json
        ├── tools.json
        ├── interests.json
        └── languages.json
```

## Technical Specifications

### JavaScript Requirements
- Use ES6 modules with `.mjs` import/export syntax
- Implement functional programming paradigm
- Document all functions with JSDoc comments
- No classes, only pure functions and arrow functions

### CSS/Design Requirements
- Clean, minimal design with no gradients or flashy colors
- Text-oriented layout without logos or profile pictures
- Static design with no animations or transitions
- Use semantic HTML5 elements
- Responsive design using CSS Grid and Flexbox
- Monochromatic color scheme (blacks, grays, whites)

### JavaScript File Responsibilities

#### `src/types.js`
```javascript
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

```

#### `src/data.js`
Create converter functions to transform JSON data into HTML strings:
- `renderProject(project)`
- `renderCertificate(certificate)`
- `renderSkill(skill)`
- `renderTool(tool)`
- `renderInterest(interest)`
- `renderLanguage(language)`

#### `src/index.js`
Main orchestration functions:
- `loadSection(sectionName, pageName)`
- `populateSection(sectionId, data, renderFunction)`
- `initializePage(pageName)`
- `loadJSON(filePath)`

## Page Structure

### Header Section
- Job role title (h1)
- Brief professional tagline (p)

### Personal Information Section
- Name, age, and gender in clean layout
- Use definition list (`<dl>`) for structured data

### Contact Section
- Email as clickable mailto link
- Phone with country code as clickable tel link
- Use semantic contact information markup

### Accounts Section
- Social media links with text labels (no icons per preference)
- External links with proper `rel="noopener noreferrer"`

### Projects Section
- Chronologically ordered list of projects
- Each project shows name, date (Month Year format), and description
- Use `<article>` elements for semantic structure

### Certificates Section
- Grid layout for certificates
- Include certificate image, name, ID, and provider information
- Provider links should be clearly marked

### Skills Section
- Skills with proficiency levels (visual bars or numeric scale)
- Group related skills logically

### Tools Section
- Tools with experience duration
- Links to tool websites where applicable

### Interests Section
- Simple list with emoji/text indicators
- Keep descriptions brief

### Languages Section
- Languages with proficiency levels
- Use standard proficiency descriptors

## Data Structure Examples

### Project JSON Schema
```json
{
  "name": "E-commerce Platform",
  "date": "2024-03",
  "description": "Full-stack web application built with React and Node.js"
}
```

### Certificate JSON Schema
```json
{
  "name": "AWS Certified Developer",
  "id": "AWD-2024-001",
  "image": "/assets/images/aws-cert.png",
  "link": "https://credly.com/certificates/...",
  "provider": {
    "name": "Amazon Web Services",
    "link": "https://aws.amazon.com",
    "icon": "aws-icon"
  }
}
```

## Implementation Guidelines

1. **Modularity**: Each section should be independently loadable
2. **Reusability**: Components should work across different job role pages
3. **Data Validation**: Implement basic JSON schema validation
4. **Error Handling**: Graceful fallbacks for missing data
5. **Accessibility**: Proper ARIA labels and semantic HTML
6. **Performance**: Lazy load sections and minimize DOM manipulation
7. **SEO**: Proper meta tags and structured data markup

## Functional Programming Patterns
- Use `Array.map()`, `Array.filter()`, `Array.reduce()` for data transformation
- Implement pure functions without side effects
- Use function composition for complex operations
- Avoid global state mutations

## Contact Information Formatting
- Phone numbers must include country code: `+1-555-123-4567`
- Email links: `<a href="mailto:email@domain.com">email@domain.com</a>`
- Phone links: `<a href="tel:+15551234567">+1-555-123-4567</a>`

Generate a complete, production-ready static site that follows these specifications exactly. Include proper error handling, accessibility features, and clean, maintainable code structure.