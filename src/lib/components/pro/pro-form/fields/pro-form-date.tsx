import { useFormContext } from 'react-hook-form'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/lib/components/ui/form'
import { Button } from '@/lib/components/ui/button'
import { Calendar } from '@/lib/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/components/ui/tooltip'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProFormFieldProps } from '../types'

/**
 * ProFormDate 组件 - 日期选择字段
 */
export function ProFormDate({
  name,
  label,
  tooltip,
  placeholder = '选择日期',
  required,
  disabled,
  readonly,
  fieldProps,
  className,
  width,
}: ProFormFieldProps) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
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
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  disabled={disabled || readonly}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                    readonly && 'bg-muted cursor-not-allowed'
                  )}
                  {...fieldProps}
                >
                  {field.value ? (
                    format(field.value, 'PPP')
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/**
 * ProFormDateTime 组件 - 日期时间选择字段
 */
export function ProFormDateTime({
  name,
  label,
  tooltip,
  placeholder = '选择日期时间',
  required,
  disabled,
  readonly,
  fieldProps,
  className,
  width,
}: ProFormFieldProps) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
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
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  disabled={disabled || readonly}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                    readonly && 'bg-muted cursor-not-allowed'
                  )}
                  {...fieldProps}
                >
                  {field.value ? (
                    format(field.value, 'PPP HH:mm')
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  if (date) {
                    // 保留当前时间
                    const currentDate = field.value || new Date()
                    date.setHours(currentDate.getHours())
                    date.setMinutes(currentDate.getMinutes())
                  }
                  field.onChange(date)
                }}
                disabled={disabled}
                initialFocus
              />
              {field.value && (
                <div className="p-3 border-t">
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={format(field.value, 'HH:mm')}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':')
                        const newDate = new Date(field.value)
                        newDate.setHours(Number.parseInt(hours))
                        newDate.setMinutes(Number.parseInt(minutes))
                        field.onChange(newDate)
                      }}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
