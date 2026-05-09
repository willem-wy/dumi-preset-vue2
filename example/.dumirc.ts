import { defineConfig } from 'dumi';
import { join } from 'path';

export default defineConfig({
  exportStatic: false,
  outputPath: 'dist',
  publicPath: '/',
  // 引入本插件（使用相对路径指向父级 lib 目录）
  presets: [join(__dirname, '../dist/')],
  // Vue 配置
  vue: {
    compiler: {
      rendererPath: './runtime/renderer.js',
    },
  },
  
  // 路径别名
  alias: {
    '@examples': join(__dirname, 'examples'),
  },
  chainWebpack(config: any) {
    config.resolve.mainFields
      .clear()
      .add('main:dumi')
      .add('main:h5')
      .add('browser')
      .add('module')
      .add('main');
    config.module
      .rule('mjs-rule')
      .test(/.m?js/)
      .resolve.set('fullySpecified', false);
  },
  clickToComponent: {},
  devtool: 'eval',
  define: {
    'process.env.NODE_ENV' : process.env.NODE_ENV,
  },
  themeConfig: {
    title: '插件demo',
    description: '插件demo',
    prefersColor: { default: 'light', switch: false },
    lastUpdated: true,
    rtl: false,
    footer: '满帮大前端　|　满帮UED',
    sidebarGroupModePath: true,
    deviceWidth: 360,
    webpack5: {},
    publicPath: '/',
    actions: [
      { text: '开始使用', link: '/demo/vue', type: 'primary' },
    ],
    features: [
      { title: 'Vue2 兼容', details: '兼容 Vue 2.6 版本，与 Element UI 深度集成' },
      { title: '全文搜索', details: '内置全文搜索功能，支持标题、正文、Demo 多维度检索' },
    ],
    nav: {
      mode: 'override',
      value: [
        {
          title: '组件展示',
          link: '/demo/vue',
        },
      ],
    },
    theme: {
      token: { colorPrimary: '#FD3333' },
    },
  },
});
