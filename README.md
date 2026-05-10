# @willem-wy/dumi-plugin-preset-vue2

<p align="center">
  <strong>为 Dumi 2 提供 Vue 2 组件渲染支持，实现 Vue 2 与 React 共存</strong>
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

## 🌟 核心亮点：Vue 2 与 React 共存

本插件最大的价值在于**让 Vue 2 和 React 组件可以在同一个 Dumi 2 文档站点中并存**。

### 文件类型分工

| 文件类型 | 编译技术栈 | 处理方 | 编译工具 |
|----------|-----------|--------|----------|
| `.vue` | **Vue 2** | 本插件 | `vue-template-compiler` + `vue-loader v15` |
| `.jsx` | **Vue 2** | 本插件 | `@vue/babel-preset-jsx` |
| `.tsx` | **React** | Dumi 原生 | `@babel/preset-react` + TypeScript |

> 💡 **设计原则**：`.vue` 和 `.jsx` 按 Vue 2 技术栈处理，`.tsx` 按 Dumi 默认的 React 技术栈处理。两者互不干扰，完美共存。

### 共存示例

在 https://github.com/willem-wy/dumi-preset-vue2/tree/main/example 中含有dumi2.4版本的react和vue组件文档展示示例。

```markdown
<!-- 同一页面中同时展示 Vue 2 和 React 组件 -->

<code src="./demos/VueButton.vue" title="Vue 2 按钮"></code>
<code src="./demos/ReactButton.tsx" title="React 按钮"></code>
```

---

## ✨ 特性

- 🎯 **Vue 2 与 React 共存**：`.vue`/`.jsx` 按 Vue 2 编译，`.tsx` 按 React 编译，互不干扰
- ⚡ **零配置启动**：开箱即用，无需复杂配置即可在 Dumi ^@2.4 中使用 Vue 2 组件
- 🔧 **Tech Stack 架构**：基于 Dumi 官方 `IDumiTechStack` 接口实现，稳定可靠
- 🎨 **组件库集成**：完美支持 Element UI、iView 等 Vue 2 生态组件库
- 📝 **API Table 自动生成**：自动解析 Vue 组件元数据，生成 API 文档表格
- 🌐 **在线编辑器**：一键在 CodeSandbox / StackBlitz 中打开 Demo
- 🛠️ **Webpack 深度集成**：MFSU 模块联邦、HMR 热更新、资源优化全覆盖
- 🚀 **纯净 Vue 2 工具链**：严格使用 `vue-template-compiler`，不依赖任何 Vue 3 编译模块

## 📦 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | ~2.7.16 | 运行时核心 |
| vue-template-compiler | ~2.7.16 | SFC 编译器 |
| vue-loader | ^15.11.1 | Webpack Loader |
| @vue/babel-preset-jsx | ^1.4.0 | Vue 2 JSX 编译 |
| @vue/babel-helper-vue-jsx-merge-props | ^1.4.0 | Vue 2 JSX 运行时依赖 |
| dumi | ^2.4.20 | 文档框架基础 |

> **注意**：本插件严格使用 **Vue 2 工具链**，不依赖任何 Vue 3 编译模块（如 `@vue/compiler-sfc`、`@vue/babel-plugin-jsx`），避免版本冲突问题。

## 🚀 快速开始

### 安装

```bash
# 使用 pnpm（推荐）
pnpm add @willem-wy/dumi-plugin-preset-vue2 vue@~2.7.16 vue-template-compiler@~2.7.16

# 或使用 npm
npm install @willem-wy/dumi-plugin-preset-vue2 vue@~2.7.16 vue-template-compiler@~2.7.16

# 或使用 yarn
yarn add @willem-wy/dumi-plugin-preset-vue2 vue@~2.7.16 vue-template-compiler@~2.7.16
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
✓ Vue v2.7.x
✓ Vue2 编译环境配置完成
```

## 📖 使用指南

### 1️⃣ Vue 2 组件（.vue / .jsx）

#### Vue SFC（单文件组件）

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
.hello { text-align: center; }
</style>
```
````

#### Vue JSX

````markdown
```jsx
export default {
  render(h) {
    return (
      <div class="hello">
        <h1>Hello from Vue JSX!</h1>
      </div>
    )
  }
}
```
````

### 2️⃣ React 组件（.tsx）

`.tsx` 文件由 Dumi 原生 React 技术栈处理，无需额外配置：

````markdown
```tsx
import React, { useState } from 'react';

export default function ReactDemo() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello from React!</h1>
      <button onClick={() => setCount(count + 1)}>点击: {count}</button>
    </div>
  );
}
```
````

### 3️⃣ External Demo（外部文件）

```markdown
<!-- Vue 2 组件 -->
<code src="./demos/VueButton.vue" title="Vue 2 按钮"></code>

<!-- React 组件 -->
<code src="./demos/ReactButton.tsx" title="React 按钮"></code>
```

### 4️⃣ API Table 自动生成

```typescript
// .dumirc.ts
export default defineConfig({
  presets: ['@willem-wy/dumi-plugin-preset-vue2'],
  apiParser: {},
  resolve: { entryFile: './src/index.ts' },
});
```

```html
<API id="MyComponent"></API>
```

## 🎨 集成第三方组件库

### Element UI 示例

> **重要提示**：Element UI 兼容 Vue 2.6.x ~ 2.7.x，推荐使用 Vue 2.7.16。

#### Step 1：创建自定义 Renderer

在项目根目录创建 `runtime/renderer.js`：

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.errorHandler = function (err, vm, info) {
  console.error('Vue 错误:', err, info);
  throw err;
};

const renderer = async function (canvas, component) {
  if (component.__css__) {
    setTimeout(() => {
      document
        .querySelectorAll(`style[css-${component.__id__}]`)
        .forEach((el) => el.remove());
      document.head.insertAdjacentHTML(
        'beforeend',
        `<style css-${component.__id__}>${component.__css__}</style>`
      );
    }, 1);
  }

  const app = new Vue(component);
  app.$mount(canvas);

  return () => {
    app.$destroy();
  };
};

export default renderer;
```

#### Step 2：配置 Renderer 路径

```typescript
// .dumirc.ts
export default defineConfig({
  presets: ['@willem-wy/dumi-plugin-preset-vue2'],
  vue: {
    compiler: {
      rendererPath: './runtime/renderer.js',
    },
  },
});
```

### 其他组件库

| 组件库 | 安装命令 | 注册方式 |
|--------|----------|----------|
| [Element UI](https://element.eleme.cn/) | `pnpm add element-ui` | `Vue.use(ElementUI)` |
| [Ant Design Vue 1.x](https://1x.antdv.com/) | `pnpm add ant-design-vue@1` | `Vue.use(Antd)` |

## ⚙️ 高级配置

### 完整配置项

```typescript
// .dumirc.ts
export default defineConfig({
  presets: ['@willem-wy/dumi-plugin-preset-vue2'],

  // Vue 特定配置
  vue: {
    compiler: {
      // 自定义 Renderer 路径（可选）
      rendererPath: './runtime/renderer.js',

      // 自定义 Babel CDN（可选）
      babelStandaloneCDN: 'https://cdn.example.com/babel.min.js',
    },
  },
});
```

## 🏗️ 工作原理

### 文件类型编译分工

```
文件输入
    ↓
┌─────────────────────────────────────────────────┐
│  Webpack Rules 分发                               │
├──────────────┬──────────────┬────────────────────┤
│  .vue 文件    │  .jsx/.js    │  .tsx/.ts          │
│      ↓       │      ↓       │      ↓             │
│  vue rule    │  vue-jsx     │  jsx-ts-tsx rule   │
│  (本插件)     │  rule        │  (dumi 原生)        │
│              │  (本插件)     │                    │
├──────────────┴──────────────┼────────────────────┤
│       Vue 2 技术栈           │  React 技术栈       │
│  • vue-template-compiler    │  • @babel/preset-  │
│  • vue-loader v15           │    react            │
│  • @vue/babel-preset-jsx    │  • TypeScript       │
│  • new Vue() + $mount()     │  • React DOM        │
└─────────────────────────────┴────────────────────┘
```

### Tech Stack 架构

本插件基于 Dumi 2 的 **Tech Stack 扩展机制** 实现，注册了两个技术栈：

| Tech Stack | 名称 | 处理文件 | 编译方式 |
|------------|------|----------|----------|
| `VueSfcTechStack` | `vue2-sfc` | `.vue` | `vue-template-compiler` → render 函数 |
| `VueJSXTechStack` | `vue2-jsx` | `.jsx` / `.js` | `@vue/babel-preset-jsx` → `h()` 调用 |

> `.tsx` / `.ts` 文件不注册 Tech Stack，由 Dumi 原生 React 技术栈处理。

### 运行时渲染

```
[Renderer 执行]
    ├→ new Vue(component)     // 创建 Vue 2 实例
    ├→ $mount(canvas)         // 挂载到 React 提供的 DOM
    └→ 返回 $destroy 卸载函数  // 组件销毁时清理
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

### Q2: 出现 `createTextVNode is not a function` 错误

**原因**：使用了 Vue 3 的 JSX 编译器（`@vue/babel-plugin-jsx`）。

**解决方案**：本插件已使用 `@vue/babel-preset-jsx`（Vue 2 专用），确保用户项目中没有安装 `@vue/babel-plugin-jsx@2.x`。

### Q3: JSX 组件报 `Cannot destructure property 'props' of 'context'` 错误

**原因**：缺少 Vue 2 JSX 运行时依赖 `@vue/babel-helper-vue-jsx-merge-props`。

**解决方案**：本插件已在 `dependencies` 中声明此依赖，确保安装即可。

### Q4: `.tsx` 文件编译报错

**原因**：`.tsx` 文件由 Dumi 原生 React 技术栈处理，不应使用 Vue JSX 语法。

**解决方案**：`.tsx` 文件中使用 React 语法，Vue JSX 请使用 `.jsx` 扩展名。

### Q5: Element UI 样式不生效

**检查清单**：
1. ✅ `renderer.js` 中有 `import 'element-ui/lib/theme-chalk/index.css'`
2. ✅ `Vue.use(ElementUI)` 已调用
3. ✅ `vue.compiler.rendererPath` 配置正确

### Q6: 如何升级 Vue 版本？

**当前支持范围**：Vue 2.6.x - 2.7.x（推荐 2.7.16）

**不支持 Vue 3**：如需 Vue 3 支持，请使用官方的 [@dumijs/preset-vue](https://github.com/umijs/dumi/tree/master/suites/preset-vue)。

## 📊 版本兼容性

### 必须匹配的版本组合

| 包名 | 推荐版本 | 说明 |
|------|----------|------|
| `vue` | `~2.7.16` | 支持 2.6.x ~ 2.7.x |
| `vue-template-compiler` | `~2.7.16` | **必须与 vue 版本完全一致** |
| `vue-loader` | `^15.11.1` | Vue 2 专用版本（非 v17） |

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

# 3. 构建插件
pnpm build

# 4. 启动示例
cd examples && pnpm dev
```

### 项目结构

```
src/
├── atomParser/              # API 元数据解析器
├── compiler/                # SFC 编译管线
│   ├── compileSFC.ts        # Vue SFC 编译核心
│   └── node.ts              # Node.js 端编译
├── types/                   # TypeScript 类型声明
│   └── vue-loader.d.ts      # vue-loader v15 类型
├── vue/
│   ├── checkVersion.ts      # 版本检查与别名配置
│   ├── runtime/             # 运行时模块
│   │   ├── renderer.ts      # 默认渲染函数
│   │   └── preflight.ts     # 编辑预检
│   ├── techStack/           # 技术栈实现
│   │   ├── jsx.ts           # Vue 2 JSX 支持（.jsx/.js）
│   │   └── sfc.ts           # Vue 2 SFC 支持（.vue）
│   └── webpack/             # Webpack 配置
│       └── config.ts        # 详细配置
├── index.ts                 # 插件主入口
└── shared.ts                # 共享工具函数
```

## 📄 License

[MIT](./LICENSE)

Copyright (c) 2024-present willem-wy
