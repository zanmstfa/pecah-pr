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

languageFilter.addEventListener('change', (event) => {
  const selectedLanguage = event.target.value

  const filteredRepositories =
    selectedLanguage === 'Semua'
      ? repositories
      : repositories.filter(
          (repository) => repository.language === selectedLanguage,
        )

  displayRepositories(filteredRepositories)
})

displayRepositories(repositories)