// tailwind config is required for editor support
import sharedConfig from '@miaoma-doc/shadcn-shared-ui/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Pick<Config, 'presets'> = {
  presets: [
    {
      ...sharedConfig,
      content: ['./src/**/*.{js,ts,jsx,tsx}', '../../../packages/shadcn-shared-ui/src/**/*{.js,.ts,.jsx,.tsx}'],
    },
  ],
}

export default config
