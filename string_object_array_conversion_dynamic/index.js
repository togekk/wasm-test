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


function get_value_from_object(offset) {
    const len = mod._getLen(offset);                                         // get string length
    return mod.Pointer_stringify(offset, len);                    // use 'Pointer_stringify' function to convert to javascript string
}

function arrayToHeap(typedArray) {
    var numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
    var ptr = mod.getMemory(numBytes);
    var heapBytes = new Uint8Array(mod.HEAPU8.buffer, ptr, numBytes);
    heapBytes.set(new Uint8Array(typedArray.buffer));
    return heapBytes;
}

function get_value_of_object(obj_arr, id, key) {
    let count = 0;
    const key_selected = send_string(key);
    const key_heap = [];
    const obj_heap = [];
    obj_arr.forEach((obj_each, index) => {
        // if (index2 === 0) {
        Object.keys(obj_each).forEach((key_each) => {
            key_heap[index] = [];
            obj_heap[index] = [];
            key_heap[index][key_each] = send_string(key_each);
            obj_heap[index][key_each] = send_string(obj_each[key_each]);
            mod._getObjectFromJS(key_heap[index][key_each], obj_heap[index][key_each], obj_arr.length, Object.keys(obj_arr[0]).length);
        });
        // }
    });

    const offset = mod._getValueFromObject(id, send_string(key));
    const result = get_value_from_object(offset);

    obj_arr.forEach((obj_each, index) => {
        Object.keys(obj_each).forEach((key_each) => {
            mod._free(key_heap[index][key_each]);
            mod._free(obj_heap[index][key_each]);
        });
    });

    return result;
}