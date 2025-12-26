# Troila Pro Components API 文档

本文档提供所有组件的完整 API 参考。

## 目录

- [ProTable](#protable)
- [ProForm](#proform)
- [ImageUpload](#imageupload)
- [UI 组件](#ui-组件)

---

## ProTable

高级表格组件，支持搜索、分页、排序、行选择等功能。

### ProTableProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| columns | `ProColumns<T>[]` | - | 列配置（必填） |
| dataSource | `T[]` | - | 静态数据源 |
| request | `(params, sort, filter) => Promise<Response>` | - | 远程数据请求函数 |
| rowKey | `string \| ((record: T) => string)` | `'id'` | 行的唯一标识 |
| pagination | `PaginationConfig \| false` | `true` | 分页配置 |
| search | `SearchConfig \| false` | `false` | 搜索表单配置 |
| toolbar | `ToolbarConfig` | - | 工具栏配置 |
| rowSelection | `RowSelectionConfig<T>` | - | 行选择配置 |
| loading | `boolean` | `false` | 加载状态 |
| onReset | `() => void` | - | 重置回调 |
| onSubmit | `(params: any) => void` | - | 提交回调 |
| onRow | `(record: T) => void` | - | 行点击回调 |

### ProColumns

列配置选项。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | `string \| ReactNode` | - | 列标题 |
| dataIndex | `string` | - | 数据字段名 |
| key | `string` | - | 列唯一标识 |
| valueType | `ValueType` | `'text'` | 值类型 |
| valueEnum | `Record<string, { text: string }>` | - | 枚举值映射 |
| hideInSearch | `boolean` | `false` | 在搜索表单中隐藏 |
| hideInTable | `boolean` | `false` | 在表格中隐藏 |
| sorter | `boolean \| function` | `false` | 排序配置 |
| ellipsis | `boolean` | `false` | 文本省略 |
| width | `number \| string` | - | 列宽度 |
| fixed | `'left' \| 'right'` | - | 固定列 |
| render | `(text, record, index) => ReactNode` | - | 自定义渲染 |

### ValueType 支持

ProTable 支持以下 valueType：

- `text` - 文本
- `digit` - 数字
- `money` - 金额
- `date` - 日期
- `dateTime` - 日期时间
- `select` - 下拉选择（配合 valueEnum）
- `index` - 序号
- `indexBorder` - 带边框序号

### PaginationConfig

分页配置选项。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| current | `number` | `1` | 当前页码 |
| pageSize | `number` | `10` | 每页条数 |
| total | `number` | `0` | 总条数 |
| showSizeChanger | `boolean` | `true` | 显示每页条数选择器 |
| showQuickJumper | `boolean` | `true` | 显示快速跳转 |
| onChange | `(page, pageSize) => void` | - | 页码改变回调 |

### SearchConfig

搜索表单配置选项。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| labelWidth | `number \| 'auto'` | `'auto'` | 标签宽度 |
| collapsed | `boolean` | `false` | 是否折叠 |
| collapseRender | `boolean` | `true` | 显示折叠按钮 |

### RowSelectionConfig

行选择配置选项。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| selectedRowKeys | `string[]` | - | 已选行的 key 数组 |
| onChange | `(keys: string[], rows: T[]) => void` | - | 选择改变回调 |
| type | `'checkbox' \| 'radio'` | `'checkbox'` | 选择类型 |

### 示例

```tsx
<ProTable<User>
  columns={[
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      valueType: 'digit',
      sorter: true,
    },
  ]}
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
  rowSelection={{
    onChange: (keys, rows) => {
      console.log('选中的行:', keys, rows)
    },
  }}
/>
```

---

## ProForm

Schema 驱动的智能表单组件。

### ProFormProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| columns | `ProFormColumnsType<T>[]` | - | 表单字段配置（必填） |
| initialValues | `Partial<T>` | - | 初始值 |
| onFinish | `(values: T) => void \| Promise<void>` | - | 提交成功回调 |
| onFinishFailed | `(errors) => void` | - | 提交失败回调 |
| onValuesChange | `(changed, all) => void` | - | 值变化回调 |
| layout | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` | 表单布局 |
| grid | `boolean \| GridConfig` | `false` | 网格布局配置 |
| submitter | `SubmitterConfig \| false` | - | 提交按钮配置 |
| schema | `ZodSchema` | - | Zod 验证 Schema |
| request | `(params) => Promise<T>` | - | 远程数据加载 |
| params | `any` | - | request 参数 |
| disabled | `boolean` | `false` | 全部禁用 |
| readonly | `boolean` | `false` | 全部只读 |

### ProFormColumnsType

字段配置选项。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | `string` | - | 字段名（必填） |
| label | `string` | - | 标签文本 |
| valueType | `FormValueType` | `'text'` | 字段类型 |
| placeholder | `string` | - | 占位符 |
| tooltip | `string \| ReactNode` | - | 提示信息 |
| required | `boolean` | `false` | 是否必填 |
| disabled | `boolean` | `false` | 是否禁用 |
| readonly | `boolean` | `false` | 是否只读 |
| hidden | `boolean` | `false` | 是否隐藏 |
| width | `number \| string` | - | 字段宽度 |
| colProps | `{ span?: number }` | - | 栅格配置 |
| rules | `Rule[]` | - | 验证规则 |
| valueEnum | `Record<string, { text: string }>` | - | 枚举值映射 |
| dependencies | `string[]` | - | 依赖字段 |
| renderFormItem | `(schema, config, form) => ReactNode` | - | 自定义渲染 |

### FormValueType 支持

ProForm 支持以下 valueType：

**文本输入：**
- `text` - 文本输入
- `textarea` - 多行文本
- `password` - 密码输入

**数字输入：**
- `digit` - 数字输入
- `money` - 金额输入

**选择器：**
- `select` - 下拉选择
- `checkbox` - 复选框
- `radio` - 单选框
- `switch` - 开关

**日期时间：**
- `date` - 日期选择
- `dateTime` - 日期时间选择
- `dateRange` - 日期范围
- `time` - 时间选择
- `timeRange` - 时间范围

**上传：**
- `upload` - 文件上传
- `uploadImage` - 图片上传

### GridConfig

网格布局配置。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| column | `number` | `1` | 列数 |
| gutter | `number` | `16` | 间距 |

### SubmitterConfig

提交按钮配置。

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| submitText | `string` | `'提交'` | 提交按钮文字 |
| resetText | `string` | `'重置'` | 重置按钮文字 |
| render | `(props, dom) => ReactNode` | - | 自定义渲染 |

### 示例

```tsx
<ProForm
  columns={[
    {
      name: 'username',
      label: '用户名',
      valueType: 'text',
      rules: [{ required: true, message: '请输入用户名' }],
    },
    {
      name: 'email',
      label: '邮箱',
      valueType: 'text',
      rules: [{ type: 'email', message: '请输入有效的邮箱' }],
    },
    {
      name: 'age',
      label: '年龄',
      valueType: 'digit',
    },
    {
      name: 'status',
      label: '状态',
      valueType: 'select',
      valueEnum: {
        active: { text: '激活' },
        inactive: { text: '未激活' },
      },
    },
  ]}
  onFinish={async (values) => {
    console.log('提交值:', values)
  }}
  layout="vertical"
  grid={{ column: 2 }}
/>
```

---

## ImageUpload

图片上传组件。

### ImageUploadProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | `UploadFile[]` | `[]` | 已上传文件列表 |
| onChange | `(fileList: UploadFile[]) => void` | - | 文件列表改变回调 |
| maxCount | `number` | `1` | 最大上传数量 |
| maxSize | `number` | `5` | 最大文件大小（MB） |
| accept | `string` | `'image/*'` | 接受的文件类型 |
| multiple | `boolean` | `false` | 是否支持多选 |
| disabled | `boolean` | `false` | 是否禁用 |
| listType | `'picture-card' \| 'picture' \| 'text'` | `'picture-card'` | 列表展示类型 |
| customRequest | `(options: UploadRequestOption) => void` | - | 自定义上传逻辑 |
| beforeUpload | `(file: File) => boolean \| Promise<boolean>` | - | 上传前钩子 |
| onPreview | `(file: UploadFile) => void` | - | 预览回调 |
| onRemove | `(file: UploadFile) => void \| Promise<boolean>` | - | 删除回调 |

### UploadFile

上传文件对象。

| 属性 | 类型 | 说明 |
|------|------|------|
| uid | `string` | 唯一标识 |
| name | `string` | 文件名 |
| size | `number` | 文件大小（字节） |
| type | `string` | 文件类型 |
| status | `'uploading' \| 'done' \| 'error'` | 上传状态 |
| percent | `number` | 上传进度（0-100） |
| url | `string` | 文件 URL |
| thumbUrl | `string` | 缩略图 URL |
| error | `string` | 错误信息 |

### UploadRequestOption

自定义上传选项。

| 属性 | 类型 | 说明 |
|------|------|------|
| file | `File` | 上传的文件 |
| onProgress | `(percent: number) => void` | 进度回调 |
| onSuccess | `(response: any) => void` | 成功回调 |
| onError | `(error: Error) => void` | 失败回调 |

### 示例

```tsx
<ImageUpload
  value={fileList}
  onChange={setFileList}
  maxCount={5}
  maxSize={10}
  listType="picture-card"
  customRequest={async ({ file, onProgress, onSuccess, onError }) => {
    try {
      // 模拟上传进度
      onProgress(50)

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
```

---

## UI 组件

### Button

按钮组件，基于 shadcn/ui。

**Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | 按钮样式变体 |
| size | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | 按钮大小 |
| disabled | `boolean` | `false` | 是否禁用 |
| asChild | `boolean` | `false` | 作为子元素渲染 |

**示例:**

```tsx
<Button variant="default">默认按钮</Button>
<Button variant="destructive">危险按钮</Button>
<Button variant="outline" size="sm">小按钮</Button>
```

### Input

输入框组件。

**Props:**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | `string` | `'text'` | 输入类型 |
| placeholder | `string` | - | 占位符 |
| disabled | `boolean` | `false` | 是否禁用 |
| readOnly | `boolean` | `false` | 是否只读 |

### Select

下拉选择组件。

**示例:**

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="请选择" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">选项1</SelectItem>
    <SelectItem value="2">选项2</SelectItem>
  </SelectContent>
</Select>
```

### Table

表格组件。

**示例:**

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>标题</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>内容</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Dialog

对话框组件。

**示例:**

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>打开对话框</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>标题</DialogTitle>
      <DialogDescription>描述文本</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>确定</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 类型定义

### 通用类型

```typescript
// 值类型
type ValueType =
  | 'text'
  | 'digit'
  | 'money'
  | 'date'
  | 'dateTime'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'index'

// 验证规则
interface Rule {
  required?: boolean
  message?: string
  pattern?: RegExp
  min?: number
  max?: number
  type?: 'string' | 'number' | 'email' | 'url'
  validator?: (value: any) => boolean | Promise<boolean>
}

// 响应数据结构
interface RequestResponse<T> {
  data: T[]
  success: boolean
  total: number
}
```

---

## 更多示例

访问 [Storybook](http://localhost:6006) 查看所有组件的交互式示例和详细用法。

## 相关链接

- [完整文档](./CLAUDE.md)
- [GitHub 仓库](https://github.com/your-org/troila-pro-components)
- [问题反馈](https://github.com/your-org/troila-pro-components/issues)
