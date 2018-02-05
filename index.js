var MyCode = require('./string.js');
MyCode().then(Module => {
    // Get string from C++
    const offset = Module._getOffset();
    const len = Module._getLen();
    console.log(Module.Pointer_stringify(offset, len));

    // Send string to C++
    const string = 'String from JavaScript';
    const lengthBytes = Module.lengthBytesUTF8(string) + 1;
    const stringOnWasmHeap = Module.getMemory(lengthBytes);
    Module.stringToUTF8(string, stringOnWasmHeap, lengthBytes + 1);
    Module._getString(stringOnWasmHeap);
})