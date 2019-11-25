import { task } from '@nomiclabs/buidler/config';

import _newDAO from './adapters/_newDAO'

task('aragon:new_dao', 'Deploys a new Aragon DAO')
  .setAction(async ({}, { web3 }) => {
    const dao = await _newDAO(web3)
    console.log(dao)
  })
