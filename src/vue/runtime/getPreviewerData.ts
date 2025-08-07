import type { IFiles } from 'codesandbox-import-utils/lib/api/define';
import type { ExampleBlockAsset } from 'dumi-assets-types';
import type { IPreviewerProps } from 'dumi/dist/client/theme-api';

export const defaultTitle = 'vue demo';
export const defaultDesc = 'An auto-generated vue demo by dumi';

const genIndexHtml = (
  title: string,
  description: string,
  entryFile: string,
) => {
  return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="${description}" />
        <title>${title}</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="module" src="${entryFile}"></script>
    </body>
</html>
`;
};

const genViteConfig = (tsx: boolean, sourceDir: string) => {
  return `
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
${tsx ? `import vue2Jsx from '@vitejs/plugin-vue2-jsx';` : ''}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      vue2(),
      ${tsx ? 'vue2Jsx()' : ''}
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./${sourceDir}', import.meta.url))
        }
    }
});`;
};

const genRenderCode = (mainFileName: string) => `
import Vue from 'vue'
import App from './${mainFileName}';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 创建实例前配置全局错误处理
Vue.config.errorHandler = function (err, vm, info) {
  // 在此处理错误（如发送日志、抛给上层）
  console.error('Vue 错误:', err, info);
};

const app = new Vue({
  render: (h) => h(App)
});

app.$mount('#app');
`;

const tsconfig = `
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*"],
  "compilerOptions": {
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`;

// the corresponding preprocessor map
const extDepMap: Record<string, [string, string]> = {
  less: ['less', '^4.2.0'],
  scss: ['sass', '^1.68.0'],
  sass: ['sass', '^1.68.0'],
  styl: ['stylus', '^0.60.0'],
};

function resolve(filename: string) {
  const match = /(.+)\.(\w+)$/i.exec(filename);
  if (!match) return match;
  const [, name, ext] = match;
  return { name, ext };
}

function getDefaultVueEntry(asset: ExampleBlockAsset) {
  if (asset.entry) return asset.entry;
  if (asset.dependencies['index.vue']) return 'index.vue';
  return 'index.tsx';
}

// entryFileName can be index.tsx, index.vue, index.jsx
// The configuration of index.vue is processed as a TypeScript project
export function getVueApp({
  asset,
  title = defaultTitle,
  description = defaultDesc,
}: IPreviewerProps) {
  let entryFileName = getDefaultVueEntry(asset);
  const result = resolve(entryFileName);
  if (!result) return {};
  const { name, ext } = result;
  const isVue = ext === 'vue';
  let isTs = isVue || ext === 'tsx';
  const sourceDir = 'src/';

  const files: IFiles = {
    [`vite.config.${isTs ? 'ts' : 'js'}`]: {
      content: genViteConfig(isTs, sourceDir),
      isBinary: false,
    },
  };

  if (isTs) {
    files['tsconfig.json'] = { content: tsconfig, isBinary: false };
  }

  const deps: Record<string, string> = {};
  const devDeps: Record<string, string> = {
    '@vitejs/plugin-vue2': '^1.1.2',
    vite: '^3.0.2',
    "element-ui": "^2.15.14",
  };

  const mainFileName = name === 'index' ? `App.${ext}` : entryFileName;

  Object.entries(asset.dependencies).forEach(([name, { type, value }]) => {
    if (type === 'NPM') {
      // generate dependencies
      deps[name] = value;
    } else {
      // append other imported local files
      files[
        name === entryFileName
          ? `${sourceDir}${mainFileName}`
          : `${sourceDir}${name}`
      ] = {
        content: value,
        isBinary: false,
      };
    }
    // Add style preprocessor dependency
    const result = resolve(name);
    if (!result) return;
    const dep = extDepMap[result.ext];
    if (!dep) return;
    const [depName, verison] = dep;
    devDeps[depName] = verison;
  });

  deps['vue'] ??= '^2.7.14';
  deps['vue-router'] ??= '^3.5.4';

  const previewerEntryFileName = isTs
    ? `${sourceDir}index.ts`
    : `${sourceDir}index.js`;

  if (isTs) {
    Object.assign(devDeps, {
      '@tsconfig/node18': '~18.2.2',
      '@types/node': '~18.17.17',
      '@vitejs/plugin-vue2-jsx': '^1.0.2',
      '@vue/tsconfig': '~0.4.0',
      typescript: '~5.2.0',
      'vue-tsc': '~1.8.11',
    });
  }

  // append package.json
  files['package.json'] = {
    content: JSON.stringify(
      {
        description,
        main: previewerEntryFileName,
        dependencies: deps,
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview',
        },
        browserslist: ['> 0.2%', 'not dead'],
        // add TypeScript dependency if required, must in devDeps to avoid csb compile error
        devDependencies: devDeps,
      },
      null,
      2,
    ),
    isBinary: false,
  };

  files['index.html'] = {
    content: genIndexHtml(title, description, previewerEntryFileName),
    isBinary: false,
  };
  files[previewerEntryFileName] = {
    content: genRenderCode(mainFileName),
    isBinary: false,
  };
  return files;
}