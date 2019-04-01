## Add Read-me and License Files

* Complete guide: https://blog.angularindepth.com/creating-a-library-in-angular-6-87799552e7e5

# build_lib
Build the Angular Library.
# copy-files
Copy both README.md and LICENSE to the dist\ng-example-library folder.
# npm_pack
Package up the dist\ng-example-library folder into a tgz file.

```javascript
"scripts": {
  ...
  "build_lib": "ng build ng-example-library",
  "copy-license": "copy .\\LICENSE .\\dist\\ng-example-library",
  "copy-readme": "copy .\\README.md .\\dist\\ng-example-library",
  "copy-files": "npm run copy-license && npm run copy-readme",
  "npm_pack": "cd dist/ng-example-library && npm pack",
  "package": "npm run build_lib && npm run copy-files && npm run npm_pack",
  ...
},
```

## Build a package

* npm build [PACKAGE_NAME]

## Stay Using your Package Changes

* npm build [PACKAGE_NAME] --watch


## Log in to npm

npm login

npm whoami

npm publish ./dist/ng-example-library/[PACKAGE-LIB].tgz