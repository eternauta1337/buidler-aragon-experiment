#!/bin/bash

set -x
set -e

# npx buidler clean
# npx buidler compile --force

npx buidler accounts

ZERO=0x0000000000000000000000000000000000000000

ACCOUNT=$(npx buidler account --idx 2)

DAO=$(npx buidler aragon:new_dao)

APP=$(npx buidler aragon:new_app --contract Counter --dao $DAO)

npx buidler aragon:set_permission --dao $DAO --permission DECREMENT_ROLE --app $APP --contract Counter --account $ZERO

npx buidler aragon:app_call --app $APP --contract Counter --func decrement --caller $ACCOUNT
