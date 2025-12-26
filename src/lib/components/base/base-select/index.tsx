import React from 'react'
import { X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { cn } from '@/lib/utils'
import type { BaseSelectProps } from './types'

/**
 * BaseSelect - 封装 shadcn/ui Select,提供 Ant Design 风格的简洁 API
 *
 * @example
 * ```tsx
 * <BaseSelect
 *   value={value}
 *   onChange={setValue}
 *   options={[
 *     { label: '选项1', value: '1' },
 *     { label: '选项2', value: '2' },
 *   ]}
 *   placeholder="请选择"
 * />
 * ```
 */
export function BaseSelect<T extends string | number = string>({
  value,
  defaultValue,
  options,
  onChange,
  placeholder = '请选择',
  disabled = false,
  className,
  side,
  allowClear = false,
  contentClassName,
}: BaseSelectProps<T>) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    value !== undefined ? String(value) : defaultValue !== undefined ? String(defaultValue) : undefined
  )

  // 受控模式:value 变化时同步内部状态
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(String(value))
    }
  }, [value])

  const handleValueChange = (newValue: string) => {
    // 更新内部状态
    setInternalValue(newValue)

    // 调用外部 onChange
    if (onChange) {
      // 找到原始值的类型
      const option = options.find((opt) => String(opt.value) === newValue)
      if (option) {
        onChange(option.value)
      }
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setInternalValue(undefined)
    if (onChange) {
      onChange(undefined as any)
    }
  }

  const isControlled = value !== undefined
  const selectValue = isControlled ? String(value) : internalValue

  return (
    <Select
      value={selectValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      defaultValue={defaultValue !== undefined ? String(defaultValue) : undefined}
    >
      <SelectTrigger className={cn('relative', className)}>
        <SelectValue placeholder={placeholder} />
        {allowClear && internalValue && !disabled && (
          <X
            className="absolute right-8 h-4 w-4 opacity-50 hover:opacity-100"
            onClick={handleClear}
          />
        )}
      </SelectTrigger>
      <SelectContent side={side} className={contentClassName}>
        {options.map((option) => (
          <SelectItem
            key={String(option.value)}
            value={String(option.value)}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export type { BaseSelectProps, BaseSelectOption } from './types'
