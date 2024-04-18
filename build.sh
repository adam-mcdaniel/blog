#!/bin/bash
npm run build
rm -Rf docs
cp -R public docs
