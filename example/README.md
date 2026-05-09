# dumi-plugin-preset-vue2 Examples

这是一个简单的示例项目，展示如何在 Dumi 2 中使用 Vue 2 组件。

## 🚀 快速开始

### 1. 安装依赖

```bash
# 在 examples 目录下
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
# 或
dumi dev
```

### 3. 访问

打开浏览器访问: http://localhost:8000

## 📁 项目结构

```
examples/
├── .dumirc.ts           # Dumi 配置文件
├── package.json         # 项目依赖
├── index.md             # 首页文档
├── runtime/
│   └── renderer.js      # 自定义 Renderer（集成 Element UI）
├── vue/
│   └── VueDemo.vue      # Vue 2 示例组件（含 Element UI）
└── react/
    └── ReactDemo.tsx    # React 示例组件
```

## ✨ 功能特性

- ✅ **Vue 2 SFC 支持**：完整的单文件组件渲染
- ✅ **Element UI 集成**：按钮、表单、表格等组件
- ✅ **React 原生支持**：Vue 和 React 组件共存
- ✅ **实时编辑**：支持代码块实时预览

## 📝 使用说明

### 引入插件

在 `.dumirc.ts` 中配置：

```typescript
import { defineConfig } from 'dumi';
import { join } from 'path';

export default defineConfig({
  // 引入父级目录的 lib（开发模式）
  presets: [join(__dirname, '../lib/')],
  
  vue: {
    compiler: {
      rendererPath: './runtime/renderer.js',
    },
  },
});
```

### 编写 Vue Demo

在 Markdown 中使用：

```markdown
<code src="./vue/VueDemo.vue" title="Vue 组件"></code>
```

### 编写 React Demo

同样支持 React：

```markdown
<code src="./react/ReactDemo.tsx" title="React 组件"></code>
```

## 🔧 开发模式

本示例使用 workspace 协议引用父级包：

```json
{
  "dependencies": {
    "@willem-wy/dumi-plugin-preset-vue2": "workspace:*"
  }
}
```

这样可以直接使用本地开发的版本，无需发布到 npm。

## 🎯 下一步

- 查看完整的 [配置文档](https://github.com/willem-wy/dumi-preset-vue2)
- 了解 [Element UI 集成](https://github.com/willem-wy/dumi-preset-vue2)
