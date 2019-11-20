// import { getEventArgument } from '@aragon/test-helpers/events'
import { deployContract } from 'ethereum-waffle'
import { TransactionReceipt } from 'ethers/providers'

import { ethers } from '@nomiclabs/buidler'

const getEventArgument = (receipt: TransactionReceipt, eventName, argumentName) => {
  let argument = ''

  if (receipt.logs) {

  } else {
    throw new Error('No logs in tx receipt')
  }

  for(let i = 0; i < receipt.logs; i++) {
    const log = receipt.logs[i]
    console.log(log)
  }

  return argument
}

// const getTransactionEvents = (receipt: TransactionReceipt): {[eventName: string]: TransactionEvent} => {
//     const txEvents: {[eventName: string]: TransactionEvent}  = {}

//     // for each log in the transaction receipt
//     for (const log of receipt.logs)
//     {
//         // for each event in the ABI
//         for (const abiEvent of Object.values(this.contract.interface.events))
//         {
//             // if the hash of the ABI event equals the tx receipt log
//             if (abiEvent.topics[0] == log.topics[0])
//             {
//                 // Parse the event from the log topics and data
//                 txEvents[abiEvent.name] = abiEvent.parse(log.topics, log.data)

//                 // stop looping through the ABI events
//                 break
//             }
//         }
//     }

//     return txEvents
// }

const deployDAO = async appManager => {
  // Retrieve contract factories.
  const Kernel = await ethers.getContract('Kernel')
  const ACL = await ethers.getContract('ACL')
  const EVMScriptRegistryFactory = await ethers.getContract('EVMScriptRegistryFactory')
  const DAOFactory = await ethers.getContract('DAOFactory')

  // Deploy a DAOFactory.
  const kernelBase = await Kernel.deploy(true)
  const aclBase = await ACL.deploy()
  const registryFactory = await EVMScriptRegistryFactory.deploy()
  const daoFactory = await DAOFactory.deploy(
    kernelBase.address,
    aclBase.address,
    registryFactory.address
  )

  // Create a DAO instance.
  const daoCreationTx = await daoFactory.newDAO(appManager.address)
  // console.log( JSON.stringify(daoCreationTx, null, 2) )
  const daoCreationReceipt = await ethers.provider.getTransactionReceipt(daoCreationTx.hash)
  // console.log( JSON.stringify(daoCreationReceipt, null, 2) )
  // const dao = await Kernel.at(getEventArgument(daoReceipt, 'DeployDAO', 'dao'))
  const daoAddress = getEventArgument(daoCreationReceipt, 'DeployDAO', 'dao')
  // console.log(daoAddress)
  // const dao = Kernel.attach(daoAddress)
  // console.log(dao.address)

  // Grant the appManager address permission to install apps in the DAO.
  // const acl = await ACL.at(await dao.acl())
  // const APP_MANAGER_ROLE = await kernelBase.APP_MANAGER_ROLE()
  // await acl.createPermission(
  //   appManager,
  //   dao.address,
  //   APP_MANAGER_ROLE,
  //   appManager,
  //   { from: appManager }
  // )

  // return { dao, acl }
  return { dao: {}, acl: {} }
}

export default deployDAO
