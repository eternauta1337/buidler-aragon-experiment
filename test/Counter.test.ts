/* global artifacts contract beforeEach it assert */

import { web3, artifacts } from '@nomiclabs/buidler';

import { assert } from 'chai';

const { assertRevert } = require('@aragon/test-helpers/assertThrow')
const { getEventArgument } = require('@aragon/test-helpers/events')
const { hash } = require('eth-ens-namehash')
const deployDAO = require('./helpers/deployDAO')

const CounterArtifact = artifacts.require('Counter')
import { CounterInstance } from '../typechain'

const Counter = artifacts.require('Counter')

describe('Counter', () => {
  let app: CounterInstance

  let appManager: string
  let user: string
  let anyone: string

  beforeEach('retrieve accounts', async () => {
    const accounts = await web3.eth.getAccounts()

    appManager = accounts[0]
    user = accounts[1]
    anyone = accounts[2]
  })

  beforeEach('deploy dao and app', async () => {
    const { dao, acl } = await deployDAO(appManager)

    const appBase = await Counter.new()

    const instanceReceipt = await dao.newAppInstance(
      hash('counter.aragonpm.test'),
      appBase.address,
      '0x',
      false,
      { from: appManager }
    )
    app = await Counter.at(
      getEventArgument(instanceReceipt, 'NewAppProxy', 'proxy')
    )
    // app.safeFunction

    await acl.createPermission(
      user,
      app.address,
      await app.DECREMENT_ROLE(),
      appManager,
      { from: appManager }
    )

    await app.initialize()
  })

  it('should allow any address to increment the counter', async () => {
    await app.increment({ from: anyone })
    assert.equal((await app.value()).toNumber(), 1)
  })

  it('should not allow any address to decrement the counter', async () => {
    await app.increment({ from: anyone })
    await assertRevert(
      app.decrement({ from: anyone }),
      'APP_AUTH_FAILED'
    )
    assert.equal((await app.value()).toNumber(), 1)
  })

  it('should allow authorized users to decrement the counter', async () => {
    await app.increment({ from: user })
    await app.decrement({ from: user })
    assert.equal((await app.value()).toNumber(), 0)
  })

  // it('should show stack traces', async () => {
  //   try {
  //     await app.fail()
  //   }
  //   catch(err) {
  //     console.log(`INTENTIONAL ERROR SHOWING A STACK TRACE:`)
  //     console.log(err)
  //   }
  // })
})
