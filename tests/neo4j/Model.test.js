/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai')

const { srcRequire } = require('../requireFromSource')

const { RELATIONSHIP } = srcRequire('neo4j/constants')
const Neo4j = srcRequire('neo4j/index')
const Model = srcRequire('neo4j/Model')
const Property = srcRequire('neo4j/Property')
const RelationshipType = srcRequire('neo4j/RelationshipType')

describe('neo4j/Model.js', () => {
  let neo4j
  let model
  const name = 'ModelTest'
  const schema = {
    labels: ['Test', 'Labels'],
    uuid: { type: 'uuid', primary: true },
    boolean: 'boolean',
    int: 'int',
    integer: 'integer',
    number: { type: 'number', hidden: true, readonly: true },
    string: { type: 'string', index: true, unique: true },
    relationship: {
      type: RELATIONSHIP,
      relationship: 'RELATIONSHIP',
      target: 'ModelTest',
      eager: true,
      alias: 'nodeattheend',
      properties: { updated: 'boolean', default: false }
    }
  }

  before(() => {
    neo4j = new Neo4j()
    model = neo4j.model(name, schema)
  })

  describe('::constructor', () => {
    it('should construct', () => {
      expect(model).to.be.an.instanceOf(Model)
      expect(model.name()).to.eq(name)
      expect(model.labels()).to.deep.eq(schema.labels.sort())
      expect(model.schema()).to.be.eq(schema)
      expect(model.primaryKey()).to.deep.eq('uuid')

      // Check Properties
      const props = ['uuid', 'boolean', 'number', 'string', 'int', 'integer']
      expect(model.properties().size).to.equal(props.length)

      props.forEach(propName => {
        const prop = model.properties().get(propName)

        expect(prop).to.be.an.instanceOf(Property)
        expect(prop.type()).to.eq(propName)
      })

      // properties set
      const uuid = model.properties().get('uuid')
      expect(uuid.primary()).to.be.true

      expect(
        model
          .properties()
          .get('string')
          .indexed()
      ).to.be.true
      expect(
        model
          .properties()
          .get('number')
          .indexed()
      ).to.be.false

      expect(
        model
          .properties()
          .get('string')
          .unique()
      ).to.be.true
      expect(
        model
          .properties()
          .get('number')
          .unique()
      ).to.be.false

      expect(
        model
          .properties()
          .get('number')
          .readonly()
      ).to.be.true
      expect(
        model
          .properties()
          .get('string')
          .readonly()
      ).to.be.false

      expect(
        model
          .properties()
          .get('number')
          .hidden()
      ).to.be.true

      expect(model.hidden()).to.deep.eq(['number'])
      expect(model.indexes()).to.deep.eq(['string'])

      expect(model.relationships().get('relationship')).to.be.an.instanceof(
        RelationshipType
      )
    })

    it('should guess labels and primary key', () => {
      const newModel = neo4j.model(name, {})

      expect(newModel.name()).to.equal(name)
      expect(newModel.labels()).to.deep.equal(['ModelTest'])

      expect(newModel.primaryKey()).to.deep.equal('modeltest_id')
    })
  })
})
