import { task } from '@nomiclabs/buidler/config';

task("account", "Prints the specified account")
  .addParam('idx', 'The index of the account to print')
  .setAction(async ({ idx }, { web3 }) => {
    const accounts = await web3.eth.getAccounts();

    console.log(accounts[idx])
  })
