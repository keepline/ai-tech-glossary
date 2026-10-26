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
import { CATEGORY_META, RELATION_META, type RelationType } from '../types'
import { layoutPositions } from '../lib/layout'

const nodeTypes: NodeTypes = { term: TermNode }

/** Subtle dash encoding by relation — precise, not noisy */
const RELATION_DASH: Record<RelationType, string | undefined> = {
  enables: undefined,
  'part-of': '5 3',
  'alternative-to': '2 3',
  'stacks-with': undefined,
  'evolved-from': '7 3 2 3',
}

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

  const adjacentIds = useMemo(() => {
    if (!selectedId) return null
    const set = new Set<string>([selectedId])
    for (const e of dataEdges) {
      if (e.source === selectedId) set.add(e.target)
      if (e.target === selectedId) set.add(e.source)
    }
    return set
  }, [selectedId])

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
          dimmed: Boolean(adjacentIds && !adjacentIds.has(t.id)),
        },
        hidden: categoryFilter ? t.category !== categoryFilter : false,
      })),
    [positions, categoryFilter, adjacentIds],
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
        const dash = RELATION_DASH[e.type]
        return {
          id: `e-${i}-${e.source}-${e.target}`,
          source: e.source,
          target: e.target,
          type: 'default',
          animated: Boolean(highlight),
          hidden,
          style: {
            stroke: meta.color,
            strokeOpacity: highlight ? 1 : 0.6,
            strokeWidth: highlight ? 2.6 : 1.35,
            ...(dash ? { strokeDasharray: dash } : {}),
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: highlight ? meta.color : meta.color,
            width: highlight ? 16 : 13,
            height: highlight ? 16 : 13,
          },
          label: highlight ? meta.zh : undefined,
          labelStyle: {
            fill: '#e8e8f0',
            fontSize: 11.5,
            fontWeight: 600,
          },
          labelBgStyle: {
            fill: '#12121c',
            fillOpacity: 0.92,
          },
          labelBgPadding: [5, 8] as [number, number],
          labelBgBorderRadius: 5,
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
        data: {
          ...n.data,
          dimmed: Boolean(adjacentIds && !adjacentIds.has(n.id)),
        },
      })),
    )
  }, [selectedId, adjacentIds, setNodes])

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
          size={1.1}
          color="#ffffff08"
        />
        <Controls showInteractive={false} position="bottom-left" />
        <MiniMap
          position="bottom-left"
          style={{ marginBottom: 120 }}
          nodeColor={(n) => {
            const cat = (n.data as { category?: string })?.category
            return cat && cat in CATEGORY_META
              ? CATEGORY_META[cat as keyof typeof CATEGORY_META].color
              : '#888'
          }}
          maskColor="rgba(7,7,12,0.75)"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  )
}
