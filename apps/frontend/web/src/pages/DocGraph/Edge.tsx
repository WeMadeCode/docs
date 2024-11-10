/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { BaseEdge, EdgeProps, getStraightPath } from '@xyflow/react'
import React, { memo } from 'react'

interface GraphEdgeProps extends EdgeProps {
    data: {
        label: string
    }
}

export const GraphEdge = memo((props: GraphEdgeProps) => {
    const { id, selected, sourceX, sourceY, targetX, targetY } = props
    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    })

    const edgeStyle = {
        strokeStyle: selected ? 'solid' : 'dashed',
        strokeDasharray: selected ? '0' : '4 4',
        stroke: selected ? '#3182CE' : '#E2E8F0',
    }

    return (
        <>
            <BaseEdge id={id} path={edgePath} style={edgeStyle} />
        </>
    )
})
