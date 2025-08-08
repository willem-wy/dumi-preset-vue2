import { COMP_IDENTIFIER, type CompileOptions } from './index';
import { compileSFC } from "./compileSFC";

export function compile(options: CompileOptions) {
  const compiled = compileSFC(options);
  if (Array.isArray(compiled)) {
    return compiled;
  }
  const { id } = options;
  let { js, css } = compiled;
  if (css) {
    js += `\n${ COMP_IDENTIFIER }.__css__ = ${ JSON.stringify(css) };`;
  }
  js += `\n${ COMP_IDENTIFIER }.__id__ = "${ id }";
    export default ${ COMP_IDENTIFIER };`;
  return js;
}
