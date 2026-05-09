# @willem-wy/dumi-plugin-preset-vue2

<p align="center">
  <strong>为 Dumi 2 提供 Vue 2 组件渲染支持的完整解决方案</strong>
</p>

<p align="center">
  
  <a href="https://www.npmjs.com/package/@willem-wy/dumi-plugin-preset-vue2">
    <img src="https://img.shields.io/npm/v/@willem-wy/dumi-plugin-preset-vue2.svg" alt="version" />
  </a>
  <a href="https://github.com/willem-wy/dumi-preset-vue2/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@willem-wy/dumi-plugin-preset-vue2.svg" alt="license" />
  </a>
  <a href="https://github.com/willem-wy/dumi-preset-vue2/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs" />
  </a>
</p>

---

## ✨ 特性

- 🎯 **纯净 Vue 2 支持**：完整支持 Vue 2.6.x 单文件组件（SFC）和 JSX/TSX
- ⚡ **零配置启动**：开箱即用，无需复杂配置即可在 Dumi 中使用 Vue 2 组件
- 🔧 **Tech Stack 架构**：基于 Dumi 官方 `IDumiTechStack` 接口实现，稳定可靠
- 🎨 **组件库集成**：完美支持 Element UI、iView 等 Vue 2 生态组件库
- 📝 **API Table 自动生成**：自动解析 Vue 组件元数据，生成 API 文档表格
- 🌐 **在线编辑器**：一键在 CodeSandbox / StackBlitz 中打开 Demo
- 🛠️ **Webpack 深度集成**：MFSU 模块联邦、HMR 热更新、资源优化全覆盖
- 🚀 **实时代码编辑**：编辑时预检机制，提升开发体验

## 📦 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | ~2.6.14 | 运行时核心 |
| vue-template-compiler | ~2.6.14 | SFC 编译器 |
| vue-loader | ^15.11.1 | Webpack Loader |
| @vue/babel-plugin-jsx | ^1.1.6 | JSX 语法转换 |
| dumi | ^2.4.20 | 文档框架基础 |

> **注意**：本插件严格使用 **Vue 2 工具链**，不依赖任何 Vue 3 编译模块（如 `@vue/compiler-sfc`），避免版本冲突问题。

## 🚀 快速开始

### 安装

```bash
# 使用 pnpm（推荐）
pnpm add @willem-wy/dumi-plugin-preset-vue2 vue@~2.6.14 vue-template-compiler@~2.6.14

# 或使用 npm
npm install @willem-wy/dumi-plugin-preset-vue2 vue@~2.6.14 vue-template-compiler@~2.6.14

# 或使用 yarn
yarn add @willem-wy/dumi-plugin-preset-vue2 vue@~2.6.14 vue-template-compiler@~2.6.14
```

### 基础配置

在 `.dumirc.ts`（或 `dumi.config.ts`）中引入插件：

```typescript
import { defineConfig } from 'dumi';

export default defineConfig({
  presets: ['@willem-wy/dumi-plugin-preset-vue2'],
});
```

### ✅ 验证安装

启动开发服务器后，控制台应显示：

```
✓ Vue v2.6.14
✓ Vue2 编译环境配置完成
```

如果看到此提示，说明插件已正确安装！

## 📖 使用指南

### 1️⃣ 在 Markdown 中编写 Vue Demo

#### 方式一：Vue SFC（单文件组件）

````markdown
```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary">点击我</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello Vue 2!'
    }
  }
}
</script>

<style scoped>
.hello {
  text-align: center;
}
</style>
```
````

#### 方式二：JSX / TSX

````markdown
```tsx
export default {
  render(h) {
    return (
      <div className="hello">
        <h1>Hello from JSX!</h1>
      </div>
    )
  }
}
```
````

### 2️⃣ External Demo（外部文件）

支持引用独立的 `.vue` 文件作为 Demo：

```markdown
<code src="./demos/basic.vue" title="基础用法"></code>
```

### 3️⃣ API Table 自动生成

启用 API 表格功能：

```typescript
// .dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  presets: ['@willem-wy/dumi-plugin-preset-vue2'],
  
  // 启用 API 解析
  apiParser: {},
  
  // 配置入口文件（用于解析组件类型定义）
  resolve: {
    entryFile: './src/index.ts',
  },
});
```

然后在 Markdown 中使用：

```html
<API id="MyComponent"></API>
```

支持的属性：
- `type`: 显示类型（`props` | `slots` | `events` | `imperative`）

## 🎨 集成第三方组件库

### Element UI 示例

> **重要提示**：Element UI 要求 Vue 版本不超过 2.7.0，推荐使用 2.6.14。

#### Step 1：创建自定义 Renderer

在项目根目录创建 `runtime/renderer.js`：

```javascript
import Vue from 'vue';

// 1️⃣ 引入 Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 2️⃣ 注册全局组件
Vue.use(ElementUI);

// 3️⃣ 配置全局错误处理（可选但推荐）
Vue.config.errorHandler = function (err, vm, info) {
  console.error('Vue 错误:', err, info);
  throw err; // 抛出给 React 错误边界捕获
};

// 4️⃣ 定义渲染函数（必须导出）
const renderer = async function (canvas, component) {
  // 处理组件样式注入（SFC 编译时提取的 CSS）
  if (component.__css__) {
    setTimeout(() => {
      // 移除旧样式（热更新场景）
      document
        .querySelectorAll(`style[css-${component.__id__}]`)
        .forEach((el) => el.remove());
      
      // 注入新样式
      document.head.insertAdjacentHTML(
        'beforeend',
        `<style css-${component.__id__}>${component.__css__}</style>`
      );
    }, 1);
  }

  // 创建 Vue 2 实例并挂载到 canvas DOM
  const app = new Vue(component);
  app.$mount(canvas);

  // 返回卸载函数（用于清理）
  return () => {
    app.$destroy();
  };
};

export default renderer;
```

#### Step 2：配置 Renderer 路径

```typescript
// .dumirc.ts
import { defineConfig } from 'dumi';

export default defineConfig({
  presets: ['@willem-wy/dumi-plugin-preset-vue2'],
  
  vue: {
    compiler: {
      // 配置自定义 renderer 路径
      rendererPath: './runtime/renderer.js',
    },
  },
});
```

### 其他组件库

类似地，你可以集成任何 Vue 2 组件库：

| 组件库 | 安装命令 | 注册方式 |
|--------|----------|----------|
| [Element UI](https://element.eleme.cn/) | `pnpm add element-ui` | `Vue.use(ElementUI)` |
| [iView / View UI](https://www.iviewui.com/) | `pnpm add iview` | `Vue.use(ViewUI)` |
| [Ant Design Vue 1.x](https://1x.antdv.com/) | `pnpm add ant-design-vue@1` | `Vue.use(Antd)` |
| [Vant 2.x](https://vant-contrib.gitee.io/vant/v2/) | `pnpm add vant@2` | `Vue.use(Vant)` |

## ⚙️ 高级配置

### Babel Standalone CDN 配置

浏览器端实时编译需要加载 `@babel/standalone`。默认地址：

```
https://cdn.bootcdn.net/ajax/libs/babel-standalone/7.22.17/babel.min.js
```

自定义 CDN 地址：

```typescript
// .dumirc.ts
export default defineConfig({
  presets: ['@willem-wy/dumi-plugin-preset-vue2'],
  vue: {
    compiler: {
      babelStandaloneCDN: 'https://your-cdn.com/babel.min.js',
    },
  },
});
```

### 完整配置项

```typescript
// .dumirc.ts
export default defineConfig({
  presets: ['@willem-wy/dumi-plugin-preset-vue2'],
  
  // API 解析配置
  apiParser: {},
  
  // 入口文件路径
  resolve: {
    entryFile: './src/index.ts',
  },
  
  // Vue 特定配置
  vue: {
    compiler: {
      // 自定义 Renderer 路径（可选）
      rendererPath: './runtime/renderer.js',
      
      // 自定义 Babel CDN（可选）
      babelStandaloneCDN: 'https://cdn.example.com/babel.min.js',
      
      // API Parser 选项（可选）
      parserOptions: {
        tsconfigPath: './tsconfig.json',
        checkerOptions: {
          exclude: [],
          ignore: [],
          externalSymbolLinkMappings: {},
        },
      },
    },
  },
});
```

## 🏗️ 工作原理

### 架构设计

本插件基于 Dumi 2 的 **Tech Stack 扩展机制** 实现，核心包含三层架构：

```
┌─────────────────────────────────────────────┐
│  Layer 1: Tech Stack 注册层                   │
│  • isSupported() - 语言检测                  │
│  • onBlockLoad() - 模块加载                 │
│  • runtimeOpts - 运行时配置                  │
├─────────────────────────────────────────────┤
│  Layer 2: 编译转换层 (transformCode)          │
│  • parseComponent() - SFC 解析              │
│  • compile() - 模板编译                      │
│  • wrapDemoWithFn() - IIFE 包装             │
├─────────────────────────────────────────────┤
│  Layer 3: 运行时渲染层                         │
│  • Renderer - 组件挂载/卸载                  │
│  • Preflight - 编辑预检                      │
│  • Error Boundary - 错误处理                │
└─────────────────────────────────────────────┘
```

### 数据流

```
.vue 文件输入
    ↓
[isSupported()] 判断 lang === 'vue'
    ↓
[onBlockLoad()] 返回 { type: 'tsx', content: '' }
    ↓
[transformCode()]
    ├→ parseComponent() (vue-template-compiler)
    ├→ compile() → render 函数 + staticRenderFns
    ├→ wrapDemoWithFn() → Block Statements
    └→ 返回 IIFE: (${code})()
    ↓
[Renderer 执行]
    ├→ new Vue(component)
    ├→ $mount(canvas)
    └→ 返回 $destroy 卸载函数
    ↓
✅ 用户看到 Vue 2 组件正常渲染
```

## ❓ 常见问题

### Q1: 出现 `__VUE_HMR_RUNTIME__ is not defined` 错误

**原因**：混用了 Vue 3 的编译模块（`@vue/compiler-sfc`）。

**解决方案**：
1. 确保没有安装 `@vue/compiler-sfc`
2. 检查 `package.json` 中只包含 `vue-template-compiler`
3. 清理缓存后重启：
   ```bash
   rm -rf .dumi node_modules/.cache
   dumi dev
   ```

### Q2: TypeScript 报错找不到模块

**原因**：某些包缺少类型声明。

**解决方案**：
- 本插件已内置 `vue-loader` 类型声明
- 如遇其他报错，可添加 `// @ts-ignore` 临时绕过

### Q3: Element UI 样式不生效

**原因**：未正确引入 CSS 或 Renderer 未注册组件库。

**检查清单**：
1. ✅ `renderer.js` 中有 `import 'element-ui/lib/theme-chalk/index.css'`
2. ✅ `Vue.use(ElementUI)` 已调用
3. ✅ `vue.compiler.rendererPath` 配置正确

### Q4: HMR 热更新不工作

**可能原因**：
- Webpack 配置未正确设置 MFSU
- Vue Loader 版本不匹配

**解决方案**：
```bash
# 清理缓存
rm -rf .dumi node_modules/.cache

# 重启开发服务器
dumi dev
```

### Q5: 如何升级 Vue 版本？

**当前支持范围**：Vue 2.5.x - 2.7.x（推荐 2.6.14）

**不支持 Vue 3**：如需 Vue 3 支持，请使用官方的 [@dumijs/preset-vue](https://github.com/umijs/dumi/tree/master/suites/preset-vue)。

## 📊 版本兼容性

### 必须匹配的版本组合

| 包名 | 推荐版本 | 说明 |
|------|----------|------|
| `vue` | `~2.6.14` | 基准版本 |
| `vue-template-compiler` | `~2.6.14` | **必须与 vue 版本完全一致** |
| `vue-loader` | `^15.11.1` | Vue 2 专用版本 |

> ⚠️ **关键点**：`vue` 和 `vue-template-compiler` 的版本号必须一致，否则会编译失败！

### Dumi 兼容性

| Dumi 版本 | 支持状态 |
|-----------|----------|
| ^2.4.x | ✅ 完全支持 |
| ^2.3.x | ✅ 支持（部分功能受限） |
| ^2.2.x | ⚠️ 可能存在兼容性问题 |
| 1.x | ❌ 不支持 |

## 🤝 贡献指南

欢迎贡献代码、报告 Bug 或提出功能建议！

### 开发流程

```bash
# 1. Fork 并 Clone 项目
git clone https://github.com/willem-wy/dumi-preset-vue2.git

# 2. 安装依赖
pnpm install

# 3. 启动开发模式
pnpm dev

# 4. 运行测试
pnpm test

# 5. 构建生产版本
pnpm build
```

### 项目结构

```
src/
├── atomParser/              # API 元数据解析器
│   └── index.ts            # VueMetaParser 实现
├── compiler/               # SFC 编译管线
│   ├── compileSFC.ts       # Vue SFC 编译核心
│   ├── index.ts            # 编译器入口
│   └── node.ts             # Node.js 端编译
├── types/                  # TypeScript 类型声明
│   └── vue-loader.d.ts     # vue-loader v15 类型
├── vue/
│   ├── checkVersion.ts     # 版本检查与别名配置
│   ├── index.ts            # 主入口
│   ├── runtime/            # 运行时模块
│   │   ├── renderer.ts     # 默认渲染函数
│   │   ├── preflight.ts    # 编辑预检
│   │   ├── runtimePlugin.ts # CodeSandbox/StackBlitz 集成
│   │   └── getPreviewerData.ts # 在线编辑器数据生成
│   ├── techStack/          # 技术栈实现
│   │   ├── index.ts        # 注册入口
│   │   ├── jsx.ts          # JSX/TSX 支持
│   │   └── sfc.ts          # Vue SFC 支持
│   └── webpack/            # Webpack 配置
│       ├── config.ts       # 详细配置
│       └── index.ts        # 入口
├── common.ts               # 公共常量
├── index.ts                # 插件主入口
├── requireHook.ts          # Webpack require hook
└── shared.ts               # 共享工具函数
```

## 📄 License

[MIT](./LICENSE)

Copyright (c) 2024-present willem-wy

---

## 🙏 致谢

- [Dumi](https://d.umijs.org/) - 优秀的文档生成工具
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [@dumijs/preset-vue](https://github.com/umijs/dumi/tree/master/suites/preset-vue) - Vue 3 支持的参考实现
