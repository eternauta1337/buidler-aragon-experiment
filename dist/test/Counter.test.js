"use strict";
/* global artifacts contract beforeEach it assert */
Object.defineProperty(exports, "__esModule", { value: true });
const buidler_1 = require("@nomiclabs/buidler");
const chai_1 = require("chai");
const { assertRevert } = require('@aragon/test-helpers/assertThrow');
const { getEventArgument } = require('@aragon/test-helpers/events');
const { hash } = require('eth-ens-namehash');
const deployDAO = require('./helpers/deployDAO');
const CounterArtifact = buidler_1.artifacts.require('Counter');
const Counter = buidler_1.artifacts.require('Counter');
describe('Counter', () => {
    let app;
    let appManager;
    let user;
    let anyone;
    beforeEach('retrieve accounts', async () => {
        const accounts = await buidler_1.web3.eth.getAccounts();
        appManager = accounts[0];
        user = accounts[1];
        anyone = accounts[2];
    });
    beforeEach('deploy dao and app', async () => {
        const { dao, acl } = await deployDAO(appManager);
        const appBase = await Counter.new();
        const instanceReceipt = await dao.newAppInstance(hash('counter.aragonpm.test'), appBase.address, '0x', false, { from: appManager });
        app = await Counter.at(getEventArgument(instanceReceipt, 'NewAppProxy', 'proxy'));
        // app.safeFunction
        await acl.createPermission(user, app.address, await app.DECREMENT_ROLE(), appManager, { from: appManager });
        await app.initialize();
    });
    it('should allow any address to increment the counter', async () => {
        await app.increment({ from: anyone });
        chai_1.assert.equal((await app.value()).toNumber(), 1);
    });
    it('should not allow any address to decrement the counter', async () => {
        await app.increment({ from: anyone });
        await assertRevert(app.decrement({ from: anyone }), 'APP_AUTH_FAILED');
        chai_1.assert.equal((await app.value()).toNumber(), 1);
    });
    it('should allow authorized users to decrement the counter', async () => {
        await app.increment({ from: user });
        await app.decrement({ from: user });
        chai_1.assert.equal((await app.value()).toNumber(), 0);
    });
    // it('should show stack traces', async () => {
    //   try {
    //     await app.fail()
    //   }
    //   catch(err) {
    //     console.log(`INTENTIONAL ERROR SHOWING A STACK TRACE:`)
    //     console.log(err)
    //   }
    // })
});
