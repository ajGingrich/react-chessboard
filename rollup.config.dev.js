import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import serve from 'rollup-plugin-serve'
import url from 'rollup-plugin-url'

const env = process.env.NODE_ENV

const plugins = [
  babel({
    exclude: ['node_modules/**'],
  }),
  url(),
  resolve({ browser: true }),
  commonjs({
    include: 'node_modules/**',
    exclude: [
      'node_modules/uuid/lib/rng.js', // causing a build error, and we don't seem to need it
      'node_modules/asap/raw.js', // causing a build error, and we don't seem to need it https://github.com/kriskowal/asap/issues/64
    ],
    namedExports: {
      'node_modules/react-dnd/lib/index.js': [
        'DragDropContext',
        'DragLayer',
        'DragSource',
        'DropTarget',
      ],
      'node_modules/react/index.js': [
        'Component',
        'PureComponent',
        'Fragment',
        'Children',
        'createElement',
      ],
    },
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
  serve({
    contentBase: 'dist',
    port: 8020,
  }),
]

export default {
  input: './examples/index.js',
  output: {
    file: './dist/index.js',
    format: 'iife',
    name: 'chessboard',
    sourcemap: 'inline',
  },
  plugins,
}
