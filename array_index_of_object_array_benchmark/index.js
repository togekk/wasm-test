var MyCode = require('./string.js'); // import modularized 'MyCode' function

let mod;
// const key_heap = [];
// const obj_heap = [];

MyCode().then(Module => {

    mod = Module;
    const string_object = [];

    document.write('Start Generating<br>Array size: 5000, Object size: 200 keys<br>');
    window.setTimeout(function () {
        for (let a = 0; a < 5000; a++) {
            string_object.push(createRandomObj(200));
        }
        document.write('Done generating<br>');
    }, 1);


    // console.log('Done generating');

    window.setTimeout(function () {
        document.write('Sending object to wasm...<br>');
        const start = new Date();
        sendObject(string_object);
        const end = new Date() - start;
        document.write(end + ' ms<br>');
    }, 1);

    const value = "sss";
    // const a = arrayIndexOfWASM(string_object, value);
    // console.log(a);

    window.setTimeout(function () {
        document.write('Starting JavaScript for loops<br>');
        const start = new Date();
        document.write('Total loops: ' + arrayIndexOfJS(string_object, value) + '<br>');
        const end = new Date() - start;
        document.write(end + ' ms<br>');
        document.write('Starting WASM do while loops<br>');
    }, 1);
    window.setTimeout(function () {
        let start2 = new Date();
        document.write('Total loops: ' + arrayIndexOfWASM(string_object, value) + '<br>');
        let end2 = new Date() - start2;
        document.write(end2 + ' ms<br>');
        document.close();
    }, 1);
})

function arrayIndexOfJS(obj_arr, value) {
    let id = -1;
    let count = 0;
    obj_arr.forEach((obj_each, index) => {
        Object.values(obj_each).forEach(value_each => {
            // console.log(value_each, value);
            if (value_each === value) {
                id = index;
            }
            // count++;
        })
    })
    // return count;
}

function sendObject(obj_arr) {
    // obj_arr.forEach((obj_each, index) => {
    //     Object.keys(obj_each).forEach((key_each) => {
    //         !obj_each[key_each] && (obj_each[key_each] = "");
    //         mod.ccall('getObjectFromJS', null, ['string', 'string', 'number'], [key_each.toString(), obj_each[key_each].toString(), Object.keys(obj_arr[0]).length])
    //     });
    // });
    const obj = JSON.stringify(obj_arr);
    mod._getObjectFromJS(send_string(obj), obj_arr.length, Object.keys(obj_arr[0]).length);
}

function send_string(string) {
    const lengthBytes = mod.lengthBytesUTF8(string) + 1; // get string length in bytes
    const stringOnWasmHeap = mod.getMemory(lengthBytes); // get memory address in wasm heap
    mod.stringToUTF8(string, stringOnWasmHeap, lengthBytes + 1); // use 'stringToUTF8' funciton to write string in wasm heap
    return stringOnWasmHeap;
}

function arrayIndexOfWASM(obj_arr, value) {
    // const obj = JSON.stringify(obj_arr);
    id = mod._arrayIndexOf(send_string(value), obj_arr.length, Object.keys(obj_arr[0]).length);
    return id;
}

function createRandomObj(fieldCount, allowNested) {
    var generatedObj = {};

    for (var i = 0; i < fieldCount; i++) {
        var generatedObjField;

        switch (randomInt(allowNested ? 6 : 5)) {

            case 0:
                generatedObjField = randomInt(1000);
                break;

            case 1:
                generatedObjField = Math.random();
                break;

            case 2:
                generatedObjField = Math.random() < 0.5 ? true : false;
                break;

            case 3:
                generatedObjField = randomString(randomInt(4) + 4);
                break;

            case 4:
                generatedObjField = null;
                break;

            case 5:
                generatedObjField = createRandomObj(fieldCount, allowNested);
                break;
        }
        generatedObj[randomString(8)] = generatedObjField;
    }
    return generatedObj;
}

// helper functions

function randomInt(rightBound) {
    return Math.floor(Math.random() * rightBound);
}

function randomString(size) {
    var alphaChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var generatedString = '';
    for (var i = 0; i < size; i++) {
        generatedString += alphaChars[randomInt(alphaChars.length)];
    }

    return generatedString;
}