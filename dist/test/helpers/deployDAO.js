"use strict";
/* global artifacts */
Object.defineProperty(exports, "__esModule", { value: true });
const buidler_1 = require("@nomiclabs/buidler");
const Kernel = buidler_1.artifacts.require('@aragon/core/contracts/kernel/Kernel');
const ACL = buidler_1.artifacts.require('@aragon/core/contracts/acl/ACL');
const EVMScriptRegistryFactory = buidler_1.artifacts.require('@aragon/core/contracts/factory/EVMScriptRegistryFactory');
const DAOFactory = buidler_1.artifacts.require('@aragon/core/contracts/factory/DAOFactory');
const { getEventArgument } = require('@aragon/test-helpers/events');
const deployDAO = async (appManager) => {
    // Deploy a DAOFactory.
    const kernelBase = await Kernel.new(true);
    const aclBase = await ACL.new();
    const registryFactory = await EVMScriptRegistryFactory.new();
    const daoFactory = await DAOFactory.new(kernelBase.address, aclBase.address, registryFactory.address);
    // Create a DAO instance.
    const daoReceipt = await daoFactory.newDAO(appManager);
    const dao = await Kernel.at(getEventArgument(daoReceipt, 'DeployDAO', 'dao'));
    // Grant the appManager address permission to install apps in the DAO.
    const acl = await ACL.at(await dao.acl());
    const APP_MANAGER_ROLE = await kernelBase.APP_MANAGER_ROLE();
    await acl.createPermission(appManager, dao.address, APP_MANAGER_ROLE, appManager, { from: appManager });
    return { dao, acl };
};
module.exports = deployDAO;
