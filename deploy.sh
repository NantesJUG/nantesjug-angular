#!/bin/bash

#exit on error
set -e

if [ -n "$1" ]; then
	DIR="$1"
else
	DIR=../nantesjug.github.com
fi

echo "Copy site into $DIR"
(cat $DIR/.git/config | grep "git@github.com:NantesJUG/nantesjug.github.com.git" > /dev/null) || (echo "Error: $DIR does not exist or is not the good repository" && echo "Usage: $O [GITHUB_DIR]"; exit 1)

echo "Reset git repository"
pushd $DIR 1>/dev/null
git reset --hard origin/master

echo "Remove old version"
rm -rf 404.html app.yaml bower_components favicon.ico images index.html robots.txt scripts styles views
popd 1>/dev/null

echo "Copy new version"
cp -r dist/* "$DIR"

echo "Commit new version"
pushd $DIR 1>/dev/null
git add -A
git commit -m 'new version (sources in nantesjug-angular repository)'

echo "Push manually"
git push
popd 1>/dev/null

echo "--"
echo "OK"
echo "--"

