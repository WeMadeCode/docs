/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Editor } from '@tiptap/core'
import { useEffect, useState } from 'react'

function useForceUpdate() {
    const [, setValue] = useState(0)

    return () => setValue(value => value + 1)
}

// This is a component that is similar to https://github.com/ueberdosis/tiptap/blob/main/packages/react/src/useEditor.ts
// Use it to rerender a component whenever a transaction happens in the editor
export const useEditorForceUpdate = (editor: Editor) => {
    const forceUpdate = useForceUpdate()

    useEffect(() => {
        const callback = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    forceUpdate()
                })
            })
        }

        editor.on('transaction', callback)
        return () => {
            editor.off('transaction', callback)
        }
    }, [editor])
}
