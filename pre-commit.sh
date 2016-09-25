#! /bin/bash

gulp

gulp test

npm prune
npm shrinkwrap --dev
