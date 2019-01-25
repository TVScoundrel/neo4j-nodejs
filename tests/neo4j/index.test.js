/* eslint-disable no-unused-expressions */
/* eslint-env mocha */
const { expect } = require('chai')

const { srcRequire } = require('../requireFromSource')

const Neo4j = srcRequire('neo4j/index')
const Model = srcRequire('neo4j/Model')

describe('Neo4j', () => {
  let neo4j = null
  beforeEach(() => {
    neo4j = new Neo4j()
  })

  describe('when initialised', () => {
    it('should have a valid driver', () => {
      expect(neo4j.driver).not.to.be.null
    })
    it('should have an empty models Map', () => {
      expect(neo4j.models.size).to.equal(0)
    })
  })

  describe('#addModel', () => {
    const model = {}
    it('should add a model', () => {
      neo4j.model('model', model)
      expect(neo4j.models.size).to.equal(1)
    })

    it('should return an instance of Model', () => {
      const mod = neo4j.model('model', model)
      expect(mod).to.be.an.instanceOf(Model)
    })
  })
})
