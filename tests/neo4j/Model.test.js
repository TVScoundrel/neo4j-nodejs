/* eslint-env mocha */
const { expect } = require('chai')

const { srcRequire } = require('../requireFromSource')

const Neo4j = srcRequire('neo4j/index')
const Model = srcRequire('neo4j/Model')

describe('neo4j/Model.js', () => {
  let neo4j
  let model

  before(() => {
    neo4j = new Neo4j()
    model = neo4j.model(name, schema)
  })
})
