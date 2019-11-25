"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nomiclabs/buidler/config");
config_1.task('aragon:app_call', 'Calls a function on an Aragon app')
    .addParam('app', 'Deployed app address')
    .addParam('contract', 'App contract name')
    .addParam('func', 'Function name to call')
    .addParam('caller', 'Address calling the function')
    .setAction(async ({ app, contract, func, caller }, { artifacts }) => {
    // Retrieve the deployed app.
    const Contract = artifacts.require(`${contract}.sol`);
    const appInstance = await Contract.at(app);
    const tx = await appInstance[func]({ from: caller });
    console.log(JSON.stringify(tx, null, 2));
});
