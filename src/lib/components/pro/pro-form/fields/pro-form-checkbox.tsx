import { useFormContext } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/lib/components/ui/form'
import { Checkbox } from '@/lib/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/components/ui/tooltip'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProFormFieldProps } from '../types'

/**
 * ProFormCheckbox 组件 - 复选框字段（单个）
 */
export function ProFormCheckbox({
  name,
  label,
  tooltip,
  required,
  disabled,
  readonly,
  fieldProps,
  className,
}: ProFormFieldProps) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-row items-start space-x-3 space-y-0', className)}>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled || readonly}
              {...fieldProps}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
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
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}

/**
 * ProFormCheckboxGroup 组件 - 复选框组（多个选项）
 */
export function ProFormCheckboxGroup({
  name,
  label,
  tooltip,
  required,
  disabled,
  readonly,
  valueEnum,
  fieldProps,
  className,
}: ProFormFieldProps) {
  const form = useFormContext()

  const options = valueEnum
    ? Object.entries(valueEnum).map(([value, config]) => ({
        value,
        label: config.text,
        disabled: config.disabled,
      }))
    : []

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn(className)}>
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
          <div className="space-y-2">
            {options.map((option) => {
              const isChecked = field.value?.includes(option.value) ?? false
              return (
                <div
                  key={option.value}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      const currentValue = field.value || []
                      const newValue = checked
                        ? [...currentValue, option.value]
                        : currentValue.filter(
                            (value: string) => value !== option.value
                          )
                      field.onChange(newValue)
                    }}
                    disabled={disabled || readonly || option.disabled}
                    {...fieldProps}
                  />
                  <label className="text-sm font-normal cursor-pointer">
                    {option.label}
                  </label>
                </div>
              )
            })}
          </div>
          {fieldState.error && (
            <p className="text-sm font-medium text-destructive">
              {fieldState.error.message}
            </p>
          )}
        </FormItem>
      )}
    />
  )
}
