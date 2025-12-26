import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Calendar } from './calendar'

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    // biome-ignore lint/correctness/useHookAtTopLevel: Storybook pattern
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    )
  },
}

export const MultipleMonths: Story = {
  render: () => {
    // biome-ignore lint/correctness/useHookAtTopLevel: Storybook pattern
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        className="rounded-md border"
      />
    )
  },
}

export const DisabledDates: Story = {
  render: () => {
    // biome-ignore lint/correctness/useHookAtTopLevel: Storybook pattern
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(date) =>
          date < new Date() || date > new Date('2024-12-31')
        }
        className="rounded-md border"
      />
    )
  },
}
