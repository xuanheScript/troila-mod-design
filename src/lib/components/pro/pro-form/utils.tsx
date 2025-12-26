import type { UseFormReturn } from 'react-hook-form'
import type { ProFormColumnsType } from './types'
import {
  ProFormText,
  ProFormTextarea,
  ProFormDigit,
  ProFormSelect,
  ProFormCheckbox,
  ProFormCheckboxGroup,
  ProFormRadio,
  ProFormSwitch,
  ProFormDate,
  ProFormDateTime,
  ProFormDateRange,
  ProFormTime,
  ProFormTimeRange,
  ProFormUpload,
} from './fields'

/**
 * 根据 valueType 渲染对应的表单字段组件
 */
export function renderFormField<T extends Record<string, any>>(
  column: ProFormColumnsType<T>,
  form: UseFormReturn<T>
) {
  const {
    name,
    label,
    tooltip,
    valueType = 'text',
    placeholder,
    required,
    disabled,
    readonly,
    valueEnum,
    fieldProps,
    width,
    colProps,
    renderFormItem,
  } = column

  // 自定义渲染
  if (renderFormItem) {
    return <div key={name}>{renderFormItem(column, form)}</div>
  }

  // 计算是否禁用
  const isDisabled =
    typeof disabled === 'function' ? disabled(form.getValues()) : disabled

  // 通用 props
  const commonProps = {
    name,
    label,
    tooltip,
    placeholder,
    required,
    disabled: isDisabled,
    readonly,
    fieldProps,
    width,
  }

  // 包裹 div (用于 colProps)
  const wrapField = (field: React.ReactNode) => {
    if (!colProps) return <div key={name}>{field}</div>

    const style: React.CSSProperties = {}
    if (colProps.span) {
      style.gridColumn = `span ${colProps.span}`
    }
    if (colProps.offset) {
      style.gridColumnStart = colProps.offset + 1
    }

    return (
      <div key={name} style={style}>
        {field}
      </div>
    )
  }

  // 根据 valueType 渲染不同组件
  switch (valueType) {
    case 'text':
    case 'password':
      return wrapField(
        <ProFormText
          {...commonProps}
          fieldProps={{
            ...fieldProps,
            type: valueType === 'password' ? 'password' : 'text',
          }}
        />
      )

    case 'textarea':
      return wrapField(<ProFormTextarea {...commonProps} />)

    case 'digit':
    case 'money':
      return wrapField(<ProFormDigit {...commonProps} />)

    case 'select':
      return wrapField(<ProFormSelect {...commonProps} valueEnum={typeof valueEnum === 'function' ? valueEnum(form.getValues()) : valueEnum} />)

    case 'checkbox':
      // 单个 checkbox
      if (!valueEnum) {
        return wrapField(<ProFormCheckbox {...commonProps} />)
      }
      // checkbox 组
      return wrapField(
        <ProFormCheckboxGroup {...commonProps} valueEnum={typeof valueEnum === 'function' ? valueEnum(form.getValues()) : valueEnum} />
      )

    case 'radio':
    case 'radioButton':
      return wrapField(<ProFormRadio {...commonProps} valueEnum={typeof valueEnum === 'function' ? valueEnum(form.getValues()) : valueEnum} />)

    case 'switch':
      return wrapField(<ProFormSwitch {...commonProps} />)

    case 'date':
      return wrapField(<ProFormDate {...commonProps} />)

    case 'dateTime':
      return wrapField(<ProFormDateTime {...commonProps} />)

    case 'dateRange':
      return wrapField(<ProFormDateRange {...commonProps} />)

    case 'time':
      return wrapField(<ProFormTime {...commonProps} />)

    case 'timeRange':
      return wrapField(<ProFormTimeRange {...commonProps} />)

    case 'upload':
    case 'uploadImage':
      return wrapField(
        <ProFormUpload
          {...commonProps}
          {...(fieldProps as any)}
        />
      )

    case 'custom':
      // 自定义类型,必须使用 renderFormItem
      return null

    default:
      return wrapField(<ProFormText {...commonProps} />)
  }
}

/**
 * 生成表单的校验规则(用于 react-hook-form)
 */
export function generateValidationRules(column: ProFormColumnsType) {
  const { required, rules = [] } = column

  const validationRules: any = {}

  if (required) {
    validationRules.required = {
      value: true,
      message: `${column.label || column.name} 是必填项`,
    }
  }

  rules.forEach((rule) => {
    if (rule.required) {
      validationRules.required = {
        value: true,
        message: rule.message || `${column.label || column.name} 是必填项`,
      }
    }

    if (rule.pattern) {
      validationRules.pattern = {
        value: rule.pattern,
        message: rule.message || '格式不正确',
      }
    }

    if (rule.min !== undefined) {
      validationRules.min = {
        value: rule.min,
        message: rule.message || `最小值为 ${rule.min}`,
      }
    }

    if (rule.max !== undefined) {
      validationRules.max = {
        value: rule.max,
        message: rule.message || `最大值为 ${rule.max}`,
      }
    }

    if (rule.len !== undefined) {
      validationRules.minLength = {
        value: rule.len,
        message: rule.message || `长度必须为 ${rule.len}`,
      }
      validationRules.maxLength = {
        value: rule.len,
        message: rule.message || `长度必须为 ${rule.len}`,
      }
    }

    if (rule.validator) {
      validationRules.validate = rule.validator
    }
  })

  return validationRules
}

/**
 * 转换 ProForm columns 为 react-hook-form 的 defaultValues
 */
export function getDefaultValues<T extends Record<string, any>>(columns: ProFormColumnsType<T>[]): Partial<T> {
  const defaultValues: any = {}

  columns.forEach((column) => {
    if (column.initialValue !== undefined) {
      defaultValues[column.name] = column.initialValue
    }
  })

  return defaultValues
}
