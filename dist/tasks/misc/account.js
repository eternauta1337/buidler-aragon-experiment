"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nomiclabs/buidler/config");
config_1.task("account", "Prints the specified account")
    .addParam('idx', 'The index of the account to print')
    .setAction(async ({ idx }, { web3 }) => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[idx]);
});
