export interface BaseSelectOption<T = string | number> {
  label: string
  value: T
  disabled?: boolean
}

export interface BaseSelectProps<T = string | number> {
  /**
   * 当前选中的值
   */
  value?: T
  /**
   * 默认选中的值
   */
  defaultValue?: T
  /**
   * 选项数据
   */
  options: BaseSelectOption<T>[]
  /**
   * 值变化时的回调
   */
  onChange?: (value: T) => void
  /**
   * 占位符
   */
  placeholder?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 弹出框位置
   */
  side?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * 是否允许清空
   */
  allowClear?: boolean
  /**
   * 弹出框自定义类名
   */
  contentClassName?: string
}
