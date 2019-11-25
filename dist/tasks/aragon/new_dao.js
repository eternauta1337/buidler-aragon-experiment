"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nomiclabs/buidler/config");
config_1.task('aragon:new_dao', 'Deploys a new Aragon DAO')
    .setAction(async ({}, { web3 }) => {
    const repo = undefined;
    const templateInstance = undefined;
    const newInstanceMethod = 'newInstance';
    const newInstanceArgs = [];
    const deployEvent = 'DeployDao';
    const gasPrice = 2;
    // await newDAO(
    //   repo,
    //   web3,
    //   templateInstance,
    //   newInstanceMethod,
    //   newInstanceArgs,
    //   deployEvent,
    //   gasPrice,
    // )
});
