import { getDepVersion, hasDep } from '@/shared';
import { compare } from 'compare-versions';
import type { IApi } from 'dumi';
import { chalk, logger } from 'dumi/plugin-utils';

export default function checkVersion(api: IApi) {
  const vueVersion = getDepVersion({
    pkg: api.pkg,
    cwd: api.cwd,
    dep: 'vue',
  });

  // 不存在vue依赖
  if (!vueVersion) {
    throw new Error('请安装 Vue 依赖.');
  }
  logger.info(chalk.cyan.bold(`Vue v${vueVersion}`));

  const shouldInstallCompiler = compare(vueVersion, '3.0.0', '>');
  if (shouldInstallCompiler) {
    throw new Error('Vue版本过高, 请安装Vue 2.x版本')
  }
  const hasOwnCompiler = hasDep(api.pkg, 'vue-template-compiler');

  if (!hasOwnCompiler) {
    throw new Error(`请安装 vue-template-compiler v${vueVersion}`);
  }

  if (shouldInstallCompiler) {
    api.modifyConfig((memo) => {
      memo.alias = {
        ...memo.alias,
        'vue/compiler-sfc': 'vue-template-compiler',
      };
      return memo;
    });
  }
}
