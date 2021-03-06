#!/usr/bin/env sh

BRANCH=$(git symbolic-ref --short -q HEAD)

if [[ $BRANCH != "dev" ]] ; then
  echo "You should run this command in the dev branch."
  exit 1
fi

make version
make build
npm publish --tag beta
