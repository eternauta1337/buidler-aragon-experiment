import { task } from '@nomiclabs/buidler/config';

import { getDaoAddressPermissionsApps } from '@aragon/cli/src/lib/acl/view.js'

task('aragon:list_permissions', 'List all DAO permissions')
  .addParam('dao', 'Deployed DAO address')
  .setAction(async ({ dao }, { web3 }) => {

    const ipfsConfig = {}

    const apmConfig = {}
    apmConfig['ens-registry'] = '0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1'

    const info = await getDaoAddressPermissionsApps({
      dao,
      web3Provider: web3.provider,
      ipfsConfig,
      apm: apmConfig
    })

    console.log(info)
  })
