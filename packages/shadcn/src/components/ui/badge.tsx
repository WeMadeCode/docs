/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
    'bn-inline-flex bn-items-center bn-rounded-full bn-border bn-px-2.5 bn-py-0.5 bn-text-xs bn-font-semibold bn-transition-colors focus:bn-outline-none focus:bn-ring-2 focus:bn-ring-ring focus:bn-ring-offset-2',
    {
        variants: {
            variant: {
                default: 'bn-border-transparent bn-bg-primary bn-text-primary-foreground hover:bn-bg-primary/80',
                secondary: 'bn-border-transparent bn-bg-secondary bn-text-secondary-foreground hover:bn-bg-secondary/80',
                destructive: 'bn-border-transparent bn-bg-destructive bn-text-destructive-foreground hover:bn-bg-destructive/80',
                outline: 'bn-text-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
