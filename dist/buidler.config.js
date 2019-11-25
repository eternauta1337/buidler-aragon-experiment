"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nomiclabs/buidler/config");
config_1.usePlugin('@nomiclabs/buidler-truffle5');
require("./tasks/misc/account");
require("./tasks/misc/accounts");
require("./tasks/aragon/new_dao");
require("./tasks/aragon/new_app");
require("./tasks/aragon/app_call");
require("./tasks/aragon/set_permission");
require("./tasks/aragon/has_permission");
require("./tasks/aragon/list_permissions");
const config = {
    defaultNetwork: 'localhost',
    networks: {
        localhost: {
            url: 'http://localhost:8545'
        }
    },
    solc: {
        version: '0.5.10',
    },
};
exports.default = config;
