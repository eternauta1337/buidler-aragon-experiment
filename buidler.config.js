usePlugin('@nomiclabs/buidler-truffle5')

// Fooling around with some Aragon related custom tasks.
require('./tasks/aragon_new_dao')
require('./tasks/aragon_new_app')
require('./tasks/aragon_app_call')

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://localhost:8545'
    }
  },
  solc: {
    version: '0.4.24'
  }
}
