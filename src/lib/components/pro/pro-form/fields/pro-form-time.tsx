import { useFormContext } from 'react-hook-form'
import { format } from 'date-fns'
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
 * ProFormTime 组件 - 时间选择字段
 */
export function ProFormTime({
  name,
  label,
  tooltip,
  placeholder = '选择时间',
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
        const timeValue = field.value
          ? typeof field.value === 'string'
            ? field.value
            : format(field.value, 'HH:mm')
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
                      !field.value && 'text-muted-foreground',
                      readonly && 'bg-muted cursor-not-allowed'
                    )}
                    {...fieldProps}
                  >
                    {timeValue || <span>{placeholder}</span>}
                    <Clock className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4" align="start">
                <div className="space-y-4">
                  <div className="text-sm font-medium">选择时间</div>
                  <input
                    type="time"
                    value={timeValue}
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      setIsOpen(false)
                    }}
                    disabled={disabled}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsOpen(false)}
                    >
                      取消
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        if (!timeValue) {
                          const now = new Date()
                          field.onChange(format(now, 'HH:mm'))
                        }
                        setIsOpen(false)
                      }}
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
