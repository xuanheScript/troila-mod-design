# Troila Pro Components

基于 shadcn/ui 的业务组件库，包含 ProTable、ProForm 等复合组件。

## 项目概述

这是一个开源的 React 组件库,旨在为业务项目提供开箱即用的高级组件。项目基于以下技术栈：

- **React 19.1.0** - 最新的 React 版本
- **Tailwind CSS v4.1.10** - 原子化 CSS 框架
- **shadcn/ui** - 高质量的 UI 组件基础
- **TypeScript 5.8.3** - 完整的类型支持
- **Vite 6.3.5** - 现代化构建工具
- **Storybook 9.0.12** - 组件文档和演示
- **Vitest 3.2.4** - 单元测试框架

## 架构设计

### 组件分层

```
troila-pro-components/
├── UI 组件层 (shadcn/ui)
│   └── Button, Input, Select, Table, Form 等基础 UI 组件
│
├── Base 组件层（自定义基础组件）
│   └── ImageUpload - 图片上传组件
│
└── Pro 组件层（复合业务组件）
    ├── ProTable - 高级表格（API 兼容 ant-design-pro）
    └── ProForm - 高级表单（API 兼容 ant-design-pro）
```

### 目录结构

```
src/lib/
├── components/
│   ├── ui/              # shadcn/ui 基础组件（CLI 生成）
│   ├── base/            # 自定义基础组件
│   │   └── image-upload/
│   ├── pro/             # ProComponent 复合组件
│   │   ├── pro-table/
│   │   └── pro-form/
│   └── legacy/          # 旧组件（迁移期保留）
├── utils/               # 工具函数（cn 等）
├── hooks/               # 自定义 hooks
├── types/               # 类型定义
├── tailwind/
│   └── theme.css        # Tailwind 主题配置
└── index.ts             # 主入口
```

## 核心组件

### ProTable

高级表格组件，功能特性：

- ✅ 静态数据展示和远程数据加载
- ✅ 内置搜索表单（可折叠）
- ✅ 列排序、筛选、固定
- ✅ 前端/后端分页
- ✅ 行选择和批量操作
- ✅ 工具栏（刷新、密度、列设置、全屏）
- ✅ TypeScript 泛型支持
- ✅ API 与 ant-design-pro ProTable 保持一致

**使用示例**：

```typescript
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
    hideInSearch: true,
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
          body: JSON.stringify(params),
        })
        return res.json()
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
    />
  )
}
```

### ProForm

高级表单组件，功能特性：

- ✅ Schema 驱动表单生成
- ✅ 自动布局（Grid/Inline/Vertical）
- ✅ 字段联动和依赖
- ✅ 内置表单验证（基于 zod）
- ✅ 只读/编辑模式切换
- ✅ 丰富的字段类型
- ✅ API 与 ant-design-pro ProForm 保持一致

**使用示例**：

```typescript
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

### ImageUpload

图片上传组件，功能特性：

- ✅ 点击上传 / 拖拽上传
- ✅ 图片预览和删除
- ✅ 多图上传
- ✅ 文件大小和类型限制
- ✅ 上传进度显示
- ✅ 自定义上传逻辑

**使用示例**：

```typescript
import { ImageUpload } from 'troila-pro-components'

function MyUpload() {
  const [fileList, setFileList] = useState([])

  return (
    <ImageUpload
      value={fileList}
      onChange={setFileList}
      maxCount={5}
      maxSize={5} // 5MB
      listType="picture-card"
      customRequest={async ({ file, onProgress, onSuccess, onError }) => {
        // 自定义上传逻辑
        const formData = new FormData()
        formData.append('file', file)

        try {
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

## 技术特性

### 1. 完整的 TypeScript 支持

所有组件都提供完整的类型定义和泛型支持：

```typescript
// ProTable 支持泛型
<ProTable<UserType> columns={columns} />

// ProForm 支持泛型
<ProForm<FormValues> onFinish={(values) => {
  // values 自动推导为 FormValues 类型
}} />
```

### 2. 按需加载

支持 Tree-shaking，只打包使用的组件：

```typescript
// 方式 1: 全量导入
import { ProTable, ProForm } from 'troila-pro-components'

// 方式 2: 子路径导入（更好的 tree-shaking）
import { ProTable } from 'troila-pro-components/pro'
import { ImageUpload } from 'troila-pro-components/base'
```

### 3. 主题定制

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

### 4. 响应式设计

所有组件都支持响应式布局，适配移动端和桌面端。

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
# 启动 Storybook
pnpm dev

# 构建组件库
pnpm build:lib

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

### 添加新组件

1. 在 `src/lib/components/` 对应目录创建组件
2. 创建 `.stories.tsx` 文件用于文档
3. 创建 `.test.tsx` 文件用于测试
4. 在 `index.ts` 中导出组件

### 使用 shadcn/ui 组件

```bash
# 添加 shadcn/ui 组件
pnpm dlx shadcn@latest add [component-name]
```

## 构建和发布

### 构建

```bash
pnpm build:lib
```

构建产物位于 `dist/` 目录，包含：
- ESM 格式：`dist/*.es.js`
- UMD 格式：`dist/*.umd.js`
- TypeScript 类型：`dist/*.d.ts`
- CSS 样式：`dist/styles.css`

### 发布到 NPM

```bash
# 登录 NPM
npm login

# 发布
npm publish
```

## 依赖说明

### 核心依赖

- `react` & `react-dom` - React 框架（peer dependency）
- `class-variance-authority` - 样式变体管理
- `clsx` & `tailwind-merge` - 类名合并
- `lucide-react` - 图标库
- `@radix-ui/*` - 无障碍 UI 原语
- `react-hook-form` & `zod` - 表单管理和验证
- `@tanstack/react-table` - 表格状态管理
- `react-dropzone` - 文件上传

### 开发依赖

- `vite` - 构建工具
- `typescript` - 类型检查
- `tailwindcss` - CSS 框架
- `storybook` - 文档系统
- `vitest` - 测试框架
- `@biomejs/biome` - 代码规范

## API 兼容性

### ProTable API 兼容性

| 属性 | 类型 | 默认值 | 说明 | ant-design-pro 兼容性 |
|------|------|--------|------|---------------------|
| columns | ProColumns[] | - | 列配置 | ✅ 完全兼容 |
| dataSource | T[] | - | 静态数据 | ✅ 完全兼容 |
| request | (params) => Promise | - | 远程数据请求 | ✅ 完全兼容 |
| rowKey | string \| function | 'id' | 行键 | ✅ 完全兼容 |
| pagination | object \| false | true | 分页配置 | ✅ 完全兼容 |
| search | object \| false | true | 搜索表单配置 | ✅ 完全兼容 |
| toolbar | object | - | 工具栏配置 | ✅ 完全兼容 |
| rowSelection | object | - | 行选择配置 | ✅ 完全兼容 |

### ProForm API 兼容性

| 属性 | 类型 | 默认值 | 说明 | ant-design-pro 兼容性 |
|------|------|--------|------|---------------------|
| columns | ProFormColumnsType[] | - | 字段配置 | ✅ 完全兼容 |
| initialValues | object | - | 初始值 | ✅ 完全兼容 |
| onFinish | (values) => void | - | 提交回调 | ✅ 完全兼容 |
| layout | 'horizontal' \| 'vertical' \| 'inline' | 'horizontal' | 布局方式 | ✅ 完全兼容 |
| grid | boolean \| object | false | 网格布局 | ✅ 完全兼容 |
| submitter | object \| false | - | 提交按钮配置 | ✅ 完全兼容 |

## 性能优化

### ProTable 性能优化

- 大数据量时自动启用虚拟滚动
- 搜索防抖（300ms）
- 分页懒加载
- 列固定优化

### ProForm 性能优化

- 字段级重渲染优化
- 异步校验防抖
- 表单值缓存
- 依赖字段智能更新

## 浏览器兼容性

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 贡献指南

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
- 核心功能必须有单元测试（覆盖率 > 80%）

## 许可证

MIT License

## 联系方式

- GitHub Issues: [提交问题](https://github.com/your-org/troila-pro-components/issues)
- Email: support@troila.com

## 更新日志

### v1.0.0 (开发中)

**新功能**:
- ✅ 集成 shadcn/ui 基础组件
- ✅ 实现 ProTable 高级表格组件
- ✅ 实现 ProForm 高级表单组件
- ✅ 实现 ImageUpload 图片上传组件
- ✅ 支持按需加载和 Tree-shaking
- ✅ 完整的 TypeScript 支持
- ✅ Storybook 文档系统

**技术栈**:
- React 19.1.0
- Tailwind CSS v4.1.10
- TypeScript 5.8.3
- Vite 6.3.5

---

**Last Updated**: 2025-12-25
