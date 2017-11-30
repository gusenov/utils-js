#!/bin/bash 
set -x # echo on

git add .
git commit -S -m "0.1.1"
git tag -s v0.1.1 -m 'signed 0.1.1 tag'

git push --force --tags com.github.gusenov.utils-js master:master

#npm login
npm publish
