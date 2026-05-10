import type Config from '@umijs/bundler-webpack/compiled/webpack-5-chain';
import type { IApi } from 'dumi';
import { getPkgPath } from '@/shared';
import path from 'node:path';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

// Webpack configuration for Vue2 (using vue-loader v15)

export function getConfig(config: Config, api: IApi) {
  const dumiSrc = path.resolve(api.paths.absSrcPath);
  const babelInUmi = config.module.rule('src').use('babel-loader').entries();

  // 🔧 获取本插件的安装路径，从中解析 @vue/babel-preset-jsx
  // Vue 2 JSX 必须使用 @vue/babel-preset-jsx（而非 @vue/babel-plugin-jsx）
  // @vue/babel-plugin-jsx 是 Vue 3 专用的，会生成 createTextVNode 等 Vue 3 API
  const pluginPkgPath = getPkgPath('@willem-wy/dumi-plugin-preset-vue2', api.cwd);
  const vueJsxPresetPath = require.resolve('@vue/babel-preset-jsx', {
    paths: [pluginPkgPath],
  });

  // 🔧 关键修复：强制将所有 Vue3 编译器引用重定向到 Vue2
  config.resolve.alias.set(
    '@vue/compiler-sfc',
    require.resolve('vue-template-compiler')
  );
  config.resolve.alias.set(
    'vue/compiler-sfc',
    require.resolve('vue-template-compiler')
  );

  // 🔧 确保 Vue 2 JSX 运行时依赖从本插件目录解析
  // @vue/babel-preset-jsx 编译后的代码会 import @vue/babel-helper-vue-jsx-merge-props
  // pnpm 严格模式下用户项目可能找不到这个包
  config.resolve.alias.set(
    '@vue/babel-helper-vue-jsx-merge-props',
    require.resolve('@vue/babel-helper-vue-jsx-merge-props', {
      paths: [pluginPkgPath],
    })
  );

  // 🔧 修改 dumi 原生 jsx-ts-tsx 规则，排除 .jsx 文件
  // .jsx 文件由 vue-jsx 规则处理（Vue 2 JSX）
  // .tsx/.ts 文件仍由 dumi 原生 jsx-ts-tsx 规则处理（React TSX）
  // 这样避免了两个规则同时处理 .jsx 文件导致双重编译
  config.module.rule('jsx-ts-tsx').exclude.add(/\.jsx$/).end();

  // Vue JSX support (only .js/.jsx, NOT .ts/.tsx — those are handled by dumi natively)
  // 🔧 关键：不继承 dumi 的 React Babel 配置（babelInUmi.options 包含 @babel/preset-react）
  // React preset 和 Vue JSX preset 同时处理 JSX 会导致 AST 冲突
  // 必须使用独立的 Babel 配置，只包含 Vue JSX preset
  config.module
    .rule('vue-jsx')
    .test(/\.(jsx?)$/)
    .exclude.add(dumiSrc)
    .end()
    .use('babel-loader')
    .loader(babelInUmi.loader)
    .options({
      presets: [vueJsxPresetPath],
      plugins: [],
    });

  config.module.noParse(/^(vue|vue-router|vuex|vuex-router-sync)$/);

  // https://github.com/webpack/webpack/issues/11467#issuecomment-691873586
  config.module
    .rule('esm')
    .type('javascript/auto')
    .test(/\.m?jsx?$/)
    .resolve.set('fullySpecified', false);

  // Vue2 SFC support (using vue-loader v15)
  config.resolve.extensions.merge(['.vue']).end();
  config.module
    .rule('vue')
    .test(/\.vue$/)
    .exclude.add(dumiSrc)
    .end()
    .use('vue-loader')
    .loader(require.resolve('vue-loader'))
    .options({
      compiler: require('vue-template-compiler'),
      compilerOptions: {
        whitespace: 'condense',
      },
    });

  // VueLoaderPlugin is required for vue-loader v15
  config.plugin('vue-loader-plugin').use(VueLoaderPlugin, [{}]);

  // https://github.com/vuejs/vue-loader/issues/1435#issuecomment-869074949
  config.module
    .rule('vue-style')
    .test(/\.vue$/)
    .exclude.add(dumiSrc)
    .end()
    .resourceQuery(/type=style/)
    .sideEffects(true);

  // 兼容 element-ui plus
  config.module
    .rule('fix-element-ui-plus')
    .test(/\.mjs$/)
    .include.add(/node_modules/)
    .end()
    .type('javascript/auto')
    .resolve.fullySpecified(false);

  // asset
  config.module.rules.delete('asset');

  const { userConfig } = api;

  const inlineLimit = parseInt(userConfig.inlineLimit || '10000', 10);

  config.module
    .rule('avif')
    .test(/\.avif$/)
    .type('asset')
    .mimetype('image/avif')
    .parser({
      dataUrlCondition: {
        maxSize: inlineLimit,
      },
    });
  config.module
    .rule('image')
    .test(/\.(bmp|gif|jpg|jpeg|png)$/)
    .type('asset')
    .parser({
      dataUrlCondition: {
        maxSize: inlineLimit,
      },
    });

  // TODO: svgo still has problems, temporarily use url-loader and file-loader
  config.module.rules.delete('svg');
  config.module
    .rule('svg')
    .test(/\.svg$/)
    .use('url-loader')
    .loader(require.resolve('@umijs/bundler-webpack/compiled/url-loader'))
    .options({
      limit: userConfig.inlineLimit,
      fallback: require.resolve('@umijs/bundler-webpack/compiled/file-loader'),
    })
    .end();
}
