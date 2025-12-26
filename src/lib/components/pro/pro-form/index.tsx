import { useForm, FormProvider, type UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { Form } from '@/lib/components/ui/form'
import { Button } from '@/lib/components/ui/button'
import { cn } from '@/lib/utils'
import { ProFormProvider } from './context'
import { renderFormField } from './utils'
import type { ProFormProps } from './types'
import type { FieldValues } from 'react-hook-form'

/**
 * ProForm 组件 - 高级表单
 * 与 ant-design-pro ProForm 保持 API 兼容
 */
export function ProForm<T extends FieldValues = any>({
  columns = [],
  initialValues,
  onFinish,
  onFinishFailed,
  onValuesChange,
  layout = 'horizontal',
  grid,
  submitter,
  form: externalForm,
  name,
  readonly = false,
  disabled = false,
  colon = true,
  labelAlign = 'right',
  labelWidth = 'auto',
  labelCol,
  wrapperCol,
  className,
  schema,
  children,
  scrollToFirstError = true,
  preserve = true,
  request,
  params,
  transformValues,
  autoFocusFirstField = false,
}: ProFormProps<T>) {
  // 使用外部表单实例或创建新实例
  const internalForm = useForm<T>({
    defaultValues: initialValues as any,
    // @ts-ignore - zod schema 类型兼容性问题
    resolver: schema ? zodResolver(schema) : undefined,
    mode: 'onBlur',
  })

  const form = (externalForm || internalForm) as UseFormReturn<T>

  // Grid 配置
  const gridConfig = useMemo(() => {
    if (!grid) return undefined
    if (grid === true) {
      return { column: 2, gutter: 16 }
    }
    return {
      column: grid.column || 2,
      gutter: grid.gutter || 16,
    }
  }, [grid])

  // 处理远程数据请求
  useEffect(() => {
    if (request) {
      request(params).then((data) => {
        form.reset(data as any)
      })
    }
  }, [request, params, form])

  // 监听表单值变化
  useEffect(() => {
    if (onValuesChange) {
      const subscription = form.watch((value: any, { name: fieldName }: any) => {
        if (fieldName) {
          const changedValues = { [fieldName]: (value as any)[fieldName] } as Partial<T>
          onValuesChange(changedValues, value as T)
        }
      })
      return () => subscription.unsubscribe()
    }
  }, [form, onValuesChange])

  // 提交处理
  const handleSubmit = form.handleSubmit(
    async (values: any) => {
      try {
        const finalValues = transformValues ? transformValues(values) : values
        await onFinish?.(finalValues)
      } catch (error) {
        console.error('Form submit error:', error)
      }
    },
    (errors: any) => {
      onFinishFailed?.(errors)
      if (scrollToFirstError) {
        const firstError = Object.keys(errors)[0]
        if (firstError) {
          const element = document.getElementsByName(firstError)[0]
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
  )

  // 重置表单
  const handleReset = () => {
    form.reset(initialValues as any)
  }

  // Context value
  const contextValue = useMemo(
    () => ({
      form,
      layout,
      readonly,
      disabled,
      labelWidth,
      labelAlign,
      labelCol,
      wrapperCol,
      colon,
      gridColumn: gridConfig?.column,
      gridGutter: gridConfig?.gutter,
    }),
    [
      form,
      layout,
      readonly,
      disabled,
      labelWidth,
      labelAlign,
      labelCol,
      wrapperCol,
      colon,
      gridConfig,
    ]
  )

  // 计算布局样式
  const formLayoutClass = cn(
    layout === 'inline' && 'flex flex-wrap gap-4',
    layout === 'vertical' && 'space-y-4',
    layout === 'horizontal' && 'space-y-6'
  )

  // Grid 样式
  const gridStyle = gridConfig
    ? {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridConfig.column}, 1fr)`,
        gap:
          typeof gridConfig.gutter === 'number'
            ? `${gridConfig.gutter}px`
            : `${gridConfig.gutter[1]}px ${gridConfig.gutter[0]}px`,
      }
    : undefined

  // 渲染提交按钮
  const renderSubmitter = () => {
    if (submitter === false) return null

    // 自定义渲染
    if (submitter?.render) {
      return submitter.render({
        submit: handleSubmit,
        reset: handleReset,
        form,
      })
    }

    const alignClass = cn(
      submitter?.align === 'center' && 'justify-center',
      submitter?.align === 'right' && 'justify-end',
      submitter?.align === 'left' && 'justify-start',
      !submitter?.align && 'justify-start'
    )

    return (
      <div className={cn('flex gap-2 mt-6', alignClass)}>
        <Button
          type="submit"
          {...submitter?.submitButtonProps}
          className={submitter?.submitButtonProps?.className}
        >
          {submitter?.submitButtonProps?.children || '提交'}
        </Button>
        {submitter?.resetButtonProps !== false && (
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            {...submitter?.resetButtonProps}
          >
            {submitter?.resetButtonProps?.children || '重置'}
          </Button>
        )}
      </div>
    )
  }

  return (
    <ProFormProvider value={contextValue}>
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={handleSubmit}
            className={cn('w-full', className)}
            name={name}
          >
            {/* Schema 驱动模式 */}
            {columns.length > 0 && (
              <div className={formLayoutClass} style={gridStyle}>
                {columns.map((column) => {
                  // 处理隐藏字段
                  const isHidden =
                    typeof column.hidden === 'function'
                      ? column.hidden(form.getValues())
                      : column.hidden

                  if (isHidden) return null

                  return renderFormField(column, form)
                })}
              </div>
            )}

            {/* 自定义子节点模式 */}
            {children}

            {/* 提交按钮 */}
            {renderSubmitter()}
          </form>
        </Form>
      </FormProvider>
    </ProFormProvider>
  )
}

// 导出字段组件
export * from './fields'
export * from './types'
