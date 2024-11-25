/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { createReactBlockSpec } from '@miaoma-doc/react'
export const AI = createReactBlockSpec(
    {
        type: 'ai',
        propSchema: {},
        content: 'none',
    },
    {
        render: props => {
            return (
                <div className="text-2xl font-bold text-center">
                    <div className="text-3xl">AI 人工智能</div>
                    <div className="text-xl">AI 人工智能是未来的趋势</div>
                    <div>{props.block.type}</div>
                </div>
            )
        },
    }
)
