import './style.css'
import repositories from './data/repositories.json'

document.querySelector('#app').innerHTML = `
  <header class="navbar">
    <a class="logo" href="/">PecahPR</a>
    <a class="github-link" href="https://github.com" target="_blank">
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
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Panduan">Panduan</option>
        </select>
      </div>

      <div id="repository-list" class="repository-list"></div>
    </section>
  </main>
`

const repositoryList = document.querySelector('#repository-list')
const languageFilter = document.querySelector('#language-filter')
const searchInput = document.querySelector('#search-input')

function displayRepositories(items) {
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

  const filteredRepositories = repositories.filter((repository) => {
    const matchesLanguage =
      selectedLanguage === 'Semua' ||
      repository.language === selectedLanguage

    const matchesSearch =
      repository.name.toLowerCase().includes(searchText) ||
      repository.owner.toLowerCase().includes(searchText) ||
      repository.description.toLowerCase().includes(searchText)

    return matchesLanguage && matchesSearch
  })

  displayRepositories(filteredRepositories)
}

languageFilter.addEventListener('change', filterRepositories)
searchInput.addEventListener('input', filterRepositories)

displayRepositories(repositories)