import "allocator/arena";
export { allocate_memory, reset_memory };

class Person {
  id: string;
  name: string;
  gender: string;
  age: i32;
  company: string;
  email: string;
  phone: string;
  address: string;
}
let arr: Array<Person>;

export function store_obj(arr_ptr: i32, arr_len: i32, len: i32): void {
  for (let i = 0; i < arr_len; i++) {
    arr[i] = new Person();
    for (let j = 0; j < len; j++) {
      const ptr_ptr = arr_ptr + (i * len + j) * 8;
      const ptr = load<i32>(ptr_ptr);
      if (j === 0) arr[i].id = changetype<string>(ptr);
      if (j === 1) arr[i].name = changetype<string>(ptr);
      if (j === 2) arr[i].gender = changetype<string>(ptr);
      if (j === 3) arr[i].age = load<i32>(ptr);
      if (j === 4) arr[i].company = changetype<string>(ptr);
      if (j === 5) arr[i].email = changetype<string>(ptr);
      if (j === 6) arr[i].phone = changetype<string>(ptr);
      if (j === 7) arr[i].address = changetype<string>(ptr);
    }
  }
}

export function get_value(obj_id: i32, key_id: i32): string {
  let value: string;
  if (key_id === 0) value = arr[obj_id].id;
  if (key_id === 1) value = arr[obj_id].name;
  if (key_id === 2) value = arr[obj_id].gender;
  if (key_id === 4) value = arr[obj_id].company;
  if (key_id === 5) value = arr[obj_id].email;
  if (key_id === 6) value = arr[obj_id].phone;
  if (key_id === 7) value = arr[obj_id].address;

  return value;
}

export function get_value_num(obj_id: i32, key_id: i32): i32 {
  let value: i32;
  if (key_id === 3) value = arr[obj_id].age;
  return value;
}

export function find_value(value: string): i32 {
  for (let i = 0; i < arr.length; i++)
    if (
      arr[i].id.includes(value) ||
      arr[i].name.includes(value) ||
      arr[i].gender.includes(value) ||
      arr[i].company.includes(value) ||
      arr[i].email.includes(value) ||
      arr[i].phone.includes(value) ||
      arr[i].address.includes(value)
    ) return i;
  return -1;
}
