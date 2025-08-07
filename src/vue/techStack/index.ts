import { BABEL_STANDALONE_CDN, getPkgPath, getPluginPath } from '@/shared';
import type { IApi } from 'dumi';
import { fsExtra } from 'dumi/plugin-utils';
import { join } from 'path';
import { VueJSXTechStack } from './jsx';
import { VueSfcTechStack } from './sfc';

const RENDERER_FILENAME = 'renderer.mjs';

export default function registerTechStack(api: IApi) {
  // 获取vue配置
  const vueConfig = api.userConfig?.vue;

  const pkgPath = getPkgPath('@39nyx/dumi-plugin-preset-vue2', api.cwd);

  const libPath = join(pkgPath, '/lib');

  // vue-related runtime files must be placed under .dumi
  // so that the correct dependencies can be referenced.
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: RENDERER_FILENAME,
      content: fsExtra.readFileSync(join(libPath, RENDERER_FILENAME), 'utf8'),
    });
  });

  const runtimeOpts = {
    // 指定了 挂载/卸载 Vue 组件的 cancelable 函数所在路径
    rendererPath: getPluginPath(api, RENDERER_FILENAME)
  };
  console.log('runtimeOpts.rendererPath', runtimeOpts.rendererPath)

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

  api.register({
    key: 'registerTechStack',
    stage: 0,
    fn: () => VueJSXTechStack(runtimeOpts),
  });

  api.register({
    key: 'registerTechStack',
    stage: 1,
    fn: () => VueSfcTechStack(runtimeOpts),
  });
}
