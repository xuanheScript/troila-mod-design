import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'
import '../src/lib/tailwind/theme.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light'

      useEffect(() => {
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
      }, [theme])

      return (
        <div className="min-h-screen bg-background text-foreground p-8">
          <Story />
        </div>
      )
    },
  ],
  globalTypes: {
    theme: {
      description: '主题切换',
      defaultValue: 'light',
      toolbar: {
        title: '主题',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: '亮色主题' },
          { value: 'dark', icon: 'moon', title: '暗色主题' },
        ],
        dynamicTitle: true,
      },
    },
  },
}

export default preview
