(module
 (type $v (func))
 (type $i (func (result i32)))
 (global $~lib/allocator/arena/startOffset (mut i32) (i32.const 0))
 (global $~lib/allocator/arena/offset (mut i32) (i32.const 0))
 (global $HEAP_BASE i32 (i32.const 120))
 (memory $0 1)
 (data (i32.const 8) "\04\00\00\00f\00u\00c\00k")
 (data (i32.const 20) "\05\00\00\00s\00h\00i\00t\00e")
 (data (i32.const 36) "\04\00\00\00c\00u\00n\00t")
 (data (i32.const 48) "\05\00\00\00p\00u\00s\00s\00y")
 (data (i32.const 64) "\05\00\00\00f\00a\00n\00n\00y")
 (data (i32.const 80) "X\00\00\00\05\00\00\00\14\00\00\00\00\00\00\00\08\00\00\00\14\00\00\00$\00\00\000\00\00\00@")
 (export "reset_memory" (func $~lib/allocator/arena/reset_memory))
 (export "log" (func $assembly/index/log))
 (export "memory" (memory $0))
 (start $start)
 (func $~lib/allocator/arena/reset_memory (; 0 ;) (type $v)
  ;;@ ~lib/allocator/arena.ts:43:37
  (set_global $~lib/allocator/arena/offset
   ;;@ ~lib/allocator/arena.ts:44:11
   (get_global $~lib/allocator/arena/startOffset)
  )
 )
 (func $assembly/index/log (; 1 ;) (type $i) (result i32)
  ;;@ assembly/index.ts:7:9
  (i32.const 80)
 )
 (func $start (; 2 ;) (type $v)
  (set_global $~lib/allocator/arena/startOffset
   ;;@ ~lib/allocator/arena.ts:12:25
   (i32.and
    (i32.add
     ;;@ ~lib/allocator/arena.ts:12:26
     (get_global $HEAP_BASE)
     ;;@ ~lib/allocator/arena.ts:12:38
     (i32.const 7)
    )
    (i32.const -8)
   )
  )
  (set_global $~lib/allocator/arena/offset
   ;;@ ~lib/allocator/arena.ts:13:20
   (get_global $~lib/allocator/arena/startOffset)
  )
 )
)
