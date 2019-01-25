module.exports = class Model {
  constructor(neo4j, name, schema) {
    this._neo4j = neo4j
    this._name = name
    this._schema = schema
  }

  name() {
    return this._name
  }

  schema() {
    return this._schema
  }
}
