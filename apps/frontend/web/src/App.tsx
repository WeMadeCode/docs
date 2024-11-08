/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import './App.css'
import '@miaoma-doc/shadcn/style.css'

import { locales } from '@miaoma-doc/core'
import { useCreateMiaomaDoc } from '@miaoma-doc/react'
import { MiaomaDocView } from '@miaoma-doc/shadcn'
import { Button } from '@miaoma-doc/shadcn-shared-ui/components/ui/button'
import { Input } from '@miaoma-doc/shadcn-shared-ui/components/ui/input'
import { useEffect } from 'react'

function App() {
    const editor = useCreateMiaomaDoc({
        dictionary: locales.zh,
    })
    console.log('🚀 ~ App ~ editor:', editor)

    useEffect(() => {
        editor.onChange(value => {
            console.log(value)
        })
    }, [editor])

    return (
        <>
            <h1>妙码协同文档 | 妙码学院</h1>
            <Input />
            <Button>按钮</Button>
            <MiaomaDocView editor={editor} theme="light" />
        </>
    )
}

export default App
