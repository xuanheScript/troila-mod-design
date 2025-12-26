import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BaseSelect } from './index'

describe('BaseSelect', () => {
  const mockOptions = [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' },
  ]

  it('应该正确渲染', () => {
    render(
      <BaseSelect
        options={mockOptions}
        placeholder="请选择"
      />
    )

    expect(screen.getByText('请选择')).toBeInTheDocument()
  })

  it('应该显示选中的值', () => {
    render(
      <BaseSelect
        value="1"
        options={mockOptions}
      />
    )

    expect(screen.getByText('选项1')).toBeInTheDocument()
  })

  it('应该支持默认值', () => {
    render(
      <BaseSelect
        defaultValue="2"
        options={mockOptions}
      />
    )

    expect(screen.getByText('选项2')).toBeInTheDocument()
  })

  it('应该在值变化时调用 onChange', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <BaseSelect
        options={mockOptions}
        onChange={handleChange}
        placeholder="请选择"
      />
    )

    // 点击 trigger 打开下拉框
    await user.click(screen.getByText('请选择'))

    // 选择选项
    await user.click(screen.getByText('选项2'))

    expect(handleChange).toHaveBeenCalledWith('2')
  })

  it('应该支持数字类型的值', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    const numberOptions = [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
    ]

    render(
      <BaseSelect
        options={numberOptions}
        onChange={handleChange}
        placeholder="请选择"
      />
    )

    await user.click(screen.getByText('请选择'))
    await user.click(screen.getByText('20'))

    expect(handleChange).toHaveBeenCalledWith(20)
  })

  it('应该支持禁用状态', () => {
    render(
      <BaseSelect
        options={mockOptions}
        disabled
        placeholder="请选择"
      />
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeDisabled()
  })

  it('应该支持禁用单个选项', async () => {
    const user = userEvent.setup()

    const optionsWithDisabled = [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2', disabled: true },
      { label: '选项3', value: '3' },
    ]

    render(
      <BaseSelect
        options={optionsWithDisabled}
        placeholder="请选择"
      />
    )

    await user.click(screen.getByText('请选择'))

    const option2 = screen.getByRole('option', { name: '选项2' })
    expect(option2).toHaveAttribute('data-disabled')
  })

  it('应该支持自定义类名', () => {
    const { container } = render(
      <BaseSelect
        options={mockOptions}
        className="custom-class"
        placeholder="请选择"
      />
    )

    const trigger = container.querySelector('.custom-class')
    expect(trigger).toBeInTheDocument()
  })
})
