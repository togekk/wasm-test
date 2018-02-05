var MyCode = require('./string.js');
MyCode().then(Module => {
    // Get string from C++
    const offset = Module._getOffset();                                   // get memory address
    const len = Module._getLen();                                         // get string length
    console.log(Module.Pointer_stringify(offset, len));                   // use 'Pointer_stringify' function to convert to javascript string

    // Send string to C++
    const string = 'String from JavaScript';
    const lengthBytes = Module.lengthBytesUTF8(string) + 1;               // get string length in bytes
    const stringOnWasmHeap = Module.getMemory(lengthBytes);               // get memory address in wasm heap
    Module.stringToUTF8(string, stringOnWasmHeap, lengthBytes + 1);       // use 'stringToUTF8' funciton to write string in wasm heap
    Module._getString(stringOnWasmHeap);                                  // call c function with memory address
})
