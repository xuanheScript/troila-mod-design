import type { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '../../../ui/button'
import { BaseSelect } from '../../../base/base-select'
import type { PaginationConfig } from '../types'

interface TablePaginationProps<T> {
  table: Table<T>
  pagination: { pageIndex: number; pageSize: number }
  total: number
  config: PaginationConfig
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void
}

export function TablePagination<T>({
  table,
  pagination,
  total,
  config,
  onPaginationChange,
}: TablePaginationProps<T>) {
  const pageSizeOptions = config.pageSizeOptions || [10, 20, 30, 40, 50]
  const showSizeChanger = config.showSizeChanger !== false

  const pageCount = Math.ceil(total / pagination.pageSize)
  const currentPage = pagination.pageIndex + 1

  const handlePageChange = (newPage: number) => {
    onPaginationChange({
      ...pagination,
      pageIndex: newPage - 1,
    })
  }

  const handlePageSizeChange = (newSize: string) => {
    onPaginationChange({
      pageIndex: 0,
      pageSize: Number(newSize),
    })
  }

  const startRow = pagination.pageIndex * pagination.pageSize + 1
  const endRow = Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <span>
            已选择 {table.getFilteredSelectedRowModel().rows.length} /{' '}
            {table.getFilteredRowModel().rows.length} 行
          </span>
        )}
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* 每页显示条数 */}
        {showSizeChanger && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">每页显示</p>
            <BaseSelect
              value={pagination.pageSize}
              onChange={(newSize) => handlePageSizeChange(String(newSize))}
              options={pageSizeOptions.map((size) => ({
                label: String(size),
                value: size,
              }))}
              className="h-8 w-[70px]"
              side="top"
            />
          </div>
        )}

        {/* 页码信息 */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          第 {currentPage} / {pageCount} 页
        </div>

        {/* 总数信息 */}
        <div className="text-sm text-muted-foreground">
          共 {total} 条
        </div>

        {/* 分页按钮 */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(pageCount)}
            disabled={currentPage === pageCount}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
