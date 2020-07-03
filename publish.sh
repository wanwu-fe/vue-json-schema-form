rm -rf dist

npm run build:doc

cd dist

git init

git checkout -B gh-pages

git add .

git commit -m "publish"

git remote add origin https://github.com/wanwu-fe/vue-json-schema-form.git

git push origin gh-pages -f

cd ..

rm -rf dist