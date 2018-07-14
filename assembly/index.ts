import "allocator/arena";
export { allocate_memory, reset_memory };

class Person {
  name: string;
  tel: string;
  nationality: string;
  age: i32;
}
let arr: Array<Person>;

export function store_obj(arr_ptr: i32, arr_len: i32, len: i32): void {
  for (let i = 0; i < arr_len; i++) {
    arr[i] = new Person();
    for (let j = 0; j < len; j++) {
      const ptr_ptr = arr_ptr + (i * len + j) * 8;
      const ptr = load<i32>(ptr_ptr);
      if (j === 0) arr[i].name = changetype<string>(ptr);
      if (j === 1) arr[i].tel = changetype<string>(ptr);
      if (j === 2) arr[i].nationality = changetype<string>(ptr);
      if (j === 3) arr[i].age = load<i32>(ptr);
    }
  }
}

export function get_value(obj_id: i32, key_id: i32): string {
  let value: string;
  if (key_id === 0) value = arr[obj_id].name;
  if (key_id === 1) value = arr[obj_id].tel;
  if (key_id === 2) value = arr[obj_id].nationality;
  return value;
}

export function get_value_num(obj_id: i32, key_id: i32): i32 {
  let value: i32;
  if (key_id === 3) value = arr[obj_id].age;
  return value;
}

