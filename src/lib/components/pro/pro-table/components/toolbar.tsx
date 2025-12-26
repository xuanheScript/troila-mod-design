import { RefreshCw, Settings, Maximize, List } from 'lucide-react'
import { Button } from '../../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '../../../ui/dropdown-menu'
import type { ProColumns, ToolbarConfig, DensitySize } from '../types'

interface ToolbarProps {
  title?: React.ReactNode
  config?: ToolbarConfig
  onRefresh?: () => void
  onSizeChange?: (size: DensitySize) => void
  currentSize?: DensitySize
  columns?: ProColumns<any>[]
  columnVisibility?: Record<string, boolean>
  onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void
}

export function Toolbar({
  title,
  config,
  onRefresh,
  onSizeChange,
  currentSize = 'middle',
  columns = [],
  columnVisibility = {},
  onColumnVisibilityChange,
}: ToolbarProps) {
  const settings = config?.settings || ['reload', 'density', 'columnSetting']

  const handleColumnToggle = (columnId: string, checked: boolean) => {
    onColumnVisibilityChange?.({
      ...columnVisibility,
      [columnId]: !checked,
    })
  }

  return (
    <div className="flex items-center justify-between">
      {/* 标题和自定义操作 */}
      <div className="flex items-center gap-2">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        {config?.actions && (
          <div className="flex items-center gap-2">
            {config.actions}
          </div>
        )}
      </div>

      {/* 工具按钮 */}
      <div className="flex items-center gap-1">
        {settings.includes('reload') && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            title="刷新"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}

        {settings.includes('density') && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="密度">
                <List className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>表格密度</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={currentSize}
                onValueChange={(value) => onSizeChange?.(value as DensitySize)}
              >
                <DropdownMenuRadioItem value="large">
                  宽松
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="middle">
                  中等
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="small">
                  紧凑
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {settings.includes('columnSetting') && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" title="列设置">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>显示列</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columns
                .filter((col) => !col.hideInTable)
                .map((col) => {
                  const columnId = col.dataIndex?.toString() || ''
                  const isVisible = !columnVisibility[columnId]
                  return (
                    <DropdownMenuCheckboxItem
                      key={columnId}
                      checked={isVisible}
                      onCheckedChange={(checked) =>
                        handleColumnToggle(columnId, checked)
                      }
                    >
                      {col.title}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {settings.includes('fullScreen') && (
          <Button variant="ghost" size="icon" title="全屏">
            <Maximize className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
