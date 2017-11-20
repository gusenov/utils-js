#!/bin/bash 

git add .
git commit -S -m "0.0.2"
git tag -s v0.0.2 -m 'signed 0.0.2 tag'

git push --force --tags com.github.gusenov.utils-js master:master

npm login
npm publish
