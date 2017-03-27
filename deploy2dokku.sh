#!/bin/bash

yarn; npm run build
rm -rf tmp
rm -rf tmp-deploy
mkdir tmp
(cd tmp; git clone --depth 1 https://github.com/SE7ENSKY/heroku-template-static.git)
mkdir tmp-deploy
cp tmp/heroku-template-static/composer.json tmp-deploy/
cp tmp/heroku-template-static/apache_app.conf tmp-deploy/
cp tmp/heroku-template-static/nginx_app.conf tmp-deploy/
cp tmp/heroku-template-static/Procfile tmp-deploy/
cp -r build tmp-deploy/public
cd tmp-deploy
git init
git add -A
git commit -m 'auto deploy2dokku'
git remote add dokku dokku@app.se7ensky.com:great
git push -f dokku master
cd ..
rm -rf tmp
rm -rf tmp-deploy