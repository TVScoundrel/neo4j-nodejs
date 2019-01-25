const neo4j = require('neo4j-driver').v1

const logger = require('./logger/logger')
const config = require('./config/config')

const driver = neo4j.driver(
  config.get('neo4j_uri'),
  neo4j.auth.basic(config.get('neo4j_user'), config.get('neo4j_password'))
)

const session = driver.session()

const resultPromise = session.writeTransaction(tx =>
  tx.run(
    'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)',
    { message: 'hello, world' }
  )
)

resultPromise.then(result => {
  session.close()

  const singleRecord = result.records[0]
  const greeting = singleRecord.get(0)

  logger.info(greeting)

  // on application exit:
  driver.close()
})
