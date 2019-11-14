task('aragon:app_call', 'Calls a function on an Aragon app')
  .addParam('app', 'Deployed app address')
  .addParam('contract', 'App contract name')
  .addParam('func', 'Function name to call')
  .addParam('caller', 'Address calling the function')
  .setAction(async ({ app, contract, func, caller }) => {
    // Retrieve the deployed app.
    const Contract = artifacts.require(`${contract}.sol`)
    const appInstance = await Contract.at(app)

    const tx = await appInstance[func]({ from: caller })
    console.log(tx)
  })
