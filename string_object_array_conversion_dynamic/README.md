# String Array Conversion
Send string arrays between JavaScript and Webassembly

### [Live demo](https://togekk.github.io/wasm/)

#### Install webpack
`npm i --save-dev webpack`

#### Install UglifyjsWebpackPlugin
`npm i -D uglifyjs-webpack-plugin`
`yarn add uglifyjs-webpack-plugin`

#### Compile wasm and js file
`emcc string.cpp -Oz --llvm-opts 3 -s WASM=1 -s MODULARIZE=1 -s EXPORT_NAME="'MyCode'" -s EXTRA_EXPORTED_RUNTIME_METHODS="['lengthBytesUTF8', 'getMemory', 'stringToUTF8', 'Pointer_stringify']" -s EXPORTED_FUNCTIONS="['_getObjectFromJS', '_getValueFromObject', '_getLen', '_free']" -o string.js`

#### Compile webpack bundle
`npx webpack --config ../webpack.config.js`
