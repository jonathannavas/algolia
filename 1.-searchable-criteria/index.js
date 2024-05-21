require('dotenv').config()
const algoliaSearch = require('algoliasearch')

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
const ALGOLIA_APP_KEY = process.env.ALGOLIA_APP_KEY

const algoliaClient = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_APP_KEY)

const searchData = async () => {
  const index = algoliaClient.initIndex('dev_PRODUCTS')
  index.setSettings({
    searchableAttributes: [
      'name',
      'brand',
      'type',
      'categories,hierarchicalCategories', //esto quiere decir que ambos atributos tienen el mismo nivel de importancia
      'unordered(description)', // a la hora de buscar no va a considerar el orden del atributo
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
