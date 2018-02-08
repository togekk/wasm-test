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
    const string_object = [
        {
            name: "Simon",
            age: "30",
            nationality: "Taiwan",
            date_of_birth: "01/01/1900"
        },
        {
            name: "John",
            age: "27",
            nationality: "Ireland",
            date_of_birth: "03/03/1900"
        },
        {
            name: "David",
            age: "23",
            nationality: "Germany",
            date_of_birth: "05/05/1900"
        }
    ];

    send_string(string_object);
})

function send_string(obj) {
    const string = JSON.stringify(obj);
    const lengthBytes = mod.lengthBytesUTF8(string) + 1;               // get string length in bytes
    const stringOnWasmHeap = mod.getMemory(lengthBytes);               // get memory address in wasm heap
    mod.stringToUTF8(string, stringOnWasmHeap, lengthBytes + 1);       // use 'stringToUTF8' funciton to write string in wasm heap
    mod._getObjectFromJS(stringOnWasmHeap, Object.keys(obj).length);             // call c function with memory address
}