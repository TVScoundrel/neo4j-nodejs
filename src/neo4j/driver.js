const neo4j = require('neo4j-driver').v1

const config = require('../config/config')

const auth = () => {
  const neo4jUser = config.get('neo4j_user')
  const neo4jPassword = config.get('neo4j_password')
  return neo4jUser && neo4jPassword
    ? neo4j.auth.basic(neo4jUser, neo4jPassword)
    : null
}

const driver = () => {
  const neo4jUri = config.get('neo4j_uri')
  return neo4jUri ? neo4j.driver(neo4jUri, auth()) : null
}

module.exports = {
  auth,
  driver
}
