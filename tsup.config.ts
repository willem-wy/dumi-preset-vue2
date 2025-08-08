import { defineConfig } from 'tsup';

export default defineConfig([
  {
    name: 'renderer',
    entry: {
      renderer: 'src/vue/runtime/renderer.ts',
    },
    format: 'esm',
    outDir: 'lib',
    target: 'esnext',
    platform: 'browser',
    external: ['vue'],
    treeshake: true,
  },
  {
    name: 'preflight',
    entry: {
      preflight: 'src/vue/runtime/preflight.ts',
    },
    format: 'esm',
    outDir: 'lib',
    target: 'esnext',
    platform: 'browser',
    external: ['vue'],
    treeshake: true,
  },
  {
    name: 'previewer',
    entry: ['src/vue/runtime/runtimePlugin.ts'],
    format: 'esm',
    outDir: 'lib',
    target: 'esnext',
    platform: 'browser',
    treeshake: true,
  },
]);
