var MyCode = require('./string.js');                                      // import modularized 'MyCode' function

let mod;

MyCode().then(Module => {

    mod = Module;

    // // Get string from C++
    // const offset = Module._sendArrayToJS();                                   // get memory address
    // const len = Module._getLen();                                         // get string length
    // const str = Module.Pointer_stringify(offset, len);                    // use 'Pointer_stringify' function to convert to javascript string
    // const array = str.split(",");
    // console.log('***** Array from WASM to JavaScript *****');
    // console.log(array);

    // Send string to C++
    const string_object = {
        name: "Simon",
        age: "30",
        nationality: "Taiwan",
        date_of_birth: "01/01/1900"
    };

    const string = JSON.stringify(string_object);
    const obj_heap = send_string(string);
    const str_heap = send_string('date_of_birth');
    const offset = mod._getObjectFromJS(obj_heap, Object.keys(string_object).length, str_heap);             // call c function with memory address
    const len = Module._getLen(offset);                                         // get string length
    const result = Module.Pointer_stringify(offset, len);                    // use 'Pointer_stringify' function to convert to javascript string
    console.log(result);
})

function send_string(string) {
    const lengthBytes = mod.lengthBytesUTF8(string) + 1;               // get string length in bytes
    const stringOnWasmHeap = mod.getMemory(lengthBytes);               // get memory address in wasm heap
    mod.stringToUTF8(string, stringOnWasmHeap, lengthBytes + 1);       // use 'stringToUTF8' funciton to write string in wasm heap
    return stringOnWasmHeap;
}