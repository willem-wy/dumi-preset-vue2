import { parseComponent, compile } from "vue-template-compiler";
import { COMP_IDENTIFIER, CompileOptions } from "@/compiler/index";

function compileTemplate(template: string) {
    const compiled = compile(template);
    if (compiled.errors && compiled.errors.length) {
        throw new Error(`Template compilation errors: ${compiled.errors.join('\n')}`);
    }
    return {
        render: compiled.render,
        staticRenderFns: compiled.staticRenderFns || [],
    };
}

export function compileSFC(options: CompileOptions) {
    const { code } = options;
    const parsed = parseComponent(code);
    let scriptContent: string = parsed.script ? parsed.script.content : 'export default {}';
    const regex = /export default/
    let prefixScript: string = ''
    if (regex.test(scriptContent)) {
        const regexResult = scriptContent.match(regex)
        if (regexResult) {
            const index = regexResult.index
            prefixScript = scriptContent.slice(0, index)
            scriptContent = scriptContent.slice(index)
        }
    }
    scriptContent = scriptContent.trim().replace('export default', '')
    let js = `${prefixScript}\nconst ${COMP_IDENTIFIER} = ${scriptContent}`;
    if (parsed.template) {
        const compiled = compileTemplate(parsed.template.content);
        // vue-template-compiler 输出的 render 包含 with(this){...} 语法
        // SWC 不支持 with 语句，必须用 new Function() 包装
        // new Function() 将 with 语句包裹在字符串内，SWC 不会解析字符串内容
        js += `\n${COMP_IDENTIFIER}.render = new Function(${JSON.stringify(compiled.render)});`;
        js += `\n${COMP_IDENTIFIER}.staticRenderFns = [${compiled.staticRenderFns.map(fn => `new Function(${JSON.stringify(fn)})`).join(',')}];`;
    }
    return {
        js,
        css: ''
    }
}
