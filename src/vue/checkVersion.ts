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

  if (!vueVersion) {
    throw new Error('请安装 Vue 2.x 依赖.');
  }

  logger.info(chalk.cyan.bold(`Vue v${vueVersion}`));

  // 检查是否为 Vue 3+ 版本（不支持）
  const isVue3OrHigher = compare(vueVersion, '3.0.0', '>=');
  if (isVue3OrHigher) {
    throw new Error(`检测到 Vue ${vueVersion}，此插件仅支持 Vue 2.x (推荐 2.6.14)`);
  }

  // 检查 vue-template-compiler 是否安装
  const hasOwnCompiler = hasDep(api.pkg, 'vue-template-compiler');
  if (!hasOwnCompiler) {
    throw new Error(`请安装与 Vue 版本匹配的 vue-template-compiler (推荐 ~2.6.14)`);
  }

  // 配置别名：将 vue/compiler-sfc 重定向到 vue-template-compiler（Vue2）
  api.modifyConfig((memo) => {
    memo.alias = {
      ...memo.alias,
      'vue/compiler-sfc': 'vue-template-compiler',
      '@vue/compiler-sfc': 'vue-template-compiler',
    };
    return memo;
  });

  logger.info(chalk.green('✓ Vue2 编译环境配置完成'));
}
