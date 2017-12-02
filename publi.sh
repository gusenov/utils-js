#!/bin/bash 
set -x # echo on

git add .
git commit -S -m "0.1.3"
git tag -s v0.1.3 -m 'signed 0.1.3 tag'

git push --force --tags com.github.gusenov.utils-js master:master

#npm login
npm publish
