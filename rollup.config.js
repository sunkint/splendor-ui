import { resolve } from 'path';
import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';
import extensions from 'rollup-plugin-extensions';
import { terser } from 'rollup-plugin-terser';
import url from '@rollup/plugin-url';

export default {
  input: resolve(__dirname, './src/main.ts'),
  output: [
    {
      file: resolve(__dirname, './es/main.esm.js'),
      format: 'esm',
      sourcemap: true,
    },
    {
      file: resolve(__dirname, './es/main.esm.min.js'),
      format: 'esm',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  external: ['vue', 'clipboard', 'tributejs', 'date-fns'],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
    }),
    postcss({
      extract: 'main.css',
      sourceMap: true,
    }),
    extensions({
      extensions: ['.ts', '.tsx'],
      resolveIndex: true,
    }),
    url(),
  ],
};
