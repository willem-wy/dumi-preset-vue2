import { parseComponent } from "vue-template-compiler";
import { COMP_IDENTIFIER, CompileOptions } from "@/compiler/index";

function generatorRenderFunction(template: string) {
    return `
import { compile as _compile } from 'vue-template-compiler';

const compiled = _compile(\`${template}\`);

function render(h) {
    return new Function(compiled.render).call(this)
}

const staticRenderFns = compiled.staticRenderFns.map(function(fn) {
  return new Function(fn)
})
`
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
        js = generatorRenderFunction(parsed.template.content) + js;
        js += `\n${COMP_IDENTIFIER}.render = render;\n${COMP_IDENTIFIER}.staticRenderFns = staticRenderFns;`
    }
    return {
        js,
        css: ''
    }
}