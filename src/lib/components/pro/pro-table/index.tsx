import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'
import { Skeleton } from '../../ui/skeleton'
import type {
  ProTableProps,
  ProColumns,
  DensitySize,
  RequestParams,
} from './types'
import { SearchForm } from './components/search-form'
import { Toolbar } from './components/toolbar'
import { TablePagination } from './components/pagination'
import { convertProColumnsToColumnDef } from './utils'

export function ProTable<T extends Record<string, any>>({
  columns,
  dataSource,
  request,
  rowKey = 'id',
  pagination = {},
  search = {},
  toolbar,
  rowSelection,
  headerTitle,
  loading: externalLoading,
  size: externalSize = 'middle',
  onSubmit,
  onReset,
  onRefresh,
  className,
  defaultFormValues = {},
}: ProTableProps<T>) {
  // 内部状态
  const [data, setData] = useState<T[]>(dataSource || [])
  const [loading, setLoading] = useState(false)
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: typeof pagination === 'object' ? pagination.pageSize || 10 : 10,
  })
  const [total, setTotal] = useState(0)
  const [sorting, setSorting] = useState<any[]>([])
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({})
  const [rowSelectionState, setRowSelectionState] = useState<Record<string, boolean>>({})
  const [searchParams, setSearchParams] = useState<Record<string, any>>(
    defaultFormValues
  )
  const [size, setSize] = useState<DensitySize>(externalSize)

  // 获取行键
  const getRowId = useCallback(
    (row: T, index: number) => {
      if (typeof rowKey === 'function') {
        return rowKey(row)
      }
      return row[rowKey as keyof T]?.toString() || index.toString()
    },
    [rowKey]
  )

  // 加载数据
  const fetchData = useCallback(async () => {
    if (!request) return

    setLoading(true)
    try {
      const params: RequestParams = {
        current: paginationState.pageIndex + 1,
        pageSize: paginationState.pageSize,
        ...searchParams,
      }

      const result = await request(params, sorting, {})

      if (result.success !== false) {
        setData(result.data || [])
        setTotal(result.total || 0)
      }
    } catch (error) {
      console.error('ProTable fetch error:', error)
    } finally {
      setLoading(false)
    }
  }, [request, paginationState, searchParams, sorting])

  // 初始加载和刷新
  useEffect(() => {
    if (request) {
      fetchData()
    } else if (dataSource) {
      setData(dataSource)
      setTotal(dataSource.length)
    }
  }, [fetchData, dataSource, request])

  // 转换列定义
  const columnDefs = useMemo<ColumnDef<T>[]>(() => {
    return convertProColumnsToColumnDef<T>(columns, {
      onSort: (columnId) => {
        setSorting((old: any) => {
          const existing = old.find((s: any) => s.id === columnId)
          if (!existing) {
            return [{ id: columnId, desc: false }]
          }
          if (!existing.desc) {
            return [{ id: columnId, desc: true }]
          }
          return []
        })
      },
    })
  }, [columns])

  // 创建表格实例
  const table = useReactTable({
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: !request ? getPaginationRowModel() : undefined,
    onPaginationChange: setPaginationState,
    onSortingChange: setSorting as any,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelectionState,
    getRowId,
    manualPagination: !!request,
    manualSorting: !!request,
    pageCount: request ? Math.ceil(total / paginationState.pageSize) : undefined,
    state: {
      pagination: paginationState,
      sorting: sorting as any,
      columnVisibility,
      rowSelection: rowSelectionState,
    },
    enableRowSelection: !!rowSelection,
  })

  // 搜索表单提交
  const handleSearch = useCallback(
    (values: Record<string, any>) => {
      setSearchParams(values)
      setPaginationState((old) => ({ ...old, pageIndex: 0 }))
      onSubmit?.(values)
    },
    [onSubmit]
  )

  // 重置表单
  const handleReset = useCallback(() => {
    setSearchParams(defaultFormValues)
    setPaginationState((old) => ({ ...old, pageIndex: 0 }))
    onReset?.()
  }, [defaultFormValues, onReset])

  // 刷新
  const handleRefresh = useCallback(() => {
    fetchData()
    onRefresh?.()
  }, [fetchData, onRefresh])

  // 表格行选择
  useEffect(() => {
    if (rowSelection?.onChange) {
      const selectedRows = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original)
      const selectedRowKeys = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.id)
      rowSelection.onChange(selectedRowKeys, selectedRows)
    }
  }, [rowSelectionState, rowSelection, table])

  const isLoading = externalLoading || loading

  // 表格密度样式
  const densityClass = {
    large: 'py-4',
    middle: 'py-3',
    small: 'py-2',
  }[size]

  return (
    <div className={cn('space-y-4', className)}>
      {/* 搜索表单 */}
      {search !== false && (
        <SearchForm
          columns={columns}
          config={typeof search === 'object' ? search : {}}
          onSubmit={handleSearch}
          onReset={handleReset}
          loading={isLoading}
          defaultValues={defaultFormValues}
        />
      )}

      {/* 工具栏 */}
      {(headerTitle || toolbar) && (
        <Toolbar
          title={headerTitle}
          config={toolbar}
          onRefresh={handleRefresh}
          onSizeChange={setSize}
          currentSize={size}
          columns={columns}
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={setColumnVisibility}
        />
      )}

      {/* 表格 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.column.columnDef.size,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // 加载骨架屏
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {columnDefs.map((_, colIndex) => (
                    <TableCell key={`skeleton-${index}-${colIndex}`}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={densityClass}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnDefs.length}
                  className="h-24 text-center"
                >
                  暂无数据
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 分页 */}
      {pagination !== false && (
        <TablePagination
          table={table}
          pagination={paginationState}
          total={total}
          config={typeof pagination === 'object' ? pagination : {}}
          onPaginationChange={setPaginationState}
        />
      )}
    </div>
  )
}

export type { ProTableProps, ProColumns } from './types'
