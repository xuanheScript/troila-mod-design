import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { BaseSelect } from './index'

const meta = {
  title: 'Base Components/BaseSelect',
  component: BaseSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# BaseSelect 基础选择器

对 shadcn/ui Select 组件的封装,提供 Ant Design 风格的简洁 API。

## 特性

- ✅ 简洁的 options 配置
- ✅ 支持受控和非受控模式
- ✅ 支持清空功能
- ✅ 完整的 TypeScript 泛型支持
- ✅ 兼容 Ant Design API

## 使用方式

\`\`\`tsx
import { BaseSelect } from 'troila-pro-components'

function MyComponent() {
  const [value, setValue] = useState('1')

  return (
    <BaseSelect
      value={value}
      onChange={setValue}
      options={[
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ]}
      placeholder="请选择"
    />
  )
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BaseSelect>

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基础用法
 */
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<string>()

    return (
      <div className="w-[300px] space-y-4">
        <p className="text-sm text-muted-foreground">
          当前选中值: {value || '未选择'}
        </p>
        <BaseSelect
          value={value}
          onChange={setValue}
          options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
            { label: '橙子', value: 'orange' },
            { label: '葡萄', value: 'grape' },
          ]}
          placeholder="请选择水果"
        />
      </div>
    )
  },
}

/**
 * 默认值
 */
export const DefaultValue: Story = {
  render: () => {
    return (
      <div className="w-[300px]">
        <BaseSelect
          defaultValue="banana"
          options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
            { label: '橙子', value: 'orange' },
          ]}
        />
      </div>
    )
  },
}

/**
 * 数字类型值
 */
export const NumberValue: Story = {
  render: () => {
    const [value, setValue] = useState<number>(10)

    return (
      <div className="w-[300px] space-y-4">
        <p className="text-sm text-muted-foreground">当前选中值: {value}</p>
        <BaseSelect
          value={value}
          onChange={setValue}
          options={[
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '30', value: 30 },
            { label: '50', value: 50 },
            { label: '100', value: 100 },
          ]}
          placeholder="选择数量"
        />
      </div>
    )
  },
}

/**
 * 禁用状态
 */
export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-[300px] space-y-4">
        <BaseSelect
          disabled
          value="apple"
          options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
          ]}
        />
        <BaseSelect
          disabled
          options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
          ]}
          placeholder="禁用状态"
        />
      </div>
    )
  },
}

/**
 * 禁用选项
 */
export const DisabledOption: Story = {
  render: () => {
    return (
      <div className="w-[300px]">
        <BaseSelect
          options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉(禁用)', value: 'banana', disabled: true },
            { label: '橙子', value: 'orange' },
            { label: '葡萄(禁用)', value: 'grape', disabled: true },
          ]}
          placeholder="部分选项禁用"
        />
      </div>
    )
  },
}

/**
 * 允许清空
 */
export const AllowClear: Story = {
  render: () => {
    const [value, setValue] = useState<string>('apple')

    return (
      <div className="w-[300px] space-y-4">
        <p className="text-sm text-muted-foreground">
          当前选中值: {value || '未选择'}
        </p>
        <BaseSelect
          value={value}
          onChange={setValue}
          options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
            { label: '橙子', value: 'orange' },
          ]}
          placeholder="可清空选择"
          allowClear
        />
      </div>
    )
  },
}

/**
 * 弹出位置
 */
export const PopupPlacement: Story = {
  render: () => {
    return (
      <div className="flex gap-4">
        <div className="w-[200px]">
          <p className="text-sm mb-2">向上弹出</p>
          <BaseSelect
            options={[
              { label: '选项1', value: '1' },
              { label: '选项2', value: '2' },
              { label: '选项3', value: '3' },
            ]}
            side="top"
            placeholder="向上"
          />
        </div>
        <div className="w-[200px]">
          <p className="text-sm mb-2">向下弹出(默认)</p>
          <BaseSelect
            options={[
              { label: '选项1', value: '1' },
              { label: '选项2', value: '2' },
              { label: '选项3', value: '3' },
            ]}
            side="bottom"
            placeholder="向下"
          />
        </div>
      </div>
    )
  },
}

/**
 * 不同尺寸
 */
export const Sizes: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="w-[300px]">
          <p className="text-sm mb-2">小尺寸</p>
          <BaseSelect
            options={[
              { label: '选项1', value: '1' },
              { label: '选项2', value: '2' },
            ]}
            className="h-8"
            placeholder="小尺寸"
          />
        </div>
        <div className="w-[300px]">
          <p className="text-sm mb-2">默认尺寸</p>
          <BaseSelect
            options={[
              { label: '选项1', value: '1' },
              { label: '选项2', value: '2' },
            ]}
            placeholder="默认尺寸"
          />
        </div>
        <div className="w-[300px]">
          <p className="text-sm mb-2">大尺寸</p>
          <BaseSelect
            options={[
              { label: '选项1', value: '1' },
              { label: '选项2', value: '2' },
            ]}
            className="h-12"
            placeholder="大尺寸"
          />
        </div>
      </div>
    )
  },
}

/**
 * 多种场景示例
 */
export const UseCases: Story = {
  render: () => {
    const [language, setLanguage] = useState('zh-CN')
    const [pageSize, setPageSize] = useState(10)
    const [status, setStatus] = useState<string>()

    return (
      <div className="space-y-6 w-[400px]">
        <div>
          <p className="text-sm font-medium mb-2">语言选择</p>
          <BaseSelect
            value={language}
            onChange={setLanguage}
            options={[
              { label: '简体中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
              { label: '日本語', value: 'ja-JP' },
              { label: '한국어', value: 'ko-KR' },
            ]}
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">分页大小</p>
          <BaseSelect
            value={pageSize}
            onChange={setPageSize}
            options={[
              { label: '10 条/页', value: 10 },
              { label: '20 条/页', value: 20 },
              { label: '30 条/页', value: 30 },
              { label: '50 条/页', value: 50 },
              { label: '100 条/页', value: 100 },
            ]}
            className="h-8 w-[150px]"
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">状态筛选</p>
          <BaseSelect
            value={status}
            onChange={setStatus}
            options={[
              { label: '全部', value: 'all' },
              { label: '进行中', value: 'processing' },
              { label: '已完成', value: 'completed' },
              { label: '已取消', value: 'cancelled' },
            ]}
            placeholder="选择状态"
            allowClear
          />
        </div>

        <div className="p-4 bg-muted rounded-md text-sm space-y-1">
          <p>语言: {language}</p>
          <p>分页: {pageSize} 条/页</p>
          <p>状态: {status || '未选择'}</p>
        </div>
      </div>
    )
  },
}
