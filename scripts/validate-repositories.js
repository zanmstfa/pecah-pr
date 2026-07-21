import { readFileSync } from 'node:fs'

const dataUrl = new URL(
  '../src/data/repositories.json',
  import.meta.url,
)

let repositories

try {
  const fileContent = readFileSync(dataUrl, 'utf8')
  repositories = JSON.parse(fileContent)
} catch (error) {
  console.error('❌ repositories.json tidak dapat dibaca.')
  console.error(error.message)
  process.exit(1)
}

if (!Array.isArray(repositories)) {
  console.error('❌ Data repository harus berbentuk array.')
  process.exit(1)
}

const errors = []
const repositoryIds = new Set()
const requiredFields = [
  'name',
  'owner',
  'description',
  'language',
  'url',
]

repositories.forEach((repository, index) => {
  const position = index + 1

  requiredFields.forEach((field) => {
    const value = repository[field]

    if (typeof value !== 'string' || value.trim() === '') {
      errors.push(
        `Data ke-${position}: "${field}" wajib berupa teks dan tidak boleh kosong.`,
      )
    }
  })

  if (
    typeof repository.url === 'string' &&
    !repository.url.startsWith('https://github.com/')
  ) {
    errors.push(
      `Data ke-${position}: URL harus diawali https://github.com/.`,
    )
  }

  if (
    typeof repository.owner === 'string' &&
    typeof repository.name === 'string'
  ) {
    const repositoryId =
      `${repository.owner}/${repository.name}`.toLowerCase()

    if (repositoryIds.has(repositoryId)) {
      errors.push(
        `Data ke-${position}: repository ${repositoryId} sudah terdaftar.`,
      )
    }

    repositoryIds.add(repositoryId)
  }
})

if (errors.length > 0) {
  console.error('❌ Validasi data gagal:\n')

  errors.forEach((error) => {
    console.error(`- ${error}`)
  })

  process.exit(1)
}

console.log(
  `✅ ${repositories.length} repository berhasil divalidasi.`,
)