#!/bin/bash

set -x
set -e

# npx buidler clean
# npx buidler compile --force


# Define some accounts.
npx buidler accounts
ANY=0xffffffffffffffffffffffffffffffffffffffff
ACCOUNT=$(npx buidler account --idx 2)

# Deploy DAO and Counter app.
DAO=$(npx buidler aragon:new_dao)
APP=$(npx buidler aragon:new_app --contract Counter --dao $DAO)

# Call the app's increment function, which can be called by any address.
npx buidler aragon:app_call --app $APP --contract Counter --func increment --caller $ACCOUNT

# Call the app's value function, which should return '1'
npx buidler aragon:app_call --app $APP --contract Counter --func value --caller $ACCOUNT

# Set DECREMENT_ROLE permission on any address.
npx buidler aragon:set_permission --dao $DAO --permission DECREMENT_ROLE --app $APP --contract Counter --account $ANY

# Check if DECREMENT_ROLE permission is set.
npx buidler aragon:has_permission --dao $DAO --permission DECREMENT_ROLE --app $APP --contract Counter --account $ACCOUNT

# Call the app's decrement function, which should revert if called by addresses that weren't granted permissions.
npx buidler aragon:app_call --app $APP --contract Counter --func decrement --caller $ACCOUNT

# Call the app's value function, which should return '0'
npx buidler aragon:app_call --app $APP --contract Counter --func value --caller $ACCOUNT
