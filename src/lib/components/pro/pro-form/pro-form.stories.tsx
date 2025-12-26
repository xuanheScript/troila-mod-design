import type { Meta, StoryObj } from '@storybook/react'
import { ProForm } from './index'
import { z } from 'zod'
import { toast } from 'sonner'

const meta: Meta<typeof ProForm> = {
  title: 'Pro Components/ProForm',
  component: ProForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProForm>

/**
 * 基础表单示例 - 垂直布局
 */
export const Basic: Story = {
  args: {
    columns: [
      {
        name: 'username',
        label: '用户名',
        valueType: 'text',
        placeholder: '请输入用户名',
        required: true,
      },
      {
        name: 'email',
        label: '邮箱',
        valueType: 'text',
        placeholder: '请输入邮箱',
        required: true,
      },
      {
        name: 'age',
        label: '年龄',
        valueType: 'digit',
        placeholder: '请输入年龄',
      },
      {
        name: 'bio',
        label: '个人简介',
        valueType: 'textarea',
        placeholder: '请输入个人简介',
        fieldProps: {
          rows: 4,
        },
      },
    ],
    layout: 'vertical',
    onFinish: async (values) => {
      console.log('表单提交:', values)
      toast.success('提交成功', {
        description: JSON.stringify(values, null, 2),
      })
    },
  },
}

/**
 * 水平布局表单
 */
export const Horizontal: Story = {
  args: {
    columns: [
      {
        name: 'username',
        label: '用户名',
        valueType: 'text',
        required: true,
      },
      {
        name: 'password',
        label: '密码',
        valueType: 'password',
        required: true,
      },
    ],
    layout: 'horizontal',
    labelWidth: 100,
    onFinish: async (values) => {
      console.log('登录:', values)
      toast.success('登录成功')
    },
  },
}

/**
 * Grid 布局 - 两列
 */
export const GridLayout: Story = {
  args: {
    columns: [
      {
        name: 'firstName',
        label: '名',
        valueType: 'text',
        required: true,
      },
      {
        name: 'lastName',
        label: '姓',
        valueType: 'text',
        required: true,
      },
      {
        name: 'email',
        label: '邮箱',
        valueType: 'text',
        required: true,
      },
      {
        name: 'phone',
        label: '手机号',
        valueType: 'text',
      },
      {
        name: 'address',
        label: '地址',
        valueType: 'textarea',
        colProps: { span: 2 }, // 占据两列
      },
    ],
    layout: 'vertical',
    grid: {
      column: 2,
      gutter: 16,
    },
    onFinish: async (values) => {
      console.log('提交:', values)
      toast.success('提交成功')
    },
  },
}

/**
 * 选择器示例
 */
export const WithSelects: Story = {
  args: {
    columns: [
      {
        name: 'name',
        label: '姓名',
        valueType: 'text',
        required: true,
      },
      {
        name: 'gender',
        label: '性别',
        valueType: 'select',
        valueEnum: {
          male: { text: '男' },
          female: { text: '女' },
          other: { text: '其他' },
        },
        required: true,
      },
      {
        name: 'role',
        label: '角色',
        valueType: 'radio',
        valueEnum: {
          admin: { text: '管理员' },
          user: { text: '普通用户' },
          guest: { text: '访客' },
        },
      },
      {
        name: 'interests',
        label: '兴趣',
        valueType: 'checkbox',
        valueEnum: {
          sports: { text: '运动' },
          reading: { text: '阅读' },
          music: { text: '音乐' },
          travel: { text: '旅游' },
        },
      },
    ],
    layout: 'vertical',
    onFinish: async (values) => {
      console.log('提交:', values)
      toast.success('提交成功')
    },
  },
}

/**
 * Switch 开关示例
 */
export const WithSwitch: Story = {
  args: {
    columns: [
      {
        name: 'username',
        label: '用户名',
        valueType: 'text',
        required: true,
      },
      {
        name: 'emailNotification',
        label: '邮件通知',
        valueType: 'switch',
        tooltip: '是否接收邮件通知',
        initialValue: true,
      },
      {
        name: 'smsNotification',
        label: '短信通知',
        valueType: 'switch',
        tooltip: '是否接收短信通知',
        initialValue: false,
      },
    ],
    layout: 'vertical',
    onFinish: async (values) => {
      console.log('设置:', values)
      toast.success('设置已保存')
    },
  },
}

/**
 * 只读模式
 */
export const Readonly: Story = {
  args: {
    columns: [
      {
        name: 'username',
        label: '用户名',
        valueType: 'text',
      },
      {
        name: 'email',
        label: '邮箱',
        valueType: 'text',
      },
      {
        name: 'role',
        label: '角色',
        valueType: 'select',
        valueEnum: {
          admin: { text: '管理员' },
          user: { text: '普通用户' },
        },
      },
    ],
    initialValues: {
      username: 'johndoe',
      email: 'john@example.com',
      role: 'admin',
    },
    layout: 'vertical',
    readonly: true,
  },
}

/**
 * 禁用模式
 */
export const Disabled: Story = {
  args: {
    columns: [
      {
        name: 'username',
        label: '用户名',
        valueType: 'text',
      },
      {
        name: 'email',
        label: '邮箱',
        valueType: 'text',
      },
    ],
    layout: 'vertical',
    disabled: true,
  },
}

/**
 * Zod Schema 校验
 */
export const WithZodValidation: Story = {
  args: {
    columns: [
      {
        name: 'username',
        label: '用户名',
        valueType: 'text',
        placeholder: '至少3个字符',
        required: true,
      },
      {
        name: 'email',
        label: '邮箱',
        valueType: 'text',
        placeholder: '请输入有效的邮箱',
        required: true,
      },
      {
        name: 'age',
        label: '年龄',
        valueType: 'digit',
        placeholder: '必须大于18',
        required: true,
      },
      {
        name: 'password',
        label: '密码',
        valueType: 'password',
        placeholder: '至少6个字符',
        required: true,
      },
    ],
    schema: z.object({
      username: z.string().min(3, '用户名至少3个字符'),
      email: z.string().email('请输入有效的邮箱'),
      age: z.number().min(18, '年龄必须大于18'),
      password: z.string().min(6, '密码至少6个字符'),
    }),
    layout: 'vertical',
    onFinish: async (values) => {
      console.log('校验通过:', values)
      toast.success('校验通过,提交成功')
    },
  },
}

/**
 * 初始值示例
 */
export const WithInitialValues: Story = {
  args: {
    columns: [
      {
        name: 'username',
        label: '用户名',
        valueType: 'text',
      },
      {
        name: 'email',
        label: '邮箱',
        valueType: 'text',
      },
      {
        name: 'gender',
        label: '性别',
        valueType: 'radio',
        valueEnum: {
          male: { text: '男' },
          female: { text: '女' },
        },
      },
      {
        name: 'newsletter',
        label: '订阅新闻',
        valueType: 'switch',
      },
    ],
    initialValues: {
      username: 'johndoe',
      email: 'john@example.com',
      gender: 'male',
      newsletter: true,
    },
    layout: 'vertical',
    onFinish: async (values) => {
      console.log('更新:', values)
      toast.success('更新成功')
    },
  },
}

/**
 * 自定义提交按钮
 */
export const CustomSubmitter: Story = {
  args: {
    columns: [
      {
        name: 'title',
        label: '标题',
        valueType: 'text',
        required: true,
      },
      {
        name: 'content',
        label: '内容',
        valueType: 'textarea',
        required: true,
      },
    ],
    layout: 'vertical',
    submitter: {
      submitButtonProps: {
        children: '发布文章',
      },
      resetButtonProps: {
        children: '清空',
      },
      align: 'center',
    },
    onFinish: async (values) => {
      console.log('发布:', values)
      toast.success('文章已发布')
    },
  },
}

/**
 * 无提交按钮
 */
export const NoSubmitter: Story = {
  args: {
    columns: [
      {
        name: 'search',
        label: '搜索',
        valueType: 'text',
        placeholder: '请输入搜索关键词',
      },
    ],
    layout: 'inline',
    submitter: false,
  },
}

/**
 * 复杂表单示例
 */
export const ComplexForm: Story = {
  args: {
    columns: [
      {
        name: 'title',
        label: '文章标题',
        valueType: 'text',
        required: true,
        tooltip: '请输入吸引人的标题',
        colProps: { span: 2 },
      },
      {
        name: 'category',
        label: '分类',
        valueType: 'select',
        required: true,
        valueEnum: {
          tech: { text: '技术' },
          life: { text: '生活' },
          travel: { text: '旅游' },
        },
      },
      {
        name: 'tags',
        label: '标签',
        valueType: 'checkbox',
        valueEnum: {
          react: { text: 'React' },
          vue: { text: 'Vue' },
          node: { text: 'Node.js' },
          typescript: { text: 'TypeScript' },
        },
      },
      {
        name: 'content',
        label: '文章内容',
        valueType: 'textarea',
        required: true,
        colProps: { span: 2 },
        fieldProps: {
          rows: 8,
        },
      },
      {
        name: 'published',
        label: '立即发布',
        valueType: 'switch',
        initialValue: false,
      },
      {
        name: 'allowComments',
        label: '允许评论',
        valueType: 'switch',
        initialValue: true,
      },
    ],
    layout: 'vertical',
    grid: {
      column: 2,
      gutter: 16,
    },
    submitter: {
      submitButtonProps: {
        children: '发布文章',
      },
      align: 'right',
    },
    onFinish: async (values) => {
      console.log('文章数据:', values)
      toast.success('文章发布成功', {
        description: `标题: ${values.title}`,
      })
    },
  },
}

/**
 * 日期选择示例
 */
export const WithDatePickers: Story = {
  args: {
    columns: [
      {
        name: 'name',
        label: '姓名',
        valueType: 'text',
        required: true,
      },
      {
        name: 'birthday',
        label: '生日',
        valueType: 'date',
        tooltip: '请选择您的生日',
      },
      {
        name: 'appointmentTime',
        label: '预约时间',
        valueType: 'dateTime',
        tooltip: '选择具体的日期和时间',
      },
      {
        name: 'vacationPeriod',
        label: '休假时段',
        valueType: 'dateRange',
        tooltip: '选择休假的开始和结束日期',
      },
    ],
    layout: 'vertical',
    onFinish: async (values) => {
      console.log('提交数据:', values)
      toast.success('提交成功', {
        description: `姓名: ${values.name}`,
      })
    },
  },
}

/**
 * 文件上传示例
 */
export const WithUpload: Story = {
  args: {
    columns: [
      {
        name: 'title',
        label: '标题',
        valueType: 'text',
        required: true,
      },
      {
        name: 'avatar',
        label: '头像',
        valueType: 'uploadImage',
        tooltip: '上传您的头像照片',
        fieldProps: {
          maxCount: 1,
          maxSize: 2,
          listType: 'picture-card',
        },
      },
      {
        name: 'photos',
        label: '相册',
        valueType: 'upload',
        tooltip: '上传多张照片',
        fieldProps: {
          maxCount: 5,
          maxSize: 5,
          listType: 'picture-card',
          customRequest: ({ file, onProgress, onSuccess, onError }: any) => {
            // 模拟上传
            let progress = 0
            const timer = setInterval(() => {
              progress += 10
              onProgress(progress)
              if (progress >= 100) {
                clearInterval(timer)
                onSuccess({
                  url: URL.createObjectURL(file),
                  name: file.name,
                })
              }
            }, 100)
          },
        },
      },
      {
        name: 'description',
        label: '描述',
        valueType: 'textarea',
      },
    ],
    layout: 'vertical',
    onFinish: async (values) => {
      console.log('提交数据:', values)
      toast.success('提交成功')
    },
  },
}

/**
 * 综合表单示例 - 包含所有字段类型
 */
export const AllFieldTypes: Story = {
  args: {
    columns: [
      {
        name: 'username',
        label: '用户名',
        valueType: 'text',
        required: true,
        colProps: { span: 1 },
      },
      {
        name: 'email',
        label: '邮箱',
        valueType: 'text',
        required: true,
        colProps: { span: 1 },
      },
      {
        name: 'age',
        label: '年龄',
        valueType: 'digit',
        colProps: { span: 1 },
      },
      {
        name: 'gender',
        label: '性别',
        valueType: 'radio',
        valueEnum: {
          male: { text: '男' },
          female: { text: '女' },
        },
        colProps: { span: 1 },
      },
      {
        name: 'birthday',
        label: '生日',
        valueType: 'date',
        colProps: { span: 1 },
      },
      {
        name: 'interests',
        label: '兴趣爱好',
        valueType: 'checkbox',
        valueEnum: {
          reading: { text: '阅读' },
          sports: { text: '运动' },
          music: { text: '音乐' },
          travel: { text: '旅游' },
        },
        colProps: { span: 1 },
      },
      {
        name: 'avatar',
        label: '头像',
        valueType: 'uploadImage',
        fieldProps: {
          maxCount: 1,
          listType: 'picture-card',
        },
        colProps: { span: 2 },
      },
      {
        name: 'subscribe',
        label: '订阅新闻',
        valueType: 'switch',
        colProps: { span: 2 },
      },
      {
        name: 'bio',
        label: '个人简介',
        valueType: 'textarea',
        colProps: { span: 2 },
      },
    ],
    layout: 'vertical',
    grid: {
      column: 2,
      gutter: 16,
    },
    onFinish: async (values) => {
      console.log('综合表单提交:', values)
      toast.success('提交成功', {
        description: '所有字段已保存',
      })
    },
  },
}

/**
 * 时间选择示例
 */
export const WithTimePickers: Story = {
  args: {
    columns: [
      {
        name: 'eventName',
        label: '活动名称',
        valueType: 'text',
        required: true,
      },
      {
        name: 'startTime',
        label: '开始时间',
        valueType: 'time',
        tooltip: '请选择活动开始时间',
        required: true,
      },
      {
        name: 'endTime',
        label: '结束时间',
        valueType: 'time',
        tooltip: '请选择活动结束时间',
      },
      {
        name: 'workingHours',
        label: '工作时段',
        valueType: 'timeRange',
        tooltip: '选择工作的开始和结束时间',
      },
    ],
    layout: 'vertical',
    onFinish: async (values) => {
      console.log('提交数据:', values)
      toast.success('提交成功', {
        description: `活动: ${values.eventName}`,
      })
    },
  },
}

/**
 * 完整字段类型示例 - 包含所有日期时间字段
 */
export const AllDateTimeFields: Story = {
  args: {
    columns: [
      {
        name: 'title',
        label: '标题',
        valueType: 'text',
        required: true,
        colProps: { span: 2 },
      },
      {
        name: 'date',
        label: '日期',
        valueType: 'date',
        tooltip: '选择日期',
      },
      {
        name: 'dateTime',
        label: '日期时间',
        valueType: 'dateTime',
        tooltip: '选择日期和时间',
      },
      {
        name: 'dateRange',
        label: '日期范围',
        valueType: 'dateRange',
        tooltip: '选择日期范围',
        colProps: { span: 2 },
      },
      {
        name: 'time',
        label: '时间',
        valueType: 'time',
        tooltip: '选择时间',
      },
      {
        name: 'timeRange',
        label: '时间范围',
        valueType: 'timeRange',
        tooltip: '选择时间范围',
      },
    ],
    layout: 'vertical',
    grid: {
      column: 2,
      gutter: 16,
    },
    onFinish: async (values) => {
      console.log('所有日期时间字段:', values)
      toast.success('提交成功', {
        description: '所有日期时间字段已保存',
      })
    },
  },
}
