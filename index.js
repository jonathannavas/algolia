const algoliaSearch = require('algoliasearch')

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
const ALGOLIA_APP_KEY = process.env.ALGOLIA_APP_KEY

const algoliaClient = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_APP_KEY)

const index = algoliaClient.initIndex('dev_TEST_SDK_JS')
index.setSettings({})
