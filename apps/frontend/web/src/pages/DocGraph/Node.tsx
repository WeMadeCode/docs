/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { cn } from '@miaoma-doc/shadcn-shared-ui/lib/utils'
import { Handle, NodeProps, Position } from '@xyflow/react'
import { memo, useMemo } from 'react'

interface GraphNodeProps extends NodeProps {
    data: {
        emoji: string
        title: string
    }
}

const randomBaseColor = () => {
    const colors = ['rgb(254, 226, 226)', 'rgb(224, 242, 254)', 'rgb(209, 250, 229)', 'rgb(236, 252, 203)']
    return colors[Math.floor(Math.random() * colors.length)]
}

export const GraphNode = memo((props: GraphNodeProps) => {
    const { data, selected } = props
    const color = useMemo(() => randomBaseColor(), [])

    return (
        <div className="w-full h-full">
            <Handle type="target" position={Position.Left} className="invisible bg-transparent" style={{ left: '50%' }} />
            <div className="flex flex-col justify-center items-center w-full pt-[36px]">
                <div
                    className={cn(
                        `flex items-center justify-center text-xl size-[36px] mb-1 rounded-full`,
                        selected && 'border border-blue-400 scale-125 transition-transform'
                    )}
                    style={{ backgroundColor: color }}
                >
                    {data.emoji}
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2">{data.title}</p>
            </div>
            <Handle type="source" position={Position.Left} className="invisible bg-transparent" style={{ left: '50%' }} />
        </div>
    )
})
