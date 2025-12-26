import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../../ui/button'
import type { ImageUploadProps, UploadFile } from './types'
import { UploadList } from './upload-list'

export const ImageUpload = React.forwardRef<HTMLDivElement, ImageUploadProps>(
  (
    {
      value = [],
      onChange,
      maxCount = 1,
      maxSize = 5,
      accept = 'image/*',
      disabled = false,
      listType = 'picture-card',
      customRequest,
      beforeUpload,
      onPreview,
      onRemove,
      multiple = false,
      className,
    },
    ref
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    // 生成唯一 ID
    const generateUid = () => {
      return `upload-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    }

    // 文件大小验证（MB）
    const validateFileSize = (file: File): boolean => {
      const fileSizeMB = file.size / 1024 / 1024
      return fileSizeMB <= maxSize
    }

    // 处理文件上传
    const handleFileUpload = useCallback(
      async (files: File[]) => {
        if (!onChange) return

        const currentCount = value.length
        const availableSlots = maxCount - currentCount
        const filesToUpload = files.slice(0, availableSlots)

        const newFiles: UploadFile[] = []

        for (const file of filesToUpload) {
          // 文件大小验证
          if (!validateFileSize(file)) {
            console.warn(`文件 ${file.name} 超过最大大小限制 ${maxSize}MB`)
            continue
          }

          // beforeUpload 钩子
          if (beforeUpload) {
            try {
              const result = await beforeUpload(file)
              if (result === false) {
                continue
              }
            } catch (error) {
              console.error('beforeUpload error:', error)
              continue
            }
          }

          // 创建预览 URL
          const thumbUrl = URL.createObjectURL(file)

          const uploadFile: UploadFile = {
            uid: generateUid(),
            name: file.name,
            status: 'uploading',
            size: file.size,
            type: file.type,
            thumbUrl,
            originFileObj: file,
            percent: 0,
          }

          newFiles.push(uploadFile)

          // 自定义上传或模拟上传
          if (customRequest) {
            customRequest({
              file,
              onProgress: (percent) => {
                onChange(
                  [...value, ...newFiles].map((f) =>
                    f.uid === uploadFile.uid ? { ...f, percent } : f
                  )
                )
              },
              onSuccess: (response) => {
                const successFile = {
                  ...uploadFile,
                  status: 'done' as const,
                  response,
                  percent: 100,
                }
                onChange([...value, ...newFiles.filter(f => f.uid !== uploadFile.uid), successFile])
              },
              onError: (error) => {
                const errorFile = {
                  ...uploadFile,
                  status: 'error' as const,
                  error,
                }
                onChange([...value, ...newFiles.filter(f => f.uid !== uploadFile.uid), errorFile])
              },
            })
          } else {
            // 模拟上传（仅用于演示）
            setTimeout(() => {
              onChange([
                ...value,
                ...newFiles.map((f) =>
                  f.uid === uploadFile.uid
                    ? { ...f, status: 'done' as const, percent: 100 }
                    : f
                ),
              ])
            }, 1000)
          }
        }

        // 立即更新状态，显示上传中的文件
        onChange([...value, ...newFiles])
      },
      [value, onChange, maxCount, maxSize, beforeUpload, customRequest]
    )

    // 拖拽上传
    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        setIsDragging(false)
        handleFileUpload(acceptedFiles)
      },
      [handleFileUpload]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: accept ? { [accept]: [] } : undefined,
      disabled,
      multiple,
      noClick: true,
      onDragEnter: () => setIsDragging(true),
      onDragLeave: () => setIsDragging(false),
    })

    // 点击上传
    const handleClick = () => {
      if (!disabled && fileInputRef.current) {
        fileInputRef.current.click()
      }
    }

    // 文件选择变化
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      if (files.length > 0) {
        handleFileUpload(files)
      }
      // 重置 input value 以允许选择相同文件
      e.target.value = ''
    }

    // 删除文件
    const handleRemove = async (file: UploadFile) => {
      if (onRemove) {
        const result = await onRemove(file)
        if (result === false) {
          return
        }
      }

      // 释放 URL 对象
      if (file.thumbUrl) {
        URL.revokeObjectURL(file.thumbUrl)
      }

      onChange?.(value.filter((f) => f.uid !== file.uid))
    }

    // 预览文件
    const handlePreview = (file: UploadFile) => {
      if (onPreview) {
        onPreview(file)
      } else if (file.thumbUrl || file.url) {
        window.open(file.thumbUrl || file.url, '_blank')
      }
    }

    const showUploadButton = value.length < maxCount

    return (
      <div ref={ref} className={cn('space-y-4', className)}>
        {/* 上传区域 */}
        {showUploadButton && (
          <div
            {...getRootProps()}
            className={cn(
              'relative cursor-pointer',
              listType === 'picture-card' &&
                'inline-flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg hover:border-primary transition-colors',
              disabled && 'cursor-not-allowed opacity-50',
              (isDragActive || isDragging) && 'border-primary bg-primary/5'
            )}
            onClick={handleClick}
          >
            <input
              {...getInputProps()}
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              data-testid="upload-input"
            />

            {listType === 'picture-card' ? (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <Upload className="h-8 w-8 mb-2" />
                <div className="text-sm">
                  {isDragActive || isDragging ? '释放以上传' : '点击或拖拽上传'}
                </div>
                {maxSize && (
                  <div className="text-xs mt-1">最大 {maxSize}MB</div>
                )}
              </div>
            ) : (
              <Button type="button" disabled={disabled}>
                <Upload className="h-4 w-4 mr-2" />
                {multiple ? '选择文件' : '选择文件'}
              </Button>
            )}
          </div>
        )}

        {/* 文件列表 */}
        {value.length > 0 && (
          <UploadList
            fileList={value}
            listType={listType}
            onRemove={handleRemove}
            onPreview={handlePreview}
          />
        )}
      </div>
    )
  }
)

ImageUpload.displayName = 'ImageUpload'

export type { ImageUploadProps, UploadFile } from './types'
