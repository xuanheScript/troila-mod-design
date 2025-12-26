/**
 * ProTable 类型定义
 * 参考 ant-design-pro ProTable API
 */

import type { ReactNode } from 'react'
import type {
  ColumnDef,
  PaginationState,
  SortingState,
  VisibilityState,
  RowSelectionState,
} from '@tanstack/react-table'

/**
 * 值类型枚举
 */
export type ValueType =
  | 'text'
  | 'digit'
  | 'money'
  | 'date'
  | 'dateTime'
  | 'dateRange'
  | 'time'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'index'
  | 'indexBorder'
  | 'option'

/**
 * 列配置
 */
export interface ProColumns<T = any> {
  /**
   * 数据字段名
   */
  dataIndex?: keyof T | string

  /**
   * 列标题
   */
  title?: ReactNode

  /**
   * 值类型
   */
  valueType?: ValueType

  /**
   * 值枚举（用于 select/radio/checkbox）
   */
  valueEnum?: Record<
    string,
    {
      text: ReactNode
      status?: 'default' | 'success' | 'error' | 'warning' | 'processing'
    }
  >

  /**
   * 是否在搜索表单中隐藏
   */
  hideInSearch?: boolean

  /**
   * 是否在表格中隐藏
   */
  hideInTable?: boolean

  /**
   * 是否支持排序
   */
  sorter?: boolean

  /**
   * 列宽度
   */
  width?: number | string

  /**
   * 是否固定列
   */
  fixed?: 'left' | 'right'

  /**
   * 对齐方式
   */
  align?: 'left' | 'center' | 'right'

  /**
   * 自定义渲染
   */
  render?: (value: any, record: T, index: number) => ReactNode

  /**
   * 搜索表单项的 props
   */
  formItemProps?: {
    label?: ReactNode
    rules?: any[]
    [key: string]: any
  }

  /**
   * 搜索转换函数
   */
  search?: {
    transform?: (value: any) => any
  }

  /**
   * 是否可拷贝
   */
  copyable?: boolean

  /**
   * 省略显示
   */
  ellipsis?: boolean
}

/**
 * 分页配置
 */
export interface PaginationConfig {
  current?: number
  pageSize?: number
  total?: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  pageSizeOptions?: number[]
  onChange?: (page: number, pageSize: number) => void
}

/**
 * 搜索表单配置
 */
export interface SearchConfig {
  /**
   * 标签宽度
   */
  labelWidth?: number | 'auto'

  /**
   * 是否折叠
   */
  collapsed?: boolean

  /**
   * 折叠时显示的行数
   */
  defaultColsNumber?: number

  /**
   * 提交按钮文本
   */
  submitText?: string

  /**
   * 重置按钮文本
   */
  resetText?: string

  /**
   * 是否显示展开/收起按钮
   */
  collapseRender?: boolean

  /**
   * 搜索按钮 loading
   */
  loading?: boolean
}

/**
 * 工具栏配置
 */
export interface ToolbarConfig {
  /**
   * 自定义操作按钮
   */
  actions?: ReactNode[]

  /**
   * 配置项
   */
  settings?: ('reload' | 'density' | 'columnSetting' | 'fullScreen')[]
}

/**
 * 请求参数
 */
export interface RequestParams {
  current?: number
  pageSize?: number
  [key: string]: any
}

/**
 * 请求返回结果
 */
export interface RequestData<T> {
  data: T[]
  success?: boolean
  total?: number
}

/**
 * 表格密度
 */
export type DensitySize = 'large' | 'middle' | 'small'

/**
 * ProTable 属性
 */
export interface ProTableProps<T = any> {
  /**
   * 列配置
   */
  columns: ProColumns<T>[]

  /**
   * 数据源（静态数据）
   */
  dataSource?: T[]

  /**
   * 远程数据请求
   */
  request?: (
    params: RequestParams,
    sort?: SortingState,
    filter?: Record<string, any>
  ) => Promise<RequestData<T>>

  /**
   * 行键
   */
  rowKey?: keyof T | ((record: T) => string)

  /**
   * 分页配置
   */
  pagination?: PaginationConfig | false

  /**
   * 搜索表单配置
   */
  search?: SearchConfig | false

  /**
   * 工具栏配置
   */
  toolbar?: ToolbarConfig

  /**
   * 行选择配置
   */
  rowSelection?: {
    selectedRowKeys?: string[]
    onChange?: (selectedRowKeys: string[], selectedRows: T[]) => void
    getCheckboxProps?: (record: T) => { disabled?: boolean }
  }

  /**
   * 表格标题
   */
  headerTitle?: ReactNode

  /**
   * 加载状态
   */
  loading?: boolean

  /**
   * 表格密度
   */
  size?: DensitySize

  /**
   * 提交表单回调
   */
  onSubmit?: (params: any) => void

  /**
   * 重置表单回调
   */
  onReset?: () => void

  /**
   * 刷新回调
   */
  onRefresh?: () => void

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 默认表单值
   */
  defaultFormValues?: Record<string, any>
}

/**
 * ProTable Action Ref
 */
export interface ProTableActionRef {
  reload: () => void
  reset: () => void
  submit: () => void
}
