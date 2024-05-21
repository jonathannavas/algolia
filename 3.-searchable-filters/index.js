require('dotenv').config()
const algoliaSearch = require('algoliasearch')

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
const ALGOLIA_APP_KEY = process.env.ALGOLIA_APP_KEY

const algoliaClient = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_APP_KEY)

const searchData = async () => {
  const index = algoliaClient.initIndex('dev_PRODUCTS')
  await index.setSettings({
    attributesForFaceting: ['price_range', 'brand', 'type', 'categories'],
  })
}

searchData().catch((err) => console.log(err))
