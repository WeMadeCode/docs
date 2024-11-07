/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */

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
