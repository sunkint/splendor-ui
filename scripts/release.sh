#!/usr/bin/env sh

BRANCH=$(git symbolic-ref --short -q HEAD)

if [[ $BRANCH != "master" ]] ; then
  echo "You should run this command in the master branch."
  exit 1
fi

make version
make build
npm publish
