import { useFormContext } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/lib/components/ui/form'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/components/ui/tooltip'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ImageUpload } from '@/lib/components/base/image-upload'
import type { ProFormFieldProps } from '../types'
import type { UploadFile, UploadRequestOption } from '@/lib/components/base/image-upload/types'

/**
 * ProFormUpload 组件 Props
 */
interface ProFormUploadProps extends Omit<ProFormFieldProps, 'valueEnum'> {
  /**
   * 最大上传数量
   */
  maxCount?: number

  /**
   * 最大文件大小(MB)
   */
  maxSize?: number

  /**
   * 接受的文件类型
   */
  accept?: string

  /**
   * 列表展示类型
   */
  listType?: 'picture-card' | 'picture' | 'text'

  /**
   * 自定义上传请求
   */
  customRequest?: (options: UploadRequestOption) => void

  /**
   * 上传前校验
   */
  beforeUpload?: (file: File) => boolean | Promise<boolean>

  /**
   * 预览回调
   */
  onPreview?: (file: UploadFile) => void

  /**
   * 删除回调
   */
  onRemove?: (file: UploadFile) => boolean | Promise<boolean> | void
}

/**
 * ProFormUpload 组件 - 文件上传字段
 */
export function ProFormUpload({
  name,
  label,
  tooltip,
  required,
  disabled,
  readonly,
  className,
  width,
  maxCount = 1,
  maxSize = 5,
  accept = 'image/*',
  listType = 'picture-card',
  customRequest,
  beforeUpload,
  onPreview,
  onRemove,
}: ProFormUploadProps) {
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
            <ImageUpload
              value={field.value || []}
              onChange={field.onChange}
              maxCount={maxCount}
              maxSize={maxSize}
              accept={accept}
              listType={listType}
              disabled={disabled || readonly}
              customRequest={customRequest}
              beforeUpload={beforeUpload}
              onPreview={onPreview}
              onRemove={onRemove}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
