import { generateStage } from './genStage.mjs'

generateStage({
  stageTag: 'internals',
  rootStartOrder: 111,
  tree: [
    {
      id: 'execution-model',
      title: 'Execution Model & Bytecode',
      summary: 'Compilation, bytecode and the dis module.',
      level: 'advanced',
      children: [
        {
          id: 'compilation-pipeline',
          title: 'Compilation Pipeline',
          children: [
            { id: 'source-to-bytecode', title: 'Source to Bytecode' },
            { id: 'code-objects', title: 'Code Objects' },
            { id: 'pyc-files', title: '.pyc Files' },
          ],
        },
        {
          id: 'bytecode',
          title: 'Bytecode',
          children: [
            { id: 'dis-module', title: 'The dis Module' },
            { id: 'bytecode-instructions', title: 'Bytecode Instructions' },
            { id: 'frames-evaluation', title: 'Frames & Evaluation' },
          ],
        },
        {
          id: 'import-internals-exec',
          title: 'Import Internals',
          children: [
            { id: 'import-machinery-deep', title: 'Import Machinery' },
            { id: 'finders-loaders', title: 'Finders & Loaders' },
          ],
        },
      ],
    },
    {
      id: 'memory-management',
      title: 'Memory Management & GC',
      summary: 'Reference counting and garbage collection.',
      level: 'advanced',
      children: [
        {
          id: 'object-model',
          title: 'The Object Model',
          children: [
            { id: 'everything-is-object', title: 'Everything is an Object' },
            { id: 'pyobject', title: 'PyObject' },
            { id: 'object-headers', title: 'Object Headers' },
          ],
        },
        {
          id: 'reference-counting',
          title: 'Reference Counting',
          children: [
            { id: 'refcount-basics', title: 'Refcount Basics' },
            { id: 'incref-decref', title: 'Incref & Decref' },
            { id: 'reference-cycles', title: 'Reference Cycles' },
          ],
        },
        {
          id: 'garbage-collection',
          title: 'Garbage Collection',
          children: [
            { id: 'gc-module', title: 'The gc Module' },
            { id: 'generational-gc', title: 'Generational GC' },
            { id: 'weak-references', title: 'Weak References' },
          ],
        },
        {
          id: 'memory-internals',
          title: 'Memory Internals',
          children: [
            { id: 'memory-allocators', title: 'Memory Allocators' },
            { id: 'interning', title: 'Interning' },
            { id: 'memory-views', title: 'Memory Views & Buffers' },
          ],
        },
      ],
    },
    {
      id: 'cpython-internals',
      title: 'CPython Internals',
      summary: 'The interpreter, GIL internals and C API.',
      level: 'advanced',
      children: [
        {
          id: 'interpreter-internals',
          title: 'Interpreter Internals',
          children: [
            { id: 'eval-loop', title: 'The Evaluation Loop' },
            { id: 'ceval', title: 'ceval.c' },
            { id: 'opcode-dispatch', title: 'Opcode Dispatch' },
          ],
        },
        {
          id: 'gil-internals',
          title: 'GIL Internals',
          children: [
            { id: 'gil-implementation', title: 'GIL Implementation' },
            { id: 'gil-and-threads', title: 'GIL & Threads' },
          ],
        },
        {
          id: 'c-api',
          title: 'The C API',
          children: [
            { id: 'extending-c-api', title: 'Extending with C' },
            { id: 'embedding-python', title: 'Embedding Python' },
          ],
        },
        {
          id: 'builtin-implementation',
          title: 'Built-in Implementations',
          children: [
            { id: 'dict-implementation', title: 'dict Implementation' },
            { id: 'list-implementation', title: 'list Implementation' },
            { id: 'str-implementation', title: 'str Implementation' },
          ],
        },
      ],
    },
    {
      id: 'python-implementations',
      title: 'Implementations & Future',
      summary: 'PyPy, alternative runtimes and evolution.',
      level: 'advanced',
      children: [
        {
          id: 'cpython-impl',
          title: 'CPython',
          children: [
            { id: 'cpython-deep', title: 'CPython in Depth' },
          ],
        },
        {
          id: 'alternative-runtimes',
          title: 'Alternative Runtimes',
          children: [
            { id: 'pypy-internals', title: 'PyPy' },
            { id: 'jython-graalpy', title: 'Jython & GraalPy' },
            { id: 'micropython-impl', title: 'MicroPython' },
          ],
        },
        {
          id: 'future-of-python',
          title: 'The Future of Python',
          children: [
            { id: 'performance-improvements', title: 'Performance Improvements' },
            { id: 'no-gil-future', title: 'No-GIL Python' },
            { id: 'jit-compilation', title: 'JIT Compilation' },
          ],
        },
        {
          id: 'contributing',
          title: 'Contributing to Python',
          children: [
            { id: 'cpython-development', title: 'CPython Development' },
            { id: 'peps-contributing', title: 'PEPs & Contributing' },
          ],
        },
      ],
    },
  ],
})
