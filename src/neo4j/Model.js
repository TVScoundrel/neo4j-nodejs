const { RELATIONSHIP } = require('./constants')
const Property = require('./Property')
const RelationshipType = require('./RelationshipType')

module.exports = class Model {
  constructor(neo4j, name, schema) {
    this._neo4j = neo4j

    this._name = name
    this._schema = schema

    this._labels = [name]

    this._properties = new Map()
    this._relationships = new Map()

    // default primary key
    this._primary_key = `${name.toLowerCase()}_id`

    this._unique = []
    this._indexed = []
    this._hidden = []
    this._readonly = []

    this._parseSchema(schema)
  }

  /**
   * Set the labels
   * Pass in the destructured array to make a deep copy
   *
   * @param  {...string} labels
   * @returns {Model}
   */
  setLabels(...labels) {
    this._labels = labels.sort()
    return this
  }

  /**
   * Add a property definition
   *
   * @param {string} key
   * @param {Object} schema
   * @returns {Model}
   */
  addProperty(key, schema) {
    const property = new Property(key, schema)
    this._properties.set(key, property)

    if (property.primary()) {
      this._primary_key = key
    }

    if (property.unique() || property.primary()) {
      this._unique.push(key)
    }

    if (property.indexed()) {
      this._indexed.push(key)
    }

    if (property.hidden()) {
      this._hidden.push(key)
    }

    if (property.readonly()) {
      this._readonly.push(key)
    }

    return this
  }

  addRelationship(key, schema) {
    const {
      type,
      relationship,
      direction,
      target,
      properties,
      eager,
      cascade,
      alias
    } = schema

    this.relationship(
      key,
      type,
      relationship,
      direction,
      target,
      properties,
      eager,
      cascade,
      alias
    )
    return this
  }

  relationship(
    name,
    type,
    relationship,
    direction = DIRECTION_BOTH,
    target,
    schema = {},
    eager = false,
    cascade = false,
    node_alias = 'node'
  ) {
    if (relationship && direction && schema) {
      this._relationships.set(name, new RelationshipType())
    }

    return this._relationships.get(name)
  }

  name() {
    return this._name
  }

  schema() {
    return this._schema
  }

  labels() {
    return this._labels
  }

  properties() {
    return this._properties
  }

  relationships() {
    return this._relationships
  }

  primaryKey() {
    return this._primary_key
  }

  hidden() {
    return this._hidden
  }

  indexes() {
    return this._indexed
  }

  _parseSchema(schema) {
    Object.keys(schema).forEach(key => {
      const value = schema[key]
      switch (key) {
        case 'labels':
          this.setLabels(...value)
          break
        default:
          if (value.type && value.type === RELATIONSHIP) {
            this.addRelationship(key, value)
          } else {
            this.addProperty(key, value)
          }
          break
      }
    })
  }
}
