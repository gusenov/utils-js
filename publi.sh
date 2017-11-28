#!/bin/bash 
set -x # echo on

git add .
git commit -S -m "0.0.9"
git tag -s v0.0.9 -m 'signed 0.0.9 tag'

git push --force --tags com.github.gusenov.utils-js master:master

#npm login
npm publish
