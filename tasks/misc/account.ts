import { task } from '@nomiclabs/buidler/config';

import { web3 } from '@nomiclabs/buidler';

task("account", "Prints the specified account")
  .addParam('idx', 'The index of the account to print')
  .setAction(async ({ idx }) => {
    const accounts = await web3.eth.getAccounts();

    console.log(accounts[idx])
  })
