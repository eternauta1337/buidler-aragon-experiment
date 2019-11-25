"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nomiclabs/buidler/config");
config_1.task("accounts", "Prints the list of accounts", async ({}, { web3 }) => {
    const accounts = await web3.eth.getAccounts();
    for (const account of accounts) {
        console.log(account);
    }
});
