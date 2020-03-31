#!/bin/sh
git checkout --orphan gh-pages
git rm -r --cached .
git commit --allow-empty -m 'Create gh-pages'
