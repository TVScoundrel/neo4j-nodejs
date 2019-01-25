/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')
const { Driver } = require('neo4j-driver/lib/v1/driver')

const { srcRequire } = require('../requireFromSource')

const Neo4j = srcRequire('neo4j/index')
const Model = srcRequire('neo4j/Model')

describe('Neo4j', () => {
  const modelName = 'MyModel'
  const schema = {
    name: { type: 'string', primary: true },
    setme: 'string',
    relate: {
      type: 'relationship',
      relationship: 'RELATE',
      direction: 'OUT',
      properties: {
        happy: 'boolean'
      }
    }
  }
  let neo4j = null
  beforeEach(() => {
    neo4j = new Neo4j()
  })

  describe('when initialised', () => {
    it('should instantiate', () => {
      expect(neo4j).to.be.an.instanceOf(Neo4j)
      expect(neo4j.driver).to.be.an.instanceOf(Driver)
      expect(neo4j.models.size).to.equal(0)
    })
  })

  describe('::model', () => {
    it('should register a new model', () => {
      const model = neo4j.model(modelName, schema)
      expect(neo4j.models.size).to.equal(1)
      expect(model).to.be.an.instanceOf(Model)
    })
  })
})
