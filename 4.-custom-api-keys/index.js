require('dotenv').config()
const algoliaSearch = require('algoliasearch')

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
const ALGOLIA_APP_KEY = process.env.ALGOLIA_CUSTOM_APP_KEY

const algoliaClient = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_APP_KEY)

const searchData = async () => {
  const index = algoliaClient.initIndex('dev_PRODUCTS')
  await index.setSettings({
    customRanking: [
      'desc(price)',
      'desc(free_shipping)',
      'asc(popularity/rating)',
    ],
  })

  const query = 'buy'
  const result = await index.search(query, { hitsPerPage: 5 })
  console.log(query, result.nbHits)

  result.hits.forEach((hit) => {
    // console.log(hit)
  })
}

searchData().catch((err) => console.log(err))
