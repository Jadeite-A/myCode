import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';

import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        'vue-router'
      ],
      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: ["./src/"],

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: "./src/auto-import.d.ts",

      // Auto import inside Vue template
      // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
      vueTemplate: false,

      // Custom resolvers, compatible with `unplugin-vue-components`
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [ElementPlusResolver()],

      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      // eslintrc: {
      //   enabled: false, // Default `false`
      //   filepath: "./src/.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
      //   globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      // },
    }),
    Components({
      dirs: ["src/"],
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
      ],
      dts: "./src/components.d.ts",
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/assets/common/css/namespace.scss';`,
      },
    },
  }
})
