const myModule = get_module();
const string_array = get_string_array(myModule.log());
console.log(string_array);

function get_module() {
    const fs = require('fs');
    const loader = require("assemblyscript/lib/loader");
    const compiled = new WebAssembly.Module(fs.readFileSync(__dirname + "/build/optimized.wasm"));
    const imports = {};
    const myModule = loader.instantiate(compiled, imports);
    myModule.reset_memory();
    return myModule;
}

function get_string_array(array_ptr) {
    const buffer_ptr = myModule.I32[array_ptr >>> 2];
    const byte_length = myModule.I32[array_ptr + 8 >>> 2];
    const array_start_ptr = 8;
    const element_byte_size = 4;
    const array = new Array();

    for (let i = array_start_ptr; i < array_start_ptr + byte_length; i += element_byte_size) {
        array.push(myModule.getString(myModule.I32[buffer_ptr + i >> 2]));
    }
    return array;
}