const { driver } = require('./driver')
const logger = require('../logger/logger')
const Model = require('./Model')

module.exports = class Neo4j {
  /**
   * Constructor
   *
   * @param {Bool} enterprise
   * @returns {Neo4j}
   */
  constructor(enterprise = false) {
    this.driver = driver()
    this.models = new Map()
    this.setEnterprise(enterprise)
    logger.info('Neo4j created...')
  }

  /**
   * Add a new Model
   * @param {String} name
   * @param {Object} schema
   * @returns {Model}
   */
  model(name, schema) {
    const model = new Model()
    this.models.set(name, model)
    return this.models.get(name)
  }

  /**
   * Set Enterprise Mode
   *
   * @param {Bool} enterprise
   */
  setEnterprise(enterprise) {
    this._enterprise = enterprise
  }
}
