import { useCallback, useEffect, useMemo } from 'react'
import type { MouseEvent } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  MarkerType,
  type NodeTypes,
  type Edge as RFEdge,
} from '@xyflow/react'
import TermNode, { type TermFlowNode } from './TermNode'
import { terms, edges as dataEdges } from '../data/terms'
import { CATEGORY_META, RELATION_META } from '../types'
import { layoutPositions } from '../lib/layout'

const nodeTypes: NodeTypes = { term: TermNode }

interface Props {
  selectedId: string | null
  onSelect: (id: string | null) => void
  categoryFilter: string | null
}

export default function GraphView({
  selectedId,
  onSelect,
  categoryFilter,
}: Props) {
  const positions = useMemo(() => layoutPositions(), [])

  const initialNodes: TermFlowNode[] = useMemo(
    () =>
      terms.map((t) => ({
        id: t.id,
        type: 'term',
        position: positions[t.id] ?? { x: 0, y: 0 },
        data: {
          label: t.en,
          zh: t.zh,
          category: t.category,
        },
        hidden: categoryFilter ? t.category !== categoryFilter : false,
      })),
    [positions, categoryFilter],
  )

  const initialEdges: RFEdge[] = useMemo(
    () =>
      dataEdges.map((e, i) => {
        const meta = RELATION_META[e.type]
        const sourceTerm = terms.find((t) => t.id === e.source)
        const targetTerm = terms.find((t) => t.id === e.target)
        const hidden = Boolean(
          categoryFilter &&
            (sourceTerm?.category !== categoryFilter ||
              targetTerm?.category !== categoryFilter),
        )
        const highlight =
          selectedId && (e.source === selectedId || e.target === selectedId)
        return {
          id: `e-${i}-${e.source}-${e.target}`,
          source: e.source,
          target: e.target,
          type: 'default',
          animated: Boolean(highlight),
          hidden,
          style: {
            stroke: highlight ? meta.color : meta.color + '55',
            strokeWidth: highlight ? 2.2 : 1.1,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: highlight ? meta.color : meta.color + '88',
            width: 14,
            height: 14,
          },
          label: highlight ? meta.zh : undefined,
          labelStyle: {
            fill: '#c8c8d8',
            fontSize: 10,
            fontWeight: 500,
          },
          labelBgStyle: {
            fill: '#0e0e16',
            fillOpacity: 0.85,
          },
          labelBgPadding: [4, 6] as [number, number],
          labelBgBorderRadius: 4,
        }
      }),
    [categoryFilter, selectedId],
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [rfEdges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  useEffect(() => {
    setNodes(initialNodes)
  }, [initialNodes, setNodes])

  useEffect(() => {
    setEdges(initialEdges)
  }, [initialEdges, setEdges])

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        selected: n.id === selectedId,
      })),
    )
  }, [selectedId, setNodes])

  const onNodeClick = useCallback(
    (_: MouseEvent, node: TermFlowNode) => {
      onSelect(node.id)
    },
    [onSelect],
  )

  const onPaneClick = useCallback(() => {
    onSelect(null)
  }, [onSelect])

  return (
    <div className="absolute inset-0">
      <ReactFlow
        nodes={nodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.25}
        maxZoom={1.8}
        proOptions={{ hideAttribution: true }}
        colorMode="dark"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1.2}
          color="#ffffff10"
        />
        <Controls showInteractive={false} position="bottom-left" />
        <MiniMap
          position="bottom-left"
          style={{ marginBottom: 120 }}
          nodeColor={(n) => {
            const cat = (n.data as { category?: string })?.category
            return cat && cat in CATEGORY_META
              ? CATEGORY_META[cat as keyof typeof CATEGORY_META].color
              : '#666'
          }}
          maskColor="rgba(7,7,12,0.7)"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  )
}
