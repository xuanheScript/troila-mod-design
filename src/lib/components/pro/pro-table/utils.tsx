import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { Button } from '../../ui/button'
import { Badge } from '../../ui/badge'
import { Checkbox } from '../../ui/checkbox'
import type { ProColumns } from './types'

/**
 * 将 ProColumns 转换为 TanStack Table ColumnDef
 */
export function convertProColumnsToColumnDef<T>(
  columns: ProColumns<T>[],
  options?: {
    onSort?: (columnId: string) => void
    enableRowSelection?: boolean
  }
): ColumnDef<T>[] {
  const result: ColumnDef<T>[] = []

  // 添加选择列
  if (options?.enableRowSelection) {
    result.push({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    })
  }

  columns.forEach((col, index) => {
    // 跳过在表格中隐藏的列
    if (col.hideInTable) {
      return
    }

    const columnDef: ColumnDef<T> = {
      id: col.dataIndex?.toString() || `column-${index}`,
      accessorKey: col.dataIndex as any,
      header: ({ column }) => {
        if (col.sorter) {
          return (
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
              onClick={() => {
                options?.onSort?.(column.id)
              }}
            >
              <span>{col.title}</span>
              {column.getIsSorted() === 'desc' ? (
                <ArrowDown className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === 'asc' ? (
                <ArrowUp className="ml-2 h-4 w-4" />
              ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          )
        }
        return <div>{col.title}</div>
      },
      cell: ({ row, getValue }) => {
        const value = getValue()
        const record = row.original

        // 自定义渲染
        if (col.render) {
          return col.render(value, record, row.index)
        }

        // 值枚举渲染
        if (col.valueEnum && value !== undefined && value !== null) {
          const enumItem = col.valueEnum[value.toString()]
          if (enumItem) {
            const variant = {
              default: 'default',
              success: 'default',
              error: 'destructive',
              warning: 'secondary',
              processing: 'outline',
            }[enumItem.status || 'default'] as any

            return <Badge variant={variant}>{enumItem.text}</Badge>
          }
        }

        // 序号列
        if (col.valueType === 'index') {
          return <span>{row.index + 1}</span>
        }

        if (col.valueType === 'indexBorder') {
          return (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border">
              {row.index + 1}
            </div>
          )
        }

        // 金额
        if (col.valueType === 'money' && typeof value === 'number') {
          return <span>¥{value.toFixed(2)}</span>
        }

        // 日期
        if (col.valueType === 'date' && value) {
          const date = new Date(value as string | number)
          return <span>{date.toLocaleDateString('zh-CN')}</span>
        }

        if (col.valueType === 'dateTime' && value) {
          const date = new Date(value as string | number)
          return <span>{date.toLocaleString('zh-CN')}</span>
        }

        // 省略显示
        if (col.ellipsis) {
          return (
            <div className="max-w-[200px] truncate" title={value?.toString()}>
              {value?.toString()}
            </div>
          )
        }

        // 默认文本渲染
        return <div>{value?.toString() || '-'}</div>
      },
      size: col.width as number,
      enableSorting: col.sorter,
    }

    result.push(columnDef)
  })

  return result
}

/**
 * 格式化搜索参数
 */
export function formatSearchParams(
  values: Record<string, any>,
  columns: ProColumns<any>[]
): Record<string, any> {
  const result: Record<string, any> = {}

  Object.keys(values).forEach((key) => {
    const column = columns.find((col) => col.dataIndex === key)
    const value = values[key]

    if (value === undefined || value === null || value === '') {
      return
    }

    // 应用转换函数
    if (column?.search?.transform) {
      result[key] = column.search.transform(value)
    } else {
      result[key] = value
    }
  })

  return result
}
