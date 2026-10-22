import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { withPayload } from '@payloadcms/tanstack-start'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import rsc from '@vitejs/plugin-rsc'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(
  withPayload(
    ({ pluginOptions }) => ({
      resolve: { tsconfigPaths: true },
      plugins: [
        rsc(pluginOptions.rsc),
        nitro({
          ...pluginOptions.nitro,
          // file-type loads these dynamically; nitro's tracer misses them (500 on /api/media/file/*).
          traceDeps: [...pluginOptions.nitro.traceDeps, 'file-type*', 'strtok3*', 'token-types*', '@tokenizer*'],
        }),
        tailwindcss(),
        tanstackStart(pluginOptions.tanstackStart),
        viteReact(pluginOptions.react),
      ],
    }),
    {
      payloadConfigPath: path.resolve(dirname, 'src/payload/payload.config.ts'),
      routesDirectory: 'routes',
    },
  ),
)
