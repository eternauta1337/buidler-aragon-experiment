import { task } from '@nomiclabs/buidler/config';

import { getDaoAddressPermissionsApps } from 'gabi-cli/dist/lib/acl/view.js'

task('aragon:list_permissions', 'List all DAO permissions')
  .addParam('dao', 'Deployed DAO address')
  .setAction(async ({ dao }, { web3 }) => {

    const ipfsConfig = {}

    const apmConfig = {}
    apmConfig['ens-registry'] = '0xDEADBEAF'

    // BLOCKED: aragon-cli logic is too tightly coupled with aragon.js
    const info = await getDaoAddressPermissionsApps({
      dao,
      web3Provider: web3.provider,
      ipfsConfig,
      apm: apmConfig
    })

    console.log(info)
  })
