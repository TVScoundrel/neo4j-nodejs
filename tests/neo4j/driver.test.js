/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-env mocha */
const { expect } = require('chai')

const { srcRequire, srcRewire } = require('../requireFromSource')

const config = srcRequire('config/config')
const mod = srcRewire('neo4j/driver')

const configMock = (mocked = false) => {
  if (mocked) {
    return {
      get: () => null
    }
  }
  return config
}

describe('driver', () => {
  describe('config is set', () => {
    it('auth should not be null', () => {
      mod.__set__('config', configMock())
      expect(mod.auth()).not.to.be.null
    })
    it('driver should not be null', () => {
      mod.__set__('config', configMock())
      expect(mod.driver()).not.to.be.null
    })
  })

  describe('config is not set', () => {
    it('should be null', () => {
      mod.__set__('config', configMock(true))
      expect(mod.auth()).to.be.null
    })
    it('driver should be null', () => {
      mod.__set__('config', configMock(true))
      expect(mod.driver()).to.be.null
    })
  })
})
