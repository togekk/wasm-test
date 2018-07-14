const myModule = get_module();


const a = makeid(5000, 50);
const b = makeid(5000, 50);

let t0 = performance.now();
let ptr_arr = new Array();
for (let i = 0; i < a.length; i++)
    ptr_arr.push(myModule.newString(a[i]));
let ptr_arr_2 = new Array();
for (let i = 0; i < b.length; i++)
    ptr_arr_2.push(myModule.newString(b[i]));
const result = myModule.compare_string(ptr_arr[0], ptr_arr_2[0], ptr_arr.length, ptr_arr_2.length);
let t1 = performance.now();

console.log('wasm: ' + (result ? true : false));
console.log('wasm: ' + (t1 - t0) + ' ms');

t0 = performance.now();
let found = false;
for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
        if (a[i] === b[j]) {
            found = true;
            break;
        }
    }
}
t1 = performance.now();

console.log('js: ' + found);
console.log('js: ' + (t1 - t0) + ' ms');


function get_module() {
    const fs = require('fs');
    const compiled = new WebAssembly.Module(fs.readFileSync(__dirname + "/build/optimized.wasm"));
    const loader = require("./assemblyscript/lib/loader");
    const imports = {};
    const myModule = loader.instantiate(compiled, imports);
    myModule.reset_memory();
    return myModule;
}

function makeid(arr_len, len) {
    let text;
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let arr = new Array();
    for (let i = 0; i < arr_len; i++) {
        text = "";
        for (let j = 0; j < len; j++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        arr.push(text);
    }


    return arr;
}