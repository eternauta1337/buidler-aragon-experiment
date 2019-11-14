const { hash } = require('eth-ens-namehash')
const { getEventArgument } = require('@aragon/test-helpers/events')

task('aragon:new_app', 'Deploys and installs a new Aragon app in a DAO')
  .addParam('dao', 'Deployed DAO address')
  .addParam('contract', 'Contract name of the app to deploy')
  .setAction(async ({ dao, contract }) => {
    // Retrieve contract artifacts.
    const Kernel = artifacts.require('@aragon/core/contracts/kernel/Kernel')
    const ACL = artifacts.require('@aragon/core/contracts/acl/ACL')

    // Retrieve deployed DAO and ACL instances.
    const daoInstance = await Kernel.at(dao)
    const aclInstance = await ACL.at(await daoInstance.acl())

    // Deploy app's base implementation.
    const Contract = artifacts.require(`${contract}.sol`)
    const appBase = await Contract.new()

    // Address that will own the app.
    const accounts = await web3.eth.getAccounts()
    const appManager = accounts[0]

    // Instantiate a proxy for the app.
    const instanceReceipt = await daoInstance.newAppInstance(
      hash(`${contract.toLowerCase()}.aragonpm.test`), // appId - Unique identifier for each app installed in the DAO; can be any bytes32 string in the tests.
      appBase.address, // appBase - Location of the app's base implementation.
      '0x', // initializePayload - Used to instantiate and initialize the proxy in the same call (if given a non-empty bytes string).
      false, // setDefault - Whether the app proxy is the default proxy.
      { from: appManager }
    )
    const appInstance = await Contract.at(getEventArgument(instanceReceipt, 'NewAppProxy', 'proxy'))

    const init = await appInstance.initialize()

    console.log(appInstance.address)
  })
