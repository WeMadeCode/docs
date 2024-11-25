/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { PartialBlock } from '@miaoma-doc/core'
import { Button } from '@miaoma-doc/shadcn-shared-ui/components/ui/button'
import { ArrowUp, Loader, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import TextareaAutosize from 'react-textarea-autosize'

interface BasicAIChatPanelProps {
    onResponse?: (response: PartialBlock[]) => void
}

export function BasicAIChatPanel(props: BasicAIChatPanelProps) {
    const [keyword, setKeyword] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

    const ref = useHotkeys(
        'Enter',
        () => {
            console.log('send message:', keyword)
            if (keyword) {
                setIsGenerating(true)

                fetch('https://api.dify.ai/v1/chat-messages', {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer app-7nK3QYaWRVZIk58h8R5Cryge',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        inputs: {},
                        query: keyword,
                        // response_mode: 'streaming',
                        response_mode: 'blocking',
                        conversation_id: '',
                        user: 'abc-123',
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        const answerData = JSON.parse(data.answer)
                        console.log('AI response:', answerData)
                        setIsGenerating(false)
                        if (props.onResponse) {
                            props.onResponse(answerData)
                        }
                    })
                    .then(data => {
                        console.log('AI response:', data)
                    })
                    .catch(error => {
                        console.error('Error:', error)
                    })
            }
        },
        {
            enableOnFormTags: true,
        }
    )

    return (
        <div className="flex p-2 bg-zinc-50 rounded-lg shadow-2xl border border-zinc-200">
            <div className="self-stretch px-2 mt-1">
                <Sparkles color="#6B45FF" size={18} />
            </div>
            <div className="flex flex-1 items-center justify-center outline-none">
                <TextareaAutosize
                    disabled={isGenerating}
                    ref={ref}
                    placeholder="请输入你想书写的主题，我来帮你发挥"
                    autoFocus
                    className="flex-1 outline-none px-2 resize-none bg-transparent text-sm items-stretch"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                />
            </div>
            {isGenerating ? (
                <div className="self-end">
                    <Loader size={20} color="#6B45FF" className="animate-spin" />
                </div>
            ) : (
                <Button size="sm" disabled={!keyword || isGenerating} className="self-end size-6">
                    <ArrowUp />
                </Button>
            )}
        </div>
    )
}
