import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ProTable } from './index'
import type { ProColumns } from './types'

// Mock 数据类型
interface UserType {
  id: string
  name: string
  age: number
  email: string
  status: 'active' | 'inactive' | 'pending'
  role: 'admin' | 'user' | 'guest'
  createdAt: string
  salary: number
  department: string
  country: string
}

// Mock 数据
const mockUsers: UserType[] = [
  {
    id: '1',
    name: '张三',
    age: 28,
    email: 'zhangsan@example.com',
    status: 'active',
    role: 'admin',
    createdAt: '2024-01-15',
    salary: 15000,
    department: '技术部',
    country: '中国',
  },
  {
    id: '2',
    name: '李四',
    age: 32,
    email: 'lisi@example.com',
    status: 'active',
    role: 'user',
    createdAt: '2024-02-20',
    salary: 12000,
    department: '产品部',
    country: '中国',
  },
  {
    id: '3',
    name: 'John Doe',
    age: 25,
    email: 'john@example.com',
    status: 'inactive',
    role: 'user',
    createdAt: '2024-03-10',
    salary: 8000,
    department: '市场部',
    country: '美国',
  },
  {
    id: '4',
    name: '王五',
    age: 35,
    email: 'wangwu@example.com',
    status: 'pending',
    role: 'guest',
    createdAt: '2024-04-05',
    salary: 6000,
    department: '运营部',
    country: '中国',
  },
  {
    id: '5',
    name: 'Jane Smith',
    age: 29,
    email: 'jane@example.com',
    status: 'active',
    role: 'admin',
    createdAt: '2024-05-12',
    salary: 18000,
    department: '技术部',
    country: '英国',
  },
  {
    id: '6',
    name: '赵六',
    age: 27,
    email: 'zhaoliu@example.com',
    status: 'active',
    role: 'user',
    createdAt: '2024-06-18',
    salary: 11000,
    department: '设计部',
    country: '中国',
  },
  {
    id: '7',
    name: 'Mike Johnson',
    age: 31,
    email: 'mike@example.com',
    status: 'inactive',
    role: 'user',
    createdAt: '2024-07-22',
    salary: 9500,
    department: '产品部',
    country: '加拿大',
  },
  {
    id: '8',
    name: '孙七',
    age: 26,
    email: 'sunqi@example.com',
    status: 'active',
    role: 'user',
    createdAt: '2024-08-30',
    salary: 10000,
    department: '技术部',
    country: '中国',
  },
]

const meta = {
  title: 'Pro Components/ProTable',
  component: ProTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# ProTable 高级表格组件

基于 \`@tanstack/react-table\` 和 shadcn/ui 实现的高级表格组件，API 兼容 ant-design-pro ProTable。

## 特性

- ✅ 静态数据和远程数据加载
- ✅ 内置搜索表单（可折叠）
- ✅ 列排序、筛选
- ✅ 前端/后端分页
- ✅ 行选择和批量操作
- ✅ 工具栏（刷新、密度、列设置）
- ✅ 完整的 TypeScript 泛型支持
- ✅ 多种 valueType 支持

## 使用方式

\`\`\`tsx
import { ProTable } from 'troila-pro-components'

function MyTable() {
  return (
    <ProTable
      columns={columns}
      request={async (params) => {
        const res = await fetch('/api/users', {
          body: JSON.stringify(params),
        })
        return res.json()
      }}
      rowKey="id"
    />
  )
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProTable>

export default meta
type Story = StoryObj<typeof meta>

// 基础列配置
const basicColumns: ProColumns<UserType>[] = [
  {
    title: '序号',
    valueType: 'indexBorder',
    width: 60,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    valueType: 'digit',
    hideInSearch: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    valueType: 'select',
    valueEnum: {
      active: { text: '激活', status: 'success' },
      inactive: { text: '未激活', status: 'default' },
      pending: { text: '待审核', status: 'warning' },
    },
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    valueType: 'select',
    valueEnum: {
      admin: { text: '管理员', status: 'error' },
      user: { text: '用户', status: 'processing' },
      guest: { text: '访客', status: 'default' },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    valueType: 'date',
    hideInSearch: true,
  },
]

/**
 * 基础用法 - 静态数据
 */
export const Basic: Story = {
  args: {
    columns: basicColumns,
    dataSource: mockUsers,
    rowKey: 'id',
    search: false,
    pagination: {
      pageSize: 5,
      showSizeChanger: true,
      pageSizeOptions: [5, 10, 20, 30, 40, 50],
    },
  },
}

/**
 * 带搜索表单
 */
export const WithSearch: Story = {
  args: {
    columns: basicColumns,
    dataSource: mockUsers,
    rowKey: 'id',
    search: {
      labelWidth: 'auto',
      defaultCollapsed: false,
    },
    pagination: {
      pageSize: 5,
      pageSizeOptions: [5, 10, 20, 30, 40, 50],
    },
  },
}

/**
 * 远程数据加载
 */
export const RemoteData: Story = {
  render: () => {
    const [loading, setLoading] = useState(false)

    return (
      <ProTable<UserType>
        columns={basicColumns}
        request={async (params, sort, filter) => {
          console.log('Request params:', { params, sort, filter })
          setLoading(true)

          // 模拟网络请求
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // 模拟过滤
          let data = [...mockUsers]

          // 按状态过滤
          if (params.status) {
            data = data.filter((item) => item.status === params.status)
          }

          // 按角色过滤
          if (params.role) {
            data = data.filter((item) => item.role === params.role)
          }

          // 按姓名搜索
          if (params.name) {
            data = data.filter((item) =>
              item.name.toLowerCase().includes(params.name.toLowerCase()),
            )
          }

          // 分页
          const { current = 1, pageSize = 10 } = params
          const start = (current - 1) * pageSize
          const end = start + pageSize
          const pageData = data.slice(start, end)

          setLoading(false)

          return {
            data: pageData,
            success: true,
            total: data.length,
          }
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 30, 40, 50],
        }}
      />
    )
  },
}

/**
 * 行选择和批量操作
 */
export const RowSelection: Story = {
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          已选择 {selectedRowKeys.length} 项
        </div>
        <ProTable<UserType>
          columns={basicColumns}
          dataSource={mockUsers}
          rowKey="id"
          search={false}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys as string[]),
          }}
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
    )
  },
}

/**
 * 自定义工具栏
 */
export const CustomToolbar: Story = {
  args: {
    columns: basicColumns,
    dataSource: mockUsers,
    rowKey: 'id',
    search: false,
    toolbar: {
      title: '用户列表',
      actions: [
        <button
          key="export"
          type="button"
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          导出数据
        </button>,
        <button
          key="add"
          type="button"
          className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
        >
          添加用户
        </button>,
      ],
    },
    options: {
      reload: true,
      density: true,
      setting: true,
    },
    pagination: {
      pageSize: 5,
      pageSizeOptions: [5, 10, 20, 30, 40, 50],
    },
  },
}

/**
 * 所有 ValueType 展示
 */
export const AllValueTypes: Story = {
  render: () => {
    const columns: ProColumns<UserType>[] = [
      {
        title: '序号（indexBorder）',
        valueType: 'indexBorder',
        width: 80,
      },
      {
        title: '姓名（text）',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '年龄（digit）',
        dataIndex: 'age',
        valueType: 'digit',
        hideInSearch: true,
      },
      {
        title: '薪资（money）',
        dataIndex: 'salary',
        valueType: 'money',
        hideInSearch: true,
        render: (_, record) => `¥${record.salary.toLocaleString()}`,
      },
      {
        title: '邮箱（text）',
        dataIndex: 'email',
        valueType: 'text',
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: '状态（select）',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          active: { text: '激活', status: 'success' },
          inactive: { text: '未激活', status: 'default' },
          pending: { text: '待审核', status: 'warning' },
        },
      },
      {
        title: '创建时间（date）',
        dataIndex: 'createdAt',
        valueType: 'date',
        hideInSearch: true,
      },
    ]

    return (
      <ProTable<UserType>
        columns={columns}
        dataSource={mockUsers}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 5,
          pageSizeOptions: [5, 10, 20, 30, 40, 50],
        }}
      />
    )
  },
}

/**
 * 可编辑列
 */
export const EditableColumns: Story = {
  render: () => {
    const [data, setData] = useState(mockUsers)

    const columns: ProColumns<UserType>[] = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        valueType: 'digit',
        hideInSearch: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
          active: { text: '激活', status: 'success' },
          inactive: { text: '未激活', status: 'default' },
          pending: { text: '待审核', status: 'warning' },
        },
      },
      {
        title: '操作',
        valueType: 'option',
        width: 150,
        render: (_, record) => [
          <button
            key="edit"
            type="button"
            className="text-sm text-primary hover:underline"
            onClick={() => {
              console.log('编辑:', record)
            }}
          >
            编辑
          </button>,
          <button
            key="delete"
            type="button"
            className="text-sm text-destructive hover:underline"
            onClick={() => {
              setData((prev) => prev.filter((item) => item.id !== record.id))
            }}
          >
            删除
          </button>,
        ],
      },
    ]

    return (
      <ProTable<UserType>
        columns={columns}
        dataSource={data}
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 5,
          pageSizeOptions: [5, 10, 20, 30, 40, 50],
        }}
      />
    )
  },
}

/**
 * 列固定
 */
export const FixedColumns: Story = {
  render: () => {
    const columns: ProColumns<UserType>[] = [
      {
        title: '姓名',
        dataIndex: 'name',
        fixed: 'left',
        width: 120,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 100,
        hideInSearch: true,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        width: 200,
        hideInSearch: true,
      },
      {
        title: '部门',
        dataIndex: 'department',
        width: 120,
        hideInSearch: true,
      },
      {
        title: '国家',
        dataIndex: 'country',
        width: 100,
        hideInSearch: true,
      },
      {
        title: '薪资',
        dataIndex: 'salary',
        width: 120,
        hideInSearch: true,
        render: (_, record) => `¥${record.salary.toLocaleString()}`,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        valueType: 'date',
        width: 120,
        hideInSearch: true,
      },
      {
        title: '操作',
        valueType: 'option',
        fixed: 'right',
        width: 100,
        render: () => [
          <button
            key="view"
            type="button"
            className="text-sm text-primary hover:underline"
          >
            查看
          </button>,
        ],
      },
    ]

    return (
      <ProTable<UserType>
        columns={columns}
        dataSource={mockUsers}
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 5,
          pageSizeOptions: [5, 10, 20, 30, 40, 50],
        }}
        scroll={{ x: 1200 }}
      />
    )
  },
}

/**
 * 空状态
 */
export const Empty: Story = {
  args: {
    columns: basicColumns,
    dataSource: [],
    rowKey: 'id',
    search: false,
  },
}

/**
 * 加载状态
 */
export const Loading: Story = {
  render: () => {
    const [loading, setLoading] = useState(true)

    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setLoading(!loading)}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md"
        >
          切换加载状态
        </button>
        <ProTable<UserType>
          columns={basicColumns}
          dataSource={loading ? undefined : mockUsers}
          loading={loading}
          rowKey="id"
          search={false}
          pagination={{
            pageSize: 5,
          }}
        />
      </div>
    )
  },
}

/**
 * 密度设置
 */
export const DensitySetting: Story = {
  args: {
    columns: basicColumns,
    dataSource: mockUsers,
    rowKey: 'id',
    search: false,
    options: {
      reload: true,
      density: true,
      setting: true,
    },
    pagination: {
      pageSize: 5,
      pageSizeOptions: [5, 10, 20, 30, 40, 50],
    },
  },
}

/**
 * 完整示例 - 所有功能
 */
export const FullFeatured: Story = {
  render: () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

    const columns: ProColumns<UserType>[] = [
      {
        title: '序号',
        valueType: 'indexBorder',
        width: 60,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        valueType: 'digit',
        sorter: true,
        hideInSearch: true,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        valueType: 'select',
        valueEnum: {
          active: { text: '激活', status: 'success' },
          inactive: { text: '未激活', status: 'default' },
          pending: { text: '待审核', status: 'warning' },
        },
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
        valueType: 'select',
        valueEnum: {
          admin: { text: '管理员', status: 'error' },
          user: { text: '用户', status: 'processing' },
          guest: { text: '访客', status: 'default' },
        },
      },
      {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
        hideInSearch: true,
      },
      {
        title: '薪资',
        dataIndex: 'salary',
        key: 'salary',
        valueType: 'money',
        sorter: true,
        hideInSearch: true,
        render: (_, record) => `¥${record.salary.toLocaleString()}`,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        valueType: 'date',
        sorter: true,
        hideInSearch: true,
      },
      {
        title: '操作',
        valueType: 'option',
        width: 120,
        render: (_, record) => [
          <button
            key="edit"
            type="button"
            className="text-sm text-primary hover:underline"
            onClick={() => console.log('编辑:', record)}
          >
            编辑
          </button>,
          <button
            key="delete"
            type="button"
            className="text-sm text-destructive hover:underline ml-2"
            onClick={() => console.log('删除:', record)}
          >
            删除
          </button>,
        ],
      },
    ]

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            已选择 {selectedRowKeys.length} 项
          </div>
          {selectedRowKeys.length > 0 && (
            <button
              type="button"
              className="px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded-md"
              onClick={() => {
                console.log('批量删除:', selectedRowKeys)
                setSelectedRowKeys([])
              }}
            >
              批量删除
            </button>
          )}
        </div>
        <ProTable<UserType>
          columns={columns}
          request={async (params, sort, filter) => {
            console.log('Request:', { params, sort, filter })
            await new Promise((resolve) => setTimeout(resolve, 500))

            let data = [...mockUsers]

            // 搜索过滤
            if (params.name) {
              data = data.filter((item) =>
                item.name.toLowerCase().includes(params.name.toLowerCase()),
              )
            }
            if (params.status) {
              data = data.filter((item) => item.status === params.status)
            }
            if (params.role) {
              data = data.filter((item) => item.role === params.role)
            }

            // 排序
            if (sort && Object.keys(sort).length > 0) {
              const [key, order] = Object.entries(sort)[0]
              data.sort((a, b) => {
                const aVal = a[key as keyof UserType]
                const bVal = b[key as keyof UserType]
                if (order === 'ascend') {
                  return aVal > bVal ? 1 : -1
                }
                return aVal < bVal ? 1 : -1
              })
            }

            // 分页
            const { current = 1, pageSize = 10 } = params
            const start = (current - 1) * pageSize
            const end = start + pageSize

            return {
              data: data.slice(start, end),
              success: true,
              total: data.length,
            }
          }}
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys as string[]),
          }}
          search={{
            labelWidth: 'auto',
            defaultCollapsed: false,
          }}
          toolbar={{
            title: '用户管理',
            actions: [
              <button
                key="export"
                type="button"
                className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
              >
                导出
              </button>,
              <button
                key="add"
                type="button"
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                新建用户
              </button>,
            ],
          }}
          options={{
            reload: true,
            density: true,
            setting: true,
          }}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
          }}
        />
      </div>
    )
  },
}
