const myModule = get_module();
// const t0 = performance.now();
const a = ['David', 'John', 'Simon', 'Gavin', 'Darren'];
const b = ['Simo', 'Gavin', 'aaaaa', 'gggg'];
let ptr_arr = new Array();
for (let i = 0; i < a.length; i++)
    ptr_arr.push(myModule.newString(a[i]));
let ptr_arr_2 = new Array();
for (let i = 0; i < b.length; i++)
    ptr_arr_2.push(myModule.newString(b[i]));
const result = myModule.compare_string(ptr_arr[0], ptr_arr_2[0], ptr_arr.length, ptr_arr_2.length);
console.log(result);


function get_module() {
    const fs = require('fs');
    const loader = require("./assemblyscript/lib/loader");
    const compiled = new WebAssembly.Module(fs.readFileSync(__dirname + "/build/optimized.wasm"));
    const imports = {};
    const myModule = loader.instantiate(compiled, imports);
    myModule.reset_memory();
    return myModule;
}

// function get_string_array(array_ptr) {
//     const buffer_ptr = myModule.I32[array_ptr >>> 2];
//     const byte_length = myModule.I32[array_ptr + 8 >>> 2];
//     const array_start_ptr = 8;
//     const element_byte_size = 4;
//     const array = new Array();

//     for (let i = array_start_ptr; i < array_start_ptr + byte_length; i += element_byte_size) {
//         array.push(myModule.getString(myModule.I32[buffer_ptr + i >> 2]));
//     }
//     return array;
// }