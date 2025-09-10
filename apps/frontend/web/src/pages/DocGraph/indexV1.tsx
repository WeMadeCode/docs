import '@xyflow/react/dist/style.css'

import { Block } from '@page-doc/core'
import { SidebarInset, SidebarTrigger } from '@page-doc/shadcn-shared-ui/components/ui/sidebar'
import { applyEdgeChanges, applyNodeChanges, Background, Controls, Edge, EdgeChange, Node, NodeChange, ReactFlow } from '@xyflow/react'
import * as d3 from 'd3-force'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { GraphEdge } from './Edge'
import { GraphNode } from './Node'

const basePages = [
  {
    id: '1',
    name: 'Notion 与飞书文档协同方案精析，字节前端专家传授百万年薪架构师级项目重难点',
    emoji: '🔭',
    links: [{ id: '2' }],
  },
  {
    id: '2',
    name: 'Ant Design 组件库架构设计与开发实践，高级前端专家带你掌握基建面试技巧',
    emoji: '🔦',
    // links: [{ id: '3' }],
  },
  {
    id: '3',
    name: 'Taro、Tauri 多端开发实践与原理剖析，《Taro 多端开发权威指南》作者带你悟透多端框架原理',
    emoji: '👽',
    // links: [{ id: '4' }],
  },
  {
    id: '4',
    name: 'Nest 服务端开发与原理深度剖析，《NestJS 实战》作者带你领略框架设计之美',
    emoji: '🥤',
    // links: [{ id: '5' }],
  },
  {
    id: '5',
    name: 'Babel 与编译原理详解，字节高级前端专家带你从零实现飞书表格公式执行器',
    emoji: '🚀',
    // links: [{ id: '6' }],
  },
  {
    id: '6',
    name: '服务端渲染（SSR）与前后端同构技术原理揭秘，字节前端专家带你光速进阶全栈',
    emoji: '🐚',
  },
]

const getMention = (blocks: Block[]) => {
  console.log('🚀 ~ getMention ~ blocks:', blocks)
  const mentionIds: string[] = []
  function recMention(content: any) {
    if (!content) {
      return
    }
    if (content.type === 'mention') {
      mentionIds.push(content.props.id)
    } else {
      content.content?.forEach(recMention)
      content.children?.forEach(recMention)
    }
  }
  blocks.forEach(recMention)
  return mentionIds
}

const loadAllPages = () => {
  try {
    const allPages = JSON.parse(localStorage.getItem('allPages') ?? '')
    if (!allPages) {
      return []
    }

    const withLinksPages = basePages.map(page => {
      const p = allPages[page.id]
      if (!p) {
        return page
      }
      const blocks = p.blocks
      const mentions = getMention(blocks)
      console.log('🚀 ~ withLinksPages ~ mentions:', mentions)
      return {
        ...page,
        links: mentions.map(mention => ({ id: mention })),
      }
    })

    return withLinksPages
  } catch {
    return []
  }
}

const nodesTypes = {
  graph: GraphNode,
}

const edgeTypes = {
  graph: GraphEdge,
}

export function DocGraph() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const pages = useMemo(() => {
    const withLinksPages = loadAllPages()
    // const pages = Array.from({ length: 20 }, (_, i) => ({
    //     id: i.toString(),
    //     name: basePages[i % basePages.length].name,
    //     emoji: basePages[i % basePages.length].emoji,
    //     links: [{ id: Math.floor(Math.random() * 20).toString() }],
    // }))
    return withLinksPages.map((page, i) => ({
      id: i.toString(),
      name: page.name,
      emoji: page.emoji,
      links: page.links?.map(link => ({ id: withLinksPages.findIndex(p => p.id === link.id).toString() })),
    }))
  }, [])

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    const { id } = node
    setNodes(nodes.map(node => ({ ...node, selected: node.id === id })))
    setEdges(edges.map(edge => ({ ...edge, selected: edge.source === id || edge.target === id })))
  }

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes(nds => applyNodeChanges(changes, nds)), [setNodes])
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)), [setEdges])

  useEffect(() => {
    // 转换数据为 @xyflow/react 所需的节点和边
    const initialNodes = pages.map(page => {
      return {
        id: page.id,
        type: 'graph',
        data: {
          emoji: page.emoji,
          title: page.name,
        },
        width: 100,
        height: 100,
        x: 0,
        y: 0,
      }
    })

    const initialEdges = []
    for (let pi = 0; pi < pages.length; pi++) {
      const page = pages[pi]
      for (const link of page.links || []) {
        const index = pages.findIndex(p => p.id === link.id)
        if (index === -1) {
          continue
        }
        initialEdges.push({
          id: `${page.id}-${link.id}`,
          data: {
            links: page.links,
          },
          source: pi,
          target: index,
        })
      }
    }

    // 使用 d3-force 来设置弹性布局
    const simulation = d3
      .forceSimulation(initialNodes)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('collide', d3.forceCollide(80))
      .force('link', d3.forceLink(initialEdges).strength(1).distance(200).iterations(100))
      .force('center', d3.forceCenter(700, 400))
      .force('radial', d3.forceRadial(0, 700, 400))

    // 如果我们需要在模拟结束时执行一些操作，可以监听 end 事件
    // simulation.on('end', () => {
    //     console.log('simulation end')
    // })

    // 模拟每一帧时，更新节点的位置
    simulation.on('tick', () => {
      const forceNodes = simulation.nodes().map(node => ({ ...node, position: { x: node.x, y: node.y } }))
      setNodes(forceNodes)
    })

    // @ts-expect-error force edge type
    const flowEdges = initialEdges.map(edge => ({ ...edge, type: 'graph', source: edge?.source.id, target: edge?.target.id }))
    setEdges(flowEdges)

    return () => {
      simulation.stop()
    }
  }, [])

  return (
    <SidebarInset>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row items-center p-6 gap-2">
          <SidebarTrigger />
          <h1 className="text-xl text-zinc-500">文档图谱</h1>
        </div>
        <div className="w-full h-full">
          <ReactFlow
            nodesDraggable
            proOptions={{
              hideAttribution: true,
            }}
            nodes={nodes}
            edges={edges}
            nodeTypes={nodesTypes}
            edgeTypes={edgeTypes}
            onNodeClick={handleNodeClick}
            onNodeDragStart={handleNodeClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </SidebarInset>
  )
}
