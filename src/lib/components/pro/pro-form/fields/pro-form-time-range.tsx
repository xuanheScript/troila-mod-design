import { useFormContext } from 'react-hook-form'
import { Clock } from 'lucide-react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/lib/components/ui/form'
import { Button } from '@/lib/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/components/ui/tooltip'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProFormFieldProps } from '../types'
import { useState } from 'react'

/**
 * 时间范围类型
 */
interface TimeRange {
  start?: string
  end?: string
}

/**
 * ProFormTimeRange 组件 - 时间范围选择字段
 */
export function ProFormTimeRange({
  name,
  label,
  tooltip,
  placeholder = '选择时间范围',
  required,
  disabled,
  readonly,
  fieldProps,
  className,
  width,
}: ProFormFieldProps) {
  const form = useFormContext()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const value: TimeRange = field.value || {}
        const displayText =
          value.start && value.end
            ? `${value.start} - ${value.end}`
            : value.start || value.end
            ? value.start || value.end
            : ''

        return (
          <FormItem className={cn('flex flex-col', className)} style={{ width }}>
            {label && (
              <FormLabel className="flex items-center gap-1">
                {required && <span className="text-destructive">*</span>}
                {label}
                {tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </FormLabel>
            )}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    disabled={disabled || readonly}
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !displayText && 'text-muted-foreground',
                      readonly && 'bg-muted cursor-not-allowed'
                    )}
                    {...fieldProps}
                  >
                    {displayText || <span>{placeholder}</span>}
                    <Clock className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4" align="start">
                <div className="space-y-4">
                  <div className="text-sm font-medium">选择时间范围</div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        开始时间
                      </label>
                      <input
                        type="time"
                        value={value.start || ''}
                        onChange={(e) => {
                          field.onChange({
                            ...value,
                            start: e.target.value,
                          })
                        }}
                        disabled={disabled}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        结束时间
                      </label>
                      <input
                        type="time"
                        value={value.end || ''}
                        onChange={(e) => {
                          field.onChange({
                            ...value,
                            end: e.target.value,
                          })
                        }}
                        disabled={disabled}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        field.onChange({ start: '', end: '' })
                      }}
                    >
                      清空
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      确定
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
