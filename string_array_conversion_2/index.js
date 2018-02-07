var MyCode = require('./string.js'); // import modularized 'MyCode' function

let mod;

MyCode().then(Module => {

    mod = Module;

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

    const arr = new Int32Array(string_array.length);

    string_array.forEach((string, index) => {
        arr[index] = string_to_memory(string);
    });

    _arrayToHeap(arr);

})

function string_to_memory(string) {
    const lengthBytes = mod.lengthBytesUTF8(string) + 1 // get every string length in bytes
    const stringOnWasmHeap = mod.getMemory(lengthBytes); // get memory address in wasm heap
    mod.stringToUTF8(string, stringOnWasmHeap, lengthBytes + 1); // use 'stringToUTF8' funciton to write string in wasm heap
    return stringOnWasmHeap;
}

function _arrayToHeap(typedArray) {
    var numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
    var ptr = mod.getMemory(numBytes);
    var heapBytes = new Uint8Array(mod.HEAPU8.buffer, ptr, numBytes);
    heapBytes.set(new Uint8Array(typedArray.buffer));
    mod._getStringArray(ptr, typedArray.length);
    // return heapBytes;
}