/**
 * ImageUpload 组件类型定义
 * 参考 ant-design Upload 组件 API
 */

export type UploadFileStatus = 'uploading' | 'done' | 'error' | 'removed'

export interface UploadFile {
  uid: string
  name: string
  status?: UploadFileStatus
  url?: string
  thumbUrl?: string
  percent?: number
  size?: number
  type?: string
  originFileObj?: File
  error?: Error
  response?: unknown
}

export interface UploadRequestOption {
  file: File
  onProgress?: (percent: number) => void
  onSuccess?: (response: unknown, file: File) => void
  onError?: (error: Error, file: File) => void
}

export type ListType = 'picture-card' | 'picture' | 'text'

export interface ImageUploadProps {
  /**
   * 文件列表
   */
  value?: UploadFile[]

  /**
   * 文件列表变化回调
   */
  onChange?: (fileList: UploadFile[]) => void

  /**
   * 最大上传数量
   * @default 1
   */
  maxCount?: number

  /**
   * 最大文件大小（MB）
   * @default 5
   */
  maxSize?: number

  /**
   * 接受的文件类型
   * @default 'image/*'
   */
  accept?: string

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * 上传列表的内建样式
   * @default 'picture-card'
   */
  listType?: ListType

  /**
   * 自定义上传实现
   */
  customRequest?: (options: UploadRequestOption) => void

  /**
   * 上传前的校验
   * 返回 false 或 Promise.reject 时停止上传
   */
  beforeUpload?: (file: File) => boolean | Promise<boolean>

  /**
   * 点击文件预览回调
   */
  onPreview?: (file: UploadFile) => void

  /**
   * 点击移除文件回调
   * 返回 false 时不移除
   */
  onRemove?: (file: UploadFile) => boolean | Promise<boolean> | void

  /**
   * 是否支持多选
   * @default false
   */
  multiple?: boolean

  /**
   * 自定义类名
   */
  className?: string
}
