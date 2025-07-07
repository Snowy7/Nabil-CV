import renderSection from './render/sections.js'

/**
 * Populates a section with rendered data
 * @param {string} sectionId - ID of the section element
 * @param {Array|Object} data - Data to render
 * @param {(data: any) => string} renderFunction - Function to render individual items
 */
function populateSection(sectionId, data, renderFunction) {
  const el = document.getElementById(sectionId)
  if (!el) {
    console.error(`Element with ID ${sectionId} not found`)
    return
  }

  try {
    el.innerHTML = renderFunction(data)
  } catch (error) {
    const sectionName = sectionId.replace('-content', '')

    console.error(`Error populating section ${sectionId}:`, error)
    el.innerHTML = `<div class="error-message">Error loading ${sectionName} data</div>`
  }
}

/**
 * Initializes the page by loading all sections
 * @param {Object} data - Data for the page
 */
function initializePage(data) {
  // In a real implementation, this would load data from JSON files
  // For now, we'll use the sample data

  try {
    ;[
      ['header', 'header'],
      ['personal-info', 'personalInfo'],
      ['projects', 'projects'],
      ['certificates', 'certificates'],
      ['skills', 'skills'],
      ['tools', 'tools'],
      ['interests', 'interests'],
      ['languages', 'languages']
    ].forEach(([id, key]) => {
      populateSection(`${id}-content`, data[key], renderSection[key])
    })

    // Initialize new components
    createSidebar(data.contact, data.accounts)
    populateFooter(data.accounts)
  } catch (error) {
    console.error('Error initializing page:', error)
  }
}

/**
 * Loads JSON data from specified file path
 * @param {string} filePath - Path to JSON file
 * @returns {Promise<Object>} Parsed JSON data
 */
async function loadJSON(filePath) {
  try {
    const res = await fetch(filePath)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error)
    throw error
  }
}

/**
 * Simulates loading JSON data (in real implementation, would use fetch)
 * @param {string} page - Path to JSON file
 * @returns {Promise<Object>} Parsed JSON data
 */
async function loadData(page) {
  const sections = {
    shared: ['personal-info', 'contact', 'accounts'],
    specific: [
      'header',
      'projects',
      'certificates',
      'skills',
      'tools',
      'interests',
      'languages'
    ]
  }

  const sectionData = {
    shared: await Promise.all(
      sections.shared.map((str) => loadJSON(`data/${str}.json`))
    ),
    specific: await Promise.all(
      sections.specific.map((str) => loadJSON(`data/pages/${page}/${str}.json`))
    )
  }

  return {
    header: sectionData.specific[0],
    personalInfo: sectionData.shared[0],
    contact: sectionData.shared[1],
    accounts: sectionData.shared[2],
    projects: sectionData.specific[1],
    certificates: sectionData.specific[2],
    skills: sectionData.specific[3],
    tools: sectionData.specific[4],
    interests: sectionData.specific[5],
    languages: sectionData.specific[6]
  }
}

/**
 * Creates and populates the fixed sidebar with contact and social links
 * @param {Object} contact - Contact data
 * @param {Array} accounts - Social accounts data
 */
function createSidebar(contact, accounts) {
  const sidebar = document.querySelector('.sidebar-items')
  if (!sidebar) return

  // Add contact items
  if (contact.email) {
    sidebar.appendChild(
      createSidebarItem(
        'material-symbols:email',
        'Email',
        `mailto:${contact.email}`
      )
    )
  }

  if (contact.phone) {
    sidebar.appendChild(
      createSidebarItem(
        'material-symbols:phone',
        'Phone',
        `tel:${contact.phone}`
      )
    )
  }

  // Add social accounts
  accounts.forEach((account) => {
    sidebar.appendChild(
      createSidebarItem(account.icon, account.name, account.link)
    )
  })
}

/**
 * Creates a sidebar item element
 * @param {string} icon - Icon name
 * @param {string} label - Item label
 * @param {string} href - Link URL
 * @returns {HTMLElement} Sidebar item element
 */
function createSidebarItem(icon, label, href) {
  const item = document.createElement('a')
  item.className = 'sidebar-item'
  item.href = href
  item.target = href.startsWith('http') ? '_blank' : '_self'
  item.setAttribute('aria-label', label)

  item.innerHTML = `
    <span class="iconify" data-icon="${icon}"></span>
    <span class="sidebar-label">${label}</span>
  `

  return item
}

/**
 * Opens certificate modal with certificate details
 * @param {Object} certificate - Certificate data
 */
function openCertificateModal(certificate) {
  const modal = document.getElementById('certificate-modal')
  const image = /** @type {HTMLImageElement} */ (
    document.getElementById('modal-cert-image')
  )
  const title = document.getElementById('modal-cert-title')
  const description = document.getElementById('modal-cert-description')
  const link = /** @type {HTMLAnchorElement} */ (
    document.getElementById('modal-cert-link')
  )

  const lang = document.documentElement.lang || 'en'

  if (modal && image && title && description && link) {
    image.src = certificate.image
    image.alt = certificate.name[lang]
    title.textContent = certificate.name[lang]
    description.textContent = certificate.id || ''
    link.href = certificate.link

    modal.classList.add('active')
    document.body.style.overflow = 'hidden'
  }
}

/**
 * Closes the certificate modal
 */
function closeCertificateModal() {
  const modal = document.getElementById('certificate-modal')
  if (modal) {
    modal.classList.remove('active')
    document.body.style.overflow = ''
  }
}

/**
 * Populates footer with navigation and social links
 * @param {Array} accounts - Social accounts data
 */
function populateFooter(accounts) {
  const footerSocial = document.querySelector('.footer-social')
  if (!footerSocial) return

  // Add main social accounts to footer
  const mainSocials = accounts.filter((account) =>
    ['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].includes(account.name)
  )

  mainSocials.forEach((account) => {
    const socialItem = document.createElement('a')
    socialItem.className = 'footer-social-item'
    socialItem.href = account.link
    socialItem.target = '_blank'
    socialItem.setAttribute('aria-label', account.name)
    socialItem.innerHTML = `<span class="iconify" data-icon="${account.icon}"></span>`
    footerSocial.appendChild(socialItem)
  })
}

/**
 * Adds smooth scrolling behavior to navigation links
 */
function initializeNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
}

/**
 * Initializes custom acrylic cursor with hover effects
 */
function initializeCursorEffects() {
  // Only initialize on devices with hover support
  if (window.matchMedia('(hover: none)').matches) {
    return
  }

  const cursor = document.createElement('div')
  cursor.className = 'custom-cursor'
  document.body.appendChild(cursor)

  let mouseX = 0
  let mouseY = 0

  // Update cursor position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursor.style.left = mouseX + 'px'
    cursor.style.top = mouseY + 'px'
  })

  // Add hover effects for interactive elements
  const hoverElements =
    'a, button, .certificate, .skill-tag, .tool-tag, .interest-tag, .language-item, .sidebar-item'

  document.addEventListener(
    'mouseenter',
    (e) => {
      if (
        e.target &&
        e.target instanceof Element &&
        e.target.matches(hoverElements)
      ) {
        cursor.classList.add('hover')
      }
    },
    true
  )

  document.addEventListener(
    'mouseleave',
    (e) => {
      if (
        e.target &&
        e.target instanceof Element &&
        e.target.matches(hoverElements)
      ) {
        cursor.classList.remove('hover')
      }
    },
    true
  )

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0'
  })

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1'
  })
}

/**
 * Opens project modal with banner image and project info
 * @param {string|Object} projectData - Project data object or JSON string
 */
function openProjectModal(projectData) {
  // Parse project data if it's a string
  let project
  if (typeof projectData === 'string') {
    try {
      project = JSON.parse(projectData.replace(/&quot;/g, '"'))
    } catch (e) {
      console.error('Error parsing project data:', e)
      return
    }
  } else {
    project = projectData
  }

  const modal = document.getElementById('project-modal')
  const title = document.getElementById('project-modal-title')
  const directLink = document.getElementById('project-modal-direct-link')

  if (!modal || !title || !directLink) {
    console.error('Project modal elements not found')
    return
  }

  // Get current language
  const lang = document.documentElement.lang || 'en'

  // Set up modal content
  title.textContent = project.name[lang] || 'Project Preview'
  const linkElement = /** @type {HTMLAnchorElement} */ (directLink)
  linkElement.href = project.link || '#'

  // Show modal
  modal.classList.add('active')

  // Show the project banner and information
  showProjectContent(project, lang, modal)

  function showProjectContent(project, lang, modal) {
    // Find or create modal body
    let modalBody = modal.querySelector('.project-modal-body')
    if (!modalBody) {
      modalBody = document.createElement('div')
      modalBody.className = 'project-modal-body'
      const modalContent = modal.querySelector('.project-modal-content')
      if (modalContent) {
        modalContent.appendChild(modalBody)
      }
    }

    const bannerHTML = project.banner
      ? `<img src="${project.banner}" alt="${project.name[lang]}" class="project-modal-banner" />`
      : `<div class="project-modal-banner-placeholder">
          <span class="iconify" data-icon="material-symbols:image"></span>
         </div>`

    const formattedDate = new Date(project.date).toLocaleDateString(
      lang === 'ar' ? 'ar-SA' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    )

    modalBody.innerHTML = `
      ${bannerHTML}
      <div class="project-modal-info">
        <div class="project-modal-date">${formattedDate}</div>
        <div class="project-modal-description">${
          project.description[lang] || 'No description available.'
        }</div>
        ${
          project.link
            ? `
          <div class="project-modal-actions">
            <a href="${project.link}" target="_blank" class="cert-link-btn">
              <span class="iconify" data-icon="material-symbols:open-in-new"></span>
              <span>Visit Project</span>
            </a>
          </div>
        `
            : ''
        }
      </div>
    `
  }
}

/**
 * Closes the project modal
 */
function closeProjectModal() {
  const modal = document.getElementById('project-modal')
  const iframe = document.getElementById('project-modal-iframe')

  if (modal) {
    modal.classList.remove('active')
  }

  if (iframe) {
    // Clear iframe src to stop any ongoing loading
    const iframeElement = /** @type {HTMLIFrameElement} */ (iframe)
    iframeElement.src = 'about:blank'
  }
}

// Make functions globally accessible
// @ts-ignore
window.openCertificateModal = openCertificateModal
// @ts-ignore
window.closeCertificateModal = closeCertificateModal
// @ts-ignore
window.openProjectModal = openProjectModal
// @ts-ignore
window.closeProjectModal = closeProjectModal

// Initialize the page when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const page = 'game-programmer'
  const data = await loadData(page)

  initializePage(data)

  // Initialize additional functionality
  initializeNavigation()
  initializeCursorEffects()
})
