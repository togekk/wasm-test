var MyCode = require('./string.js');                                      // import modularized 'MyCode' function

MyCode().then(Module => {
    // Send string to C++
    const string_array = [
        'Tom',
        'Mary',
        'Stacy',
        'Tiffany',
        'Emily',
        'John',
        'Michael',
    ];
    const string = string_array.toString();
    const lengthBytes = Module.lengthBytesUTF8(string) + 1;               // get string length in bytes
    const stringOnWasmHeap = Module.getMemory(lengthBytes);               // get memory address in wasm heap
    Module.stringToUTF8(string, stringOnWasmHeap, lengthBytes + 1);       // use 'stringToUTF8' funciton to write string in wasm heap
    Module._getString(stringOnWasmHeap, string_array.length);                                  // call c function with memory address

})
