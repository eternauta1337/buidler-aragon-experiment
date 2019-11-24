import { usePlugin, BuidlerConfig } from '@nomiclabs/buidler/config';

usePlugin('@nomiclabs/buidler-truffle5');

import './tasks/misc/account';
import './tasks/misc/accounts';
import './tasks/aragon/new_dao';
import './tasks/aragon/new_app';
import './tasks/aragon/app_call';
import './tasks/aragon/set_permission';
import './tasks/aragon/has_permission';

const config: BuidlerConfig = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://localhost:8545'
    }
  },
  solc: {
    version: '0.5.10',
  }
};

export default config;
