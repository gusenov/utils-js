#!/bin/bash 
set -x # echo on

npm run-script bundle

git add .
git commit -S -m "0.1.4"
git tag -s v0.1.4 -m 'signed 0.1.4 tag'

git push --force --tags com.github.gusenov.utils-js master:master

#npm login
npm publish
