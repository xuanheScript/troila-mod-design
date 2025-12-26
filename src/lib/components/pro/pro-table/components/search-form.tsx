import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ChevronDown, ChevronUp, Search, RotateCcw } from 'lucide-react'
import { Button } from '../../../ui/button'
import { Input } from '../../../ui/input'
import { Label } from '../../../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select'
import { cn } from '@/lib/utils'
import type { ProColumns, SearchConfig } from '../types'

interface SearchFormProps {
  columns: ProColumns<any>[]
  config: SearchConfig
  onSubmit: (values: Record<string, any>) => void
  onReset: () => void
  loading?: boolean
  defaultValues?: Record<string, any>
}

export function SearchForm({
  columns,
  config,
  onSubmit,
  onReset,
  loading,
  defaultValues = {},
}: SearchFormProps) {
  const [collapsed, setCollapsed] = useState(config.collapsed ?? true)
  const defaultColsNumber = config.defaultColsNumber || 3

  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues,
  })

  // 过滤出需要显示在搜索表单中的列
  // 排除 hideInSearch 为 true 的列和序号列
  const searchColumns = columns.filter(
    (col) => !col.hideInSearch && col.valueType !== 'index' && col.valueType !== 'indexBorder'
  )

  if (searchColumns.length === 0) {
    return null
  }

  const handleFormSubmit = (values: Record<string, any>) => {
    onSubmit(values)
  }

  const handleFormReset = () => {
    reset(defaultValues)
    onReset()
  }

  // 显示的列数
  const visibleColumns = collapsed
    ? searchColumns.slice(0, defaultColsNumber)
    : searchColumns

  const showCollapseButton =
    config.collapseRender !== false && searchColumns.length > defaultColsNumber

  return (
    <div className="rounded-lg border bg-card p-4">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={cn(
          'grid gap-4',
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        )}>
          {visibleColumns.map((column) => {
            const dataIndex = column.dataIndex?.toString() || ''
            const formItem = column.formItemProps || {}

            return (
              <div key={dataIndex} className="space-y-2">
                <Label htmlFor={dataIndex}>
                  {formItem.label || column.title}
                </Label>

                {/* 根据值类型渲染不同的表单项 */}
                <Controller
                  name={dataIndex}
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => {
                    if (column.valueType === 'select' && column.valueEnum) {
                      return (
                        <Select
                          onValueChange={onChange}
                          value={value || ''}
                        >
                          <SelectTrigger id={dataIndex}>
                            <SelectValue placeholder={`请选择${column.title}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(column.valueEnum).map(([key, item]) => (
                              <SelectItem key={key} value={key}>
                                {item.text}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )
                    }

                    if (column.valueType === 'digit') {
                      return (
                        <Input
                          {...field}
                          id={dataIndex}
                          type="number"
                          placeholder={`请输入${column.title}`}
                          value={value ?? ''}
                          onChange={(e) => {
                            const val = e.target.value
                            onChange(val === '' ? undefined : Number(val))
                          }}
                        />
                      )
                    }

                    if (column.valueType === 'date') {
                      return (
                        <Input
                          {...field}
                          id={dataIndex}
                          type="date"
                          value={value || ''}
                          onChange={(e) => onChange(e.target.value)}
                        />
                      )
                    }

                    return (
                      <Input
                        {...field}
                        id={dataIndex}
                        placeholder={`请输入${column.title}`}
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value)}
                      />
                    )
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* 操作按钮 */}
        <div className="mt-4 flex items-center gap-2">
          <Button
            type="submit"
            size="sm"
            disabled={loading}
          >
            <Search className="mr-2 h-4 w-4" />
            {config.submitText || '查询'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleFormReset}
            disabled={loading}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            {config.resetText || '重置'}
          </Button>

          {showCollapseButton && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto"
            >
              {collapsed ? (
                <>
                  展开 <ChevronDown className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  收起 <ChevronUp className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
