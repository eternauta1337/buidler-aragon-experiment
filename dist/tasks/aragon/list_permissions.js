"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nomiclabs/buidler/config");
const view_js_1 = require("@aragon/cli/packages/aragon-cli/src/lib/acl/view.js");
config_1.task('aragon:list_permissions', 'List all DAO permissions')
    .addParam('dao', 'Deployed DAO address')
    .setAction(async ({ dao }, { web3 }) => {
    const ipfsConfig = {};
    const apmConfig = {};
    apmConfig['ens-registry'] = '0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1';
    const info = await view_js_1.getDaoAddressPermissionsApps({
        dao,
        web3Provider: web3.currentProvider,
        ipfsConf: ipfsConfig,
        apm: apmConfig
    });
    console.log('info:', info);
});
