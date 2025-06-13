import render from './data.js'

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
      ['contact', 'contact'],
      ['accounts', 'accounts'],
      ['projects', 'projects'],
      ['certificates', 'certificates'],
      ['skills', 'skills'],
      ['tools', 'tools'],
      ['interests', 'interests'],
      ['languages', 'languages']
    ].forEach(([id, key]) => {
      populateSection(`${id}-content`, data[key], render[key])
    })
  } catch (error) {
    console.error('Error initializing page:', error)
  }
}

/**
 * Simulates loading JSON data (in real implementation, would use fetch)
 * @param {string} filePath - Path to JSON file
 * @returns {Promise<Object>} Parsed JSON data
 */
async function loadJSON(filePath) {
  // In a real implementation:
  try {
    const res = await fetch(filePath)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error)
    throw error
  }
}

// Initialize the page when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const page = 'game-programmer'

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

  const data = {
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

  initializePage(data)
})
