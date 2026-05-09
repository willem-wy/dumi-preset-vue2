import { BABEL_STANDALONE_CDN, getPkgPath, getPluginPath } from '@/shared';
import type { IApi } from 'dumi';
import { fsExtra } from 'dumi/plugin-utils';
import { join } from 'path';
import { VueJSXTechStack } from './jsx';
import { VueSfcTechStack } from './sfc';

const RENDERER_FILENAME = 'renderer.mjs';

export default function registerTechStack(api: IApi) {
  const vueConfig = api.userConfig?.vue;

  const pkgPath = getPkgPath('@willem-wy/dumi-plugin-preset-vue2', api.cwd);

  const libPath = join(pkgPath, '/dist');

  // 与 Vue 相关的运行时文件写入 .dumi/tmp/{插件名称}目录下，以便引用正确的依赖项
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: RENDERER_FILENAME,
      content: fsExtra.readFileSync(
        vueConfig?.compiler?.rendererPath ? join(api.cwd, vueConfig.compiler.rendererPath) : join(libPath, RENDERER_FILENAME),
        'utf8'),
    });
  });

  const runtimeOpts = {
    // 指定了 挂载/卸载 Vue 组件的 cancelable 函数所在路径
    rendererPath: getPluginPath(api, RENDERER_FILENAME)
  };

  // 将@babel/standalone作为外部依赖，并添加到html head中
  api.addHTMLHeadScripts(() => {
    return [
      {
        // 有外部配置时，使用外部配置的cdn，否者使用默认cdn
        src: vueConfig?.compiler?.babelStandaloneCDN || BABEL_STANDALONE_CDN,
        async: true,
      },
    ];
  });

  api.modifyConfig((memo) => {
    memo.externals = {
      ...memo.externals,
      '@babel/standalone': 'Babel',
    };
    return memo;
  });

  // 注册 Vue JSX 技术栈（只处理 .jsx 文件）
  api.register({
    key: 'registerTechStack',
    stage: 0,
    fn: () => VueJSXTechStack(runtimeOpts),
  });

  // 注册 Vue SFC 技术栈（只处理 .vue 文件）
  // TSX 由 dumi 原生支持，无需额外处理
  api.register({
    key: 'registerTechStack',
    stage: 1,
    fn: () => VueSfcTechStack(runtimeOpts),
  });
}
