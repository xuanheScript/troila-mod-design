import type { Meta, StoryObj } from '@storybook/react'
import { Toaster } from './sonner'
import { Button } from './button'
import { toast } from 'sonner'

const meta = {
  title: 'UI/Sonner',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <Button onClick={() => toast('This is a toast message')}>
        Show Toast
      </Button>
    </>
  ),
}

export const Success: Story = {
  render: () => (
    <>
      <Toaster />
      <Button onClick={() => toast.success('Event has been created')}>
        Show Success Toast
      </Button>
    </>
  ),
}

export const Error: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="destructive"
        onClick={() => toast.error('Something went wrong')}
      >
        Show Error Toast
      </Button>
    </>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
          })
        }
      >
        Show Toast with Description
      </Button>
    </>
  ),
}

export const WithAction: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        onClick={() =>
          toast('Event has been created', {
            action: {
              label: 'Undo',
              onClick: () => toast('Undo action triggered'),
            },
          })
        }
      >
        Show Toast with Action
      </Button>
    </>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button onClick={() => toast('Default toast')}>Default</Button>
        <Button onClick={() => toast.success('Success toast')}>Success</Button>
        <Button onClick={() => toast.error('Error toast')}>Error</Button>
        <Button onClick={() => toast.warning('Warning toast')}>Warning</Button>
        <Button onClick={() => toast.info('Info toast')}>Info</Button>
        <Button onClick={() => toast.loading('Loading toast')}>Loading</Button>
      </div>
    </>
  ),
}
