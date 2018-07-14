import "allocator/arena";
export { allocate_memory, reset_memory };

class Person {
  name: string;
  tel: string;
  nationality: string;
  age: string;
}
let a: Person;

export function store_obj(arr_ptr: i32, len: i32): void {
  a = new Person();
  let name: string;
  for (let i = 0; i < len; i++) {
    const j = arr_ptr + i * 8;
    const ptr = load<i32>(j);
    if (i === 0) a.name = changetype<string>(ptr);
    if (i === 1) a.tel = changetype<string>(ptr);
    if (i === 2) a.nationality = changetype<string>(ptr);
    if (i === 3) a.age = changetype<string>(ptr);
  }
  // return load<i32>(arr_ptr);
}

export function get_value(id: i32): string {
  let value: string;
  if (id === 0) value = a.name;
  if (id === 1) value = a.tel;
  if (id === 2) value = a.nationality;
  if (id === 3) value = a.age;
  return value;
}

