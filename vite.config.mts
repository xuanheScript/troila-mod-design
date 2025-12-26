import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { UserConfigExport } from 'vite'
import dts from 'vite-plugin-dts'
import { configDefaults, defineConfig } from 'vitest/config'
import { name } from './package.json'

const app = async (): Promise<UserConfigExport> => {
  /**
   * Removes everything before the last
   * @octocat/library-repo -> library-repo
   * vite-component-library-template -> vite-component-library-template
   */
  const formattedName = name.match(/[^/]+$/)?.[0] ?? name

  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
      }),
      tailwindcss(),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/lib/index.ts'),
        name: formattedName,
        formats: ['es', 'umd'],
        fileName: format => `${formattedName}.${format}.js`,
      },
      rollupOptions: {
        external: [
          'react',
          'react/jsx-runtime',
          'react-dom',
          'tailwindcss',
          /^@radix-ui\/.*/,
          'clsx',
          'class-variance-authority',
          'tailwind-merge',
          'lucide-react',
          'date-fns',
          'react-hook-form',
          '@hookform/resolvers',
          'zod',
          '@tanstack/react-table',
          'react-dropzone',
          'sonner',
          'next-themes',
          'react-day-picker',
          'tailwindcss-animate',
        ],
        output: [
          {
            format: 'es',
            // ES 格式保留模块结构，支持按需加载和 tree-shaking
            preserveModules: true,
            preserveModulesRoot: 'src/lib',
            entryFileNames: '[name].js',
            assetFileNames: 'assets/[name][extname]',
          },
          {
            format: 'umd',
            name: formattedName,
            // UMD 格式打包成单文件，用于 CDN 和传统项目
            entryFileNames: `${formattedName}.umd.js`,
            globals: {
              react: 'React',
              'react/jsx-runtime': 'react/jsx-runtime',
              'react-dom': 'ReactDOM',
              tailwindcss: 'tailwindcss',
            },
          },
        ],
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      coverage: {
        exclude: [
          ...(configDefaults.coverage.exclude ?? []),
          '**/storybook-static/*',
          '**/*.stories.tsx',
          '**/*.config.js',
        ],
      },
    },
  })
}
// https://vitejs.dev/config/
export default app
