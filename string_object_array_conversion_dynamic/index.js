var MyCode = require('./string.js');                                      // import modularized 'MyCode' function

let mod;

MyCode().then(Module => {

    mod = Module;

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

    const id = 1;
    const key = "name";

    console.log(get_value_of_object(string_object, id, key));
})

function send_string(string) {
    const lengthBytes = mod.lengthBytesUTF8(string) + 1;               // get string length in bytes
    const stringOnWasmHeap = mod.getMemory(lengthBytes);               // get memory address in wasm heap
    mod.stringToUTF8(string, stringOnWasmHeap, lengthBytes + 1);       // use 'stringToUTF8' funciton to write string in wasm heap
    return stringOnWasmHeap;
}


function get_value_of_object(obj_arr, id, key) {
    const obj = JSON.stringify(obj_arr);
    const obj_heap = send_string(obj);
    const str_heap = send_string(key);
    const offset = mod._getObjectFromJS(obj_heap, Object.keys(obj_arr[0]).length, obj_arr.length, id, str_heap);             // call c function with memory address
    const len = mod._getLen(offset);                                         // get string length
    return mod.Pointer_stringify(offset, len);                    // use 'Pointer_stringify' function to convert to javascript string
}