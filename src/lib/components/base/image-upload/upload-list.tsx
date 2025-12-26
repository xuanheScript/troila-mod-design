import { Eye, Loader2, X, FileIcon, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../../ui/button'
import { Progress } from '../../ui/progress'
import type { ListType, UploadFile } from './types'

interface UploadListProps {
  fileList: UploadFile[]
  listType: ListType
  onRemove: (file: UploadFile) => void
  onPreview: (file: UploadFile) => void
}

export function UploadList({
  fileList,
  listType,
  onRemove,
  onPreview,
}: UploadListProps) {
  if (listType === 'picture-card') {
    return (
      <div className="flex flex-wrap gap-2 upload-list-picture-card">
        {fileList.map((file) => (
          <div
            key={file.uid}
            className={cn(
              'relative w-32 h-32 border-2 rounded-lg overflow-hidden group',
              file.status === 'error' && 'border-destructive',
              file.status === 'done' && 'border-border',
              file.status === 'uploading' && 'border-primary'
            )}
          >
            {/* 图片预览 */}
            {(file.thumbUrl || file.url) && (
              <img
                src={file.thumbUrl || file.url}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            )}

            {/* 上传中遮罩 */}
            {file.status === 'uploading' && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 text-white animate-spin mb-2" />
                {file.percent !== undefined && (
                  <div className="w-20">
                    <Progress value={file.percent} className="h-1" />
                  </div>
                )}
              </div>
            )}

            {/* 错误遮罩 */}
            {file.status === 'error' && (
              <div className="absolute inset-0 bg-destructive/10 flex flex-col items-center justify-center">
                <AlertCircle className="h-8 w-8 text-destructive mb-1" />
                <span className="text-xs text-destructive">上传失败</span>
              </div>
            )}

            {/* 操作按钮 */}
            {file.status === 'done' && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                  onClick={() => onPreview(file)}
                  aria-label="预览"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:text-white hover:bg-white/20"
                  onClick={() => onRemove(file)}
                  aria-label="删除"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* 删除按钮（上传中和错误状态） */}
            {(file.status === 'uploading' || file.status === 'error') && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 bg-black/50 text-white hover:bg-black/70 hover:text-white"
                onClick={() => onRemove(file)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>
    )
  }

  if (listType === 'picture') {
    return (
      <div className="space-y-2 upload-list-picture">
        {fileList.map((file) => (
          <div
            key={file.uid}
            className={cn(
              'flex items-center gap-3 p-3 border rounded-lg',
              file.status === 'error' && 'border-destructive bg-destructive/5',
              file.status === 'uploading' && 'border-primary'
            )}
          >
            {/* 缩略图 */}
            <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-muted">
              {(file.thumbUrl || file.url) ? (
                <img
                  src={file.thumbUrl || file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileIcon className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* 文件信息 */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{file.name}</div>
              {file.size && (
                <div className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </div>
              )}
              {file.status === 'uploading' && file.percent !== undefined && (
                <Progress value={file.percent} className="h-1 mt-2" />
              )}
              {file.status === 'error' && (
                <div className="text-xs text-destructive mt-1">上传失败</div>
              )}
            </div>

            {/* 状态图标 */}
            <div className="flex-shrink-0">
              {file.status === 'uploading' && (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              )}
              {file.status === 'error' && (
                <AlertCircle className="h-4 w-4 text-destructive" />
              )}
            </div>

            {/* 操作按钮 */}
            <div className="flex-shrink-0 flex gap-1">
              {file.status === 'done' && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onPreview(file)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onRemove(file)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // text 类型
  return (
    <div className="space-y-2 upload-list-text">
      {fileList.map((file) => (
        <div
          key={file.uid}
          className={cn(
            'flex items-center gap-2 p-2 text-sm',
            file.status === 'error' && 'text-destructive'
          )}
        >
          <FileIcon className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1 truncate">{file.name}</span>
          {file.status === 'uploading' && (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          )}
          {file.status === 'error' && (
            <AlertCircle className="h-4 w-4 text-destructive" />
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 flex-shrink-0"
            onClick={() => onRemove(file)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  )
}
