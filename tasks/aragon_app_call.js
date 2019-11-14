task('aragon:app_call', 'Calls a function on an Aragon app')
  .addParam('app', 'Deployed app address')
  .addParam('contract', 'App contract name')
  .addParam('func', 'Function name to call')
  .setAction(async ({ app, contract, func }) => {
    // Retrieve the deployed app.
    const Contract = artifacts.require(`${contract}.sol`)
    const appInstance = await Contract.at(app)

    // Exec tx and try to report receipt.
    try {
      const tx = await appInstance[func]()
      console.log(tx)
    }
    catch(error) {
      console.log(error)
    }
  })
