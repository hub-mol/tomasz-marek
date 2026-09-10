import {getCliClient} from 'sanity/cli'

/**
 * Zamienia zwykły tekst na Portable Text w polach, które dostały formatowanie:
 * odpowiedzi FAQ, opisy kroków procesu i opisy pozycji oferty.
 *
 * Domyślnie tylko pokazuje, co zmieni. Zapis dopiero osobną komendą:
 *   npm run cms:migrate-portable-text:apply
 *
 * `sanity exec` nie przepuszcza własnych flag do skryptu, więc sygnał idzie
 * przez zmienną środowiskową APPLY.
 */

const client = getCliClient({apiVersion: '2026-08-25'})
const apply = process.env.APPLY === '1'

const toBlocks = (text, keyPrefix) => text
  .split(/\n{2,}/)
  .map((part) => part.trim())
  .filter(Boolean)
  .map((paragraph, index) => {
    const key = `${keyPrefix}-${index}`
    return {
      _key: key,
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{_key: `${key}-span`, _type: 'span', marks: [], text: paragraph}],
    }
  })

const home = await client.fetch('*[_id == "homePage"][0]{_id, faq, architectureProcess, interiorsProcess, offers}')

if (!home?._id) {
  console.error('Nie znaleziono dokumentu homePage.')
  process.exit(1)
}

const patch = {}
const opis = []

for (const field of ['faq', 'architectureProcess', 'interiorsProcess']) {
  const items = home[field]
  if (!Array.isArray(items)) continue

  const wymagaZmiany = items.some((item) => typeof item?.body === 'string')
  if (!wymagaZmiany) continue

  patch[field] = items.map((item, index) => typeof item?.body === 'string'
    ? {...item, body: toBlocks(item.body, `${field}-${index}`)}
    : item)

  const ile = items.filter((item) => typeof item?.body === 'string').length
  opis.push(`${field}: ${ile} z ${items.length} pozycji`)
}

if (Array.isArray(home.offers)) {
  const wymagaZmiany = home.offers.some((group) => (group?.sections ?? [])
    .some((section) => typeof section?.text === 'string'))

  if (wymagaZmiany) {
    patch.offers = home.offers.map((group, index) => ({
      ...group,
      sections: (group?.sections ?? []).map((section, sectionIndex) => typeof section?.text === 'string'
        ? {...section, text: toBlocks(section.text, `oferta-${index}-${sectionIndex}`)}
        : section),
    }))

    const ile = home.offers.flatMap((group) => group?.sections ?? [])
      .filter((section) => typeof section?.text === 'string').length
    opis.push(`offers: ${ile} opisów pozycji`)
  }
}

if (Object.keys(patch).length === 0) {
  console.log('Nie ma czego migrować — wszystkie pola są już w Portable Text.')
  process.exit(0)
}

console.log('Do zamiany na Portable Text:')
for (const line of opis) console.log(`  - ${line}`)

if (!apply) {
  console.log('\nTo był podgląd — nic nie zapisano.')
  console.log('Aby zapisać: npm run cms:migrate-portable-text:apply')
  process.exit(0)
}

await client.patch(home._id).set(patch).commit()
console.log('\nZapisano. Opublikuj dokument w Studio, żeby zmiana trafiła na stronę.')
