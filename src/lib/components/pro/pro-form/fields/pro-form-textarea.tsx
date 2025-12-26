import { useFormContext } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/lib/components/ui/form'
import { Textarea } from '@/lib/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/components/ui/tooltip'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProFormFieldProps } from '../types'

/**
 * ProFormTextarea 组件 - 文本域字段
 */
export function ProFormTextarea({
  name,
  label,
  tooltip,
  placeholder,
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
        <FormItem className={cn(className)} style={{ width }}>
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
          <FormControl>
            <Textarea
              {...field}
              {...fieldProps}
              placeholder={placeholder}
              disabled={disabled || readonly}
              readOnly={readonly}
              className={cn(
                readonly && 'bg-muted cursor-not-allowed'
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
