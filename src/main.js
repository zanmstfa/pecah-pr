import './style.css'
import repositories from './data/repositories.json'

document.querySelector('#app').innerHTML = `
  <header class="navbar">
    <a class="logo" href="${import.meta.env.BASE_URL}">PecahPR</a>

    <button
      id="theme-toggle"
      class="theme-toggle"
      type="button"
      aria-label="Switch to dark mode"
      title="Switch to dark mode"
    >
      <img
        id="theme-icon"
        src="${import.meta.env.BASE_URL}icons/dark-mode.svg"
        alt=""
        aria-hidden="true"
      />
    </button>

    <a
      class="github-link"
      href="https://github.com/zanmstfa/pecah-pr"
      target="_blank"
      rel="noopener noreferrer"
    >
      View on GitHub
    </a>
  </header>

  <main>
    <section class="hero">
      <span class="label">Open source untuk semua</span>
      <h1>Pecahkan pull request pertamamu.</h1>

      <p>
        Temukan proyek open-source yang ramah pemula dan mulai
        berkontribusi tanpa bingung harus dari mana.
      </p>

      <a class="button" href="#repository">Explore repositories</a>
    </section>

    <section class="getting-started" aria-labelledby="getting-started-title">
  <div class="getting-started-heading">
    <span class="eyebrow">Getting started</span>
    <h2 id="getting-started-title">
      Kontribusi pertamamu dalam tiga langkah
    </h2>
  </div>

  <ol class="steps-list">
    <li class="step-card">
      <span class="step-number">01</span>
      <h3>Choose a repository</h3>
      <p>
        Cari proyek yang sesuai dengan teknologi yang ingin kamu pelajari.
      </p>
    </li>

    <li class="step-card">
      <span class="step-number">02</span>
      <h3>Read the guide</h3>
      <p>
        Periksa README dan CONTRIBUTING sebelum mulai mengubah kode.
      </p>
    </li>

    <li class="step-card">
      <span class="step-number">03</span>
      <h3>Send your changes</h3>
      <p>
        Kerjakan issue, uji perubahan, lalu kirim melalui pull request.
      </p>
    </li>
  </ol>
</section>

    <section id="repository" class="repository">
  <div class="section-heading">
    <div>
      <h2>Beginner-friendly repositories</h2>
      <p>Pilih teknologi yang ingin kamu pelajari lewat kontribusi.</p>
    </div>

    <p
      id="result-count"
      class="result-count"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    ></p>
  </div>

  <div class="repository-controls">
    <input
      id="search-input"
      type="search"
      placeholder="Search repositories..."
      aria-label="Search repositories"
    />

    <div class="filter-controls">
      <select id="language-filter" aria-label="Filter by language">
        <option value="Semua">All languages</option>
      </select>

      <select id="sort-order" aria-label="Sort repositories">
        <option value="default">Default order</option>
        <option value="issues">Beginner issues first</option>
        <option value="az">Name A–Z</option>
        <option value="za">Name Z–A</option>
      </select>

      <button
        id="random-repository"
        class="random-repository-button"
        type="button"
        aria-label="Pick a random repository"
        title="Surprise me"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M16 3h5v5" />
          <path d="m4 20 17-17" />
          <path d="M21 16v5h-5" />
          <path d="m15 15 6 6" />
          <path d="m4 4 5 5" />
        </svg>
      </button>

      <button
        id="favorites-filter"
        class="favorites-filter-button"
        type="button"
        aria-label="Show favorite repositories"
        aria-pressed="false"
        title="Show favorites"
      >
        ☆
      </button>

      <button
        id="copy-filter-link"
        class="copy-filter-link-button"
        type="button"
        aria-label="Copy filtered results link"
        title="Copy filter link"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M10 13a5 5 0 0 0 7.07.07l2-2A5 5 0 0 0 12 4l-1.15 1.15"
          />
          <path
            d="M14 11a5 5 0 0 0-7.07-.07l-2 2A5 5 0 0 0 12 20l1.15-1.15"
          />
        </svg>
      </button>

      <button
        id="reset-filters"
        class="reset-button"
        type="button"
      >
        Reset
      </button>
    </div>
  </div>

  <div id="repository-list" class="repository-list"></div>
</section>

        <section class="proposal" id="proposal">
      <div class="proposal-intro">
        <span class="label">Community picks</span>
        <h2>Usulkan repository</h2>
        <p>
          Menemukan repository yang cocok untuk pemula?
          Kirimkan usulanmu melalui GitHub Issue.
        </p>
      </div>

      <form id="proposal-form" class="proposal-form">
        <div class="form-row">
          <label>
            Nama repository
            <input
              id="proposal-name"
              type="text"
              placeholder="contoh: pecah-pr"
              required
            />
          </label>

          <label>
            Nama pemilik
            <input
              id="proposal-owner"
              type="text"
              placeholder="contoh: zanmstfa"
              required
            />
          </label>
        </div>

        <label>
          Bahasa pemrograman
          <select id="proposal-language" required>
            <option value="">Pilih bahasa</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="PHP">PHP</option>
            <option value="Java">Java</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Panduan">Panduan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </label>

        <label>
          Deskripsi
          <textarea
            id="proposal-description"
            rows="4"
            placeholder="Jelaskan repository ini secara singkat..."
            required
          ></textarea>
        </label>

        <label>
          URL repository
          <input
            id="proposal-url"
            type="url"
            placeholder="https://github.com/pemilik/repository"
            required
          />
        </label>

        <label>
          URL panduan kontribusi
          <input
            id="proposal-contributing-url"
            type="url"
            placeholder="https://github.com/pemilik/repository/blob/main/CONTRIBUTING.md"
            required
          />
        </label>

        <div class="issue-availability">
          <label class="issue-toggle">
            <input
              id="proposal-has-beginner-issues"
              type="checkbox"
              aria-controls="proposal-issue-field"
              aria-expanded="false"
            />
            <span>Good first issue tersedia saat diperiksa</span>
          </label>

          <p class="field-help">
            Aktifkan jika repository sedang memiliki
            <em>good first issue</em>.
          </p>
        </div>

        <div id="proposal-issue-field" hidden>
          <label>
            URL issue ramah pemula
            <input
              id="proposal-issue-url"
              type="url"
              placeholder="https://github.com/pemilik/repository/issues/..."
              disabled
            />
          </label>
        </div>

        <button class="button submit-button" type="submit">
          Kirim usulan
        </button>
      </form>
    </section>

  </main>

  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <a
          class="footer-logo"
          href="${import.meta.env.BASE_URL}"
        >
          PecahPR
        </a>
        <p>
          Membantu developer menemukan langkah yang lebih jelas
          untuk mulai berkontribusi ke proyek open-source.
        </p>
      </div>

      <nav class="footer-links" aria-label="Footer links">
        <a
          href="https://github.com/zanmstfa/pecah-pr"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://github.com/zanmstfa/pecah-pr/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribution guide
        </a>
        <a
          href="https://github.com/zanmstfa/pecah-pr/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Report an issue
        </a>
      </nav>
    </div>
  </footer>

  <div
    id="action-feedback"
    class="action-feedback"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  ></div>

  <button
    id="back-to-top"
    class="back-to-top"
    type="button"
    aria-label="Back to top"
    aria-hidden="true"
    title="Back to top"
    tabindex="-1"
  >
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 15 6-6 6 6" />
    </svg>
  </button>
`

const repositoryList = document.querySelector('#repository-list')
const resultCount = document.querySelector('#result-count')
const languageFilter = document.querySelector('#language-filter')
const searchInput = document.querySelector('#search-input')
const proposalForm = document.querySelector('#proposal-form')
const proposalHasBeginnerIssues = document.querySelector(
  '#proposal-has-beginner-issues',
)
const proposalIssueField = document.querySelector(
  '#proposal-issue-field',
)
const proposalIssueUrl = document.querySelector(
  '#proposal-issue-url',
)
const themeToggle = document.querySelector('#theme-toggle')
const themeIcon = document.querySelector('#theme-icon')
const backToTopButton = document.querySelector('#back-to-top')
const resetFiltersButton = document.querySelector('#reset-filters')
const sortOrder = document.querySelector('#sort-order')

const favoritesFilterButton = document.querySelector(
  '#favorites-filter',
)
const copyFilterLinkButton = document.querySelector(
  '#copy-filter-link',
)
const randomRepositoryButton = document.querySelector(
  '#random-repository',
)
const actionFeedback = document.querySelector('#action-feedback')

function loadSavedFavorites() {
  try {
    const saved = JSON.parse(
      localStorage.getItem('pecahpr-favorites') || '[]',
    )

    return Array.isArray(saved)
      ? saved.filter((repositoryId) =>
          typeof repositoryId === 'string',
        )
      : []
  } catch {
    return []
  }
}

const favoriteRepositories = new Set(loadSavedFavorites())
const validSortOrders = new Set([
  'default',
  'issues',
  'az',
  'za',
])
let showFavoritesOnly = false
let visibleRepositories = []
let lastRandomRepositoryId = null
let recommendationHighlightTimeout

const verificationDateFormatter = new Intl.DateTimeFormat(
  'en-US',
  {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  },
)

function formatVerificationDate(date) {
  return verificationDateFormatter.format(
    new Date(`${date}T00:00:00Z`),
  )
}

function displayRepositories(items) {
  visibleRepositories = items
  randomRepositoryButton.disabled = items.length === 0
  const repositoryLabel =
    items.length === 1 ? 'repository' : 'repositories'
  resultCount.textContent =
    `${items.length} ${repositoryLabel} found`

  if (items.length === 0) {
    repositoryList.innerHTML = `
      <div class="empty-state">
        <span>🔍</span>
        <h3>No repositories found</h3>
        <p>Coba kata kunci lain atau ubah filter yang dipakai.</p>
        <button
          class="reset-button"
          type="button"
          data-action="reset-empty"
        >
          Reset filters
        </button>
      </div>
    `
    return
  }

  repositoryList.innerHTML = items
    .map((repository) => {
      const repositoryId = `${repository.owner}/${repository.name}`
      const isFavorite = favoriteRepositories.has(repositoryId)
      const verificationDate = formatVerificationDate(
        repository.verifiedAt,
      )
      const primaryAction = repository.hasBeginnerIssues
        ? {
            label: 'View issues',
            url: `${repository.url}/contribute`,
          }
        : {
            label: 'Read guide',
            url: repository.contributingUrl,
          }

      return `
        <article
          class="card"
          data-repository-card="${repositoryId}"
        >
          <div>
            <div class="card-header">
              <span class="language">${repository.language}</span>

              <button
                class="favorite-button ${isFavorite ? 'active' : ''}"
                type="button"
                data-repository="${repositoryId}"
                aria-label="${
                  isFavorite
                    ? `Remove ${repository.name} from favorites`
                    : `Save ${repository.name} to favorites`
                }"
              >
                ${isFavorite ? '★' : '☆'}
              </button>
            </div>

            <h3>${repository.name}</h3>
            <span class="owner">${repository.owner}</span>
            <p>${repository.description}</p>

            <div
              class="readiness-status"
              role="group"
              aria-label="Contribution readiness"
            >
              <a
                class="readiness-badge guide-available"
                href="${repository.contributingUrl}"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribution guide
              </a>

              ${
                repository.hasBeginnerIssues
                  ? `
                    <a
                      class="readiness-badge issues-available"
                      href="${repository.url}/contribute"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Beginner issue available
                    </a>
                  `
                  : `
                    <span class="readiness-badge issues-unavailable">
                      No beginner issue yet
                    </span>
                  `
              }
            </div>

            <time
              class="verified-at"
              datetime="${repository.verifiedAt}"
            >
              Checked ${verificationDate}
            </time>
          </div>

          <div class="card-actions">
  <a
    class="card-primary-link"
    href="${primaryAction.url}"
    target="_blank"
    rel="noopener noreferrer"
  >
    ${primaryAction.label}
  </a>

  <a
    class="card-secondary-link"
    href="${repository.url}"
    target="_blank"
    rel="noopener noreferrer"
  >
    Repository ↗
  </a>
</div>
        </article>
      `
    })
    .join('')
}

repositoryList.addEventListener('click', (event) => {
  const emptyResetButton = event.target.closest(
    '[data-action="reset-empty"]',
  )

  if (emptyResetButton) {
    resetFilters()
    return
  }

  const favoriteButton = event.target.closest('.favorite-button')

  if (!favoriteButton) {
    return
  }

  const repositoryId = favoriteButton.dataset.repository

  if (favoriteRepositories.has(repositoryId)) {
    favoriteRepositories.delete(repositoryId)
  } else {
    favoriteRepositories.add(repositoryId)
  }

  localStorage.setItem(
    'pecahpr-favorites',
    JSON.stringify([...favoriteRepositories]),
  )

  filterRepositories()
})

function updateFilterUrl() {
  const params = new URLSearchParams(window.location.search)
  const searchValue = searchInput.value.trim()

  if (searchValue) {
    params.set('q', searchValue)
  } else {
    params.delete('q')
  }

  if (languageFilter.value !== 'Semua') {
    params.set('language', languageFilter.value)
  } else {
    params.delete('language')
  }

  if (sortOrder.value !== 'default') {
    params.set('sort', sortOrder.value)
  } else {
    params.delete('sort')
  }

  if (showFavoritesOnly) {
    params.set('favorites', 'true')
  } else {
    params.delete('favorites')
  }

  const queryString = params.toString()
  const nextUrl = `${window.location.pathname}${
    queryString ? `?${queryString}` : ''
  }${window.location.hash}`

  window.history.replaceState(null, '', nextUrl)
}

function updateFavoritesFilterButton() {
  const favoriteCount = favoriteRepositories.size

  favoritesFilterButton.classList.toggle(
    'active',
    showFavoritesOnly,
  )
  favoritesFilterButton.textContent = showFavoritesOnly
    ? '★'
    : '☆'

  favoritesFilterButton.setAttribute(
    'aria-label',
    showFavoritesOnly
      ? `Show all repositories, ${favoriteCount} favorites saved`
      : `Show ${favoriteCount} favorite repositories`,
  )
  favoritesFilterButton.setAttribute(
    'title',
    showFavoritesOnly
      ? `Show all (${favoriteCount} favorites)`
      : `Show favorites (${favoriteCount})`,
  )
  favoritesFilterButton.setAttribute(
    'aria-pressed',
    String(showFavoritesOnly),
  )
}

let actionFeedbackTimeout

function showActionFeedback(message, isError = false) {
  window.clearTimeout(actionFeedbackTimeout)

  actionFeedback.textContent = message
  actionFeedback.classList.toggle('error', isError)
  actionFeedback.classList.add('visible')

  actionFeedbackTimeout = window.setTimeout(() => {
    actionFeedback.classList.remove('visible')
    actionFeedback.textContent = ''
  }, 2400)
}

copyFilterLinkButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    showActionFeedback('Tautan hasil filter disalin.')
  } catch {
    showActionFeedback('Tautan belum dapat disalin.', true)
  }
})

randomRepositoryButton.addEventListener('click', () => {
  if (visibleRepositories.length === 0) {
    showActionFeedback(
      'Belum ada repository yang bisa dipilih.',
      true,
    )
    return
  }

  const candidates =
    visibleRepositories.length > 1
      ? visibleRepositories.filter((repository) => {
          const repositoryId =
            `${repository.owner}/${repository.name}`

          return repositoryId !== lastRandomRepositoryId
        })
      : visibleRepositories

  const selectedRepository =
    candidates[Math.floor(Math.random() * candidates.length)]
  const selectedRepositoryId =
    `${selectedRepository.owner}/${selectedRepository.name}`

  lastRandomRepositoryId = selectedRepositoryId

  const selectedCard = [...repositoryList.querySelectorAll('.card')]
    .find(
      (card) =>
        card.dataset.repositoryCard === selectedRepositoryId,
    )

  if (!selectedCard) {
    return
  }

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  window.clearTimeout(recommendationHighlightTimeout)
  repositoryList
    .querySelector('.card.recommended')
    ?.classList.remove('recommended')

  selectedCard.classList.add('recommended')
  selectedCard.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'center',
  })

  showActionFeedback(
    `Rekomendasi untukmu: ${selectedRepository.name}`,
  )

  recommendationHighlightTimeout = window.setTimeout(() => {
    selectedCard.classList.remove('recommended')
  }, 2200)
})

function filterRepositories() {
  const selectedLanguage = languageFilter.value
  const searchText = searchInput.value.trim().toLowerCase()

  let filteredRepositories = repositories.filter((repository) => {
    const matchesLanguage =
      selectedLanguage === 'Semua' ||
      repository.language === selectedLanguage

    const matchesSearch =
      repository.name.toLowerCase().includes(searchText) ||
      repository.owner.toLowerCase().includes(searchText) ||
      repository.description.toLowerCase().includes(searchText)

    const repositoryId =
      `${repository.owner}/${repository.name}`

    const matchesFavorite =
      !showFavoritesOnly ||
      favoriteRepositories.has(repositoryId)

    return (
      matchesLanguage &&
      matchesSearch &&
      matchesFavorite
    )
  })

  if (sortOrder.value === 'az') {
    filteredRepositories.sort((firstRepository, secondRepository) =>
      firstRepository.name.localeCompare(secondRepository.name),
    )
  }

  if (sortOrder.value === 'za') {
    filteredRepositories.sort((firstRepository, secondRepository) =>
      secondRepository.name.localeCompare(firstRepository.name),
    )
  }

  if (sortOrder.value === 'issues') {
    filteredRepositories.sort(
      (firstRepository, secondRepository) =>
        Number(secondRepository.hasBeginnerIssues) -
        Number(firstRepository.hasBeginnerIssues),
    )
  }

  displayRepositories(filteredRepositories)
  updateFilterUrl()
}

languageFilter.addEventListener('change', filterRepositories)
searchInput.addEventListener('input', filterRepositories)
sortOrder.addEventListener('change', filterRepositories)

document.addEventListener('keydown', (event) => {
  const isTyping = event.target.matches(
    'input, textarea, select, [contenteditable="true"]',
  )

  if (
    event.key === '/' &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
    !isTyping
  ) {
    event.preventDefault()
    searchInput.focus()
    searchInput.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
})

favoritesFilterButton.addEventListener('click', () => {
  showFavoritesOnly = !showFavoritesOnly
  updateFavoritesFilterButton()
  filterRepositories()
})

function resetFilters() {
  searchInput.value = ''
  languageFilter.value = 'Semua'
  sortOrder.value = 'default'
  showFavoritesOnly = false

  updateFavoritesFilterButton()
  filterRepositories()
  searchInput.focus()
}

resetFiltersButton.addEventListener('click', resetFilters)

function updateProposalIssueField() {
  const hasBeginnerIssues =
    proposalHasBeginnerIssues.checked

  proposalIssueField.hidden = !hasBeginnerIssues
  proposalIssueUrl.disabled = !hasBeginnerIssues
  proposalIssueUrl.required = hasBeginnerIssues
  proposalHasBeginnerIssues.setAttribute(
    'aria-expanded',
    String(hasBeginnerIssues),
  )

  if (!hasBeginnerIssues) {
    proposalIssueUrl.value = ''
  }
}

proposalHasBeginnerIssues.addEventListener(
  'change',
  updateProposalIssueField,
)
updateProposalIssueField()

function getLocalDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

proposalForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const name = document.querySelector('#proposal-name').value.trim()
  const owner = document.querySelector('#proposal-owner').value.trim()
  const language = document.querySelector('#proposal-language').value
  const description = document
    .querySelector('#proposal-description')
    .value.trim()
  const repositoryUrl = document.querySelector('#proposal-url').value.trim()
  const contributingUrl = document
    .querySelector('#proposal-contributing-url')
    .value.trim()
  const hasBeginnerIssues =
    proposalHasBeginnerIssues.checked
  const issueUrl = proposalIssueUrl.value.trim()
  const verifiedAt = getLocalDate()

  const issueTitle = `Usulan repository: ${owner}/${name}`

  const issueBody = `## Repository

- **Nama:** ${name}
- **Pemilik:** ${owner}
- **Bahasa:** ${language}
- **URL repository:** ${repositoryUrl}
- **URL panduan kontribusi:** ${contributingUrl}
- **Issue pemula tersedia:** ${hasBeginnerIssues ? 'Ya' : 'Belum'}
- **URL issue pemula:** ${issueUrl || 'Belum tersedia'}
- **Tanggal diperiksa:** ${verifiedAt}

## Deskripsi

${description}

## Pemeriksaan

- [ ] Repository bersifat publik
- [ ] Repository masih aktif
- [ ] Panduan kontribusi cukup jelas
- [ ] Status issue pemula sesuai hasil pemeriksaan
- [ ] Repository belum tersedia di PecahPR`

  const githubIssueUrl = new URL(
    'https://github.com/zanmstfa/pecah-pr/issues/new',
  )

  githubIssueUrl.searchParams.set('title', issueTitle)
  githubIssueUrl.searchParams.set('body', issueBody)
  githubIssueUrl.searchParams.set('labels', 'enhancement')

  window.open(githubIssueUrl.toString(), '_blank')
})

function updateThemeToggle(darkModeActive) {
  const targetTheme = darkModeActive ? 'light' : 'dark'
  const iconName = darkModeActive ? 'light-mode' : 'dark-mode'

  themeIcon.src =
    `${import.meta.env.BASE_URL}icons/${iconName}.svg`

  themeToggle.setAttribute(
    'aria-label',
    `Switch to ${targetTheme} mode`,
  )

  themeToggle.title = `Switch to ${targetTheme} mode`
}

const systemThemeQuery = window.matchMedia(
  '(prefers-color-scheme: dark)',
)
const themeColorMeta = document.querySelector(
  'meta[name="theme-color"]',
)
let savedTheme = localStorage.getItem('pecahpr-theme')

function applyTheme(darkModeActive) {
  document.body.classList.toggle('dark-theme', darkModeActive)
  themeColorMeta?.setAttribute(
    'content',
    darkModeActive ? '#0f172a' : '#f7f9fc',
  )
  updateThemeToggle(darkModeActive)
}

applyTheme(
  savedTheme ? savedTheme === 'dark' : systemThemeQuery.matches,
)

systemThemeQuery.addEventListener('change', (event) => {
  if (!savedTheme) {
    applyTheme(event.matches)
  }
})

themeToggle.addEventListener('click', () => {
  const darkModeActive =
    !document.body.classList.contains('dark-theme')

  savedTheme = darkModeActive ? 'dark' : 'light'
  localStorage.setItem('pecahpr-theme', savedTheme)
  applyTheme(darkModeActive)
})

function updateBackToTopButton() {
  const shouldShowButton = window.scrollY > 600

  backToTopButton.classList.toggle('visible', shouldShowButton)
  backToTopButton.setAttribute(
    'aria-hidden',
    String(!shouldShowButton),
  )
  backToTopButton.tabIndex = shouldShowButton ? 0 : -1
}

window.addEventListener('scroll', updateBackToTopButton, {
  passive: true,
})

backToTopButton.addEventListener('click', () => {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? 'auto' : 'smooth',
  })
})

updateBackToTopButton()

const languages = [
  ...new Set(
    repositories.map((repository) => repository.language),
  ),
].sort((firstLanguage, secondLanguage) =>
  firstLanguage.localeCompare(secondLanguage, 'id'),
)

languages.forEach((language) => {
  const option = document.createElement('option')

  option.value = language
  option.textContent = language

  languageFilter.appendChild(option)
})

function applyFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const selectedLanguage = params.get('language')
  const selectedSortOrder = params.get('sort')

  searchInput.value = params.get('q') || ''
  languageFilter.value = languages.includes(selectedLanguage)
    ? selectedLanguage
    : 'Semua'
  sortOrder.value = validSortOrders.has(selectedSortOrder)
    ? selectedSortOrder
    : 'default'
  showFavoritesOnly = params.get('favorites') === 'true'

  updateFavoritesFilterButton()
  filterRepositories()
}

window.addEventListener('popstate', applyFiltersFromUrl)
applyFiltersFromUrl()
