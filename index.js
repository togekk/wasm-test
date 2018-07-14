const _log = document.querySelector('.log');
const myModule = get_module();

const obj1 = {
    "name": "Simon",
    "tel": "01470913824",
    "nat": "Ireland",
    "age": "30"
}

store_obj(obj1);
// show_log(myModule.get_value(3), true);
const t0 = performance.now();
const a = myModule.get_value(0);
const t1 = performance.now();
show_log(a, true);
show_log('wasm', false, t0, t1);

function store_obj(obj) {
    const obj_val = Object.values(obj);
    const check_value = value => {
        if (typeof value === 'string') return myModule.newString(value);
        else if (typeof value === 'number') {
            const ptr = myModule.allocate_memory(1);
            myModule.I32[ptr >>> 2] = value;
            return ptr;
        }
    }

    let ptr_arr = new Array();
    let ptr_arr2 = new Array();
    for (let i = 0; i < obj_val.length; i++) {
        const value_ptr = check_value(obj_val[i]);
        ptr_arr.push(value_ptr);
    }
    for (let i = 0; i < ptr_arr.length; i++) {
        const ptr = myModule.allocate_memory(1);
        myModule.I32[ptr >>> 2] = ptr_arr[i];
        ptr_arr2.push(ptr);
    }
    myModule.store_obj(ptr_arr2[0], ptr_arr.length);
}

function show_log(str, is_string, start, end) {
    const frag = document.createDocumentFragment();
    let text;
    let div;
    div = document.createElement('div');

    if (is_string) str = myModule.getString(str);

    if (!!start && !!end)
        text = document.createTextNode(str + ': ' + (end - start) + ' ms');
    else text = document.createTextNode(str);
    frag.appendChild(div).appendChild(text);
    _log.appendChild(frag);
}

function get_module() {
    const fs = require('fs');
    const compiled = new WebAssembly.Module(fs.readFileSync(__dirname + "/build/optimized.wasm"));
    const loader = require("./assemblyscript/lib/loader");
    const imports = {};
    const myModule = loader.instantiate(compiled, imports);
    myModule.reset_memory();
    return myModule;
}

// function makeid(arr_len, len) {
//     let text;
//     const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let arr = new Array();
//     for (let i = 0; i < arr_len; i++) {
//         text = "";
//         for (let j = 0; j < len; j++)
//             text += possible.charAt(Math.floor(Math.random() * possible.length));
//         arr.push(text);
//     }


//     return arr;
// }