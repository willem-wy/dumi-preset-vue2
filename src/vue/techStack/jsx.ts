import { compile } from '@/compiler/node';
import type { IDumiTechStackRuntimeOpts } from 'dumi/tech-stack-utils';
import { defineTechStack, wrapDemoWithFn } from 'dumi/tech-stack-utils';
import hashId from 'hash-sum';

export const VueJSXTechStack = (runtimeOpts: IDumiTechStackRuntimeOpts) =>
  defineTechStack({
    name: 'vue2-jsx',
    runtimeOpts,
    isSupported(_, lang: string) {
      return ['jsx'].includes(lang);
    },
    onBlockLoad(args) {
      if (!args.path.endsWith('.jsx') && !args.path.endsWith('.js'))
        return null;
      return {
        type: 'jsx',
        content: '',
      };
    },
    transformCode(raw, opts) {
      if (opts.type === 'code-block') {
        const filename = opts.fileAbsPath;

        const result = compile({
          id: hashId(raw),
          filename,
          code: raw,
        }) as string;

        if (result) {
          const code = wrapDemoWithFn(result, {
            filename,
            parserConfig: {
              syntax: 'ecmascript',
            },
          });
          return `(${code})()`;
        }
      }
      return raw;
    },
  });
