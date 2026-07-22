import './style.css'
import repositories from './data/repositories.json'

document.querySelector('#app').innerHTML = `
  <header class="navbar">
    <a class="logo" href="${import.meta.env.BASE_URL}">PecahPR</a>
    <button id="theme-toggle" class="theme-toggle" type="button">
  🌙 Mode gelap
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

    <section id="repository" class="repository">
      <div class="section-heading">
        <div>
          <h2>Repository ramah pemula</h2>
          <p>Pilih teknologi yang ingin kamu kontribusikan.</p>
        </div>

        <input
          id="search-input"
          type="search"
          placeholder="Cari repository..."
          aria-label="Cari repository"
        />

        <select id="language-filter" aria-label="Filter bahasa">
          <option value="Semua">Semua bahasa</option>
        </select>

        <select id="sort-order" aria-label="Urutkan repository">
  <option value="default">Urutan bawaan</option>
  <option value="az">Nama A–Z</option>
  <option value="za">Nama Z–A</option>
</select>

        <button id="reset-filters" class="reset-button" type="button">
  Reset
</button>

      </div>

      <p id="result-count" class="result-count"></p>
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
`

const repositoryList = document.querySelector('#repository-list')
const resultCount = document.querySelector('#result-count')
const languageFilter = document.querySelector('#language-filter')
const searchInput = document.querySelector('#search-input')
const proposalForm = document.querySelector('#proposal-form')
const themeToggle = document.querySelector('#theme-toggle')
const resetFiltersButton = document.querySelector('#reset-filters')
const sortOrder = document.querySelector('#sort-order')

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
    .map(
      (repository) => `
        <article class="card">
          <div>
            <span class="language">${repository.language}</span>
            <h3>${repository.name}</h3>
            <span class="owner">${repository.owner}</span>
            <p>${repository.description}</p>
          </div>

          <a href="${repository.url}" target="_blank" rel="noopener noreferrer">
            Lihat repository →
          </a>
        </article>
      `,
    )
    .join('')
}

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

    return matchesLanguage && matchesSearch
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

resetFiltersButton.addEventListener('click', () => {
  searchInput.value = ''
  languageFilter.value = 'Semua'
  sortOrder.value = 'default'

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

const savedTheme = localStorage.getItem('pecahpr-theme')

if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme')
  themeToggle.textContent = '☀️ Mode terang'
}

themeToggle.addEventListener('click', () => {
  const darkModeActive = document.body.classList.toggle('dark-theme')

  themeToggle.textContent = darkModeActive
    ? '☀️ Mode terang'
    : '🌙 Mode gelap'

  localStorage.setItem(
    'pecahpr-theme',
    darkModeActive ? 'dark' : 'light',
  )
})

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