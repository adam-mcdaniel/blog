#!/bin/bash
npm run build
rm -Rf docs
cp public docs -R