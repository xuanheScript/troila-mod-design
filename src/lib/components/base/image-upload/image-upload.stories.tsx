import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ImageUpload } from './index'
import type { UploadFile } from './types'
import { toast } from 'sonner'
import { Toaster } from '../../ui/sonner'

const meta = {
  title: 'Base Components/ImageUpload',
  component: ImageUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxCount: {
      control: 'number',
      description: '最大上传数量',
    },
    maxSize: {
      control: 'number',
      description: '最大文件大小（MB）',
    },
    listType: {
      control: 'select',
      options: ['picture-card', 'picture', 'text'],
      description: '上传列表的内建样式',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    multiple: {
      control: 'boolean',
      description: '是否支持多选',
    },
  },
} satisfies Meta<typeof ImageUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    // biome-ignore lint/correctness/useHookAtTopLevel: Storybook pattern
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <>
        <Toaster />
        <div className="w-96">
          <ImageUpload
            value={fileList}
            onChange={setFileList}
            maxCount={1}
            onPreview={(file) => {
              toast.info('预览文件', {
                description: file.name,
              })
            }}
          />
        </div>
      </>
    )
  },
}

export const Multiple: Story = {
  render: () => {
    // biome-ignore lint/correctness/useHookAtTopLevel: Storybook pattern
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <>
        <Toaster />
        <div className="w-full max-w-2xl">
          <ImageUpload
            value={fileList}
            onChange={setFileList}
            maxCount={5}
            multiple
            onPreview={(file) => {
              toast.info('预览文件', {
                description: file.name,
              })
            }}
            onRemove={(file) => {
              toast.success('删除文件', {
                description: file.name,
              })
            }}
          />
        </div>
      </>
    )
  },
}

export const PictureList: Story = {
  render: () => {
    // biome-ignore lint/correctness/useHookAtTopLevel: Storybook pattern
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <>
        <Toaster />
        <div className="w-full max-w-2xl">
          <ImageUpload
            value={fileList}
            onChange={setFileList}
            maxCount={3}
            multiple
            listType="picture"
            onPreview={(file) => {
              toast.info('预览文件', {
                description: file.name,
              })
            }}
          />
        </div>
      </>
    )
  },
}

export const TextList: Story = {
  render: () => {
    // biome-ignore lint/correctness/useHookAtTopLevel: Storybook pattern
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <>
        <Toaster />
        <div className="w-full max-w-2xl">
          <ImageUpload
            value={fileList}
            onChange={setFileList}
            maxCount={3}
            multiple
            listType="text"
          />
        </div>
      </>
    )
  },
}

export const WithSizeLimit: Story = {
  render: () => {
    // biome-ignore lint/correctness/useHookAtTopLevel: Storybook pattern
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <>
        <Toaster />
        <div className="w-96">
          <ImageUpload
            value={fileList}
            onChange={setFileList}
            maxCount={3}
            maxSize={2}
            multiple
            beforeUpload={(file) => {
              const isLt2M = file.size / 1024 / 1024 < 2
              if (!isLt2M) {
                toast.error('文件过大', {
                  description: `${file.name} 超过 2MB 限制`,
                })
              }
              return isLt2M
            }}
          />
        </div>
      </>
    )
  },
}

export const CustomRequest: Story = {
  render: () => {
    // biome-ignore lint/correctness/useHookAtTopLevel: Storybook pattern
    const [fileList, setFileList] = useState<UploadFile[]>([])

    return (
      <>
        <Toaster />
        <div className="w-96">
          <ImageUpload
            value={fileList}
            onChange={setFileList}
            maxCount={3}
            multiple
            customRequest={({ file, onProgress, onSuccess, onError }) => {
              // 模拟上传进度
              let progress = 0
              const interval = setInterval(() => {
                progress += 10
                onProgress?.(progress)

                if (progress >= 100) {
                  clearInterval(interval)
                  // 模拟成功
                  if (Math.random() > 0.2) {
                    onSuccess?.({ url: URL.createObjectURL(file) }, file)
                    toast.success('上传成功', {
                      description: file.name,
                    })
                  } else {
                    // 模拟失败
                    onError?.(new Error('上传失败'), file)
                    toast.error('上传失败', {
                      description: file.name,
                    })
                  }
                }
              }, 200)
            }}
          />
        </div>
      </>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    // biome-ignore lint/correctness/useHookAtTopLevel: Storybook pattern
    const [fileList, setFileList] = useState<UploadFile[]>([
      {
        uid: '1',
        name: 'example.jpg',
        status: 'done',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      },
    ])

    return (
      <div className="w-96">
        <ImageUpload
          value={fileList}
          onChange={setFileList}
          disabled
          maxCount={3}
        />
      </div>
    )
  },
}

export const WithInitialValues: Story = {
  render: () => {
    // biome-ignore lint/correctness/useHookAtTopLevel: Storybook pattern
    const [fileList, setFileList] = useState<UploadFile[]>([
      {
        uid: '1',
        name: 'mountain.jpg',
        status: 'done',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      },
      {
        uid: '2',
        name: 'ocean.jpg',
        status: 'done',
        url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0',
      },
    ])

    return (
      <>
        <Toaster />
        <div className="w-full max-w-2xl">
          <ImageUpload
            value={fileList}
            onChange={setFileList}
            maxCount={5}
            multiple
            onPreview={(file) => {
              toast.info('预览文件', {
                description: file.name,
              })
            }}
          />
        </div>
      </>
    )
  },
}
