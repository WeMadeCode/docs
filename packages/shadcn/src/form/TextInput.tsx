/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps } from '@miaoma-doc/react'
import { forwardRef } from 'react'

import { useShadCNComponentsContext } from '../ShadCNComponentsContext'

export const TextInput = forwardRef<HTMLInputElement, ComponentProps['Generic']['Form']['TextInput']>((props, ref) => {
    const {
        className,
        name,
        label,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        icon, // TODO: implement
        value,
        autoFocus,
        placeholder,
        onKeyDown,
        onChange,
        onSubmit,
        ...rest
    } = props

    assertEmpty(rest)

    const ShadCNComponents = useShadCNComponentsContext()!

    if (!label) {
        return (
            <ShadCNComponents.Input.Input
                aria-label={name}
                name={name}
                autoFocus={autoFocus}
                placeholder={placeholder}
                value={value}
                onKeyDown={onKeyDown}
                onChange={onChange}
                onSubmit={onSubmit}
                ref={ref}
            />
        )
    }

    return (
        <div>
            <ShadCNComponents.Label.Label htmlFor={label}>{label}</ShadCNComponents.Label.Label>
            <ShadCNComponents.Input.Input
                className={className}
                id={label}
                name={name}
                autoFocus={autoFocus}
                placeholder={placeholder}
                value={value}
                onKeyDown={onKeyDown}
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </div>
    )
})
