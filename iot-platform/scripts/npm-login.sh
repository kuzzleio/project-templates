#!/bin/bash

auth_token=$1

if [ -z $auth_token ];
do
  echo "auth_token argument is not present"
  exit 1
done;

npm config set @kuzzleio:registry https://npm.pkg.github.com
npm set //npm.pkg.github.com/:_authToken $NPM_TOKEN
