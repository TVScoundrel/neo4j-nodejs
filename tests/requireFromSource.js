/* eslint-disable global-require */
const rewire = require('rewire')

module.exports = {
  // eslint-disable-next-line import/no-dynamic-require
  srcRequire: mod => require(`../src/${mod}`),
  srcRewire: mod => rewire(`../src/${mod}`)
}
