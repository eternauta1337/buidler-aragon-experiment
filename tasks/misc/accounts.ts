import { task } from '@nomiclabs/buidler/config';

task("accounts", "Prints the list of accounts", async ({}, { web3 }) => {
  const accounts = await web3.eth.getAccounts();

  for (const account of accounts) {
    console.log(account);
  }
});
