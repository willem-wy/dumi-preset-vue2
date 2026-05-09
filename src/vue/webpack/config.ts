import type Config from '@umijs/bundler-webpack/compiled/webpack-5-chain';
import type { IApi } from 'dumi';
import { babelPresetTypeScript } from 'dumi/tech-stack-utils';
import path from 'node:path';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

// Webpack configuration for Vue2 (using vue-loader v15)

export function getConfig(config: Config, api: IApi) {
  // The internal path in umi is in POSIX format,
  // and include/exclude of webpack needs to be converted to the corresponding format for different systems.
  const dumiSrc = path.resolve(api.paths.absSrcPath);
  const babelInUmi = config.module.rule('src').use('babel-loader').entries();

  // 🔧 关键修复：强制将所有 Vue3 编译器引用重定向到 Vue2
  config.resolve.alias.set(
    '@vue/compiler-sfc',
    require.resolve('vue-template-compiler')
  );
  config.resolve.alias.set(
    'vue/compiler-sfc',
    require.resolve('vue-template-compiler')
  );

  // react jsx rules will only include the .dumi directory
  config.module.rule('jsx-ts-tsx').include.add(dumiSrc).end();

  // Vue3 tsx support
  config.module
    .rule('vue-jsx-tsx')
    .test(/\.(jsx|ts|tsx)$/)
    .exclude.add(dumiSrc)
    .end()
    .use('babel-loader')
    .loader(babelInUmi.loader)
    .options({
      ...babelInUmi.options,
      presets: [...babelInUmi.options.presets, babelPresetTypeScript()],
      plugins: [require.resolve('../../../compiled/@vue/babel-plugin-jsx')],
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
