#!/bin/bash

set -x
set -e

# npx buidler clean
# npx buidler compile --force


# Define some accounts.
printf "\n\n"
npx buidler accounts
ANY=0xffffffffffffffffffffffffffffffffffffffff
ACCOUNT=$(npx buidler account --idx 2)

# Deploy DAO and Counter app.
printf "\n\n"
DAO=$(npx buidler aragon:new_dao)
printf "\n\n"
APP=$(npx buidler aragon:new_app --contract Counter --dao $DAO)

# Call the app's increment function, which can be called by any address.
printf "\n\n"
npx buidler aragon:app_call --app $APP --contract Counter --func increment --caller $ACCOUNT

# Call the app's value function, which should return '1'
printf "\n\n"
npx buidler aragon:app_call --app $APP --contract Counter --func value --caller $ACCOUNT

# Set DECREMENT_ROLE permission on any address.
printf "\n\n"
npx buidler aragon:set_permission --dao $DAO --permission DECREMENT_ROLE --app $APP --contract Counter --account $ANY

# Check if DECREMENT_ROLE permission is set.
printf "\n\n"
npx buidler aragon:has_permission --dao $DAO --permission DECREMENT_ROLE --app $APP --contract Counter --account $ACCOUNT

# Call the app's decrement function, which should revert if called by addresses that weren't granted permissions.
printf "\n\n"
npx buidler aragon:app_call --app $APP --contract Counter --func decrement --caller $ACCOUNT

# Call the app's value function, which should return '0'.
printf "\n\n"
npx buidler aragon:app_call --app $APP --contract Counter --func value --caller $ACCOUNT
