import { assert } from 'chai';
import { deployContract, getWallets } from 'ethereum-waffle'
// const { assertRevert } = require('@aragon/test-helpers/assertThrow')
// const { getEventArgument } = require('@aragon/test-helpers/events')
// const { hash } = require('eth-ens-namehash')
import deployDAO from './helpers/deployDAO'

import { ethers } from '@nomiclabs/buidler';

// import CounterArtifact from '../artifacts/Counter.json'

describe('Counter', () => {
  let app

  let appManager
  let user
  let anyone

  beforeEach('retrieve accounts', async () => {
    const provider = ethers.provider
    const accounts = getWallets(provider)

    appManager = accounts[0]
    user = accounts[1]
    anyone = accounts[2]
  })

  beforeEach('deploy dao and app', async () => {
    const { dao, acl } = await deployDAO(appManager)

    // Deploy the app's base contract.
    // const appBase = await deployContract(appManager, CounterArtifact)

    // Instantiate a proxy for the app, using the base contract as its logic implementation.
    // const instanceReceipt = await dao.newAppInstance(
    //   hash('counter.aragonpm.test'),
    //   appBase.address,
    //   '0x',
    //   false,
    //   { from: appManager }
    // )
    // app = await Counter.at(
    //   getEventArgument(instanceReceipt, 'NewAppProxy', 'proxy')
    // )

    // Set up the app's permissions.
    // await acl.createPermission(
    //   user,
    //   app.address,
    //   await app.DECREMENT_ROLE(),
    //   appManager,
    //   { from: appManager }
    // )

    // await app.initialize()
  })

  it('dummy', () => {
    console.log('testing 123...')
  })

  // it('should allow any address to increment the counter', async () => {
  //   await app.increment({ from: anyone })
  //   assert.equal(await app.value(), 1)
  // })

  // it('should not allow any address to decrement the counter', async () => {
  //   await app.increment({ from: anyone })
  //   await assertRevert(
  //     app.decrement({ from: anyone }),
  //     'APP_AUTH_FAILED'
  //   )
  //   assert.equal(await app.value(), 1)
  // })

  // it('should allow authorized users to decrement the counter', async () => {
  //   await app.increment({ from: user })
  //   await app.decrement({ from: user })
  //   assert.equal(await app.value(), 0)
  // })

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
