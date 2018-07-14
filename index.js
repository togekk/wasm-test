const _log = document.querySelector('.log');
const myModule = get_module();
let t0, t1;

t0 = performance.now();
const obj1 = [
    {
        "name": "Simon",
        "tel": "01470913824",
        "nationality": "Taiwan",
        "age": 30
    },
    {
        "name": "David",
        "tel": "12384908079",
        "nationality": "Germany",
        "age": 15
    },
    {
        "name": "John",
        "tel": "30756098345",
        "nationality": "Ireland",
        "age": 54
    },
]
const name = obj1[2].name;
t1 = performance.now();
show_log('Writing to and reading from JS', false, t0, t1);

t0 = performance.now();
store_obj(obj1);
t1 = performance.now();
show_log('Writing to WASM', false, t0, t1);

t0 = performance.now();
const a = myModule.get_value(2, 0);
const b = myModule.get_value_num(2, 3);
t1 = performance.now();
show_log(a, true);
show_log(b);
show_log('Reading from WASM', false, t0, t1);

function store_obj(obj) {
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
    for (let i = 0; i < obj.length; i++) {
        const obj_val = Object.values(obj[i]);
        ptr_arr[i] = new Array();
        for (let j = 0; j < obj_val.length; j++) {
            const value_ptr = check_value(obj_val[j]);
            ptr_arr[i].push(value_ptr);
        }
    }

    for (let i = 0; i < ptr_arr.length; i++) {
        ptr_arr2[i] = new Array();
        for (let j = 0; j < ptr_arr[i].length; j++) {
            const ptr = myModule.allocate_memory(1);
            myModule.I32[ptr >>> 2] = ptr_arr[i][j];
            ptr_arr2[i].push(ptr);
        }
    }
    myModule.store_obj(ptr_arr2[0][0], ptr_arr2.length, ptr_arr2[0].length);
    // console.log(myModule.getString(abc));
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