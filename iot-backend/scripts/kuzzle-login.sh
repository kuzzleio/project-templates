#!/bin/bash

licence_key=$1

if [ -z $licence_key ]
then
  echo "licence_key argument is not present"
  echo "Usage: bash kuzzle-login.sh <licence-key>"
  exit 1
fi

npm config set @kuzzleio:registry https://packages.paas.kuzzle.io
npm set //packages.paas.kuzzle.io/:_authToken $licence_key
