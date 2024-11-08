/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps } from '@miaoma-doc/react'
import { useForm } from 'react-hook-form'

import { useShadCNComponentsContext } from '../ShadCNComponentsContext'

export const Form = (props: ComponentProps['Generic']['Form']['Root']) => {
    const { children, ...rest } = props

    assertEmpty(rest)

    const ShadCNComponents = useShadCNComponentsContext()!

    const form = useForm()

    return <ShadCNComponents.Form.Form {...form}>{children}</ShadCNComponents.Form.Form>
}
