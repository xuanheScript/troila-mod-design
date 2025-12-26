import { createContext, useContext } from 'react'
import type { UseFormReturn, FieldValues } from 'react-hook-form'
import type { FormLayout } from './types'

/**
 * ProForm Context 类型定义
 */
export interface ProFormContextValue<T extends FieldValues = any> {
  /**
   * 表单实例
   */
  form: UseFormReturn<T>

  /**
   * 表单布局
   */
  layout: FormLayout

  /**
   * 是否只读
   */
  readonly?: boolean

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 标签宽度
   */
  labelWidth?: number | 'auto'

  /**
   * 标签对齐方式
   */
  labelAlign?: 'left' | 'right'

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
   * 是否显示标签冒号
   */
  colon?: boolean

  /**
   * Grid 列数
   */
  gridColumn?: number

  /**
   * Grid 间距
   */
  gridGutter?: number | [number, number]
}

/**
 * ProForm Context
 */
export const ProFormContext = createContext<ProFormContextValue | undefined>(
  undefined
)

/**
 * 使用 ProForm Context Hook
 */
export function useProFormContext<T extends FieldValues = any>() {
  const context = useContext(ProFormContext) as ProFormContextValue<T> | undefined

  if (!context) {
    throw new Error('useProFormContext must be used within ProFormProvider')
  }

  return context
}

/**
 * ProForm Provider Props
 */
export interface ProFormProviderProps<T extends FieldValues = any> {
  value: ProFormContextValue<T>
  children: React.ReactNode
}

/**
 * ProForm Provider
 */
export function ProFormProvider<T extends FieldValues = any>({
  value,
  children,
}: ProFormProviderProps<T>) {
  return (
    <ProFormContext.Provider value={value}>{children}</ProFormContext.Provider>
  )
}
