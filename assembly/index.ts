// The entry file of your WebAssembly module.
import "allocator/arena";
export { reset_memory };

export function log(): Array<string> {
  const a: Array<string> = ['John', 'Carl', 'Felix', 'Gavin', 'Hayley'];
  return a;
}
