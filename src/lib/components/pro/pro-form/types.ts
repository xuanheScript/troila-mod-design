import type { ReactNode } from 'react'
import type { UseFormReturn, FieldValues, Path } from 'react-hook-form'
import type { z } from 'zod'

/**
 * 表单布局类型
 */
export type FormLayout = 'horizontal' | 'vertical' | 'inline'

/**
 * 值类型 - 与 ProTable 保持一致
 */
export type ValueType =
  | 'text'
  | 'textarea'
  | 'digit'
  | 'money'
  | 'password'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'radioButton'
  | 'switch'
  | 'date'
  | 'dateTime'
  | 'dateRange'
  | 'time'
  | 'timeRange'
  | 'upload'
  | 'uploadImage'
  | 'custom'

/**
 * 值枚举配置
 */
export interface ValueEnum {
  [key: string]: {
    text: ReactNode
    status?: 'success' | 'error' | 'default' | 'processing' | 'warning'
    disabled?: boolean
  }
}

/**
 * 表单列配置 - 与 ant-design-pro ProForm 保持一致
 */
export interface ProFormColumnsType<T extends FieldValues = any> {
  /**
   * 字段名称
   */
  name: Path<T>

  /**
   * 字段标签
   */
  label?: ReactNode

  /**
   * 字段提示
   */
  tooltip?: ReactNode

  /**
   * 值类型
   */
  valueType?: ValueType

  /**
   * 值枚举(用于 select, radio, checkbox)
   */
  valueEnum?: ValueEnum | ((record: T) => ValueEnum)

  /**
   * 初始值
   */
  initialValue?: any

  /**
   * 字段宽度
   */
  width?: number | string

  /**
   * 是否必填
   */
  required?: boolean

  /**
   * 校验规则
   */
  rules?: Array<{
    required?: boolean
    message?: string
    pattern?: RegExp
    min?: number
    max?: number
    len?: number
    validator?: (value: any) => boolean | Promise<boolean>
  }>

  /**
   * 字段依赖 - 当依赖字段值变化时触发重新渲染
   */
  dependencies?: Path<T>[]

  /**
   * 是否隐藏
   */
  hidden?: boolean | ((values: T) => boolean)

  /**
   * 是否禁用
   */
  disabled?: boolean | ((values: T) => boolean)

  /**
   * 是否只读
   */
  readonly?: boolean

  /**
   * 占位符
   */
  placeholder?: string

  /**
   * 字段属性(传递给底层表单组件)
   */
  fieldProps?: Record<string, any>

  /**
   * 表单项属性
   */
  formItemProps?: {
    className?: string
    labelAlign?: 'left' | 'right'
    labelCol?: { span?: number; offset?: number }
    wrapperCol?: { span?: number; offset?: number }
  }

  /**
   * 列布局配置
   */
  colProps?: {
    span?: number
    offset?: number
  }

  /**
   * 自定义渲染
   */
  render?: (
    value: any,
    record: T,
    form: UseFormReturn<any>
  ) => ReactNode

  /**
   * 自定义表单控件渲染
   */
  renderFormItem?: (
    schema: ProFormColumnsType<T>,
    form: UseFormReturn<any>
  ) => ReactNode

  /**
   * 值变化回调
   */
  onChange?: (value: any, form: UseFormReturn<any>) => void

  /**
   * 数据转换 - 提交时
   */
  transform?: (value: any) => any

  /**
   * 数据转换 - 显示时
   */
  convertValue?: (value: any) => any
}

/**
 * 提交按钮配置
 */
export interface SubmitterConfig {
  /**
   * 是否显示重置按钮
   */
  resetButtonProps?: false | {
    children?: ReactNode
    className?: string
    onClick?: () => void
  }

  /**
   * 提交按钮配置
   */
  submitButtonProps?: {
    children?: ReactNode
    className?: string
    loading?: boolean
  }

  /**
   * 渲染按钮
   */
  render?: (
    props: {
      submit: () => void
      reset: () => void
      form: UseFormReturn<any>
    }
  ) => ReactNode[]

  /**
   * 按钮对齐方式
   */
  align?: 'left' | 'center' | 'right'
}

/**
 * Grid 布局配置
 */
export interface GridConfig {
  /**
   * 列数
   */
  column?: number

  /**
   * 间距
   */
  gutter?: number | [number, number]

  /**
   * 响应式配置
   */
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

/**
 * ProForm 组件 Props - 与 ant-design-pro 保持一致
 */
export interface ProFormProps<T extends FieldValues = any> {
  /**
   * 表单列配置
   */
  columns?: ProFormColumnsType<T>[]

  /**
   * 初始值
   */
  initialValues?: Partial<T>

  /**
   * 提交回调
   */
  onFinish?: (values: T) => void | Promise<void>

  /**
   * 提交失败回调
   */
  onFinishFailed?: (errors: any) => void

  /**
   * 值变化回调
   */
  onValuesChange?: (changedValues: Partial<T>, values: T) => void

  /**
   * 表单布局
   */
  layout?: FormLayout

  /**
   * Grid 布局配置
   */
  grid?: boolean | GridConfig

  /**
   * 提交按钮配置
   */
  submitter?: SubmitterConfig | false

  /**
   * 表单实例
   */
  form?: UseFormReturn<T>

  /**
   * 表单名称
   */
  name?: string

  /**
   * 是否只读
   */
  readonly?: boolean

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 是否显示标签冒号
   */
  colon?: boolean

  /**
   * 标签对齐方式
   */
  labelAlign?: 'left' | 'right'

  /**
   * 标签宽度
   */
  labelWidth?: number | 'auto'

  /**
   * 标签列配置
   */
  labelCol?: {
    span?: number
    offset?: number
  }

  /**
   * 控件列配置
   */
  wrapperCol?: {
    span?: number
    offset?: number
  }

  /**
   * 表单样式类名
   */
  className?: string

  /**
   * Zod Schema 校验
   */
  schema?: z.ZodSchema<T>

  /**
   * 子节点(非 schema 模式)
   */
  children?: ReactNode

  /**
   * 重置时是否滚动到第一个错误字段
   */
  scrollToFirstError?: boolean

  /**
   * 是否保留字段值(即使字段被隐藏)
   */
  preserve?: boolean

  /**
   * 自定义请求 - 用于编辑表单时获取初始数据
   */
  request?: (params?: any) => Promise<T>

  /**
   * 请求参数
   */
  params?: Record<string, any>

  /**
   * 提交前数据转换
   */
  transformValues?: (values: T) => any

  /**
   * 是否自动聚焦第一个字段
   */
  autoFocusFirstField?: boolean
}

/**
 * ProForm 字段组件通用 Props
 */
export interface ProFormFieldProps<T extends FieldValues = any> {
  /**
   * 字段名称
   */
  name: string

  /**
   * 字段标签
   */
  label?: ReactNode

  /**
   * 字段提示
   */
  tooltip?: ReactNode

  /**
   * 占位符
   */
  placeholder?: string

  /**
   * 是否必填
   */
  required?: boolean

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 是否只读
   */
  readonly?: boolean

  /**
   * 字段属性
   */
  fieldProps?: Record<string, any>

  /**
   * 表单项样式类名
   */
  className?: string

  /**
   * 校验规则
   */
  rules?: ProFormColumnsType<T>['rules']

  /**
   * 宽度
   */
  width?: number | string

  /**
   * 值枚举
   */
  valueEnum?: ValueEnum

  /**
   * 值变化回调
   */
  onChange?: (value: any) => void
}
