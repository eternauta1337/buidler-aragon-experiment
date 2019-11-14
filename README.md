# Buidler + Aragon experiment

This experiment is intended to act as an evaluation of how Buidler could work as a front end for the aragonSDK, which is being extracted from the aragonCLI.

## Running the experiment
* Clone
* Npm install
* Start a local ganache-cli at localhost:8545
* ./scripts/experiment.sh
* Look at the obfuscated console output in confusion and awe

## Tasks
- [x] Setup Buidler with a basic Aragon app.
- [x] Run the apps tests with Buidler.
- [x] Develop some blunt, hardcoded tasks that can deploy a DAO and the app. Taking shortcuts is ok. See the next item, this item simply prepares the ground for that one.
- [ ] Import some of the extracted logic from aragonSDK in the aragon/aragon-cli repo and use that to produce some additional tasks.
