var MyCode = require('./string.js');                                      // import modularized 'MyCode' function

MyCode().then(Module => {

    // Get string from C++
    const offset = Module._sendArrayToJS();                                   // get memory address
    const len = Module._getLen();                                         // get string length
    const str = Module.Pointer_stringify(offset, len);                    // use 'Pointer_stringify' function to convert to javascript string
    const array = str.split(",");
    console.log('***** Array from WASM to JavaScript *****');
    console.log(array);

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
    Module._getArrayFromJS(stringOnWasmHeap, string_array.length);             // call c function with memory address

})
