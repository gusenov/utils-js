#!/bin/bash 
set -x # echo on

npm run-script bundle

git add .
git commit -S -m "0.1.7"
git tag -s v0.1.7 -m 'signed 0.1.7 tag'

git push --force --tags com.github.gusenov.utils-js master:master

#npm login
npm publish
