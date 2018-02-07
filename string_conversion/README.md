# String Conversion
Send strings between JavaScript and Webassembly

### [Live demo](https://togekk.github.io/wasm/)

#### Compile wasm and js file
`emcc string.cpp -O3 -s WASM=1 -s MODULARIZE=1 -s EXPORT_NAME="'MyCode'" -s EXTRA_EXPORTED_RUNTIME_METHODS="['Pointer_stringify', 'lengthBytesUTF8', 'getMemory', 'stringToUTF8']" -s EXPORTED_FUNCTIONS="['_getOffset', '_getLen', '_getString']" -o string.js`
