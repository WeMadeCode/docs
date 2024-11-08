/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps } from '@miaoma-doc/react'
import { forwardRef } from 'react'

import { useShadCNComponentsContext } from '../ShadCNComponentsContext'

export const PanelFileInput = forwardRef<HTMLInputElement, ComponentProps['FilePanel']['FileInput']>((props, ref) => {
    const { className, accept, value, placeholder, onChange, ...rest } = props

    assertEmpty(rest)

    const ShadCNComponents = useShadCNComponentsContext()!

    return (
        <ShadCNComponents.Input.Input
            type={'file'}
            className={className}
            ref={ref}
            accept={accept}
            value={value ? value.name : undefined}
            onChange={async e => onChange?.(e.target.files![0])}
            placeholder={placeholder}
        />
    )
})
