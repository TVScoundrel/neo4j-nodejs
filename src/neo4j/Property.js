module.exports = class Property {
  constructor(name, schema) {
    this._name = name
    this._schema = schema
    if (typeof schema === 'string') {
      this._schema = { type: schema }
    }

    Object.keys(this._schema).forEach(key => {
      this[`_${key}`] = this._schema[key]
    })
  }

  primary() {
    return this._primary || false
  }

  indexed() {
    return this._index || false
  }

  unique() {
    return this._unique || false
  }

  hidden() {
    return this._hidden
  }

  readonly() {
    return this._readonly || false
  }

  type() {
    return this._schema.type
  }
}
