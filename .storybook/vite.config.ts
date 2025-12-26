import react from '@vitejs/plugin-react'
import path from 'node:path'
import type { UserConfigExport } from 'vite'
import { defineConfig } from 'vitest/config'

const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
    },
  })
}
// https://vitejs.dev/config/
export default app
