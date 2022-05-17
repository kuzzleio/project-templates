#!/bin/bash

auth_token=$1

if [ -z $auth_token ];
do
  echo "auth_token argument is not present"
  exit 1
done;

npm config set @kuzzleio:registry https://packages.app.kuzzle.io
npm set //packages.app.kuzzle.io/:_authToken $auth_token
