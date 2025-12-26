# Troila Pro Components

<div align="center">

[![npm version](https://img.shields.io/npm/v/troila-pro-components.svg)](https://www.npmjs.com/package/troila-pro-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/react-18%20%7C%2019-blue)](https://reactjs.org/)

基于 [shadcn/ui](https://ui.shadcn.com/) 的企业级 React 组件库，提供开箱即用的高级业务组件。

[English](./README.en.md) | 简体中文

</div>

## ✨ 特性

- 🎨 **高质量组件** - 基于 shadcn/ui 和 Radix UI，遵循最佳设计实践
- 🚀 **开箱即用** - ProTable、ProForm 等复合组件，快速搭建业务页面
- 💡 **API 友好** - API 设计与 ant-design-pro 保持一致，降低学习成本
- 🔧 **完整 TypeScript** - 100% TypeScript 实现，提供完整类型定义
- 🎯 **按需加载** - 支持 Tree-shaking，构建产物支持 ESM 和 UMD 格式
- 🎭 **主题定制** - 基于 Tailwind CSS v4 和 CSS 变量，轻松定制主题
- 📱 **响应式设计** - 所有组件支持移动端和桌面端自适应
- ⚡ **现代化工具链** - Vite 6 + React 19 + TypeScript 5

## 📦 安装

```bash
# pnpm
pnpm add troila-pro-components

# npm
npm install troila-pro-components

# yarn
yarn add troila-pro-components
```

### 依赖要求

```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

## 🚀 快速开始

### 1. 引入样式

在你的应用入口文件中引入样式：

```tsx
// src/main.tsx 或 src/index.tsx
import 'troila-pro-components/styles.css'
```

### 2. 使用组件

```tsx
import { ProTable, ProForm, Button } from 'troila-pro-components'

function App() {
  return (
    <div>
      <Button>Hello Troila</Button>
    </div>
  )
}
```

## 📚 核心组件

### ProTable - 高级表格

功能丰富的数据表格组件，支持搜索、分页、排序、筛选等功能。

```tsx
import { ProTable } from 'troila-pro-components'

interface DataType {
  id: string
  name: string
  age: number
  status: 'active' | 'inactive'
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    valueType: 'digit',
  },
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      active: { text: '激活' },
      inactive: { text: '未激活' },
    },
  },
]

function MyTable() {
  return (
    <ProTable<DataType>
      columns={columns}
      request={async (params) => {
        const res = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify(params),
        })
        return res.json()
      }}
      rowKey="id"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 10 }}
    />
  )
}
```

**主要功能：**
- ✅ 静态数据展示和远程数据加载
- ✅ 内置搜索表单（可折叠）
- ✅ 列排序、筛选、固定
- ✅ 前端/后端分页
- ✅ 行选择和批量操作
- ✅ 工具栏（刷新、密度、列设置）

### ProForm - 高级表单

Schema 驱动的智能表单组件，支持多种布局和字段类型。

```tsx
import { ProForm } from 'troila-pro-components'
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(3, '用户名至少3个字符'),
  email: z.string().email('请输入有效的邮箱'),
  age: z.number().min(18, '年龄必须大于18'),
})

function MyForm() {
  return (
    <ProForm
      columns={[
        {
          name: 'username',
          label: '用户名',
          valueType: 'text',
          rules: [{ required: true }],
        },
        {
          name: 'email',
          label: '邮箱',
          valueType: 'text',
        },
        {
          name: 'age',
          label: '年龄',
          valueType: 'digit',
        },
      ]}
      schema={schema}
      onFinish={async (values) => {
        console.log('提交:', values)
      }}
      layout="vertical"
      grid={{ column: 2 }}
    />
  )
}
```

**主要功能：**
- ✅ Schema 驱动表单生成
- ✅ 16 种字段类型支持
- ✅ 自动布局（Grid/Horizontal/Vertical/Inline）
- ✅ 字段联动和依赖
- ✅ 内置表单验证（基于 zod）
- ✅ 只读/编辑模式切换

### ImageUpload - 图片上传

强大的图片上传组件，支持拖拽、预览、多图上传等功能。

```tsx
import { ImageUpload } from 'troila-pro-components'

function MyUpload() {
  const [fileList, setFileList] = useState([])

  return (
    <ImageUpload
      value={fileList}
      onChange={setFileList}
      maxCount={5}
      maxSize={5}
      listType="picture-card"
      customRequest={async ({ file, onSuccess, onError }) => {
        try {
          const formData = new FormData()
          formData.append('file', file)
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })
          const data = await res.json()
          onSuccess(data)
        } catch (error) {
          onError(error)
        }
      }}
    />
  )
}
```

**主要功能：**
- ✅ 点击上传 / 拖拽上传
- ✅ 图片预览和删除
- ✅ 多图上传支持
- ✅ 文件大小和类型限制
- ✅ 上传进度显示
- ✅ 自定义上传逻辑

## 🎨 UI 组件

基于 shadcn/ui 提供 22+ 个高质量 UI 组件：

**表单组件：** Button, Input, Label, Select, Checkbox, Radio, Switch, Textarea, Form

**数据展示：** Table, Badge, Card, Tabs, Skeleton

**反馈组件：** Dialog, Alert, Sonner, Tooltip, Popover

**其他组件：** Calendar, Separator, Dropdown Menu

## 📖 文档

- [完整文档](./CLAUDE.md) - 项目概述、架构设计、组件详解
- [Storybook](http://localhost:6006) - 组件演示和交互示例
- [API 文档](./API.md) - 详细的 API 参考

## 🔧 开发指南

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动 Storybook
pnpm dev

# 构建组件库
pnpm build:lib

# 运行测试
pnpm test

# 测试覆盖率
pnpm test:cov

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

### 构建

```bash
# 构建组件库
pnpm build:lib

# 构建 Storybook 文档
pnpm build
```

构建产物位于 `dist/` 目录：
- **ESM 格式**：保留模块结构，支持 Tree-shaking
- **UMD 格式**：单文件打包，用于 CDN 和传统项目
- **类型声明**：完整的 TypeScript 类型定义
- **样式文件**：独立的 CSS 文件

## 📦 按需加载

组件库支持按需加载，减小打包体积：

```tsx
// 方式 1: 全量导入（开发便捷）
import { ProTable, ProForm, Button } from 'troila-pro-components'

// 方式 2: UI 组件按需导入（最佳 tree-shaking）
import { Button } from 'troila-pro-components/ui/button'
import { Input } from 'troila-pro-components/ui/input'

// 方式 3: Pro 组件按需导入
import { ProTable } from 'troila-pro-components/pro/pro-table'
import { ProForm } from 'troila-pro-components/pro/pro-form'

// 方式 4: 字段组件按需导入
import { ProFormText } from 'troila-pro-components/pro/pro-form/fields/pro-form-text'
```

## 🎨 主题定制

基于 Tailwind CSS 和 CSS 变量，支持深度定制：

```css
/* 修改主题色 */
:root {
  --primary: 262.1 83.3% 57.8%;
  --primary-foreground: 210 20% 98%;
}

/* 暗色主题 */
.dark {
  --primary: 263.4 70% 50.4%;
}
```

## 🌐 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 📄 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 19.1.0 | UI 框架 |
| TypeScript | 5.8.3 | 类型系统 |
| Tailwind CSS | 4.1.10 | 样式框架 |
| Vite | 6.3.5 | 构建工具 |
| Storybook | 9.0.12 | 组件文档 |
| Vitest | 4.0.16 | 单元测试 |
| Biome | 1.9.4 | 代码规范 |

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

- 使用 Biome 进行代码检查和格式化
- 所有组件必须有 TypeScript 类型定义
- 所有组件必须有 Storybook 文档
- 核心功能必须有单元测试

## 📝 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新记录。

## 📜 许可证

[MIT License](./LICENSE)

## 👥 作者

- **Troila Team** - [GitHub](https://github.com/your-org/troila-pro-components)

## 🙏 致谢

- [shadcn/ui](https://ui.shadcn.com/) - 高质量的 UI 组件基础
- [Radix UI](https://www.radix-ui.com/) - 无障碍 UI 原语
- [ant-design-pro](https://pro.ant.design/) - API 设计参考
- [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架

## 📞 联系方式

- GitHub Issues: [提交问题](https://github.com/your-org/troila-pro-components/issues)
- Email: support@troila.com

---

**Made with ❤️ by Troila Team**
