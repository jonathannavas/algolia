require('dotenv').config()
const algoliaSearch = require('algoliasearch')

const { Client } = require('pg')

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
const ALGOLIA_APP_KEY = process.env.ALGOLIA_APP_KEY

const algoliaClient = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_APP_KEY)
const pgClient = new Client({ database: 'postgres' })

const index = algoliaClient.initIndex('dev_PRODUCTS')
index.setSettings({})

//save one

const saveOne = async () => {
  const employee = {
    // objectID: 1, // se puede asignar el object id al registro de forma manual
    id: 2,
    firstName: 'Meredithe',
    lastName: 'Horburgh',
    email: 'mhorburgh3@dagondesign.com',
    gender: 'Female',
    ipAddress: '104.57.240.221',
    company: 'Zoomcast',
    salaryCurrency: 'JPY',
    salary: 7202.2,
  }
  const result = await index.saveObject(employee, {
    // si se desea que algolia autogenere el object id se debe agregar la prop: autoGenerateObjectIDIfNotExist
    autoGenerateObjectIDIfNotExist: true,
  })
  console.log({ result })
}

// saveOne().catch((err) => console.log(err))

const saveMany = async () => {
  const employees = [
    {
      id: 5,
      firstName: 'Aurore',
      lastName: 'Jeppe',
      email: 'ajeppe4@facebook.com',
      gender: 'Male',
      ipAddress: '189.238.8.174',
      company: 'Aibox',
      salaryCurrency: 'ILS',
      salary: 8815.09,
    },
    {
      id: 6,
      firstName: 'Nathanael',
      lastName: 'Lymer',
      email: 'nlymer5@typepad.com',
      gender: 'Male',
      ipAddress: '224.249.87.199',
      company: 'Meezzy',
      salaryCurrency: 'PHP',
      salary: 1392.31,
    },
    {
      id: 7,
      firstName: 'Zachariah',
      lastName: 'Dauber',
      email: 'zdauber6@telegraph.co.uk',
      gender: 'Male',
      ipAddress: '207.155.226.194',
      company: 'Devpoint',
      salaryCurrency: 'EUR',
      salary: 3634.54,
    },
    {
      id: 8,
      firstName: 'Camille',
      lastName: 'Delf',
      email: 'cdelf7@ucla.edu',
      gender: 'Female',
      ipAddress: '47.36.101.208',
      company: 'Bubblebox',
      salaryCurrency: 'CZK',
      salary: 8847.49,
    },
  ]
  const result = await index.saveObjects(employees, {
    autoGenerateObjectIDIfNotExist: true,
  })
  console.log({ result })
}

// saveMany().catch((err) => console.log(err))

//save many from JSON FILE

// const saveManyJSON = async () => {
//   const employees = require('./employees.json')
//   const result = await index.saveObjects(employees, {
//     autoGenerateObjectIDIfNotExist: true,
//   })
//   console.log({ result })
// }

// saveManyJSON().catch((err) => console.log(err))

// const saveFromDB = async () => {
//   pgClient.connect()

//   const queryResult = await pgClient.query('SELECT * FROM EMPLOYEE_small')
//   const result = await index.saveObjects(queryResult.rows, {
//     autoGenerateObjectIDIfNotExist: true,
//   })
//   console.log({ result })

//   pgClient.end()
// }

// // saveFromDB().catch((err) => console.log(err))

const saveManyJSONProducts = async () => {
  const products = require('./data/products.json')
  const result = await index.saveObjects(products, {
    autoGenerateObjectIDIfNotExist: true,
  })
  console.log({ result })
}

saveManyJSONProducts().catch((err) => console.log(err))
