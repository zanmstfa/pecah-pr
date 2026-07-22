import './style.css'
import repositories from './data/repositories.json'

document.querySelector('#app').innerHTML = `
  <header class="navbar">
    <a class="logo" href="${import.meta.env.BASE_URL}">PecahPR</a>

    <button
      id="theme-toggle"
      class="theme-toggle"
      type="button"
      aria-label="Aktifkan mode gelap"
      title="Aktifkan mode gelap"
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
      Buka GitHub
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

      <a class="button" href="#repository">Cari kontribusi</a>
    </section>

    <section class="getting-started" aria-labelledby="getting-started-title">
  <div class="getting-started-heading">
    <span class="eyebrow">Cara mulai</span>
    <h2 id="getting-started-title">
      Kontribusi pertamamu dalam tiga langkah
    </h2>
  </div>

  <ol class="steps-list">
    <li class="step-card">
      <span class="step-number">01</span>
      <h3>Pilih repository</h3>
      <p>
        Cari proyek yang sesuai dengan teknologi yang ingin kamu pelajari.
      </p>
    </li>

    <li class="step-card">
      <span class="step-number">02</span>
      <h3>Baca panduannya</h3>
      <p>
        Periksa README dan CONTRIBUTING sebelum mulai mengubah kode.
      </p>
    </li>

    <li class="step-card">
      <span class="step-number">03</span>
      <h3>Kirim perubahan</h3>
      <p>
        Kerjakan issue, uji perubahan, lalu kirim melalui pull request.
      </p>
    </li>
  </ol>
</section>

    <section id="repository" class="repository">
  <div class="section-heading">
    <div>
      <h2>Repository ramah pemula</h2>
      <p>Pilih teknologi yang ingin kamu kontribusikan.</p>
    </div>

    <p id="result-count" class="result-count"></p>
  </div>

  <div class="repository-controls">
    <input
      id="search-input"
      type="search"
      placeholder="Cari repository..."
      aria-label="Cari repository"
    />

    <div class="filter-controls">
      <select id="language-filter" aria-label="Filter bahasa">
        <option value="Semua">Semua bahasa</option>
      </select>

      <select id="sort-order" aria-label="Urutkan repository">
        <option value="default">Urutan bawaan</option>
        <option value="az">Nama A–Z</option>
        <option value="za">Nama Z–A</option>
      </select>

      <button
        id="favorites-filter"
        class="favorites-filter-button"
        type="button"
        aria-label="Tampilkan repository favorit"
        aria-pressed="false"
        title="Tampilkan favorit"
      >
        ☆
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
        <span class="label">Bantu komunitas</span>
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
          URL issue ramah pemula
          <input
            id="proposal-issue-url"
            type="url"
            placeholder="https://github.com/pemilik/repository/issues/..."
          />
        </label>

        <button class="button submit-button" type="submit">
          Kirim usulan
        </button>
      </form>
    </section>

  </main>

  <button
    id="back-to-top"
    class="back-to-top"
    type="button"
    aria-label="Kembali ke atas"
    aria-hidden="true"
    title="Kembali ke atas"
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
const themeToggle = document.querySelector('#theme-toggle')
const themeIcon = document.querySelector('#theme-icon')
const backToTopButton = document.querySelector('#back-to-top')
const resetFiltersButton = document.querySelector('#reset-filters')
const sortOrder = document.querySelector('#sort-order')

const favoritesFilterButton = document.querySelector(
  '#favorites-filter',
)

const savedFavorites = JSON.parse(
  localStorage.getItem('pecahpr-favorites') || '[]',
)

const favoriteRepositories = new Set(savedFavorites)
let showFavoritesOnly = false

function displayRepositories(items) {
  resultCount.textContent = `${items.length} repository ditemukan`

  if (items.length === 0) {
    repositoryList.innerHTML = `
      <div class="empty-state">
        <span>🔍</span>
        <h3>Repository tidak ditemukan</h3>
        <p>Coba kata kunci atau bahasa yang berbeda.</p>
      </div>
    `
    return
  }

  repositoryList.innerHTML = items
    .map((repository) => {
      const repositoryId = `${repository.owner}/${repository.name}`
      const isFavorite = favoriteRepositories.has(repositoryId)

      return `
        <article class="card">
          <div>
            <div class="card-header">
              <span class="language">${repository.language}</span>

              <button
                class="favorite-button ${isFavorite ? 'active' : ''}"
                type="button"
                data-repository="${repositoryId}"
                aria-label="${
                  isFavorite
                    ? `Hapus ${repository.name} dari favorit`
                    : `Simpan ${repository.name} sebagai favorit`
                }"
              >
                ${isFavorite ? '★' : '☆'}
              </button>
            </div>

            <h3>${repository.name}</h3>
            <span class="owner">${repository.owner}</span>
            <p>${repository.description}</p>
          </div>

          <div class="card-actions">
  <a
    class="card-primary-link"
    href="${repository.url}/contribute"
    target="_blank"
    rel="noopener noreferrer"
  >
    Lihat peluang
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

function filterRepositories() {
  const selectedLanguage = languageFilter.value
  const searchText = searchInput.value.toLowerCase()

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

  displayRepositories(filteredRepositories)
}

languageFilter.addEventListener('change', filterRepositories)
searchInput.addEventListener('input', filterRepositories)
sortOrder.addEventListener('change', filterRepositories)

favoritesFilterButton.addEventListener('click', () => {
  showFavoritesOnly = !showFavoritesOnly

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
    ? 'Tampilkan semua repository'
    : 'Tampilkan repository favorit',
)

favoritesFilterButton.setAttribute(
  'title',
  showFavoritesOnly
    ? 'Tampilkan semua'
    : 'Tampilkan favorit',
)
  favoritesFilterButton.setAttribute(
    'aria-pressed',
    String(showFavoritesOnly),
  )

  filterRepositories()
})

resetFiltersButton.addEventListener('click', () => {
  searchInput.value = ''
  languageFilter.value = 'Semua'
  sortOrder.value = 'default'
  showFavoritesOnly = false

  favoritesFilterButton.textContent = '☆'
favoritesFilterButton.classList.remove('active')
favoritesFilterButton.setAttribute('aria-pressed', 'false')
favoritesFilterButton.setAttribute(
  'aria-label',
  'Tampilkan repository favorit',
)
favoritesFilterButton.setAttribute(
  'title',
  'Tampilkan favorit',
)

  displayRepositories(repositories)
  searchInput.focus()
})

proposalForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const name = document.querySelector('#proposal-name').value.trim()
  const owner = document.querySelector('#proposal-owner').value.trim()
  const language = document.querySelector('#proposal-language').value
  const description = document
    .querySelector('#proposal-description')
    .value.trim()
  const repositoryUrl = document.querySelector('#proposal-url').value.trim()
  const issueUrl = document.querySelector('#proposal-issue-url').value.trim()

  const issueTitle = `Usulan repository: ${owner}/${name}`

  const issueBody = `## Repository

- **Nama:** ${name}
- **Pemilik:** ${owner}
- **Bahasa:** ${language}
- **URL repository:** ${repositoryUrl}
- **URL issue pemula:** ${issueUrl || 'Tidak dicantumkan'}

## Deskripsi

${description}

## Pemeriksaan

- [ ] Repository bersifat publik
- [ ] Repository masih aktif
- [ ] Dokumentasi repository cukup jelas
- [ ] Repository memiliki issue ramah pemula
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
  const targetTheme = darkModeActive ? 'terang' : 'gelap'
  const iconName = darkModeActive ? 'light-mode' : 'dark-mode'

  themeIcon.src =
    `${import.meta.env.BASE_URL}icons/${iconName}.svg`

  themeToggle.setAttribute(
    'aria-label',
    `Aktifkan mode ${targetTheme}`,
  )

  themeToggle.title = `Aktifkan mode ${targetTheme}`
}

const savedTheme = localStorage.getItem('pecahpr-theme')
const darkModeActive = savedTheme === 'dark'

document.body.classList.toggle('dark-theme', darkModeActive)
updateThemeToggle(darkModeActive)

themeToggle.addEventListener('click', () => {
  const darkModeActive =
    document.body.classList.toggle('dark-theme')

  updateThemeToggle(darkModeActive)

  localStorage.setItem(
    'pecahpr-theme',
    darkModeActive ? 'dark' : 'light',
  )
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

displayRepositories(repositories)
