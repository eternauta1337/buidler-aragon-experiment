import { getEventArgument } from '@aragon/test-helpers/events'
import { deployContract } from 'ethereum-waffle'

import { ethers } from '@nomiclabs/buidler'

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
  const daoReceipt = await daoFactory.newDAO(appManager.address)
  console.log( JSON.stringify(daoReceipt, null, 2) )
  // const dao = await Kernel.at(getEventArgument(daoReceipt, 'DeployDAO', 'dao'))
  const daoAddress = getEventArgument(daoReceipt, 'DeployDAO', 'dao')
  const dao = Kernel.attach(daoAddress)
  console.log(dao.address)

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
