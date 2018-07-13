// The entry file of your WebAssembly module.
import "allocator/arena";
export { allocate_memory, reset_memory };

// export function log(): Array<string> {
//   const a: Array<string> = ['John', 'Carl', 'Felix', 'Gavin', 'Hayley'];
//   return a;
// }

export function compare_string(arr_ptr: i32, arr_ptr2: i32, len: i32, len2: i32): i32 {
  for (let i = arr_ptr; i < arr_ptr + len * 16; i += 16) {
    const str = changetype<string>(i);
    for (let j = arr_ptr2; j < arr_ptr2 + len2 * 16; j += 16) {
      const str2 = changetype<string>(j);
      if (str == str2) {
        return 1;
      }
    }
  }
  return 0;


  // const str: string = changetype<string>(ptr);
  // const str2: string = changetype<string>(ptr2);
  // return str == str2;
}