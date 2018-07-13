(module
 (type $ii (func (param i32) (result i32)))
 (type $v (func))
 (type $iiiii (func (param i32 i32 i32 i32) (result i32)))
 (type $iii (func (param i32 i32) (result i32)))
 (type $iiii (func (param i32 i32 i32) (result i32)))
 (global $~lib/allocator/arena/startOffset (mut i32) (i32.const 0))
 (global $~lib/allocator/arena/offset (mut i32) (i32.const 0))
 (global $HEAP_BASE i32 (i32.const 8))
 (memory $0 0)
 (export "allocate_memory" (func $~lib/allocator/arena/allocate_memory))
 (export "reset_memory" (func $~lib/allocator/arena/reset_memory))
 (export "compare_string" (func $assembly/index/compare_string))
 (export "memory" (memory $0))
 (start $start)
 (func $~lib/allocator/arena/allocate_memory (; 0 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  ;;@ ~lib/allocator/arena.ts:17:2
  (if
   ;;@ ~lib/allocator/arena.ts:17:6
   (get_local $0)
   ;;@ ~lib/allocator/arena.ts:17:12
   (block
    ;;@ ~lib/allocator/arena.ts:18:4
    (if
     ;;@ ~lib/allocator/arena.ts:18:8
     (i32.gt_u
      (get_local $0)
      ;;@ ~lib/allocator/arena.ts:18:15
      (i32.const 1073741824)
     )
     ;;@ ~lib/allocator/arena.ts:18:28
     (unreachable)
    )
    ;;@ ~lib/allocator/arena.ts:22:4
    (if
     ;;@ ~lib/allocator/arena.ts:22:8
     (i32.gt_u
      ;;@ ~lib/allocator/arena.ts:20:4
      (tee_local $0
       ;;@ ~lib/allocator/arena.ts:20:17
       (i32.and
        (i32.add
         ;;@ ~lib/allocator/arena.ts:20:18
         (i32.add
          ;;@ ~lib/allocator/arena.ts:19:4
          (tee_local $1
           ;;@ ~lib/allocator/arena.ts:19:14
           (get_global $~lib/allocator/arena/offset)
          )
          ;;@ ~lib/allocator/arena.ts:20:24
          (get_local $0)
         )
         ;;@ ~lib/allocator/arena.ts:20:31
         (i32.const 7)
        )
        (i32.const -8)
       )
      )
      ;;@ ~lib/allocator/arena.ts:22:17
      (i32.shl
       ;;@ ~lib/allocator/arena.ts:21:4
       (tee_local $2
        ;;@ ~lib/allocator/arena.ts:21:22
        (current_memory)
       )
       ;;@ ~lib/allocator/arena.ts:22:39
       (i32.const 16)
      )
     )
     ;;@ ~lib/allocator/arena.ts:25:6
     (if
      ;;@ ~lib/allocator/arena.ts:25:10
      (i32.lt_s
       (grow_memory
        ;;@ ~lib/allocator/arena.ts:24:24
        (select
         ;;@ ~lib/allocator/arena.ts:24:28
         (get_local $2)
         (tee_local $4
          ;;@ ~lib/allocator/arena.ts:23:6
          (tee_local $3
           ;;@ ~lib/allocator/arena.ts:23:24
           (i32.shr_u
            (i32.and
             ;;@ ~lib/allocator/arena.ts:23:25
             (i32.add
              ;;@ ~lib/allocator/arena.ts:23:26
              (i32.sub
               (get_local $0)
               ;;@ ~lib/allocator/arena.ts:23:35
               (get_local $1)
              )
              ;;@ ~lib/allocator/arena.ts:23:41
              (i32.const 65535)
             )
             (i32.const -65536)
            )
            ;;@ ~lib/allocator/arena.ts:23:64
            (i32.const 16)
           )
          )
         )
         (i32.gt_s
          (get_local $2)
          (get_local $4)
         )
        )
       )
       ;;@ ~lib/allocator/arena.ts:25:37
       (i32.const 0)
      )
      ;;@ ~lib/allocator/arena.ts:25:40
      (if
       ;;@ ~lib/allocator/arena.ts:26:12
       (i32.lt_s
        (grow_memory
         ;;@ ~lib/allocator/arena.ts:26:24
         (get_local $3)
        )
        ;;@ ~lib/allocator/arena.ts:26:39
        (i32.const 0)
       )
       ;;@ ~lib/allocator/arena.ts:26:42
       (unreachable)
      )
     )
    )
    ;;@ ~lib/allocator/arena.ts:31:4
    (set_global $~lib/allocator/arena/offset
     ;;@ ~lib/allocator/arena.ts:31:13
     (get_local $0)
    )
    ;;@ ~lib/allocator/arena.ts:32:11
    (return
     (get_local $1)
    )
   )
  )
  ;;@ ~lib/allocator/arena.ts:34:9
  (i32.const 0)
 )
 (func $~lib/allocator/arena/reset_memory (; 1 ;) (type $v)
  ;;@ ~lib/allocator/arena.ts:44:2
  (set_global $~lib/allocator/arena/offset
   ;;@ ~lib/allocator/arena.ts:44:11
   (get_global $~lib/allocator/arena/startOffset)
  )
 )
 (func $~lib/memory/compare_memory (; 2 ;) (type $iiii) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  ;;@ ~lib/memory.ts:256:2
  (if
   ;;@ ~lib/memory.ts:256:6
   (i32.eq
    (get_local $0)
    ;;@ ~lib/memory.ts:256:12
    (get_local $1)
   )
   ;;@ ~lib/memory.ts:256:23
   (return
    (i32.const 0)
   )
  )
  (loop $continue|0
   (if
    ;;@ ~lib/memory.ts:257:9
    (if (result i32)
     (get_local $2)
     ;;@ ~lib/memory.ts:257:14
     (i32.eq
      (i32.load8_u
       ;;@ ~lib/memory.ts:257:23
       (get_local $0)
      )
      ;;@ ~lib/memory.ts:257:30
      (i32.load8_u
       ;;@ ~lib/memory.ts:257:39
       (get_local $1)
      )
     )
     (get_local $2)
    )
    (block
     ;;@ ~lib/memory.ts:258:4
     (set_local $2
      (i32.sub
       (get_local $2)
       (i32.const 1)
      )
     )
     ;;@ ~lib/memory.ts:259:4
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     ;;@ ~lib/memory.ts:260:4
     (set_local $1
      (i32.add
       (get_local $1)
       (i32.const 1)
      )
     )
     (br $continue|0)
    )
   )
  )
  ;;@ ~lib/memory.ts:262:53
  (if (result i32)
   ;;@ ~lib/memory.ts:262:9
   (get_local $2)
   ;;@ ~lib/memory.ts:262:13
   (i32.sub
    (i32.load8_u
     ;;@ ~lib/memory.ts:262:27
     (get_local $0)
    )
    ;;@ ~lib/memory.ts:262:33
    (i32.load8_u
     ;;@ ~lib/memory.ts:262:47
     (get_local $1)
    )
   )
   ;;@ ~lib/memory.ts:262:53
   (i32.const 0)
  )
 )
 (func $~lib/string/String.__eq (; 3 ;) (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  ;;@ ~lib/string.ts:114:4
  (if
   ;;@ ~lib/string.ts:114:8
   (i32.eq
    (get_local $0)
    ;;@ ~lib/string.ts:114:17
    (get_local $1)
   )
   ;;@ ~lib/string.ts:114:31
   (return
    (i32.const 1)
   )
  )
  ;;@ ~lib/string.ts:115:4
  (if
   ;;@ ~lib/string.ts:115:8
   (if (result i32)
    (tee_local $2
     (i32.eqz
      (get_local $0)
     )
    )
    (get_local $2)
    (i32.eqz
     ;;@ ~lib/string.ts:115:25
     (get_local $1)
    )
   )
   ;;@ ~lib/string.ts:115:48
   (return
    (i32.const 0)
   )
  )
  ;;@ ~lib/string.ts:118:4
  (if
   ;;@ ~lib/string.ts:118:8
   (i32.ne
    ;;@ ~lib/string.ts:117:4
    (tee_local $2
     ;;@ ~lib/string.ts:117:21
     (i32.load
      (get_local $0)
     )
    )
    ;;@ ~lib/string.ts:118:22
    (i32.load
     (get_local $1)
    )
   )
   ;;@ ~lib/string.ts:118:43
   (return
    (i32.const 0)
   )
  )
  ;;@ ~lib/string.ts:124:4
  (i32.eqz
   ;;@ ~lib/string.ts:120:12
   (call $~lib/memory/compare_memory
    ;;@ ~lib/string.ts:121:6
    (i32.add
     (get_local $0)
     ;;@ ~lib/string.ts:121:32
     (i32.const 4)
    )
    ;;@ ~lib/string.ts:122:6
    (i32.add
     (get_local $1)
     ;;@ ~lib/string.ts:122:33
     (i32.const 4)
    )
    ;;@ ~lib/string.ts:123:6
    (i32.shl
     ;;@ ~lib/string.ts:123:7
     (get_local $2)
     ;;@ ~lib/string.ts:123:28
     (i32.const 1)
    )
   )
  )
 )
 (func $assembly/index/compare_string (; 4 ;) (type $iiiii) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  ;;@ assembly/index.ts:11:2
  (block $break|0
   ;;@ assembly/index.ts:11:7
   (set_local $4
    ;;@ assembly/index.ts:11:15
    (get_local $0)
   )
   (loop $repeat|0
    (br_if $break|0
     ;;@ assembly/index.ts:11:24
     (i32.ge_s
      (get_local $4)
      ;;@ assembly/index.ts:11:28
      (i32.add
       (get_local $0)
       ;;@ assembly/index.ts:11:38
       (i32.shl
        (get_local $2)
        ;;@ assembly/index.ts:11:44
        (i32.const 4)
       )
      )
     )
    )
    ;;@ assembly/index.ts:12:4
    (set_local $6
     ;;@ assembly/index.ts:12:16
     (get_local $4)
    )
    ;;@ assembly/index.ts:13:4
    (block $break|1
     ;;@ assembly/index.ts:13:9
     (set_local $5
      ;;@ assembly/index.ts:13:17
      (get_local $1)
     )
     (loop $repeat|1
      (br_if $break|1
       ;;@ assembly/index.ts:13:27
       (i32.ge_s
        (get_local $5)
        ;;@ assembly/index.ts:13:31
        (i32.add
         (get_local $1)
         ;;@ assembly/index.ts:13:42
         (i32.shl
          (get_local $3)
          ;;@ assembly/index.ts:13:49
          (i32.const 4)
         )
        )
       )
      )
      ;;@ assembly/index.ts:15:6
      (if
       ;;@ assembly/index.ts:15:10
       (call $~lib/string/String.__eq
        (get_local $6)
        ;;@ assembly/index.ts:14:19
        (get_local $5)
       )
       ;;@ assembly/index.ts:15:23
       (return
        ;;@ assembly/index.ts:16:15
        (i32.const 1)
       )
       (block
        ;;@ assembly/index.ts:13:53
        (set_local $5
         (i32.add
          (get_local $5)
          ;;@ assembly/index.ts:13:58
          (i32.const 16)
         )
        )
        (br $repeat|1)
       )
      )
     )
    )
    ;;@ assembly/index.ts:11:48
    (set_local $4
     (i32.add
      (get_local $4)
      ;;@ assembly/index.ts:11:53
      (i32.const 16)
     )
    )
    (br $repeat|0)
   )
  )
  ;;@ assembly/index.ts:20:9
  (i32.const 0)
 )
 (func $start (; 5 ;) (type $v)
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
